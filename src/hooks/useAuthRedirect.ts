import { useEffect, useState } from "react";
import { router } from "expo-router";
import type { Href } from "expo-router";
import { getToken } from "../lib/storage";

export function useAuthRedirect(delayMs = 3000) {
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        let mounted = true;
        let timeoutId: ReturnType<typeof setTimeout> | null = null;

        const redirectAfterDelay = (path: Href) => {
            timeoutId = setTimeout(() => {
                if (!mounted) return;
                setIsChecking(false);
                router.replace(path);
            }, delayMs);
        };

        const checkAuth = async () => {
            try {
                const token = await getToken();
                if (!mounted) return;

                if (token) {
                    redirectAfterDelay("/(main)/home");
                } else {
                    redirectAfterDelay("/(auth)/sign-in");
                }
            } catch {
                if (!mounted) return;
                redirectAfterDelay("/(auth)/sign-in");
            }
        };

        checkAuth();

        return () => {
            mounted = false;
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [delayMs]);

    return { isChecking };
}
