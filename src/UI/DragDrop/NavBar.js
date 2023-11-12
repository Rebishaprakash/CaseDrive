import React from 'react';
import {BsSearch} from "react-icons/bs";
import {MdOutlineKeyboardArrowDown} from "react-icons/md";


const NavBar = () => {
    return (
        <div>

            
          <div className="top_nav  row m-0 d-flex align-items-center justify-content-between">
          <div className="col-lg-6 d-flex align-items-center row m-0">
            <div className="col-5">
            <img className='charts_logo_image' src={`/img/task2_logo.png`} alt='logo' />

            </div>
            <div className="col-7 d-flex align-items-center ">
            <div>
            <img className='group_icon' src={`/img/Group 1391.png`} alt='icon' />
            </div>
            <div className='d-flex align-items-center  justify-content-between '>
                <div className='search_menu d-flex px-2 py-1 mx-3 '>
                   <p className='m-0 sizes'> <BsSearch/></p>
                   <p className='m-0 px-2 sizes'> Search</p>

                </div>
            </div>
            <div className='d-flex align-items-center  justify-content-between '>
                <div className='search_menu menu_width  d-flex align-items-center px-2 mx-3 '>
                   <p className='m-0 px-2 py-1 sizes'> All divisions</p>
                   <p className='m-0 sizes'> <MdOutlineKeyboardArrowDown/></p>

                </div>
            </div>  
            </div>
          </div>

          <div className='col-lg-4  d-flex align-items-center justify-content-end'>

            <div className=''>
            <img className='' width={'35'} src={`/img/Group 1083.png`} alt='logo' />
            <img className='nav_menu_right_img px-3'  src={`/img/menu_right_items.png`} alt='logo' />

            </div>
            <div>
                
            </div>
          </div>
        </div>
        </div>
    );
};

export default NavBar;