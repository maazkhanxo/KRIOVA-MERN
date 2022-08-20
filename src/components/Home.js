import React, { useEffect,useState } from 'react'
import {useNavigate} from 'react-router-dom'
const Home = () => {

  const history = useNavigate()

  const [note, setnote] = useState({EmployeeName:'',Email:'',PhoneNumber:''})

  const callAbout = async () =>{
    await fetch('/fetchuser',{
      method:'GET',
      headers:{
        "Content-Type":'application/json',
        'auth-token': JSON.parse(localStorage.getItem('token')).authToken
      }
    }).then(res => res.json()).then(data => {
      setnote(data)
    })
  }

  useEffect(() => {
    
    let tokenjson =  localStorage.getItem('token')
    console.log(tokenjson)
        if(tokenjson){
          callAbout(); 
        }else{
            history('/login')
        }
        // eslint-disable-next-line
  }, [])
  
  return (
    <div className="container my-5 card mb-3 my-4 d-grid gap-4 shadow-sm p-3 mb-5 bg-body rounded">
    <div className="my-2 mx-2 row g-0">
      <div className="col-md-4 my-4">
        <img src="https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425__340.png" className="img-fluid rounded-start" alt="..."/>
      </div>
      <div className="container d-flex align-items-left col-md-8">
        <div className="mx-3 card-body">       
          <h5 className="fw-light card-title my-2"><small>Name:</small>  {(note.user)?(note.user.EmployeeName):"Anonymous"}</h5>
          <hr />
          <h5 className="fw-light card-title my-2"><small>Email:</small><i className='align-items-right'>  {(note.user)?(note.user.Email):"Anonymous@gmail.com"}</i></h5>
          <hr />
          <h5 className="fw-light card-title my-2"><small>Phone Number:</small>  {(note.user)?(note.user.PhoneNumber):"918851XXX93X"}</h5>
          <hr />
          <h5 className="fw-light card-title my-2"><small>Country:</small>  India</h5>
          <hr />
          <h5 className="fw-light card-title my-2"><small>State:</small>  New Delhi</h5>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Home