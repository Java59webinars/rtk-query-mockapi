
import { useGetUsersQuery} from "../api/usersApi";

import UserItem from "./UserItem.tsx";
import UserForm from "./UserForm.tsx";
import {AnimatePresence, motion} from "framer-motion";

function UsersList() {
    // Используем хук, который мы экспортировали из `usersApi.ts`
    const { data: users, error, isLoading } = useGetUsersQuery();


    if (isLoading) return <p>Загрузка...</p>;
    if (error) return <p>Ошибка при загрузке данных</p>;

    // const generateAvatar = (name: string) => {
    //     return `https://robohash.org/${name}-${Date.now()}.png`;
    // };

    const listVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
        exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
    };

    return (
        <div>
            <h2>Список пользователей</h2>
            <motion.ul initial="hidden" animate="visible" exit="exit">
                <AnimatePresence>
                    {users?.map((user) => (
                        <motion.li key={user.id} variants={listVariants} exit="exit">
                            <UserItem user={user}/>
                        </motion.li>
                    ))}
                </AnimatePresence>
            </motion.ul>
            <UserForm/>
        </div>
    );
};

export default UsersList;