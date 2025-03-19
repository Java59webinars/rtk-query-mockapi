
import { User } from "../types/user";

interface UserItemProps {
    user: User;
    onDelete: (id: string) => void;
    onEdit: (user: User) => void;
}

const UserItem: React.FC<UserItemProps> = ({ user, onDelete, onEdit }) => {
    return (
        <li style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px", borderBottom: "1px solid #ddd" }}>
            {user.avatar && <img src={user.avatar} alt={user.name} width="50" height="50" style={{ borderRadius: "50%" }} />}
            <div style={{ flexGrow: 1 }}>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Gender:</strong> {user.gender}</p>
                <p><strong>Email:</strong> {user.email || "Нет email"}</p>
                {user.company && <p><strong>Company:</strong> {user.company}</p>}
            </div>
            <button onClick={() => onEdit(user)} title="Edit" style={{ cursor: "pointer" }}>✏️</button>
            <button onClick={() => onDelete(user.id)} title="Delete" style={{ cursor: "pointer" }}>🗑️</button>
        </li>
    );
};

export default UserItem;
