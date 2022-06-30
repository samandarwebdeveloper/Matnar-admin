import "./SubCategoryAddForm.scss"

import Input from "../Input/Input"
import Select from "../Select/Select"


function SubCategoryAddForm ({
    subCategoryName,
    onChange,
    onSubmit
}) {
    return (
        <div className="SubCategoryAddForm">
            <div className="SubCategoryAddForm__content">
                <div className="SubCategoryAddForm__input">
                    <Input
                        type="text"
                        name="name"
                        label="Sub Category"
                        placeholder="Sub Category Name"
                        value={subCategoryName}
                        onChange={(e) => onChange(e.target.value)}
                    />
                </div>
                <div className="SubCategoryAddForm__input">
                    <Select
                        name="category"
                        label="Category"
                        onChange={(e) => onChange(e.target.value)}
                    />
                </div>
                <div className="SubCategoryAddForm__input">
                    <button className="submit-btn">Add</button>
                </div>
            </div>
        </div>
    )
}



export default SubCategoryAddForm