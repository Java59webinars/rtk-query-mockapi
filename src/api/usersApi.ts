import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../types/user";

// Создаём API
export const usersApi = createApi({
    reducerPath: "usersApi", // Уникальное имя редьюсера в Redux store
    baseQuery: fetchBaseQuery({ baseUrl: "https://67d17222825945773eb4598b.mockapi.io/api/users" }),
    tagTypes: ["Users"], // Определяем теги для автоматического обновления данных
    endpoints: (builder) => ({
        getUsers: builder.query<User[], void>({
            query: () => "java-59", // URL-эндпоинт
            providesTags: ["Users"], // Полученные данные помечаются тегом
        }),
        createUser: builder.mutation<User, Partial<User>>({
            query: (user) => ({
                url: "/java-59",
                method: "POST",
                body: user,
            }),
            invalidatesTags: ["Users"],
        }),
        updateUser: builder.mutation<User, Partial<User> & { id: string }>({
            query: ({ id, ...patch }) => ({
                url: `/java-59/${id}`,
                method: "PUT",
                body: patch,
            }),
            invalidatesTags: ["Users"],
        }),
        deleteUser: builder.mutation<void, string>({
            query: (id) => ({
                url: `/java-59/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Users"],
        }),
    }),
});

export const { useGetUsersQuery, useCreateUserMutation, useUpdateUserMutation, useDeleteUserMutation } = usersApi;