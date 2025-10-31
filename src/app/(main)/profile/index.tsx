import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar, Button, List, Surface, Text } from "react-native-paper";
import { useAuth } from "../../../store/auth.store";

const BACKGROUND = ["#FD7285", "#FE86A6", "#FF9BC2"] as const;

export default function Profile() {
    const { user, logout } = useAuth();
    const initials = user?.name
        ?.split(" ")
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join("") ?? "VM";

    const handleSignOut = async () => {
        await logout();
        router.replace("/(auth)/sign-in");
    };

    return (
        <LinearGradient colors={BACKGROUND} style={styles.background}>
            <SafeAreaView style={styles.safeArea}>
                <ScrollView
                    contentContainerStyle={styles.container}
                    showsVerticalScrollIndicator={false}
                >
                    <Surface elevation={4} style={styles.profileCard}>
                        <Avatar.Text
                            size={96}
                            label={initials}
                            style={styles.avatar}
                            labelStyle={{ fontSize: 32, fontWeight: "700" }}
                        />
                        <Text variant="titleLarge" style={styles.name}>
                            {user?.name ?? "Your Name"}
                        </Text>
                        <Text variant="bodyMedium" style={styles.email}>
                            {user?.email ?? "you@example.com"}
                        </Text>
                    </Surface>

                    <Surface elevation={2} style={styles.preferenceCard}>
                        <List.Item
                            title="Match preferences"
                            description="Tune your discovery radius and interests."
                            left={(props) => <List.Icon {...props} icon="heart-outline" />}
                        />
                        <List.Item
                            title="Notification settings"
                            description="Decide when to get updates about new matches."
                            left={(props) => <List.Icon {...props} icon="bell-outline" />}
                        />
                        <List.Item
                            title="Safety center"
                            description="Learn more about staying safe while connecting."
                            left={(props) => <List.Icon {...props} icon="shield-check-outline" />}
                        />
                    </Surface>

                    <View style={styles.actions}>
                        <Button
                            mode="contained"
                            onPress={() => router.push("/liked")}
                            contentStyle={styles.buttonContent}
                            icon="heart"
                        >
                            View liked people
                        </Button>
                        <Button
                            mode="outlined"
                            onPress={handleSignOut}
                            contentStyle={styles.buttonContent}
                        >
                            Sign out
                        </Button>
                    </View>
                </ScrollView>
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
        paddingHorizontal: 24,
        paddingVertical: 32,
        gap: 24,
    },
    profileCard: {
        borderRadius: 24,
        alignItems: "center",
        paddingVertical: 24,
        paddingHorizontal: 16,
        backgroundColor: "#FFFFFF",
    },
    avatar: {
        backgroundColor: "#6750A4",
        marginBottom: 16,
    },
    name: {
        color: "#1E192B",
        fontWeight: "700",
    },
    email: {
        color: "#49454F",
        marginTop: 4,
    },
    preferenceCard: {
        borderRadius: 24,
        backgroundColor: "#FFFFFF",
    },
    actions: {
        marginTop: "auto",
        gap: 12,
    },
    buttonContent: {
        paddingVertical: 6,
    },
});
