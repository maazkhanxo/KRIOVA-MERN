import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const ForgetPassword = () => {
    const history = useNavigate()
    const [user, setuser] = useState({Email:'', Password: '', cPassword: '' })
    const onchangeEvent = (e)=>{
        setuser({...user,[e.target.name]:e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(user.cPassword.localeCompare(user.Password)===0){
            await fetch('/forgetPass', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            }).then((res) => res.json()).then((data) => {
                if (data.authToken) {
                    window.alert("You have successfully reset Password")
                    history('/login')
                }else {
                    alert("Invalid Email !")
                    // history.push('/signup')
                }
            }).catch(error => console.log({ error }))
        }else{
            alert("Wrong confirm password")
        }
       
    }

    return (
        <div className="container my-4 d-grid gap-4 shadow-sm p-3 mb-5 bg-body rounded">
            <h3 className='fw-light text-center my-2'>Confirm Reset Email</h3>
            <form method='POST'>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" value={user.Email} name="Email" onChange={onchangeEvent} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">New Password</label>
                    <input type="password" value={user.Password} name="Password" onChange={onchangeEvent} className="form-control" id="Password" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
                    <input type="password" value={user.cPassword} name="cPassword" onChange={onchangeEvent} className="form-control" id="cPassword" />
                </div>
                <button onClick={handleSubmit} type="submit" className="btn btn-secondary">Submit</button>
            </form>
        </div>
    )
}

export default ForgetPassword