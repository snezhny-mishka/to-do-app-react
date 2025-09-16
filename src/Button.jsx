import clsx from "clsx";

const baseStyles = "p-2 m-1 rounded-sm font-semibold active:outline-2 active:outline-offset-2";

const variants = {
    default: "bg-blue-300 hover:bg-blue-400 active:outline-blue-400",
    delete: "bg-red-300 hover:bg-red-400 active:outline-red-400",
    edit: "bg-yellow-200 hover:bg-yellow-300 active:outline-yellow-400",
    disabled: "bg-gray-300 text-gray-600 cursor-not-allowed",
};

function Button({ text, onClick, type = "button", variant = "default", disabled = false }) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={clsx(baseStyles, disabled ? variants.disabled : variants[variant])}
        >
            {text}
        </button>
    );
}

export default Button;
