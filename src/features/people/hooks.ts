import { useInfiniteQuery, useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { Person } from "./types";
import { api } from "../../lib/api";

export const usePeople = (perPage = 10) => {
    return useInfiniteQuery({
        queryKey: ["people", perPage],
        queryFn: ({ pageParam = 1 }) =>
            api
                .get<{ data: Person[] }>(`/api/people?per_page=${perPage}&page=${pageParam}`)
                .then(r => ({ data: r.data.data, nextPage: (r.data.data.length ? pageParam + 1 : null) })),
        getNextPageParam: (lastPage) => lastPage.nextPage,
        initialPageParam: 1,
    });
};

export const useLikedPeople = () =>
    useQuery({
        queryKey: ["people-liked"],
        queryFn: () => api.get<{ data: Person[] }>("/api/people/liked").then(r => r.data.data),
    });

export const useLike = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (personId: number) => api.post(`/api/people/${personId}/like`).then(r => r.data as Person),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["people"] });
            qc.invalidateQueries({ queryKey: ["people-liked"] });
        },
    });
};

export const useDislike = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (personId: number) => api.post(`/api/people/${personId}/dislike`).then(r => r.data as Person),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["people"] });
        },
    });
};
