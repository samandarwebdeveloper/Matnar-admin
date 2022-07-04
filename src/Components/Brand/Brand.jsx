import "./Brand.scss"

import { useEffect, useState } from "react"

import AddWrapper from "../AddWrapper/AddWrapper"
import EditWrapper from "../EditWrapper/EditWrapper"
import Alert from "../Alert/Alert"

function Brand() {
    const [alert, setAlert] = useState(false)
    const [alertType, setAlertType] = useState("")
    const [alertMessage, setAlertMessage] = useState("")
    const [brand, setBrand] = useState([])
    const [addOpen, setAddOpen] = useState(false)
    const [editOpen, setEditOpen] = useState(false)
    const [name, setName] = useState("")
    const [id, setId] = useState("")
    const [updateName, setUpdateName] = useState("")
    
    const alertStatus = (stype, string) => {
        setAlert(true)
        setAlertType(stype)
        setAlertMessage(string)
        setTimeout(() => {
            setAlert(false)
        }, 3000)
    }
    

    const fetchBrand = async () => {
        const response = await fetch("http://localhost:9000/api/brand")
        const data = await response.json()
        setBrand(data)
    }

    const fetchBrandById = async (id) => {
        const response = await fetch(`http://localhost:9000/api/brand/${id}`, {mode: "cors"})
        const data = await response.json()
        setUpdateName(data.name)
        setId(data.id)
    }

    const onUpdate = async () => {
        if(updateName === "") {
            alertStatus("error", "Brand name cannot be empty")
            return
        }
        const response = await fetch(`http://localhost:9000/api/brand/${id}`, {
            mode: "cors",
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: updateName
            })
        }).then((res) => {
            if(res.status === 200) {
                alertStatus("success", "Brand updated successfully")
                setUpdateName("")
                setEditOpen(false)
                fetchBrand()
            } else if (res.status === 409) {
                alertStatus("error", "Brand already exists")
            }
        }
        )
    }

    const handleDelete = async (e) => {
        const response = await fetch(`http://localhost:9000/api/brand/${e.currentTarget.id}`, {
            mode: "cors",
            method: "DELETE"
        }).then((res) => {
            if(res.status === 204) {
                alertStatus("success", "Brand deleted successfully")
                fetchBrand()
            }
        })
    }

    
    const onSubmit = async () => {
        if(name === "") {
            return alertStatus("error", "Please enter a name")
        }
        const response = await fetch("http://localhost:9000/api/brand", {
            mode: "cors",
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name
            })
        }).then((res) => {
            if(res.status === 201) {
                alertStatus("success", "Brand added successfully")
                setName("")
                setAddOpen(false)
                fetchBrand()
            } else if(res.status === 409) {
                alertStatus("error", "Brand already exists")
            } else {
                alertStatus("error", "Something went wrong")
            }
        })
    }

    useEffect(() => {
        fetchBrand()
    }, [])

    useEffect(() => {
        if(id !== "") {
            fetchBrandById(id)
        }
    }, [id])


    const handleEditOpen = (e) => {
        fetchBrandById(e.currentTarget.id)
        setEditOpen(true)
    }

    return (
        <div className="Brand">
            <div className="Brand-header">
                <h2>Brand</h2>
                <button onClick={() => setAddOpen(true)} className="add-btn"><i className="fa-solid fa-plus"></i></button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {brand && brand.map((item, i) => {
                        return (
                            <tr key={i}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>
                                    <button id={item.id} onClick={handleEditOpen} className="update-btn"><i className="fa-solid fa-pen"></i></button>
                                    <button id={item.id} onClick={handleDelete} className="delete-btn"><i className="fa-solid fa-trash-can"></i></button>
                                </td>
                            </tr>
                        )
                    }
                    )}
                </tbody>
            </table>
            <AddWrapper 
                // children={
                //     <CatalogAddForm 
                //         onSubmit={onSubmit} 
                //         setName={setName}
                //     />
                // } 
                addOpen={addOpen} 
                setAddOpen={setAddOpen} 
            />
            <EditWrapper 
                // children={
                //     <CategoryEditForm 
                //         updateName={updateName} 
                //         setUpdateName={setUpdateName} 
                //         onUpdate={onUpdate}
                //     />
                // } 
                editOpen={editOpen} 
                setEditOpen={setEditOpen} 
            />
            {alert && <Alert setAlert={setAlert} alertType={alertType} alertMessage={alertMessage} />}
        </div>
    )
}

export default Brand