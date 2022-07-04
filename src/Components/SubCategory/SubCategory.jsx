import "./SubCategory.scss"

import { useEffect, useState } from "react"

import AddWrapper from "../AddWrapper/AddWrapper"
import Alert from "../Alert/Alert"
import SubCategoryAddForm from "../SubCategoryAddForm/SubCategoryAddForm"
import SubCategoryEditForm from "../SubCategoryEditForm/SubCategoryEditForm"
import EditWrapper from "../EditWrapper/EditWrapper"

function SubCategory() {
    const [alert, setAlert] = useState(false)
    const [alertType, setAlertType] = useState("")
    const [alertMessage, setAlertMessage] = useState("")
    const [subCategory, setSubCategory] = useState([])
    const [category, setCategory] = useState([])
    const [addOpen, setAddOpen] = useState(false)
    const [editOpen, setEditOpen] = useState(false)
    const [name, setName] = useState("")
    const [categoryId, setCategoryId] = useState("")
    const [type, setType] = useState("")
    const [id, setId] = useState("")


    const alertStatus = (stype, string) => {
        setAlert(true)
        setAlertType(stype)
        setAlertMessage(string)
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
        setId(data.id)
        setName(data.name)
        setCategoryId(data.categoryId)
        setType(data.type)
    }

    const fetchCategory = async () => {
        const response = await fetch("http://localhost:9000/api/category", {mode: "cors"})
        const data = await response.json()
        setCategory(data)
    }

    const onSubmit = async () => {
        if(name === "") {
            alertStatus("error", "Category name cannot be empty")
            return
        }
        const response = await fetch("http://localhost:9000/api/subcategory", {
            mode: "cors",
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                type: type,
                categoryId: categoryId
            })
        }).then((res) => {
            if(res.status === 201) {
                alertStatus("success", "SubCategory added successfully")
                setName("")
                setAddOpen(false)
                fetchSubcategory()
            } else if (res.status === 409) {
                alertStatus("error", "SubCategory already exists")
            }
        })
    }

    const onUpdate = async () => {
        if(updateName === "") {
            alertStatus("error", "SubCategory name cannot be empty")
            return
        }
        const response = await fetch(`http://localhost:9000/api/subcategory/${id}`, {
            mode: "cors",
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                type: type,
                categoryId: categoryId
            })
        }).then((res) => {
            if(res.status === 200) {
                alertStatus("success", "SubCategory updated successfully")
                setEditOpen(false)
                fetchSubcategory()
            } else if (res.status === 409) {
                alertStatus("error", "SubCategory already exists")
            }
        })
    }


    const handleDelete = async (e) => {
        const response = await fetch(`http://localhost:9000/api/subcategory/${e.currentTarget.id}`, {
            mode: "cors",
            method: "DELETE"
        }).then((res) => {
            if(res.status === 204) {
                alertStatus("success", "SubCategory deleted")
                fetchSubcategory()
            }
        })
    }


    useEffect(() => {
        fetchSubcategory()
    }, [])

    useEffect(() => {
        fetchCategory()
    }, [])

    useEffect(() => {
        if(id !== "") {
            fetchSubcategoryById(id)
        }
    }, [id])

    const handleAddOpen = () => {
        fetchCategory()
        setAddOpen(true)
    }
    
    const handleEditOpen = async (e) => {
        await fetchSubcategoryById(e.currentTarget.id)
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
                                <td>
                                    <button id={item.id} onClick={handleEditOpen} className="update-btn">
                                        <i className="fa-solid fa-pen"></i>
                                    </button>
                                    <button id={item.id} onClick={handleDelete} className="delete-btn">
                                        <i className="fa-solid fa-trash-can"></i>
                                    </button>
                                </td>
                            </tr>
                        )
                    }
                    )}
                </tbody>
            </table>
            <AddWrapper 
                children={
                    <SubCategoryAddForm 
                        setName={setName} 
                        setType={setType} 
                        setCategoryId={setCategoryId} 
                        category={category} 
                        onSubmit={onSubmit}
                    />
                } 
                addOpen={addOpen} 
                setAddOpen={setAddOpen} 
            />
            <EditWrapper 
                children={
                    <SubCategoryEditForm 
                        name={name}
                        type={type}
                        categoryId={categoryId}
                        setName={setName} 
                        setType={setType} 
                        setCategoryId={setCategoryId} 
                        subCategory={subCategory} 
                        category={category} 
                        onUpdate={onUpdate}
                    />
                } 
                editOpen={editOpen} 
                setEditOpen={setEditOpen} 
            />
            {alert && <Alert setAlert={setAlert} alertType={alertType} alertMessage={alertMessage} />}
        </div>
    )
}


export default SubCategory