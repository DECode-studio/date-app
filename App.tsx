import "react-native-gesture-handler";
import "react-native-reanimated";
import { ExpoRoot } from "expo-router";

// Bootstraps Expo Router using route files stored under src/app.
export default function App() {
  const context = (require as any).context("./src/app");
  return <ExpoRoot context={context} />;
}
