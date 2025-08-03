import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Edit = () => {
    let [data, setData] = useState({
        _id: '',
        name: '',
        phno: '',
        designation: '',
        department: ''
    })
    let { pid } = useParams()
    let [msg, setMsg] = useState("")
    let navigate = useNavigate()
    useEffect(() => {

        axios.get(`http://localhost:5000/edit/${pid}`).then((res) => {
            setData(res.data)
            console.log(res.data)
        })
    }, [pid])
    let upd = () => {
        axios.put("http://localhost:5000/upd", data).then((res) => {
            setMsg(res.data.msg)
            navigate("/admin")
        })
    }
    let fun = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    return (
        <div className='regcon'>
            <div className='reg'>
                <div className='err'>{msg}</div>
                <input type='email' name='_id' placeholder='Enter Email' readOnly value={data._id} />
                <input type='text' name='name' placeholder='Enter Name' onChange={fun} value={data.name} />
                <input type='tel' name='phno' placeholder='Enter Phone Number' onChange={fun} value={data.phno} pattern="[0-9]{10}" maxLength="10" />
                <input type='text' name='designation' placeholder='Enter Designation' onChange={fun} value={data.designation} />
                <input type='text' name='department' placeholder='Enter Department' onChange={fun} value={data.department} />
                <button onClick={upd}>Update</button>
            </div>
        </div>
    )
}

export default Edit