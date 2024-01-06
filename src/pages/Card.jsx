import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Card = () => {
  const[data,setdata]=useState([])
  useEffect(()=>{
    getdata();
  },[])
  const getdata=()=>{
    axios.get("http://localhost:1200/items").then((res)=>{
      setdata(res.data)
    }).catch((err)=>{
      console.log(err)
    })
  }
  return (
    <div className='container-fluid'>
    <div className='row'>
   
      {
        data.map((item,i)=>(
          <div className='col-md-6 col-sm-12 col-lg-3'>
          <div className="card mt-3 " style={{ width: "18rem", maxHeight: "360px" }}>
          <img src={item.image} className="card-img-top" alt="..." height={'190px'} />
          <div className="card-body ">
            <h5 className="card-title text-center">{item.name}</h5>
            <p className="card-text text-center">
              {item.category}
            </p>
            <div className="container text-center">
             
      <div className="d-inline h-100 fs-5 text-center">
         price:-{item.price}
      </div>
            </div>
          </div>
        </div>
        <hr />
        </div>
        ))
     
}

    </div>
    </div>
  )
}

export default Card
