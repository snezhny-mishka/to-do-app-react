import Button from "./Button";

function ListType( {title, tasks, onDelete, onChecked, showEdit, onEdit} ) {
    return (
        <div className="flex flex-col flex-1 bg-[#0F7173] m-8 p-6 rounded-xl min-w-[200px]">
            <h3>{title}</h3>
            <ol>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => onChecked(task.id)}
                        />
                        <span
                            className="task-text"
                            style={{ textDecoration: task.completed ? "line-through" : "none" }}
                        >
                            {task.text}
                        </span>
                        <Button 
                            text="Delete"
                            onClick={() => onDelete(task.id)}
                            variant="delete"
                        />
                        {showEdit ? (
                            <Button 
                                text="Edit"
                                onClick={() => onEdit(task.id)}
                                variant="edit"
                            />
                        ) : (
                            <Button 
                                text="Move to To Do"
                                onClick={() => onChecked(task.id)}
                            />
                        )}
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default ListType;
