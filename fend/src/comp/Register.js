import React, { useState } from 'react'
import axios from 'axios'


const Register = () => {
  let [data, setData] = useState({
    _id: '',
    name: '',
    pwd: '',
    phno: '',
    designation: '',
    department: ''
  })
  let [msg, setMsg] = useState("")

  let fun = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  let handlePhoneInput = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '') // Allow only numbers
    if (value.length <= 10) { // Enforce max length of 10 digits
      setData({ ...data, phno: value })
    }
  }

  let reg = async () => {
    if (!data._id || !data.name || !data.pwd || !data.phno || !data.designation || !data.department) {
      setMsg("Please fill required fields.")
      return
    }

    try {
      let res = await axios.post("http://localhost:5000/reg", data)
      console.log(res.data)

      if (res.data.msg === "Registered successfully") {
        setMsg(res.data.msg)
        setData({ _id: '', name: '', pwd: '', phno: '', designation: '', department: '' })
      } else {
        setMsg(res.data.msg)
      }
    } catch (err) {
      setMsg("Server error. Please try again later.")
      console.error("Axios error:", err.message)
    }
  }

  return (
    <div className='regcon'>
      <div className='reg'>
        <h2>Create Your Account</h2>
        {msg && <div className='err'>{msg}</div>}
        <div className='input-group'>
          <input
            type='text'
            name='name'
            placeholder='Full Name'
            onChange={fun}
            value={data.name}
          />
          <input
            type='email'
            name='_id'
            placeholder='Email Address'
            onChange={fun}
            value={data._id}
            autoComplete='off'
          />

          <input
            type='password'
            name='pwd'
            placeholder='Password'
            onChange={fun}
            value={data.pwd}
          />
          <input
            type='text'
            name='phno'
            placeholder='Phone Number (10 digits)'
            onInput={handlePhoneInput}
            value={data.phno}
            maxLength="10"
          />
          <input
            type='text'
            name='designation'
            placeholder='Designation'
            onChange={fun}
            value={data.designation}
          />
          <input
            type='text'
            name='department'
            placeholder='Department'
            onChange={fun}
            value={data.department}
          />
        </div>
        <div className='bton'>
          <button onClick={reg}>Sign Up</button>
        </div>
      </div>
    </div>
  )
}

export default Register