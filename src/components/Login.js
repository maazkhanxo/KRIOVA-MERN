import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [user, setuser] = useState({ Email: '', Password: '' })
  const history = useNavigate();
  const handleSign = () => {
    history('/signin')
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    await fetch('/login', {
      method: 'POST',
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user)
    }).then(res => res.json()).then(data => {
      if (data.authToken) {
        localStorage.setItem('token', JSON.stringify(data))
      }
    }).catch(error => console.log({ error }))

    if (localStorage.getItem('token')) {
      history('/')
    } else {
      alert("wrong confirm password")
      // history.push('/signup')
    }
  }

  const handleReset = () =>{
    history('/forgetPass')
  }

  const onchangeEvent = (e) => {
    setuser({ ...user, [e.target.name]: e.target.value })
  }

  return (
    <div className="container my-4 d-grid gap-4 shadow-sm p-3 mb-5 bg-body rounded">
      <h3 className='fw-light text-center my-2'>Login</h3>
      <form method='POST'>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" value={user.Email} name="Email" onChange={onchangeEvent} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" minLength={5} required/>
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" value={user.Password} name="Password" onChange={onchangeEvent} className="form-control" id="exampleInputPassword1" minLength={5} required/>
        </div>
        <button onClick={handleSubmit} type="submit" className="btn btn-success">Submit</button>
        <button onClick={handleReset} type="submit" className="mx-2 btn btn-secondary">Reset Password</button>
      </form>
      <div className="container my-4 text-center">
        <span>New to NoteCloud  ? <i style={{ cursor: "pointer", color: "green" }} onClick={handleSign}>Sign in</i></span>
      </div>
    </div>

  )
}

export default Login