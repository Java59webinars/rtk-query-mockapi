import { useState } from "react";
import { useGetUsersQuery } from "../api/usersApi";

function UsersList() {
    // Используем хук, который мы экспортировали из `usersApi.ts`
    const { data: users, error, isLoading } = useGetUsersQuery();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    if (isLoading) return <p>Загрузка...</p>;
    if (error) return <p>Ошибка при загрузке данных</p>;

    const generateAvatar = (name: string) => {
        return `https://robohash.org/${name}-${Date.now()}.png`;
    };

    const handleCreateUser = async () => {

    };

    return (
        <div>
            <h2>Список пользователей</h2>
            <ul>
                {users?.map((user) => (
                    <li key={user.id}>
                        <img src={user.avatar} alt={user.name} width="50"/>
                        <span>{user.name} - {user.email || "Нет email"}</span>
                    </li>
                ))}
            </ul>

            <h2>Добавить нового пользователя</h2>
            <input
                type="text"
                placeholder="Имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleCreateUser}>Добавить</button>
        </div>

    );
};
export default UsersList;