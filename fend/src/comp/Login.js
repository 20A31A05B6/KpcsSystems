import React, { useContext, useState } from 'react'
import Ct from './Ct'
import { useNavigate } from 'react-router-dom'
import Cookies from "js-cookie"
import axios from 'axios'
const Login = () => {
  let [data, setData] = useState({ "_id": "", "pwd": "" })
  let [msg, setMsg] = useState("")
  let obj = useContext(Ct)
  let navigate = useNavigate()
  let fun = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }
  let log = async () => {
    if (!data._id || !data.pwd) {
      setMsg("Please enter both email and password.")
      return
    }

    try {
      let res = await axios.post("http://localhost:5000/login", data)
      if (res.data.token !== undefined) {
        Cookies.set("lgc", JSON.stringify(res.data), { expires: 2 })
        obj.updstate(res.data)

        // 🔁 Navigate based on role
        if (res.data.role === "admin") {
          navigate("/admin")
        } else {
          navigate("/home")
        }
      } else {
        setMsg(res.data.msg)
      }
    } catch (err) {
      console.error("Login error:", err.message)
      setMsg("Server error. Please try again later.")
    }
  }
  return (
    <div className='logcon'>
      <div>{msg}</div>
      <div className='login'>
        <input type='email' name='_id' placeholder='Enter Email' onChange={fun} value={data._id}></input>
        <input type="password" name='pwd' placeholder='Enter Password' onChange={fun} value={data.pwd}></input>
        <button onClick={log}>Login</button>
      </div>

    </div>
  )
}

export default Login