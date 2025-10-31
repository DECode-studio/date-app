type BaseJwtPayload = {
    exp?: number;
    [key: string]: unknown;
};

type BufferCtor = {
    from(input: string, encoding: "base64"): {
        toString(encoding: "binary" | "utf8"): string;
    };
};

const decodeBase64Url = (segment: string) => {
    const normalized = segment.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");

    if (typeof globalThis.atob === "function") {
        return globalThis.atob(padded);
    }

    try {
        const bufferCtor = (globalThis as { Buffer?: BufferCtor }).Buffer;
        if (bufferCtor) {
            return bufferCtor.from(padded, "base64").toString("binary");
        }
        throw new Error("Buffer.from not available in global scope");
    } catch (error) {
        throw new Error(`Unable to decode base64 segment: ${(error as Error).message}`);
    }
};

const parsePayload = <T extends BaseJwtPayload>(token: string): T | null => {
    const parts = token.split(".");
    if (parts.length < 2) return null;

    try {
        const payloadSegment = parts[1];
        const decoded = decodeBase64Url(payloadSegment);
        return JSON.parse(decoded) as T;
    } catch (error) {
        console.warn("[jwt] Failed to parse token payload:", error);
        return null;
    }
};

export const isJwtExpired = <T extends BaseJwtPayload>(
    token: string | null | undefined,
    clockSkewSeconds = 0,
): boolean => {
    if (!token) return true;

    const payload = parsePayload<T>(token);
    if (!payload || typeof payload.exp !== "number") return true;

    const nowInSeconds = Math.floor(Date.now() / 1000);
    return payload.exp <= nowInSeconds + Math.max(clockSkewSeconds, 0);
};

export const getJwtPayload = <T extends BaseJwtPayload>(token: string | null | undefined) => {
    if (!token) return null;
    return parsePayload<T>(token);
};
