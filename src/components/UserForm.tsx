import React, { useState, useEffect } from "react";
import { User } from "../types/user";

interface UserFormProps {
    onSubmit: (user: Partial<User>) => void;
    initialData?: Partial<User>;
}

const UserForm = ({ onSubmit, initialData }: UserFormProps) => {
    const [name, setName] = useState(initialData?.name || "");
    const [email, setEmail] = useState(initialData?.email || "");

    useEffect(() => {
        setName(initialData?.name || "");
        setEmail(initialData?.email || "");
    }, [initialData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;

        onSubmit({ name, email });
        setName("");
        setEmail("");
    };

    return (
        <form onSubmit={handleSubmit}>
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
            <button type="submit">{initialData ? "Сохранить" : "Добавить"}</button>
        </form>
    );
};

export default UserForm;
