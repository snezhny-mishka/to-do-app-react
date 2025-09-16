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
                    className="w-4 h-4"
                />
                {isEditing ? (
                    <>
                        <input
                            value={draft}
                            onChange={(e) => setDraft(e.target.value)}
                            className="bg-gray-300 w-3/4 text-xl"
                        />
                        <div className="flex gap-2">
                            <Button
                                text={<FontAwesomeIcon icon={faFloppyDisk} />}
                                onClick={handleSave}
                            />
                            <Button
                                text={<FontAwesomeIcon icon={faXmark} />}
                                onClick={handleCancel}
                                variant="delete"
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <span className={`text-xl ${task.completed ? "line-through" : ""}`}>
                            {task.text}
                        </span>
                        <div>
                            {task.completed && (
                                <Button
                                    text={<FontAwesomeIcon icon={faTrashCan} />}
                                    onClick={() => onDelete(task.id)}
                                    variant="delete"
                                />
                            )}
                            {!task.completed && (
                                <div className="flex gap-2">
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
                                </div>
                            )}
                        </div>
                    </>
                )}
                {/* ) : task.completed ? (
                    <>
                        <span style={{ textDecoration: "line-through" }} className="text-xl">
                            {task.text}
                        </span>
                        <Button
                            text={<FontAwesomeIcon icon={faTrashCan} />}
                            onClick={() => onDelete(task.id)}
                            variant="delete"
                        />
                    </>
                ) : (
                    <>
                        <span className="text-xl">{task.text}</span>
                        <div className="flex gap-2">
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
                        </div>
                    </>
                )} */}
            </li>
        </div>
    );
}

export default Task;
