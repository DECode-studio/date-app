import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, Surface, Button } from "react-native-paper";
import { useMemo, useState } from "react";
import AuthTextInput from "../../components/molecules/AuthTextInput";
import { useLogin } from "../../features/auth/hooks";

const HERO_GRADIENT = ["#FD7285", "#FE86A6", "#FF9BC2"] as const;

export default function SignIn() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const { mutateAsync, isPending } = useLogin();

    const benefits = useMemo(
        () => [
            "Verified members for real vibes",
            "Curated matches delivered daily",
            "Instant ice-breakers to start chatting",
        ],
        []
    );

    const onSubmit = async () => {
        try {
            await mutateAsync({ email, password });
            router.replace("/(main)/home");
        } catch (e: any) {
            Alert.alert("Login failed", e?.response?.data?.message ?? "Unknown error");
        }
    };

    return (
        <LinearGradient colors={HERO_GRADIENT} style={styles.background}>
            <SafeAreaView style={styles.safeArea}>
                <KeyboardAvoidingView
                    style={styles.flex}
                    behavior={Platform.OS === "ios" ? "padding" : undefined}
                    keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
                >
                    <ScrollView
                        style={styles.flex}
                        contentContainerStyle={styles.container}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View style={styles.header}>
                            <Text style={styles.subtitle}>VibeMatch</Text>
                            <Text style={styles.title}>
                                Find someone you can{"\n"}truly connect with
                            </Text>
                            <Text style={styles.description}>
                                Sign in to pick up your personalised matches and keep the momentum going.
                            </Text>
                            <Surface elevation={0} style={styles.benefitsCard}>
                                {benefits.map((text) => (
                                    <View key={text} style={styles.benefitRow}>
                                        <View style={styles.benefitDot} />
                                        <Text style={styles.benefitText}>{text}</Text>
                                    </View>
                                ))}
                            </Surface>
                        </View>

                        <Surface elevation={5} style={styles.formCard}>
                            <Text variant="titleLarge" style={styles.formTitle}>
                                Log in to your account
                            </Text>
                            <Text variant="bodyMedium" style={styles.formSubtitle}>
                                We're glad to see you again
                            </Text>

                            <View style={styles.formFields}>
                                <AuthTextInput
                                    label="Email"
                                    icon="email-outline"
                                    value={email}
                                    onChangeText={setEmail}
                                    autoCapitalize="none"
                                    keyboardType="email-address"
                                    placeholder="you@example.com"
                                />
                                <AuthTextInput
                                    label="Password"
                                    icon="lock-outline"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry
                                    placeholder="Enter your password"
                                />
                                <Button
                                    mode="contained"
                                    onPress={onSubmit}
                                    disabled={isPending}
                                    style={styles.primaryButton}
                                    contentStyle={styles.buttonContent}
                                >
                                    {isPending ? "Signing in..." : "Sign In"}
                                </Button>
                                <Button
                                    mode="outlined"
                                    onPress={() => router.push("/(auth)/register")}
                                    style={styles.secondaryButton}
                                    contentStyle={styles.buttonContent}
                                >
                                    Create an account
                                </Button>
                            </View>

                            <Text style={styles.helperText}>
                                Forgot password?{" "}
                                <Text
                                    style={styles.link}
                                    onPress={() =>
                                        Alert.alert(
                                            "Reset password",
                                            "We've sent you a reset link."
                                        )
                                    }
                                >
                                    Reset here
                                </Text>
                            </Text>
                        </Surface>

                        <Text style={styles.footer}>
                            By continuing you agree to our Terms & Privacy Policy.
                        </Text>
                    </ScrollView>
                </KeyboardAvoidingView>
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
    flex: {
        flex: 1,
    },
    container: {
        flexGrow: 1,
        justifyContent: "space-between",
        paddingHorizontal: 24,
        paddingVertical: 32,
        gap: 32,
    },
    header: {
        alignItems: "center",
        gap: 16,
    },
    subtitle: {
        color: "rgba(255,255,255,0.85)",
        letterSpacing: 4,
        fontSize: 13,
        fontWeight: "600",
        textTransform: "uppercase",
    },
    title: {
        textAlign: "center",
        color: "#FFFFFF",
        fontSize: 34,
        fontWeight: "800",
        lineHeight: 42,
    },
    description: {
        textAlign: "center",
        color: "rgba(255,255,255,0.85)",
        fontSize: 16,
    },
    benefitsCard: {
        backgroundColor: "rgba(255,255,255,0.15)",
        borderRadius: 24,
        padding: 16,
        width: "100%",
    },
    benefitRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        marginBottom: 8,
    },
    benefitDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "rgba(255,255,255,0.8)",
    },
    benefitText: {
        flex: 1,
        color: "rgba(255,255,255,0.9)",
        fontSize: 14,
        fontWeight: "500",
    },
    formCard: {
        borderRadius: 32,
        padding: 24,
        backgroundColor: "rgba(255,255,255,0.94)",
    },
    formTitle: {
        textAlign: "center",
        color: "#271225",
        fontWeight: "700",
    },
    formSubtitle: {
        textAlign: "center",
        color: "#7A5675",
        marginTop: 4,
    },
    formFields: {
        marginTop: 20,
    },
    primaryButton: {
        marginTop: 8,
    },
    secondaryButton: {
        marginTop: 8,
    },
    buttonContent: {
        paddingVertical: 6,
    },
    helperText: {
        marginTop: 24,
        textAlign: "center",
        color: "#8C5C78",
        fontSize: 12,
    },
    link: {
        color: "#FF5F99",
        fontWeight: "600",
    },
    footer: {
        textAlign: "center",
        color: "rgba(255,255,255,0.8)",
        fontSize: 12,
    },
});
