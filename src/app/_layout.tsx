import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider, MD3LightTheme } from "react-native-paper";
import "react-native-reanimated";

const client = new QueryClient();

const theme = {
    ...MD3LightTheme,
    colors: {
        ...MD3LightTheme.colors,
        primary: "#6750A4",
        secondary: "#7D5260",
        background: "#FAF6FF",
        surface: "#FFFFFF",
    },
};

export default function RootLayout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <PaperProvider theme={theme}>
                <QueryClientProvider client={client}>
                    <Stack
                        screenOptions={{
                            headerShown: false,
                            autoHideHomeIndicator: false,
                            keyboardHandlingEnabled: false,
                        }}
                    />
                </QueryClientProvider>
            </PaperProvider>
        </GestureHandlerRootView>
    );
}
