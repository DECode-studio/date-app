import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, View } from "react-native";
import { Person } from "../../features/people/types";

type Props = {
    person: Person;
};

const OVERLAY_COLORS = ["transparent", "rgba(0,0,0,0.15)", "rgba(0,0,0,0.6)"] as const;

export default function PersonCard({ person }: Props) {
    const photo = person.pictures?.[0];

    return (
        <View style={styles.container}>
            {photo ? (
                <Image source={{ uri: photo }} style={styles.image} resizeMode="cover" />
            ) : (
                <View style={styles.placeholder}>
                    <Ionicons name="person-circle-outline" size={80} color="#fff" />
                    <Text style={styles.placeholderText}>No photo available</Text>
                </View>
            )}

            <View style={styles.badgesRow}>
                <View style={styles.badge}>
                    <Ionicons name="flash" size={16} color="#FFB347" />
                    <Text style={styles.badgeText}>Trending</Text>
                </View>
                <View style={styles.badge}>
                    <Ionicons name="heart" size={16} color="#FF6B81" />
                    <Text style={styles.badgeText}>
                        {person.likes_count} likes
                    </Text>
                </View>
            </View>

            <LinearGradient
                colors={OVERLAY_COLORS}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.overlay}
            >
                <View>
                    <Text style={styles.name}>
                        {person.name}
                        <Text style={styles.age}>, {person.age}</Text>
                    </Text>

                    {!!person.location && (
                        <View style={styles.locationRow}>
                            <Ionicons name="location-sharp" size={16} color="#FFB347" />
                            <Text style={styles.location}>{person.location}</Text>
                        </View>
                    )}

                    <View style={styles.tagsRow}>
                        <View style={styles.tag}>
                            <Text style={styles.tagText}>Adventurous</Text>
                        </View>
                        <View style={styles.tag}>
                            <Text style={styles.tagText}>Foodie</Text>
                        </View>
                        <View style={styles.tag}>
                            <Text style={styles.tagText}>Live Music</Text>
                        </View>
                    </View>
                </View>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        aspectRatio: 3 / 4,
        borderRadius: 36,
        overflow: "hidden",
        backgroundColor: "#FFE8F2",
        shadowColor: "#FF9BD8",
        shadowOpacity: 0.25,
        shadowRadius: 20,
        shadowOffset: { width: 0, height: 12 },
        elevation: 12,
    },
    image: {
        width: "100%",
        height: "100%",
    },
    placeholder: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255, 255, 255, 0.6)",
    },
    placeholderText: {
        marginTop: 8,
        color: "rgba(255,255,255,0.7)",
    },
    badgesRow: {
        position: "absolute",
        top: 24,
        left: 24,
        right: 24,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    badge: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 999,
        backgroundColor: "rgba(255, 255, 255, 0.85)",
    },
    badgeText: {
        marginLeft: 6,
        color: "#7B4A68",
        fontWeight: "600",
        fontSize: 13,
    },
    overlay: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        paddingHorizontal: 24,
        paddingVertical: 28,
    },
    name: {
        fontSize: 32,
        fontWeight: "700",
        color: "#fff",
        marginBottom: 8,
    },
    age: {
        fontSize: 28,
        fontWeight: "500",
        color: "rgba(255,255,255,0.8)",
    },
    locationRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    location: {
        color: "#fff",
        fontSize: 15,
        marginLeft: 6,
    },
    tagsRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 12,
    },
    tag: {
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderRadius: 999,
        backgroundColor: "rgba(255, 255, 255, 0.85)",
        marginRight: 8,
        marginBottom: 8,
    },
    tagText: {
        color: "#7B4A68",
        fontWeight: "600",
        fontSize: 12,
        letterSpacing: 1,
        textTransform: "uppercase",
    },
});
