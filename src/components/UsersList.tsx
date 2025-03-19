
import { useDeleteUserMutation, useGetUsersQuery, useUpdateUserMutation} from "../api/usersApi";
import {User} from "../types/user.ts";
import UserItem from "./UserItem.tsx";
import UserForm from "./UserForm.tsx";

function UsersList() {
    // Используем хук, который мы экспортировали из `usersApi.ts`
    const { data: users, error, isLoading } = useGetUsersQuery();
    const [deleteUser] = useDeleteUserMutation();
    const [updateUser] = useUpdateUserMutation();


    if (isLoading) return <p>Загрузка...</p>;
    if (error) return <p>Ошибка при загрузке данных</p>;

    // const generateAvatar = (name: string) => {
    //     return `https://robohash.org/${name}-${Date.now()}.png`;
    // };

    const handleDeleteUser = async (id: string) => {
        console.log("Удаление пользователя с id:", id);
        await deleteUser(id);
    };

    const handleEditUser = async (updatedUser: User) => {
        try {
            console.log("Обновление пользователя:", updatedUser);
            await updateUser(updatedUser).unwrap(); // Обновляем сервер
        } catch (error) {
            console.error("Ошибка обновления:", error);
        }
    };


    return (
        <div>
            <h2>Список пользователей</h2>
            <ul>
                {users?.map((user) => (
                    <UserItem key={user.id} user={user} onDelete={handleDeleteUser} onEdit={handleEditUser} />
                ))}
            </ul>
            <UserForm />
        </div>
    );
};

export default UsersList;