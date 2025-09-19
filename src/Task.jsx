import { useState } from "react";
import Button from "./Button";
import Tooltip from "./Tooltip";
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
        <div className="mt-3">
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
                            className="bg-gray-300 ml-2 pl-1 rounded-sm w-3/4 text-xl"
                        />
                        <div className="flex gap-2">
                            <Tooltip text="Save">
                            <Button
                                text={<FontAwesomeIcon icon={faFloppyDisk} />}
                                onClick={handleSave}
                            />
                            </Tooltip>
                            {/* <Button
                                text={<FontAwesomeIcon icon={faFloppyDisk} />}
                                onClick={handleSave}
                            /> */}
                            <Tooltip text="Cancel">
                            <Button
                                text={<FontAwesomeIcon icon={faXmark} />}
                                onClick={handleCancel}
                                variant="delete"
                            />
                            </Tooltip>
                            {/* <Button
                                text={<FontAwesomeIcon icon={faXmark} />}
                                onClick={handleCancel}
                                variant="delete"
                            /> */}
                        </div>
                    </>
                ) : (
                    <>
                        <span
                            className={`text-xl ${task.completed ? "line-through" : ""} pl-2 pr-2`}
                        >
                            {task.text}
                        </span>
                        <span>
                            {task.completed && (
                                <Tooltip text="Delete">
                                    <Button
                                        text={<FontAwesomeIcon icon={faTrashCan} />}
                                        onClick={() => onDelete(task.id)}
                                        variant="delete"
                                    />
                                </Tooltip>
                            )}
                        </span>
                        <div className="flex gap-2">
                            {!task.completed && (
                                <>
                                    <Tooltip text="Edit">
                                        <Button
                                            text={<FontAwesomeIcon icon={faPenToSquare} />}
                                            onClick={handleEdit}
                                            variant="edit"
                                        />
                                    </Tooltip>
                                    <Tooltip text="Delete">
                                        <Button
                                            text={<FontAwesomeIcon icon={faTrashCan} />}
                                            onClick={() => onDelete(task.id)}
                                            variant="delete"
                                        />
                                    </Tooltip>
                                    <Tooltip text="Move Up" disabled={isFirst}>
                                        <Button
                                            text={<FontAwesomeIcon icon={faCircleUp} />}
                                            onClick={() => onMoveUp(task.id)}
                                            disabled={isFirst}
                                        />
                                    </Tooltip>
                                    <Tooltip text="Move Down" disabled={isLast}>
                                        <Button
                                            text={<FontAwesomeIcon icon={faCircleDown} />}
                                            onClick={() => onMoveDown(task.id)}
                                            disabled={isLast}
                                        />
                                    </Tooltip>
                                </>
                            )}
                        </div>
                    </>
                )}
            </li>
        </div>
    );
}

export default Task;
