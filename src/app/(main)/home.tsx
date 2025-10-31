import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { ActivityIndicator, Button, IconButton, Text, Chip } from "react-native-paper";
import SwipeDeck from "../../components/organisms/SwipeDeck";
import { useDislike, useLike, usePeople } from "../../features/people/hooks";

const BACKGROUND = ["#FD7285", "#FE86A6", "#FF9BC2"] as const;

export default function Home() {
    const { data, fetchNextPage, hasNextPage, isLoading } = usePeople(10);
    const { mutate: like } = useLike();
    const { mutate: nope } = useDislike();
    const [index, setIndex] = useState(0);

    const pages = data?.pages ?? [];
    const people = pages.flatMap((page) => page.data);
    const currentPerson = people[index];

    const handleIndex = (i: number) => {
        setIndex(i);
        if (i >= people.length - 3 && hasNextPage) {
            fetchNextPage();
        }
    };

    const handleLike = () => {
        if (!currentPerson) return;
        like(currentPerson.id);
        handleIndex(index + 1);
    };

    const handleNope = () => {
        if (!currentPerson) return;
        nope(currentPerson.id);
        handleIndex(index + 1);
    };

    if (isLoading) {
        return (
            <LinearGradient colors={BACKGROUND} style={styles.background}>
                <SafeAreaView style={styles.safeArea}>
                    <View style={styles.loading}>
                        <ActivityIndicator animating size="large" color="#FFFFFF" />
                        <Text variant="bodyMedium" style={styles.loadingText}>
                            Finding the best matches for you...
                        </Text>
                    </View>
                </SafeAreaView>
            </LinearGradient>
        );
    }

    if (!people.length) {
        return (
            <LinearGradient colors={BACKGROUND} style={styles.background}>
                <SafeAreaView style={styles.safeArea}>
                    <View style={styles.emptyState}>
                        <Text variant="headlineSmall" style={styles.emptyTitle}>
                            You're all caught up!
                        </Text>
                        <Text variant="bodyMedium" style={styles.emptySubtitle}>
                            Check back soon for fresh faces or adjust your preferences.
                        </Text>
                        <Button mode="contained" onPress={() => fetchNextPage?.()}>
                            Refresh suggestions
                        </Button>
                    </View>
                </SafeAreaView>
            </LinearGradient>
        );
    }

    return (
        <LinearGradient colors={BACKGROUND} style={styles.background}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.headerText}>
                            <Text variant="labelSmall" style={styles.sectionLabel}>
                                Discover
                            </Text>
                            <Text variant="headlineMedium" style={styles.sectionTitle}>
                                Today's best vibes
                            </Text>
                            <Text variant="bodyMedium" style={styles.sectionSubtitle}>
                                Swipe right to keep the sparks flying.
                            </Text>
                        </View>
                        <IconButton
                            icon="heart-outline"
                            size={24}
                            mode="contained-tonal"
                            onPress={() => router.push("/(main)/liked")}
                        />
                    </View>

                    <View style={styles.chipsRow}>
                        <Chip icon="star-outline" style={styles.chip} textStyle={styles.chipText}>
                            Smart Picks
                        </Chip>
                        <Chip icon="history" style={styles.chip} textStyle={styles.chipText}>
                            Updated hourly
                        </Chip>
                    </View>

                    <View style={styles.deckContainer}>
                        <SwipeDeck
                            people={people}
                            index={index}
                            setIndex={handleIndex}
                            onLike={like}
                            onNope={nope}
                        />
                    </View>

                    <View style={styles.actionsRow}>
                        <IconButton
                            icon="close"
                            size={28}
                            mode="contained-tonal"
                            disabled={!currentPerson}
                            onPress={handleNope}
                        />
                        <IconButton
                            icon="heart"
                            size={32}
                            mode="contained"
                            containerColor="#FF6CAB"
                            disabled={!currentPerson}
                            onPress={handleLike}
                        />
                        <IconButton
                            icon="star-outline"
                            size={28}
                            mode="contained-tonal"
                            onPress={() => router.push("/(main)/liked")}
                        />
                    </View>
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 24,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    headerText: {
        flex: 1,
        gap: 8,
    },
    sectionLabel: {
        textTransform: "uppercase",
        letterSpacing: 3,
        color: "rgba(255,255,255,0.8)",
    },
    sectionTitle: {
        color: "#FFFFFF",
        fontWeight: "700",
    },
    sectionSubtitle: {
        color: "rgba(255,255,255,0.88)",
    },
    chipsRow: {
        flexDirection: "row",
        gap: 12,
        marginTop: 16,
    },
    chip: {
        backgroundColor: "rgba(255,255,255,0.15)",
        borderColor: "rgba(255,255,255,0.3)",
        borderWidth: 1,
    },
    chipText: {
        color: "#FFFFFF",
    },
    deckContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    actionsRow: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        marginTop: 16,
    },
    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
        gap: 16,
    },
    loadingText: {
        color: "rgba(255,255,255,0.9)",
    },
    emptyState: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 16,
        paddingHorizontal: 32,
    },
    emptyTitle: {
        color: "#FFFFFF",
        textAlign: "center",
    },
    emptySubtitle: {
        textAlign: "center",
        color: "rgba(255,255,255,0.86)",
    },
});
