import Task from "./Task";

function List({ title, tasks, onUpdate, onDelete, onChecked, onMoveUp, onMoveDown }) {
        return (
        <div>
            <h3>{title}</h3>
            <ul>
                {tasks.map((task, index) => (
                    <Task
                        key={task.id}
                        task={task}
                        index={index}
                        isFirst={index === 0}
                        isLast={index === tasks.length - 1}
                        onUpdate={onUpdate}
                        onDelete={onDelete}
                        onChecked={onChecked}
                        onMoveUp={onMoveUp}
                        onMoveDown={onMoveDown}
                    />
                ))}
            </ul>
        </div>
    );
}

export default List;
