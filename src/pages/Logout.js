import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LayoutPage from '../Components/Defaultlayout';
const Logout = () => {
    const navigate=useNavigate();
    const log=()=>{
        localStorage.clear();
        navigate("/signup")
        window.location.reload();
    }
  return (
    <>
    <LayoutPage>
    <div className='signup-container'>
    <div className="container mt-4">
  <div className="card col-md-4 mx-auto">
    <div className="card-body">
      <h2 className="card-title">Logout Page</h2>
      <p className="card-text">Are you sure you want to logout?</p>
      <a href="#" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#logoutModal">Logout</a>
    </div>
  </div>
</div>
<div className="modal fade" id="logoutModal" tabindex="-1" aria-labelledby="logoutModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="logoutModalLabel">Logout Confirmation</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <p>Are you sure you want to logout?</p>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <Link to='/signup' className="btn btn-primary" onClick={log}>Logout</Link>
      </div>
    </div>
  </div>
</div>
</div>
</LayoutPage>
</>
  )
}

export default Logout
