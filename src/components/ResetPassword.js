import React,{useState} from 'react'

const ResetPassword = () => {
    const [user, setuser] = useState({ Password: '', cPassword: '' })
     const ceredentials = {Email:'pehlaBoy@g.com',Password:user.Password} 
    const onchangeEvent = (e)=>{
        setuser({...user,[e.target.name]:e.target.value})
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        await fetch('/resetPassword',{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(ceredentials)
        })
    }

    return (
        <div className="container my-4 d-grid gap-4 shadow-sm p-3 mb-5 bg-body rounded">
            <h3 className='fw-light text-center my-2'>Reset Password</h3>
            <form method='POST'>
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

export default ResetPassword