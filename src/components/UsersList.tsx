import { useState } from "react";
import { useGetUsersQuery } from "../api/usersApi";
import {User} from "../types/user.ts";
import UserItem from "./UserItem.tsx";
import UserForm from "./UserForm.tsx";

function UsersList() {
    // Используем хук, который мы экспортировали из `usersApi.ts`
    const { data: users, error, isLoading } = useGetUsersQuery();
    const [editingUser, setEditingUser] = useState<Partial<User> | undefined>(undefined);
    // const [name, setName] = useState("");
    // const [email, setEmail] = useState("");

    if (isLoading) return <p>Загрузка...</p>;
    if (error) return <p>Ошибка при загрузке данных</p>;

    // const generateAvatar = (name: string) => {
    //     return `https://robohash.org/${name}-${Date.now()}.png`;
    // };

    // const handleCreateUser = async () => {
    //
    // };

    return (
        <div>
            <h2>Список пользователей</h2>
            <ul>
                {users?.map((user) => (
                    <UserItem key={user.id} user={user} onDelete={() => {}} onEdit={setEditingUser} />
                ))}
            </ul>

            <h2>{editingUser ? "Редактировать пользователя" : "Добавить нового пользователя"}</h2>
            <UserForm onSubmit={() => {}} initialData={editingUser} />
        </div>
    );
};

export default UsersList;