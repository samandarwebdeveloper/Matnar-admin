import "./AddWrapper.scss"

import { useRef } from "react"

function AddWrapper ({ children, addOpen, setAddOpen}) {

    const wrapperRef = useRef(null)

    const handleClickOutside = (e) => {
        if (e.target === wrapperRef.current) {
            setAddOpen(false)
        }
    }

    const handleClose = () => {
        setAddOpen(false)
    }

    return (
        <>
            {addOpen && (
                <div className="AddWrapper" onClick={handleClickOutside} ref={wrapperRef}>
                    <div className="AddWrapper-form">
                        <div className="AddWrapper-form-header">
                            <h2>Add</h2>
                            <button className="close-btn" onClick={handleClose}>
                                <i className="fa-solid fa-times"></i>
                            </button>
                        </div>
                        <div className="AddWrapper-form-body">
                            {children}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}


export default AddWrapper