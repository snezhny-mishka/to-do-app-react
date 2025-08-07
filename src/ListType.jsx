import Button from "./Button";

function ListType( {title, tasks, onDelete, onChecked, showEdit, onEdit} ) {
    return (
        <div className="inner-list">
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
                        {/* <button onClick={() => onDelete(task.id)}>Delete</button> */}
                        <Button 
                            text="Delete"
                            onClick={() => onDelete(task.id)}
                            variant="delete"
                        />
                        {showEdit ? (
                            // <button onClick={() => onEdit(task.id)}>Edit</button>
                            <Button 
                                text="Edit"
                                onClick={() => onEdit(task.id)}
                                variant="edit"
                            />
                        ) : (
                            // <button onClick={() => onChecked(task.id)}>
                            //     Move to to-do's
                            // </button>
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
