import "./SubCategory.scss"

import { useEffect, useState } from "react"

import AddWrapper from "../AddWrapper/AddWrapper"
import Alert from "../Alert/Alert"
import Input from "../Input/Input"
import Select from "../Select/Select"
import SubCategoryAddForm from "../SubCategoryAddForm/SubCategoryAddForm"
import SubCategoryEditForm from "../SubCategoryEditForm/SubCategoryEditForm"
import EditWrapper from "../EditWrapper/EditWrapper"

function SubCategory() {
    const [alert, setAlert] = useState(false)
    const [alertType, setAlertType] = useState("")
    const [alertMessage, setAlertMessage] = useState("")
    const [subCategory, setSubCategory] = useState([])
    const [subCategoryById, setSubCategoryById] = useState([])
    const [category, setCategory] = useState([])
    const [addOpen, setAddOpen] = useState(false)
    const [editOpen, setEditOpen] = useState(false)


    const alertSuccess = () => {
        setAlert(true)
        setAlertType("success")
        setAlertMessage("Category added successfully")
        setTimeout(() => {
            setAlert(false)
        }, 3000)
    }

    const alertError = () => {
        setAlert(true)
        setAlertType("error")
        setAlertMessage("Category already exists")
        setTimeout(() => {
            setAlert(false)
        }, 3000)
    }

    const alertDanger = () => {
        setAlert(true)
        setAlertType("danger")
        setAlertMessage("Category deleted successfully")
        setTimeout(() => {
            setAlert(false)
        }, 3000)
    }

    const fetchSubcategory = async () => {
        const response = await fetch("http://localhost:9000/api/subcategory", {mode: "cors"})
        const data = await response.json()
        setSubCategory(data)
    }

    const fetchSubcategoryById = async (id) => {
        const response = await fetch(`http://localhost:9000/api/subcategory/${id}`, {mode: "cors"})
        const data = await response.json()
        setSubCategoryById(data)
    }

    const fetchCategory = async () => {
        const response = await fetch("http://localhost:9000/api/category", {mode: "cors"})
        const data = await response.json()
        setCategory(data)
    }

    const handleDelete = async (e) => {
        const response = await fetch(`http://localhost:9000/api/subcategory/${e.currentTarget.id}`, {
            mode: "cors",
            method: "DELETE"
        }).then((res) => {
            if(res.status === 200) {
                alertDanger()
                fetchSubcategory()
            }
        })
    }


    useEffect(() => {
        fetchSubcategory()
        fetchSubcategoryById()
        fetchCategory()
    }, [])

    
    const handleAddOpen = () => {
        setAddOpen(true)
    }

    const handleEditOpen = (e) => {
        const id = e.currentTarget.id
        fetchSubcategoryById(id)
        setEditOpen(true)
    }

    return (
        <div className="SubCategory">
            <div className="SubCategory-header">
                <h2>Sub Category</h2>
                <button onClick={handleAddOpen} className="add-btn"><i className="fa-solid fa-plus"></i></button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {subCategory && subCategory.map((item, i) => {
                        return (
                            <tr key={i}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.type}</td>
                                <td>{category.find(cat => cat.id === item.categoryId) ? category.find(cat => cat.id === item.categoryId).name : ""}</td>
                                <td><button id={item.id} onClick={handleEditOpen} className="update-btn"><i className="fa-solid fa-pen"></i></button><button id={item.id} onClick={handleDelete} className="delete-btn"><i className="fa-solid fa-trash-can"></i></button></td>
                            </tr>
                        )
                    }
                    )}
                </tbody>
            </table>
            <AddWrapper children={<SubCategoryAddForm/>} addOpen={addOpen} setAddOpen={setAddOpen} />
            <EditWrapper children={<SubCategoryEditForm subCategoryById={subCategoryById} subCategory={subCategory} category={category} />} editOpen={editOpen} setEditOpen={setEditOpen} />
            {alert && <Alert setAlert={setAlert} alertType={alertType} alertMessage={alertMessage} />}
        </div>
    )
}


export default SubCategory