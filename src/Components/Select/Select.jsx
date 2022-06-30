import "./Selects.scss"

function Select ({
    name,
    label,
    value,
    options
}) {
    return (
        <div className="Select">
            <label htmlFor={name}>{label}</label>
            <select
                name={name}
                defaultValue={value}
            >
                {options && options.map((data, i) => (
                    <option key={i} value={data.id}>
                        {data.name ? data.name : data.id}
                    </option>
                ))}
            </select>
        </div>
    )
}


export default Select