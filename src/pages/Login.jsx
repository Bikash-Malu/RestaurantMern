import axios from 'axios';
import React, { useState } from 'react'
import { Link, json, useNavigate } from 'react-router-dom'
import Navbar from './Navbar';

const Login = () => {
    const[email,setemail]=useState('');
    const[password,setpassword]=useState('')
    const[error,seterror]=useState('')
    const navigate=useNavigate();
    const loginhandle=(e)=>{
    e.preventDefault();
    
    axios
    .post("http://localhost:1200/login", { email, password })
    .then((res) => {
    console.log(res)
    if(res&&res==="email not correct"){
      alert("invalid user and password")
    }
    else{
      console.log(res.data)
    const auth= localStorage.setItem("user",JSON.stringify(res.data))
      navigate('/home')
      window.location.reload();
    }
  })
    .catch((err) => {
      console.log(err);
      if(err){
        seterror(err.response.data)
      }
    });

    }
  return (
    <>
      <Navbar/>

    <div class="container mt-5">
    <div class="row justify-content-center">
        <div class="col-md-6">
            <div class="card">
                <div class="card-header">
                    <h4>Login</h4>
                </div>
                <div class="card-body">
                    <form onSubmit={loginhandle}>
                        <div class="form-group">
                            <label for="email">Email address</label>
                            <input type="email" class="form-control" id="email" name='email' placeholder="Enter your email"onChange={(e)=>{setemail(e.target.value)}} />
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" class="form-control" id="password" name='password' placeholder="Enter your password" onChange={(e)=>{setpassword(e.target.value)}}/>
                            <span style={{color:'red'}}>{error}</span>
                        </div>
                        <button type="submit" class="btn btn-primary btn-sm mt-2">Login</button>
                        <Link to={'/signup'} class="btn btn-info btn-sm m-2"style={{position:'relative',top:'4px'}}>Do'nt have account</Link>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</>
  )
}

export default Login
