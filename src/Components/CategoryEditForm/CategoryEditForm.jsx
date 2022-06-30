import "./CategoryEditForm.scss"

import Input from "../Input/Input"

function CategoryEditForm ({
    updateName,
    onUpdate,
    setUpdateName
}) {


    return (
        <div className="CategoryEditForm">
            <div className="CategoryEditForm__content">
                <Input
                    type="text"
                    name="name"
                    label="Name"
                    value={updateName}
                    onChange={(e) => setUpdateName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && onUpdate()}
                />
                </div>
            <div className="CategoryEditForm__buttons">
                <button onClick={onUpdate} className="submit-btn">Save</button>
            </div>
        </div>
    )
}


export default CategoryEditForm