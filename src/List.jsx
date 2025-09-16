import Task from "./Task";

function List({ title, tasks, onUpdate, onDelete, onChecked, onMoveUp, onMoveDown }) {
    return (
        <div className="flex-1 bg-pink-300 p-6 rounded-2xl">
            <h3 className="font-semibold text-2xl tracking-wider">{title}</h3>
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
