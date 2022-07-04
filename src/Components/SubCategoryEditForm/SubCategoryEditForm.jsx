import "./SubCategoryEditForm.scss"

import { useState, useEffect } from "react"

import Input from "../../Components/Input/Input"
import Select from "../../Components/Select/Select"

function SubCategoryEditForm ({
    category,
    name,
    setName,
    type,
    setType,
    categoryId,
    setCategoryId,
    onUpdate
}) {
    return (
        <div className="SubCategoryForm">
            <div className="SubCategoryForm-input">
                <Input
                    label="Sub Category"
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="SubCategoryForm-input">
                <Select
                    label="Type"
                    name="type"
                    defaultValue={type}
                    onChange={(e) => setType(e.target.value)}
                    options={[
                        {id: "men"},
                        {id: "women"},
                        {id: "kids"}
                    ]}
                />
            </div>
            <div className="SubCategoryForm-input">
                <Select
                    label="Category"
                    name="categoryId"
                    defaultValue={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    options={category}
                />
            </div>
            <div className="SubCategoryForm-buttons">
                <button onClick={onUpdate} className="submit-btn">Save</button>
            </div>
        </div>
    )
}


export default SubCategoryEditForm

