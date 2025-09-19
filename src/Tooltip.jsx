function Tooltip({ text, disabled = false, children }) {
    if (disabled) return children;
    return (
        <div className="group inline-block relative">
            {children}
            <span className="bottom-full left-1/2 absolute bg-gray-500 opacity-0 group-hover:opacity-100 mb-2 px-1 rounded-sm text-white whitespace-nowrap delay-400">
                {text}
            </span>
        </div>
    );
}

export default Tooltip;
