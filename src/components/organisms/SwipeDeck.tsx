import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";
import { useEffect, useMemo } from "react";
import PersonCard from "./PersonCard";
import { Person } from "../../features/people/types";

const { width } = Dimensions.get("window");
const CARD_WIDTH = Math.min(width * 0.9, 360);
const CARD_HEIGHT = CARD_WIDTH * 1.3;
const SWIPE_THRESHOLD = width * 0.25;

type Props = {
    people: Person[];
    index: number;
    setIndex: (i: number) => void;
    onLike: (id: number) => void;
    onNope: (id: number) => void;
};

export default function SwipeDeck({ people, onLike, onNope, index, setIndex }: Props) {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const rotation = useSharedValue(0);

    useEffect(() => {
        translateX.value = 0;
        translateY.value = 0;
        rotation.value = 0;
    }, [index]);

    const current = people[index];
    const next = people[index + 1];

    const pan = Gesture.Pan()
        .onChange((event) => {
            translateX.value = event.translationX;
            translateY.value = event.translationY;
            rotation.value = (event.translationX / width) * 12;
        })
        .onFinalize(() => {
            if (Math.abs(translateX.value) > SWIPE_THRESHOLD) {
                const direction = Math.sign(translateX.value);
                const targetX = direction * (width + 120);
                translateX.value = withSpring(targetX, { damping: 18, stiffness: 160 });
                runOnJS(handleSwipe)(direction);
            } else {
                translateX.value = withSpring(0);
                translateY.value = withSpring(0);
                rotation.value = withSpring(0);
            }
        });

    const handleSwipe = (direction: number) => {
        if (!current) return;
        if (direction > 0) {
            onLike(current.id);
        } else {
            onNope(current.id);
        }
        setIndex(index + 1);
    };

    const topStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: translateX.value },
            { translateY: translateY.value },
            { rotate: `${rotation.value}deg` },
        ],
    }));

    const nextStyle = useAnimatedStyle(() => ({
        transform: [
            {
                translateY: withSpring(16 - Math.min(Math.abs(translateX.value) / 12, 12)),
            },
            {
                scale: withSpring(0.92 + Math.min(Math.abs(translateX.value) / 1200, 0.06)),
            },
        ],
        opacity: withSpring(0.8),
    }));

    const likeBadgeStyle = useAnimatedStyle(() => ({
        opacity: translateX.value > 0 ? Math.min(translateX.value / SWIPE_THRESHOLD, 1) : 0,
    }));

    const nopeBadgeStyle = useAnimatedStyle(() => ({
        opacity: translateX.value < 0 ? Math.min(Math.abs(translateX.value) / SWIPE_THRESHOLD, 1) : 0,
    }));

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
                <GestureDetector gesture={pan}>
                    <Animated.View style={[styles.cardWrapper, topStyle]}>
                        <PersonCard person={current} />
                        <Animated.View style={[styles.badge, styles.likeBadge, likeBadgeStyle]}>
                            <Text style={styles.badgeText}>MATCH</Text>
                        </Animated.View>
                        <Animated.View style={[styles.badge, styles.nopeBadge, nopeBadgeStyle]}>
                            <Text style={styles.badgeText}>PASS</Text>
                        </Animated.View>
                    </Animated.View>
                </GestureDetector>
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
