import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCallback } from "react";
import PersonCard from "../../components/organisms/PersonCard";
import { useLikedPeople } from "../../features/people/hooks";

const BACKGROUND = ["#FD7285", "#FE86A6", "#FF9BC2"] as const;

export default function LikedIndex() {
    const { data, isLoading } = useLikedPeople();
    const likedPeople = data ?? [];

    const handleSelect = useCallback((id: number) => {
        router.push({
            pathname: "/liked/[id]",
            params: { id: String(id) },
        });
    }, []);

    return (
        <LinearGradient colors={BACKGROUND} style={styles.background}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.container}>
                    <Text variant="headlineSmall" style={styles.title}>
                        Your liked people
                    </Text>
                    <Text variant="bodyMedium" style={styles.subtitle}>
                        Revisit the profiles that caught your eye and learn more about them.
                    </Text>

                    {isLoading ? (
                        <View style={styles.loader}>
                            <ActivityIndicator animating color="#FFFFFF" size="large" />
                            <Text style={styles.loaderText}>Loading your matches...</Text>
                        </View>
                    ) : (
                        <FlatList
                            data={likedPeople}
                            keyExtractor={(item) => String(item.id)}
                            contentContainerStyle={[
                                styles.listContent,
                                likedPeople.length === 0 && styles.emptyContent,
                            ]}
                            renderItem={({ item }) => (
                                <Pressable
                                    onPress={() => handleSelect(item.id)}
                                    style={styles.cardWrapper}
                                >
                                    <PersonCard person={item} />
                                </Pressable>
                            )}
                            ListEmptyComponent={
                                <View style={styles.emptyState}>
                                    <Text variant="titleMedium" style={styles.emptyTitle}>
                                        No likes yet
                                    </Text>
                                    <Text variant="bodyMedium" style={styles.emptySubtitle}>
                                        Keep swiping right to see your favorites collected here.
                                    </Text>
                                </View>
                            }
                        />
                    )}
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
        gap: 12,
    },
    title: {
        color: "#FFFFFF",
        fontWeight: "700",
    },
    subtitle: {
        color: "rgba(255,255,255,0.85)",
    },
    loader: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
    },
    loaderText: {
        color: "rgba(255,255,255,0.9)",
    },
    listContent: {
        paddingVertical: 16,
        paddingBottom: 48,
        gap: 24,
    },
    cardWrapper: {
        borderRadius: 36,
        overflow: "hidden",
    },
    emptyContent: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    emptyState: {
        alignItems: "center",
        paddingHorizontal: 32,
        gap: 12,
    },
    emptyTitle: {
        color: "#FFFFFF",
        fontWeight: "700",
    },
    emptySubtitle: {
        color: "rgba(255,255,255,0.9)",
        textAlign: "center",
    },
});
