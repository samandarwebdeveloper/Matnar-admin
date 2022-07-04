import "./Selects.scss"

function Select ({
    name,
    label,
    onChange,
    options,
    defaultValue
}) {
    return (
        <div className="Select">
            <label htmlFor={name}>{label}</label>
            <select
                name={name}
                onChange={onChange}
                defaultValue={defaultValue}
            >
                <option value="0" disabled hidden>Select</option>
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