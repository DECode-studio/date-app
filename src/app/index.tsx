import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, Chip, Surface, Text } from "react-native-paper";
import { useAuthRedirect } from "../hooks/useAuthRedirect";

const HERO_GRADIENT = ["#FD7285", "#FE86A6", "#FF9BC2"] as const;
const BADGE_GRADIENT = ["#6750A4", "#9867C5"] as const;

export default function Index() {
    const { isChecking } = useAuthRedirect();

    return (
        <LinearGradient colors={HERO_GRADIENT} style={styles.background}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.container}>
                    <Surface elevation={4} style={styles.logoCard}>
                        <LinearGradient colors={BADGE_GRADIENT} style={styles.logoGradient}>
                            <Ionicons name="flame" size={48} color="white" />
                        </LinearGradient>
                        <Text variant="headlineMedium" style={styles.logoTitle}>
                            VibeMatch
                        </Text>
                        <Text variant="bodyMedium" style={styles.logoSubtitle}>
                            Meet your kind of people with curated daily matches.
                        </Text>
                    </Surface>

                    <Surface elevation={1} style={styles.perksCard}>
                        <Text variant="labelSmall" style={styles.perksTitle}>
                            Why you'll love it
                        </Text>
                        <View style={styles.perksRow}>
                            <Chip icon="star-outline" style={styles.chip}>Curated matches</Chip>
                            <Chip icon="chat-outline" style={styles.chip}>Instant ice-breakers</Chip>
                            <Chip icon="shield-check" style={styles.chip}>Verified profiles</Chip>
                        </View>
                    </Surface>

                    <View style={styles.statusRow}>
                        <ActivityIndicator animating color="#FFFFFF" />
                        <Text variant="bodyMedium" style={styles.statusText}>
                            {isChecking
                                ? "Checking your vibe... hang tight!"
                                : "Routing you to your next match..."}
                        </Text>
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
        justifyContent: "center",
        paddingHorizontal: 24,
        gap: 32,
    },
    logoCard: {
        alignItems: "center",
        paddingVertical: 32,
        paddingHorizontal: 24,
        borderRadius: 28,
        backgroundColor: "white",
        gap: 16,
    },
    logoGradient: {
        width: 96,
        height: 96,
        borderRadius: 48,
        alignItems: "center",
        justifyContent: "center",
    },
    logoTitle: {
        color: "#1E192B",
        fontWeight: "700",
    },
    logoSubtitle: {
        textAlign: "center",
        color: "#49454F",
    },
    perksCard: {
        borderRadius: 24,
        padding: 20,
        backgroundColor: "#FFFFFF",
        gap: 12,
    },
    perksTitle: {
        textTransform: "uppercase",
        letterSpacing: 3,
        color: "#6750A4",
    },
    perksRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 12,
    },
    chip: {
        backgroundColor: "#F6EDFF",
    },
    statusRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
    },
    statusText: {
        color: "rgba(255,255,255,0.9)",
    },
});
