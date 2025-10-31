import { Animated, Dimensions, PanResponder, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { useCallback, useEffect, useMemo, useRef } from "react";
import PersonCard from "./PersonCard";
import { Person } from "../../features/people/types";

const { width } = Dimensions.get("window");
const CARD_WIDTH = Math.min(width * 0.9, 360);
const CARD_HEIGHT = CARD_WIDTH * 1.3;
const SWIPE_THRESHOLD = width * 0.25;
const TAP_THRESHOLD = 12;

type Props = {
    people: Person[];
    index: number;
    setIndex: (i: number) => void;
    onLike: (id: number) => void;
    onNope: (id: number) => void;
};

export default function SwipeDeck({ people, onLike, onNope, index, setIndex }: Props) {
    const position = useRef(new Animated.ValueXY()).current;

    useEffect(() => {
        position.setValue({ x: 0, y: 0 });
    }, [index, position]);

    const current = people[index];
    const next = people[index + 1];

    const handleSwipe = useCallback(
        (direction: number) => {
            if (!current) return;
            if (direction > 0) {
                onLike(current.id);
            } else {
                onNope(current.id);
            }
            setIndex(index + 1);
        },
        [current, index, onLike, onNope, setIndex],
    );

    const resetPosition = useCallback(() => {
        Animated.spring(position, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: true,
            tension: 170,
            friction: 18,
        }).start();
    }, [position]);

    const openDetail = useCallback(() => {
        if (!current) return;
        router.push({
            pathname: "/liked/[id]",
            params: { id: String(current.id) },
        });
    }, [current]);

    const panResponder = useMemo(
        () =>
            PanResponder.create({
                onStartShouldSetPanResponder: () => true,
                onMoveShouldSetPanResponder: (_, gesture) =>
                    Math.abs(gesture.dx) > 5 || Math.abs(gesture.dy) > 5,
                onPanResponderMove: (_, gesture) => {
                    position.setValue({ x: gesture.dx, y: gesture.dy });
                },
                onPanResponderRelease: (_, gesture) => {
                    if (Math.abs(gesture.dx) > SWIPE_THRESHOLD) {
                        const direction = gesture.dx > 0 ? 1 : -1;
                        Animated.spring(position, {
                            toValue: { x: direction * (width + 120), y: gesture.dy },
                            useNativeDriver: true,
                            tension: 120,
                            friction: 14,
                        }).start(() => {
                            position.setValue({ x: 0, y: 0 });
                            handleSwipe(direction);
                        });
                    } else {
                        const isTap =
                            Math.abs(gesture.dx) < TAP_THRESHOLD &&
                            Math.abs(gesture.dy) < TAP_THRESHOLD;
                        resetPosition();
                        if (isTap) {
                            openDetail();
                        }
                    }
                },
                onPanResponderTerminate: resetPosition,
            }),
        [handleSwipe, openDetail, position, resetPosition],
    );

    const rotate = position.x.interpolate({
        inputRange: [-width, 0, width],
        outputRange: ["-12deg", "0deg", "12deg"],
        extrapolate: "clamp",
    });

    const topStyle = {
        transform: [
            { translateX: position.x },
            { translateY: position.y },
            { rotate },
        ],
    };

    const nextCardTranslateY = position.x.interpolate({
        inputRange: [-width, 0, width],
        outputRange: [12, 16, 12],
        extrapolate: "clamp",
    });

    const nextCardScale = position.x.interpolate({
        inputRange: [-width, 0, width],
        outputRange: [0.98, 0.92, 0.98],
        extrapolate: "clamp",
    });

    const nextStyle = {
        transform: [{ translateY: nextCardTranslateY }, { scale: nextCardScale }],
        opacity: 0.8,
    };

    const likeBadgeStyle = {
        opacity: position.x.interpolate({
            inputRange: [-SWIPE_THRESHOLD, 0, SWIPE_THRESHOLD],
            outputRange: [0, 0, 1],
            extrapolate: "clamp",
        }),
    };

    const nopeBadgeStyle = {
        opacity: position.x.interpolate({
            inputRange: [-SWIPE_THRESHOLD, 0, SWIPE_THRESHOLD],
            outputRange: [1, 0, 0],
            extrapolate: "clamp",
        }),
    };

    const stack = useMemo(() => [current, next].filter(Boolean) as Person[], [current, next]);

    return (
        <View style={styles.stage}>
            <View style={styles.deckShadow} />
            {stack.length === 2 && (
                <Animated.View style={[styles.cardWrapper, styles.nextCard, nextStyle]}>
                    <PersonCard person={stack[1]} />
                </Animated.View>
            )}
            {current && (
                <Animated.View
                    style={[styles.cardWrapper, topStyle]}
                    {...panResponder.panHandlers}
                >
                    <PersonCard person={current} />
                    <Animated.View style={[styles.badge, styles.likeBadge, likeBadgeStyle]}>
                        <Text style={styles.badgeText}>MATCH</Text>
                    </Animated.View>
                    <Animated.View style={[styles.badge, styles.nopeBadge, nopeBadgeStyle]}>
                        <Text style={styles.badgeText}>PASS</Text>
                    </Animated.View>
                </Animated.View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    stage: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT + 40,
        alignItems: "center",
        justifyContent: "center",
    },
    deckShadow: {
        position: "absolute",
        bottom: 18,
        width: CARD_WIDTH * 0.72,
        height: 36,
        backgroundColor: "rgba(255, 165, 195, 0.35)",
        borderRadius: CARD_WIDTH,
        shadowColor: "#FF89B8",
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.35,
        shadowRadius: 20,
        elevation: 12,
    },
    cardWrapper: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
    },
    nextCard: {
        position: "absolute",
        top: 16,
    },
    badge: {
        position: "absolute",
        top: 32,
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 999,
        borderWidth: 2,
    },
    likeBadge: {
        left: 24,
        borderColor: "#4CB994",
    },
    nopeBadge: {
        right: 24,
        borderColor: "#FF9CB2",
    },
    badgeText: {
        color: "#4B2242",
        fontSize: 16,
        fontWeight: "700",
        letterSpacing: 2,
    },
});
