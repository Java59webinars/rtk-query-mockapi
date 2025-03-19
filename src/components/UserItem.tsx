import { useState } from "react";
import { User } from "../types/user";
import EditableField from "./EditableField";

interface UserItemProps {
    user: User;
    onDelete: (id: string) => void;
    onEdit: (user: User) => void;
}

const UserItem: React.FC<UserItemProps> = ({ user, onDelete, onEdit }) => {
    const [editedUser, setEditedUser] = useState<User>(user);
    const [isEditing, setIsEditing] = useState(false);

    const handleFieldChange = (field: keyof User, newValue: string) => {
        setEditedUser((prev) => ({ ...prev, [field]: newValue }));
    };

    const handleSave = () => {
        onEdit(editedUser); // Сохраняем изменения
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedUser(user); // Отменяем изменения
        setIsEditing(false);
    };

    return (
        <li style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px", borderBottom: "1px solid #ddd" }}>
            {user.avatar && <img src={user.avatar} alt={user.name} width="50" height="50" style={{ borderRadius: "50%" }} />}

            <div style={{ flexGrow: 1 }}>
                <p><strong>Name:</strong> {isEditing ? <EditableField value={editedUser.name} onChange={(val) => handleFieldChange("name", val)} /> : user.name}</p>
                <p><strong>Gender:</strong> {isEditing ? <EditableField value={editedUser.gender} onChange={(val) => handleFieldChange("gender", val)} /> : user.gender}</p>
                <p><strong>Email:</strong> {isEditing ? <EditableField value={editedUser.email || ""} onChange={(val) => handleFieldChange("email", val)} /> : user.email || "Нет email"}</p>
                <p><strong>Company:</strong> {isEditing ? <EditableField value={editedUser.company || ""} onChange={(val) => handleFieldChange("company", val)} /> : user.company || "—"}</p>
            </div>

            {isEditing ? (
                <>
                    <button onClick={handleSave} title="Save" style={{ cursor: "pointer" }}>✅</button>
                    <button onClick={handleCancel} title="Cancel" style={{ cursor: "pointer" }}>❌</button>
                </>
            ) : (
                <button onClick={() => setIsEditing(true)} title="Edit" style={{ cursor: "pointer" }}>✏️</button>
            )}

            <button onClick={() => onDelete(user.id)} title="Delete" style={{ cursor: "pointer" }}>🗑️</button>
        </li>
    );
};

export default UserItem;
