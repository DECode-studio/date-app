export type LoginReq = { email: string; password: string };
export type RegisterReq = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};
export type AuthResp = {
    token: string;
    token_type: string;
    expires_in: number;
    user: { id: number; name: string; email: string };
};
