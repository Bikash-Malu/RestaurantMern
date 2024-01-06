import React from 'react'

const Silder = () => {
  return (
    <div>
     
      <div id="carouselExampleIndicators" className="carousel slide mt-1">
      

    
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src="https://source.unsplash.com/random/900×300/?burger" className="d-block w-100 h-10 " alt="..." height={'500px'} style={{objectFit:'cover'}}/ >
    </div>
    <div className="carousel-item">
      <img src="https://source.unsplash.com/random/900×100/?pizza" className="d-block w-100 h-10" alt="..."height={'600px'}style={{objectFit:'cover'}}/>
    </div>
    <div className="carousel-item">
      <img src="https://source.unsplash.com/random/900×100/?sandwich" className="d-block w-100 h-10" alt="..." height={'600px'}style={{objectFit:'cover'}}/ >

    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
    </div>
  )
}

export default Silder
