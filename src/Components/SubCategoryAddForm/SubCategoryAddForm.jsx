import "./SubCategoryAddForm.scss"

import Input from "../Input/Input"
import Select from "../Select/Select"


function SubCategoryAddForm ({
    category,
    setName,
    setType,
    setCategoryId,
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
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="SubCategoryAddForm__input">
                    <Select
                        name="category"
                        label="Category"
                        onChange={(e) => setCategoryId(e.target.value)}
                        options={category}
                        defaultValue={0}
                    />
                </div>
                <div className="SubCategoryAddForm__input">
                    <Select
                        name="type"
                        label="Type"
                        onChange={(e) => setType(e.target.value)}
                        options={[
                            { id: "men"},
                            { id: "women"},
                            { id: "kids"},
                        ]}
                        defaultValue={0}
                    />
                </div>
                <div className="SubCategoryAddForm__input">
                    <button onClick={onSubmit} className="submit-btn">Add</button>
                </div>
            </div>
        </div>
    )
}



export default SubCategoryAddForm