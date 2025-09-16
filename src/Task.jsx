import { useState } from "react";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleUp,
    faCircleDown,
    faTrashCan,
    faPenToSquare,
    faXmark,
    faFloppyDisk,
} from "@fortawesome/free-solid-svg-icons";

function Task({ task, isFirst, isLast, onUpdate, onDelete, onChecked, onMoveUp, onMoveDown }) {
    const [isEditing, setIsEditing] = useState(false);
    const [draft, setDraft] = useState("");

    function handleEdit() {
        setDraft(task.text);
        setIsEditing(true);
    }

    function handleSave() {
        onUpdate(task.id, draft);
        setIsEditing(false);
    }

    function handleCancel() {
        setDraft(task.text);
        setIsEditing(false);
    }

    return (
        <div>
            <li>
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => onChecked(task.id)}
                />
                {isEditing ? (
                    <>
                        <input value={draft} onChange={(e) => setDraft(e.target.value)}></input>
                        <Button
                            text={<FontAwesomeIcon icon={faFloppyDisk} />}
                            onClick={handleSave}
                        />
                        <Button
                            text={<FontAwesomeIcon icon={faXmark} />}
                            onClick={handleCancel}
                            variant="delete"
                        />
                    </>
                ) : task.completed ? (
                    <>
                        <span style={{ textDecoration: "line-through" }}>{task.text}</span>
                        <Button
                            text={<FontAwesomeIcon icon={faTrashCan} />}
                            onClick={() => onDelete(task.id)}
                            variant="delete"
                        />
                    </>
                ) : (
                    <>
                        <span>{task.text}</span>
                        <Button
                            text={<FontAwesomeIcon icon={faPenToSquare} />}
                            onClick={handleEdit}
                            variant="edit"
                        />
                        <Button
                            text={<FontAwesomeIcon icon={faTrashCan} />}
                            onClick={() => onDelete(task.id)}
                            variant="delete"
                        />
                        <Button
                            text={<FontAwesomeIcon icon={faCircleUp} />}
                            onClick={() => onMoveUp(task.id)}
                            disabled={isFirst}
                        />
                        <Button
                            text={<FontAwesomeIcon icon={faCircleDown} />}
                            onClick={() => onMoveDown(task.id)}
                            disabled={isLast}
                        />
                    </>
                )}
            </li>
        </div>
    );
}

export default Task;