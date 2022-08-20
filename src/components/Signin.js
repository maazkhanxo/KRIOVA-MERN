import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

const Signin = () => {
  const [user, setuser] = useState({EmployeeName:'',Email:'',PhoneNumber:'',Password:''})
  const history = useNavigate();
  const handleSubmit = async (e) =>{
    e.preventDefault();
       await fetch('/signin',{
      method:'POST',
      headers:{
        "Content-type":"application/json",
      },
      body:JSON.stringify(user)
    }).then(res => res.json()).then(data => {
      if(data.authToken){
          localStorage.setItem('token', JSON.stringify(data))
      }
  }).catch(error=>console.log({error}))

  if (localStorage.getItem('token')) {

    history('/')
} else {
    // alert("wrong confirm password")
       <div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Holy guacamole!</strong> You should check in on some of those fields below.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    // history.push('/signup')
}

  }

  const handleLogin = () => {
    history('/login')
}
  
  const onchangeEvent = (e)=>{
    setuser({...user,[e.target.name]:e.target.value})
  }

  return (
    <div className="d-flex align-items-center justify-content-center">

    <div className=" container my-3 d-grid gap-4 shadow-sm p-3 mb-5 bg-body rounded">
    <h3 className='fw-light text-center my-2'>Signup</h3>
    <form method='POST'>
    <div className="p-3 input-group flex-nowrap">
  <span className="input-group-text" id="addon-wrapping"><i class="bi bi-person-circle"></i></span>
  <input type="text" className="form-control" placeholder="Username" name='EmployeeName' value={user.EmployeeName} onChange={onchangeEvent} aria-label="Username" aria-describedby="addon-wrapping"/>
</div>
    <div className="p-3 input-group flex-nowrap">
  <span className="input-group-text" id="addon-wrapping"><i class="bi bi-telephone-fill"></i></span>
  <input type="Number" className="form-control" placeholder="Phone Number" name='PhoneNumber' value={user.PhoneNumber} onChange={onchangeEvent} aria-label="PhoneNumber" aria-describedby="addon-wrapping"/>
</div>
    <div className="p-3 input-group flex-nowrap">
  <span className="input-group-text" id="addon-wrapping"><i class="bi bi-person-fill"></i></span>
  <input type="email" className="form-control" placeholder="Email" name='Email' value={user.Email} onChange={onchangeEvent} aria-label="Email" aria-describedby="addon-wrapping"/>
</div>
    <div className="p-3 input-group flex-nowrap">
  <span className="input-group-text" id="addon-wrapping"><i class="bi bi-lock-fill"></i></span>
  <input type="password" className="form-control" placeholder="Password" name='Password' value={user.Password} onChange={onchangeEvent} aria-label="Password" aria-describedby="addon-wrapping"/>
</div>
<div className='p-3'>
  <button type="submit" onClick={handleSubmit} className="btn btn-secondary">Submit</button>
  </div>
</form>
<div className="container my-4 text-center">
                <span>Already a Member? <i style={{ cursor: "pointer", color: "green" }} onClick={handleLogin}>log in</i></span>
            </div>
</div>
 </div>
  )
}

export default Signin