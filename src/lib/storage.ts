import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "token";
let availabilityPromise: Promise<boolean> | null = null;

const ensureAvailability = async () => {
    try {
        if (!availabilityPromise) {
            availabilityPromise = SecureStore.isAvailableAsync();
        }
        return await availabilityPromise;
    } catch (error) {
        console.warn("[storage] SecureStore availability check failed:", error);
        return false;
    }
};

export const saveToken = async (token: string) => {
    if (!(await ensureAvailability())) return;
    await SecureStore.setItemAsync(TOKEN_KEY, token);
};

export const getToken = async () => {
    if (!(await ensureAvailability())) return null;
    return SecureStore.getItemAsync(TOKEN_KEY);
};

export const clearToken = async () => {
    if (!(await ensureAvailability())) return;
    await SecureStore.deleteItemAsync(TOKEN_KEY);
};
