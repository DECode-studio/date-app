import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";

const TAB_BAR_STYLE = {
    position: "absolute" as const,
    left: 16,
    right: 16,
    bottom: 16,
    borderRadius: 28,
    height: 68,
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    borderWidth: 0,
    elevation: 0,
};

export default function MainLayout() {
    const scheme = useColorScheme();
    const isDark = (scheme === "dark");

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "#FF5F9E",
                tabBarInactiveTintColor: "#94708A",
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: "600",
                },
                tabBarStyle: {
                    ...TAB_BAR_STYLE,
                    backgroundColor: isDark ? "rgba(32, 9, 33, 0.92)" : "rgba(255, 255, 255, 0.88)",
                },
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: "Discover",
                    tabBarIcon: ({ color, size }: { color: string; size: number }) => (
                        <Ionicons name="flame" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color, size }: { color: string; size: number }) => (
                        <Ionicons name="person-circle" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="liked"
                options={{
                    href: null,
                }}
            />
        </Tabs>
    );
}
