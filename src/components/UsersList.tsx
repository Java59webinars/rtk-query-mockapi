
import { useGetUsersQuery} from "../api/usersApi";

import UserItem from "./UserItem.tsx";
import UserForm from "./UserForm.tsx";

function UsersList() {
    // Используем хук, который мы экспортировали из `usersApi.ts`
    const { data: users, error, isLoading } = useGetUsersQuery();


    if (isLoading) return <p>Загрузка...</p>;
    if (error) return <p>Ошибка при загрузке данных</p>;

    // const generateAvatar = (name: string) => {
    //     return `https://robohash.org/${name}-${Date.now()}.png`;
    // };


    return (
        <div>
            <h2>Список пользователей</h2>
            <ul>
                {users?.map((user) => (
                    <UserItem key={user.id} user={user} />
                ))}
            </ul>
            <UserForm />
        </div>
    );
};

export default UsersList;