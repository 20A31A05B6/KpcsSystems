import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const Admin = () => {
    let [data, setData] = useState([])
    let navigate = useNavigate()

    useEffect(() => {
        let t = Cookies.get("lgc")
        if (t !== undefined) {
            axios.get("http://localhost:5000/admin").then((res) => {
                setData(res.data)
            })
        } else {
            navigate("/login")
        }
    }, [navigate])

    let del = (id) => {
        // Optimistically update the UI by removing the item
        const previousData = [...data]
        setData(data.filter(item => item._id !== id))

        axios.delete(`http://localhost:5000/del/${id}`).then((res) => {
            // No need to setf(!f) since we're updating state directly
        }).catch((error) => {
            // Revert to previous data if the delete fails
            setData(previousData)
            alert("Failed to delete user. Please try again.")
        })
    }

    return (
        <div className='admin-con'>
            <div className='admin-card'>
                <h2>Welcome, Admin</h2>
                <div className='user-table-container'>
                    {data.length > 0 ? (
                        <table className='user-table'>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email (ID)</th>
                                    <th>Designation</th>
                                    <th>Department</th>
                                    <th>Phone Number</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((post) => (
                                    <tr key={post._id} className='user-row'>
                                        <td>{post.name}</td>
                                        <td>{post._id}</td>
                                        <td>{post.designation}</td>
                                        <td>{post.department}</td>
                                        <td>{post.phno}</td>
                                        <td className='action-buttons'>
                                            <button onClick={() => navigate(`/edit/${post._id}`)}>Edit</button>
                                            <button onClick={() => del(post._id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className='no-data'>No users found</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Admin