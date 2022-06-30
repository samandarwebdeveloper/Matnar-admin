import "./SubCategoryEditForm.scss"

import { useState, useEffect } from "react"

import Input from "../../Components/Input/Input"
import Select from "../../Components/Select/Select"

function SubCategoryEditForm ({
    category,
    subCategory,
    subCategoryById,
    onChange,
    onSubmit,
    onCancel,
    error,
    loading
}) {

    const [subCategoryName, setSubCategoryName] = useState("")
    const [subCategoryCategory, setSubCategoryCategory] = useState("")
    const [subCategoryId, setSubCategoryId] = useState("")

    useEffect(() => {
        if (subCategoryById) {
            setSubCategoryName(subCategoryById.name)
            setSubCategoryCategory(subCategoryById.categoryId)
            setSubCategoryId(subCategory
                ? subCategory.id
                : subCategoryById.id)
        }
    }, [subCategoryById])

    const handleChange = (e) => {
        const { name, value } = e.target
        if (name === "subCategoryName") {
            setSubCategoryName(value)
        } else if (name === "subCategoryCategory") {
            setSubCategoryCategory(value)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit({
            name: subCategoryName,
            categoryId: subCategoryCategory,
            id: subCategoryId
        })
    }



    return (
        <div className="SubCategoryForm">
            <form onSubmit={handleSubmit}>
                <div className="SubCategoryForm-input">
                    <Input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={subCategoryById.name}
                    />
                </div>
                <div className="SubCategoryForm-input">
                    <Input
                        type="text"
                        name="type"
                        placeholder="Type"
                        value={subCategoryById.type}
                    />
                </div>
                <div className="SubCategoryForm-input">
                    <Select
                        name="categoryId"
                        placeholder="Category"
                        value={subCategoryById.categoryId}
                        data={category}
                    />
                </div>
                <div className="SubCategoryForm-buttons">
                    <button className="save-btn" type="submit">Save</button>
                    <button className="cancel-btn" type="button" onClick={onCancel}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}


export default SubCategoryEditForm

