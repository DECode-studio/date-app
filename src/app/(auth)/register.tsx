import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, Surface, Button } from "react-native-paper";
import { useMemo, useState } from "react";
import AuthTextInput from "../../components/molecules/AuthTextInput";
import { useRegister } from "../../features/auth/hooks";

const HERO_GRADIENT = ["#FD7285", "#FE86A6", "#FF9BC2"] as const;

export default function Register() {
    const [name, setName] = useState("Jane Doe");
    const [email, setEmail] = useState("jane@example.com");
    const [password, setPassword] = useState("secret123");
    const [confirm, setConfirm] = useState("secret123");
    const { mutateAsync, isPending } = useRegister();

    const steps = useMemo(
        () => [
            "Tell us who you are",
            "Share the vibes you love",
            "Upload a photo & start matching",
        ],
        []
    );

    const onSubmit = async () => {
        if (password !== confirm) {
            Alert.alert("Password mismatch", "Make sure both passwords match.");
            return;
        }
        try {
            await mutateAsync({ name, email, password, password_confirmation: confirm });
            router.replace("/(main)/home");
        } catch (e: any) {
            Alert.alert("Register failed", e?.response?.data?.message ?? "Unknown error");
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
                            <Text style={styles.subtitle}>Join VibeMatch</Text>
                            <Text style={styles.title}>
                                Let the world see your best self
                            </Text>
                            <Text style={styles.description}>
                                Craft a profile that shines and meet people who vibe with your energy.
                            </Text>
                            <Surface elevation={0} style={styles.stepsCard}>
                                {steps.map((text, idx) => (
                                    <View key={text} style={styles.stepRow}>
                                        <View style={styles.stepCircle}>
                                            <Text style={styles.stepNumber}>{idx + 1}</Text>
                                        </View>
                                        <Text style={styles.stepText}>{text}</Text>
                                    </View>
                                ))}
                            </Surface>
                        </View>

                        <Surface elevation={5} style={styles.formCard}>
                            <Text variant="titleLarge" style={styles.formTitle}>
                                Create your account
                            </Text>
                            <Text variant="bodyMedium" style={styles.formSubtitle}>
                                We just need a few details to get started
                            </Text>

                            <View style={styles.formFields}>
                                <AuthTextInput
                                    label="Full name"
                                    icon="account-outline"
                                    value={name}
                                    onChangeText={setName}
                                    placeholder="Your full name"
                                />
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
                                    placeholder="At least 8 characters"
                                />
                                <AuthTextInput
                                    label="Confirm password"
                                    icon="lock-check-outline"
                                    value={confirm}
                                    onChangeText={setConfirm}
                                    secureTextEntry
                                    placeholder="Repeat your password"
                                />
                                <Button
                                    mode="contained"
                                    onPress={onSubmit}
                                    disabled={isPending}
                                    style={styles.primaryButton}
                                    contentStyle={styles.buttonContent}
                                >
                                    {isPending ? "Creating profile..." : "Create account"}
                                </Button>
                                <Button
                                    mode="outlined"
                                    onPress={() => router.back()}
                                    style={styles.secondaryButton}
                                    contentStyle={styles.buttonContent}
                                >
                                    I already have an account
                                </Button>
                            </View>

                            <Text style={styles.helperText}>
                                We value authenticity. Add real photos to boost your match rate.
                            </Text>
                        </Surface>
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
    stepsCard: {
        marginTop: 16,
        backgroundColor: "rgba(255,255,255,0.15)",
        borderRadius: 24,
        padding: 16,
        width: "100%",
    },
    stepRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        marginBottom: 8,
    },
    stepCircle: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: "rgba(255,255,255,0.7)",
        alignItems: "center",
        justifyContent: "center",
    },
    stepNumber: {
        fontSize: 12,
        fontWeight: "700",
        color: "#FF5F99",
    },
    stepText: {
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
});
