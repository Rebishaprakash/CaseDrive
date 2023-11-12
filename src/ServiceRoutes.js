import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ServiceContainer from './UI/Services/ServiceContainer';
import DragDropContainer from './UI/DragDrop/DragDropContainer';
import Home from './UI/Home';


const ServiceRoutes = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                   <Route path="/" element={<Home/>}>                   
                    </Route>
                    <Route path="/services" element={<ServiceContainer />}>                   
                    </Route>
                    <Route path="/charts"  element={<DragDropContainer />}>                   
                    </Route>
                    

                </Routes>
            </BrowserRouter>

        </div>
    );
};

export default ServiceRoutes;