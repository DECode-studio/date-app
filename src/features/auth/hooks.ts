import { useMutation, useQuery } from "@tanstack/react-query";
import { LoginReq, RegisterReq, AuthResp } from "./types";
import { useAuth } from "../../store/auth.store";
import { api } from "../../lib/api";

export const useLogin = () => {
    const setAuth = useAuth((s) => s.setAuth);
    return useMutation({
        mutationFn: (body: LoginReq) =>
            api.post<AuthResp>("/api/auth/login", body).then(r => r.data),
        onSuccess: (d) => setAuth(d.token, d.user),
    });
};

export const useRegister = () => {
    const setAuth = useAuth((s) => s.setAuth);
    return useMutation({
        mutationFn: (body: RegisterReq) =>
            api.post<AuthResp>("/api/auth/register", body).then(r => r.data),
        onSuccess: (d) => setAuth(d.token, d.user),
    });
};

export const useMe = () => {
    return useQuery({
        queryKey: ["me"],
        queryFn: () => api.get("/api/auth/me").then(r => r.data),
    });
};
