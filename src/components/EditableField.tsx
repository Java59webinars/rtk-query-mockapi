import { useState } from "react";

interface EditableFieldProps {
    value: string;
    onChange: (newValue: string) => void;
}

const EditableField: React.FC<EditableFieldProps> = ({ value, onChange }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [tempValue, setTempValue] = useState(value);

    const handleBlur = () => {
        setIsEditing(false);
        onChange(tempValue); // Сохранение изменений
    };

    return isEditing ? (
        <input
            type="text"
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            onBlur={handleBlur}
            autoFocus
        />
    ) : (
        <span onClick={() => setIsEditing(true)} style={{ cursor: "pointer" }}>
            {value || "—"}
        </span>
    );
};

export default EditableField;
