import React from 'react';
import NavBar from './DragDrop/NavBar';
import {useNavigate} from "react-router-dom"

const Home = () => {
    const navigate = useNavigate(); 

    return (
        <div>
            <NavBar/>
            <div className='d-flex align-items-center justify-content-center row mx-0 mt-4'>
                <div className='col-lg-5 col-md-6 mt-3 col-sm-12'>
                    <img src='/img/Doctors-cuate.png'  height={"600"} width={"600"} alt='services'/>
                </div>
                <div className='col-lg-5 col-md-6 col-sm-12'>
                   <h2><b>Case Drive</b></h2> 
                   <p className='m-0'>Our team of specialists covers a wide range of medical fields, including cardiology, orthopedics, dermatology, and more.</p>
                   <div className='d-flex align-items-center justify-content-start mt-4'>
                   <button type="button" class="btn btn-primary px-4 "  onClick={()=>navigate("/services")}>Services</button>
                   <button type="button" class="btn btn-outline-success mx-3" onClick={()=>navigate("/charts")}>Dashboard</button>
                   </div>
                </div>
            </div>
        </div>
    );
};

export default Home;