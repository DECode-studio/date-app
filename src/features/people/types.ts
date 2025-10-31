export type Person = {
    id: number;
    name: string;
    age: number;
    pictures: string[];
    location?: string | null;
    likes_count: number;
    dislikes_count: number;
    reaction?: "like" | "dislike" | null;
};
