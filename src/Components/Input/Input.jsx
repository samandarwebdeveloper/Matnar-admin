import "./Input.scss"

function Input ({
    type,
    name,
    label,
    placeholder,
    value,
    onChange,
    onKeyDown
}) {
    return (
        <div className="Input">
            <label htmlFor={name}>{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                onKeyDown={onKeyDown}
                spellCheck="false"
            />
        </div>
    )
}


export default Input