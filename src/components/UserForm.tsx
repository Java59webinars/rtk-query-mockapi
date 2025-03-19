import { useState } from "react";
import { useCreateUserMutation } from "../api/usersApi";
import { User } from "../types/user";
import { motion } from "framer-motion";

const UserForm: React.FC = () => {
    const [formData, setFormData] = useState<Partial<User>>({
        name: "",
        email: "",
        gender: "",
        company: "",
    });

    const [createUser, { isLoading }] = useCreateUserMutation();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createUser({ ...formData, avatar: `https://robohash.org/${formData.name}.png` }).unwrap();
            setFormData({ name: "", email: "", gender: "", company: "" }); // Очистка формы
        } catch (error) {
            console.error("Ошибка при создании пользователя:", error);
        }
    };

    return (
        <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.3 } }}
            exit={{ opacity: 0, y: -10, transition: { duration: 0.3 } }}
            style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "300px" }}
        >
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Имя" required />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
            <input type="text" name="gender" value={formData.gender} onChange={handleChange} placeholder="Пол" />
            <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Компания" />
            <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                {isLoading ? "Создание..." : "Добавить пользователя"}
            </motion.button>
        </motion.form>
    );
};

export default UserForm;
