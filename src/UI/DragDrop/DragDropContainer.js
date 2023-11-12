import React from "react";
import { BsArrowUp, BsUpload, BsArrowDown,BsArrowRightShort } from "react-icons/bs";
import NavBar from "./NavBar";
import { FcPrevious, FcNext } from "react-icons/fc";
import {LiaEdit} from 'react-icons/lia'
import { AiOutlineAppstore, AiOutlineFileAdd } from 'react-icons/ai';
import Charts from "../ServiceCharts/Charts";

class DragDropContainer extends React.Component {
  state = {
    jsonData: [],
    carouselsData: [],
    currentPage: 0,
    itemsPerPage: 5,
    is_edit: false
  };

  componentDidMount() {
    this.fetchData()
  }


  async fetchData() {
    try {
      console.log('Fetching data...');
      const response = await fetch('/JsonFiles/chartsData.json');

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const jsonData = await response.json();
      console.log('Data fetched successfully:', jsonData);

      this.setState({ jsonData });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  handleDragStart = (e, index) => {
    console.log('index', index)
    e.dataTransfer.setData('text/plain', index.toString());
  };

  handleDragOver = (e) => {
    e.preventDefault();
  };

  handleNextClick = () => {
    const { jsonData, currentPage, itemsPerPage } = this.state;
    const totalPages = Math.ceil(
      (jsonData.carousels_datas ? jsonData.carousels_datas.length : 0) / itemsPerPage
    );

    if (currentPage < totalPages - 1) {
      this.setState({ currentPage: currentPage + 1 });
    }
  };

  handlePrevClick = () => {
    const { currentPage } = this.state;
    if (currentPage > 0) {
      this.setState({ currentPage: currentPage - 1 });
    }
  };
  isEdit() {
    this.setState({ is_edit: !this.state.is_edit })
  }
  handleDrop = (e, newIndex, stateVale) => {
    e.preventDefault();
    var state_name = stateVale

    const draggedIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);
    console.log('newIndex', newIndex, draggedIndex)
    const updatedData = [...this.state.jsonData[stateVale]];
    const [draggedItem] = updatedData.splice(draggedIndex, 1);
    updatedData.splice(newIndex, 0, draggedItem);

    console.log('updatedData', draggedIndex, newIndex)

    this.setState({ jsonData: { ...this.state.jsonData, [state_name]: updatedData } });
  };


  render() {
    const { jsonData, currentPage, itemsPerPage } = this.state;

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = jsonData.carousels_datas ? jsonData.carousels_datas.slice(startIndex, endIndex) : [];
    return (
      <div className="rel_position">
        <NavBar />
        {this.state.is_edit &&
          <div className="row m-0 d-flex py-3 justify-content-between align-items-center">

            <p className="m-0 text-center col-lg-3 text-primary"> <LiaEdit size={"25"}/> Customize Dashboard</p>
            <div className="col-lg-3 d-flex justify-content-center">
              <button type="button" class="btn btn-outline-secondary" onClick={() => { this.isEdit() }}>Cancel</button>
              <div className="mx-3">
                <button type="button mx-4" class="btn btn-primary" onClick={() => { this.isEdit() }}>Save</button>
              </div>
            </div>
          </div>
        }
        <div className="d-flex  ">

          <div className={`left_tab_styles ${this.state.is_edit ? "" : ""}`}>
            <div className="px-4 py-3">
              <p className="m-0"><BsUpload /> </p>
              <p className="m-0 size_vsm">Add </p>
            </div>
            <div>
              <p className="m-0  text-center py-3 bg-primary"><AiOutlineAppstore size={"20"} color="white" /> </p>

            </div>
            <div>
              <p className="m-0  text-center py-3 "><AiOutlineFileAdd size={"20"} /> </p>

            </div>


          </div>
          <>

            <div className={`w-100 row m-0  ${this.state.is_edit ? 'justify-content-between' : "justify-content-center"}`} style={{ background: "#f1f1f1" }}>
              <div className={`${this.state.is_edit ? "col-lg-10" : "col-lg-12"}`}>
                {!this.state.is_edit &&
                  <p className="text-primary pointer mx-5 mt-4 d-flex alin-items-center justify-content-end" onClick={() => { this.isEdit() }}> <LiaEdit  size={"25"}/> Customize Dashboard</p>
                }
                <div className="row mx-0 mt-2 mb-3 align-items-center d-flex justify-content-center rel_position">

                  <div className="col-1 px-0 d-flex justify-content-end previous_icon_position " onClick={this.handlePrevClick}>
                    <p className="m-0  previous_btn"> <FcPrevious className="previous_icon" /></p>
                  </div>
                  <div className="col-lg-10 px-0 row justify-content-between m-0">
                    {currentItems.map((item, idx) => (
                      <div
                        key={idx}
                        id={item.title}
                        className="col-lg-2 my-3 slider_cards grabbing"
                        draggable
                        onDragStart={(e) => this.handleDragStart(e, this.state.currentPage > 0 ? 5 + idx : idx)}
                        onDragOver={(e) => this.handleDragOver(e)}
                        onDrop={(e) => this.handleDrop(e, this.state.currentPage > 0 ? 5 + idx : idx, "carousels_datas")}
                      >
                        <p className="m-0 text-center">
                          <img className='' src={item.icon} alt='icon' />
                        </p>
                        <p className={`m-0 text-center sizes ${(item.title === "Free Trial") ? "mt-1" : "mt-3"}`}>{item.title}</p>
                        <p className={`m-0 text-center `}> <b>{item.count}</b></p>

                      </div>
                    ))}
                  </div>
                  <div className="col-1 px-0 d-flex justify-content-start next_icon_position" onClick={this.handleNextClick}>
                    <p className="m-0  previous_btn"> <FcNext className="next_icon" /></p>
                  </div>
                </div>


                <div className="row mx-0 my-3  d-flex justify-content-center">

                  {this.state.jsonData.charts_data && this.state.jsonData.charts_data.map((item, idx) => {
                    return (
                      <div


                        className={`grabbing
                     px-0 ${(idx === 0 || idx % 2 === 0) ? "col-lg-6 " : "col-lg-4"}`}>
                        <p className="mb-3 my-3  sizem "> <b>{item.title}</b></p>
                        <div style={{ height: '90%' }}>{console.log('this.state.currentPge', this.state.currentPage)}
                          <div

                            key={idx}
                            id={item.title}
                            draggable
                            onDragStart={(e) => this.handleDragStart(e, idx)}
                            onDragOver={(e) => this.handleDragOver(e)}
                            onDrop={(e) => this.handleDrop(e, idx, "charts_data")}
                            className="slider_cards cards_shadow h-100 pt-4 mx-2" >

                            {(item.title == "Unpaid Status") ?
                              <table class="table table-striped">
                                <thead>
                                  <tr>
                                    {item.table_header.map((item, idx) => {
                                      return (
                                        <th className={`${item === "Amount" ? "text-center" : ""}`} scope="col">{item}</th>

                                      )
                                    })}
                                  </tr>
                                </thead>
                                <tbody>
                                  {item.table_row_data.map((item, idx) => {
                                    return (
                                      <tr className="sizes my-5">

                                        <td >{item.name}</td>
                                        <td className="text-center">{item.amount}</td>

                                      </tr>

                                    )
                                  })}


                                </tbody>
                              </table>
                              :
                              <>
                                {(item.title === "Analytics") &&
                                  <>
                                    <div className="d-flex align-items-center justify-content-between  m-0">

                                      {item.tabs_details && item.tabs_details.map((values, index) => {
                                        return (
                                          <div className=" m-0">
                                            <p className={`m-0 text-center sizes ${values.label == "Cases" ? "text-primary text-bold" : "text-secondary"}`}> {values.label}</p>
                                            <p className="mb-0 size_vsm   text-center"> <b>{values.count}</b></p>
                                            <p className="mb-0  text-center sizes"> {values.is_down ? <p className="m-0 text-danger"> <BsArrowDown color="red" /> - {values.percentage} </p> : <p className="m-0 text-success"><BsArrowUp color="green" /> + {values.percentage}</p>}</p>

                                          </div>
                                        )
                                      })

                                      }
                                    </div>
                                    <div className="my-2 mt-4">
                                      <Charts data={item.data} type={item.chart_type} />
                                    </div>
                                  </>
                                }

                                {((item.title === "Sales Report")) &&
                                  <div className="my-2 mt-4">
                                    <Charts data={item.data} type={item.chart_type} />
                                  </div>
                                }
                                {((item.title === "Revenue Update")) &&
                                <div>
                                  <div className="my-2 mt-4 rel_position" >
                                    <Charts
                                      data={item.data} is_edit={this.state.is_edit} type={item.chart_type}
                                    />
                                    {/* <div className="center-label">
                                      Gross Revenue

                                    </div> */}
                                    
                                  </div>
                                  <div className={`d-flex  mx-3 align-items-center justify-content-between ${this.state.is_edit ? "marginTop":"mt-4"}`}>
                                      <p className="m-0 sizes">
                                        Aug 1-31,2023
                                      </p>
                                      <p className="m-0 text-primary pointer">
                                       <b>View all report <BsArrowRightShort/></b> 
                                      </p>
                                    </div>
                                  </div>
                                }
                              </>
                            }
                          </div>
                        </div>
                      </div>
                    )
                  })}



                </div>
              </div>


              {this.state.is_edit &&
                <div className="col-lg-2 p-0 left_tab_styles">
                  <div className="my-3">
                    <p className="m-0 text-center  mt-3"> Add Infocards & Widgets</p>
                    <hr className=" mx-0 widgets_border" />
                  </div>

                  <div className="my-3">
                    <p className="m-0 px-5 text-primary "> Info cards </p>

                    {jsonData.carousels_datas && jsonData.carousels_datas.map((item, idx) => {
                      return (
                        <div
                          className="grabbing"
                          id={item.title}
                          draggable
                          onDragStart={(e) => this.handleDragStart(e, idx)}
                          onDragOver={(e) => this.handleDragOver(e)}
                          onDrop={(e) => this.handleDrop(e, idx, "carousels_datas")}>
                          <p className=" my-3  mx-3 sizes">
                            <img className="px-2" src={` ${idx <= 4 ? "img/minus (2) 1.png" : "img/add_2.png"}`} />

                            <img className="px-2" src={"img/drag 5.png"} />
                            {item.title}</p>
                        </div>
                      )
                    })}

                  </div>

                  <div className="my-3">
                    <p className="m-0 px-5 text-primary "> Widgets </p>

                    {jsonData.charts_data && jsonData.charts_data.map((item, idx) => {
                      return (
                        <div
                          className="grabbing"
                          id={item.title}
                          draggable
                          onDragStart={(e) => this.handleDragStart(e, idx)}
                          onDragOver={(e) => this.handleDragOver(e)}
                          onDrop={(e) => this.handleDrop(e, idx, "charts_data")}>
                          <p className=" my-3  mx-3 sizes">
                            <img className="px-2" src={` ${idx <= 1 ? "img/minus (2) 1.png" : "img/add_2.png"}`} />

                            <img className="px-2" src={"img/drag 5.png"} />
                            {item.title}</p>
                        </div>
                      )
                    })}

                  </div>
                </div>
              }

            </div>
          </>
        </div>



      </div>
    );
  }
}

export default DragDropContainer;