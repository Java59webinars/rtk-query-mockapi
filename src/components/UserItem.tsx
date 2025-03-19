import { useState } from "react";
import { User } from "../types/user";
import { useDeleteUserMutation, useUpdateUserMutation } from "../api/usersApi";
import EditableField from "./EditableField";
import { motion } from "framer-motion";

const UserItem: React.FC<{ user: User }> = ({ user }) => {
    const [editedUser, setEditedUser] = useState<User>(user);
    const [isEditing, setIsEditing] = useState(false);
    const [updateUser] = useUpdateUserMutation();
    const [deleteUser] = useDeleteUserMutation();

    const handleFieldChange = (field: keyof User, newValue: string) => {
        setEditedUser((prev) => ({ ...prev, [field]: newValue }));
    };

    const handleSave = async () => {
        try {
            await updateUser(editedUser).unwrap();
            setIsEditing(false);
        } catch (error) {
            console.error("Ошибка при обновлении:", error);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteUser(user.id).unwrap();
        } catch (error) {
            console.error("Ошибка при удалении:", error);
        }
    };

    return (
        <motion.li
            initial={{opacity: 0, scale: 0.9}}
            animate={{opacity: 1, scale: 1, transition: {duration: 0.3}}}
            exit={{opacity: 0, scale: 0.9, transition: {duration: 0.3}}}
            layout // Анимация при изменении данных
            style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px",
                borderBottom: "1px solid #ddd"
            }}
        >
            {user.avatar &&
                <img src={user.avatar} alt={user.name} width="50" height="50" style={{borderRadius: "50%"}}/>}

            <div style={{flexGrow: 1}}>
                <p><strong>Name:</strong> {isEditing ? <EditableField value={editedUser.name}
                                                                      onChange={(val) => handleFieldChange("name", val)}/> : user.name}
                </p>
                <p><strong>Gender:</strong> {isEditing ? <EditableField value={editedUser.gender}
                                                                        onChange={(val) => handleFieldChange("gender", val)}/> : user.gender}
                </p>
                <p><strong>Email:</strong> {isEditing ? <EditableField value={editedUser.email || ""}
                                                                       onChange={(val) => handleFieldChange("email", val)}/> : user.email || "Нет email"}
                </p>
                <p><strong>Company:</strong> {isEditing ? <EditableField value={editedUser.company || ""}
                                                                         onChange={(val) => handleFieldChange("company", val)}/> : user.company || "—"}
                </p>
            </div>

            {isEditing ? (
                <>
                    <button onClick={handleSave} title="Save" style={{cursor: "pointer"}}>✅</button>
                    <button onClick={() => setIsEditing(false)} title="Cancel" style={{cursor: "pointer"}}>❌</button>
                </>
            ) : (
                <button onClick={() => setIsEditing(true)} title="Edit" style={{cursor: "pointer"}}>✏️</button>
            )}

            <button onClick={handleDelete} title="Delete" style={{cursor: "pointer"}}>🗑️</button>
        </motion.li>
    );
};

export default UserItem;
