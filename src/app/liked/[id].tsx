import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { ActivityIndicator, Chip, IconButton, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMemo } from "react";
import { useLikedPeople, usePerson } from "../../features/people/hooks";

const BACKGROUND = ["#FD7285", "#FE86A6", "#FF9BC2"] as const;

export default function LikedDetail() {
    const { id } = useLocalSearchParams<{ id?: string }>();
    const parsedId = typeof id === "string" ? Number.parseInt(id, 10) : NaN;
    const isValidId = Number.isInteger(parsedId) && parsedId > 0;

    const { data: likedData } = useLikedPeople();
    const fallbackPerson = useMemo(
        () => likedData?.find((person) => person.id === parsedId),
        [likedData, parsedId],
    );

    const { data, isLoading } = usePerson(isValidId ? parsedId : undefined);
    const person = data ?? fallbackPerson;

    const heroPhoto = person?.pictures?.[0];
    const additionalPhotos = person?.pictures?.slice(1) ?? [];

    return (
        <LinearGradient colors={BACKGROUND} style={styles.background}>
            <SafeAreaView style={styles.safeArea}>
                <ScrollView
                    contentContainerStyle={styles.content}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.toolbar}>
                        <IconButton
                            icon="arrow-left"
                            size={24}
                            mode="contained-tonal"
                            onPress={() => router.back()}
                        />
                    </View>

                    {!isValidId && (
                        <View style={styles.centered}>
                            <Text style={styles.errorTitle}>Profile not found</Text>
                            <Text style={styles.errorSubtitle}>
                                The link you followed looks incomplete. Try opening another liked profile.
                            </Text>
                        </View>
                    )}

                    {isValidId && isLoading && !person && (
                        <View style={styles.centered}>
                            <ActivityIndicator animating size="large" color="#FFFFFF" />
                            <Text style={styles.loaderText}>Loading profile details...</Text>
                        </View>
                    )}

                    {isValidId && !isLoading && !person && (
                        <View style={styles.centered}>
                            <Text style={styles.errorTitle}>We couldn't load this person</Text>
                            <Text style={styles.errorSubtitle}>
                                They might have unmatched or removed their profile. Check your liked list again.
                            </Text>
                        </View>
                    )}

                    {person && (
                        <View style={styles.detailsCard}>
                            <View style={styles.heroWrapper}>
                                {heroPhoto ? (
                                    <Image source={{ uri: heroPhoto }} style={styles.heroImage} />
                                ) : (
                                    <View style={styles.heroPlaceholder}>
                                        <Text style={styles.heroPlaceholderText}>No photo available</Text>
                                    </View>
                                )}
                            </View>

                            <View style={styles.header}>
                                <Text style={styles.name}>
                                    {person.name}
                                    <Text style={styles.age}>, {person.age}</Text>
                                </Text>

                                {!!person.location && (
                                    <Text style={styles.location}>{person.location}</Text>
                                )}

                                <View style={styles.badgeRow}>
                                    <Chip icon="heart" textStyle={styles.badgeText} style={styles.badge}>
                                        {person.likes_count} likes
                                    </Chip>
                                    <Chip
                                        icon="thumb-down-outline"
                                        textStyle={styles.badgeText}
                                        style={styles.badge}
                                    >
                                        {person.dislikes_count} passes
                                    </Chip>
                                </View>
                            </View>

                            {additionalPhotos.length > 0 && (
                                <View style={styles.gallery}>
                                    <Text style={styles.sectionTitle}>More photos</Text>
                                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                        {additionalPhotos.map((photo, index) => (
                                            <Image
                                                key={photo ?? `${index}`}
                                                source={{ uri: photo }}
                                                style={styles.galleryImage}
                                            />
                                        ))}
                                    </ScrollView>
                                </View>
                            )}

                            <View style={styles.about}>
                                <Text style={styles.sectionTitle}>About {person.name.split(" ")[0]}</Text>
                                <Text style={styles.aboutText}>
                                    {person.name} loves discovering new experiences, meeting fresh faces,
                                    and keeping good vibes flowing. Say hi and see where the conversation goes!
                                </Text>
                            </View>
                        </View>
                    )}
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
    content: {
        paddingHorizontal: 20,
        paddingBottom: 40,
        gap: 20,
    },
    toolbar: {
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    centered: {
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        paddingVertical: 48,
        paddingHorizontal: 16,
    },
    errorTitle: {
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: "700",
        textAlign: "center",
    },
    errorSubtitle: {
        color: "rgba(255,255,255,0.85)",
        textAlign: "center",
    },
    loaderText: {
        color: "rgba(255,255,255,0.9)",
    },
    detailsCard: {
        backgroundColor: "rgba(255,255,255,0.12)",
        borderRadius: 32,
        padding: 20,
        gap: 20,
    },
    heroWrapper: {
        borderRadius: 28,
        overflow: "hidden",
        aspectRatio: 3 / 4,
        backgroundColor: "rgba(255, 255, 255, 0.2)",
    },
    heroImage: {
        width: "100%",
        height: "100%",
    },
    heroPlaceholder: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    heroPlaceholderText: {
        color: "rgba(255,255,255,0.85)",
    },
    header: {
        gap: 8,
    },
    name: {
        color: "#FFFFFF",
        fontSize: 32,
        fontWeight: "700",
    },
    age: {
        fontSize: 28,
        fontWeight: "500",
        color: "rgba(255,255,255,0.85)",
    },
    location: {
        color: "rgba(255,255,255,0.85)",
    },
    badgeRow: {
        flexDirection: "row",
        gap: 12,
        marginTop: 4,
    },
    badge: {
        backgroundColor: "rgba(255,255,255,0.2)",
    },
    badgeText: {
        color: "#FFFFFF",
        fontWeight: "600",
    },
    gallery: {
        gap: 12,
    },
    sectionTitle: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "700",
    },
    galleryImage: {
        width: 140,
        height: 160,
        borderRadius: 20,
        marginRight: 12,
        backgroundColor: "rgba(255,255,255,0.2)",
    },
    about: {
        gap: 12,
    },
    aboutText: {
        color: "rgba(255,255,255,0.88)",
        fontSize: 15,
        lineHeight: 22,
    },
});
