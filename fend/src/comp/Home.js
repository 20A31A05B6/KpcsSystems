import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import axios from 'axios'


const Home = () => {
    let [data, setData] = useState(null)
    let navigate = useNavigate()

    useEffect(() => {
        let t = Cookies.get("lgc")
        if (t) {
            let cobj = JSON.parse(t)
            axios.get(`http://localhost:5000/home/${cobj.uid}`).then((res) => {
                setData(res.data)
            }).catch((err) => {
                console.error("Error fetching user data:", err)
                setData(null) // Ensure data is null on error
            })
        } else {
            navigate("/login")
        }
    }, [navigate])

    return (
        <div className='home-con'>
            <div className='welcome-card'>
                <h2>Welcome, {data?.name || 'User'}!</h2>
                {data ? (
                    <div className='user-info-card'>
                        <div className='info-grid'>
                            <div className='info-item'>
                                <span className='label'>Name</span>
                                <span className='value'>{data.name}</span>
                            </div>
                            <div className='info-item'>
                                <span className='label'>Email (ID)</span>
                                <span className='value'>{data._id}</span>
                            </div>
                            <div className='info-item'>
                                <span className='label'>Designation</span>
                                <span className='value'>{data.designation}</span>
                            </div>
                            <div className='info-item'>
                                <span className='label'>Department</span>
                                <span className='value'>{data.department}</span>
                            </div>
                            <div className='info-item'>
                                <span className='label'>Phone Number</span>
                                <span className='value'>{data.phno}</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='no-data-card'>
                        <h3>No Profile Data Available</h3>
                        <p className='no-data-message'>
                            It looks like your profile information is not yet available. 
                            Complete your profile to unlock personalized features and get started!
                        </p>
                        <div className='bton'>
                            <button onClick={() => navigate('/reg')}>
                                Complete Your Profile
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Home