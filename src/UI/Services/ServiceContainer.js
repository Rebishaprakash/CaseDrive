import React, { useState, useEffect } from "react";
import "../../ServiceStyles.css"
import Accordion from "@mui/material/Accordion";
import Typography from "@mui/material/Typography";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Form from "react-bootstrap/Form";

const ServiceContainer = () => {
  const [expandedAccordion, setExpandedAccordion] = useState(1);
  const [activeKey, setactiveKey] = useState(null);
  const [medicalRecords, setmedicalRecords] = useState([]);
  const [recordsObj, setrecordsObj] = useState({
    medical_chronology: false,
    medical_record_retrieval: false,
    narrative_summary: false,
    aps_summary: false,
    deposition_summary: false,
    life_care_planning: false,
    demand_letter: false,
    expert_medical_opinion: false,
    sorting_indexing: false,
    medical_billing_summary: false
  });

  useEffect(() => {
    fetchData();
  }, []);

  const handleAccordionChange = (panel) => (_, expandable) => {
    setExpandedAccordion(expandable ? panel : 0);
  };

  const fetchData = async () => {
    try {
      const response = await fetch("/JsonFiles/dummyData.json");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      setmedicalRecords(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const checkboxHandler = (value, item, title) => {
    var active_key = "";

    Object.keys(recordsObj).forEach(function (key, index) {
      if (key === item.key) {
        recordsObj[item.key] = value;
        active_key = value ? item.key : null;
      } else {
        recordsObj[key] = false;
      }
    });

    setrecordsObj({
      ...recordsObj
    });
    setactiveKey(active_key);
  };

  const default_Checked = (item, addl_key = null) => {
    return (
      (!activeKey && item.is_free) ||
      (item.auto_enabled && item.auto_enabled.includes(activeKey))
    );
  };

  const checkDisableState = (key, title) => {
    return key && key.includes(activeKey);
  };

  return (
    <div className="">
      <div className="row m-0">
        <div className="col-lg-11 col-sm-10 col-md-10 vertical_line_height top_horizontal_line"></div>
        <div className="col-lg-1 col-sm-2 col-md-2  vertical_line_height horizontal_line"></div>
      </div>
      <div className="d-flex justify-content-between align-items-center px-3 row m-0 my-4">
        <div className="col-lg-3">
          <img
            className="logo_image_width"
            src={`/img/case_drive_logo_light 1.png`}
            alt="logo"
          />
        </div>
        <div className="col-lg-3 d-flex align-items-center">
          <p className="m-0">
            {" "}
            <b>Already have an account?</b>
          </p>
          <p className="m-0 px-2 text-primary">
            {" "}
            <b>Sign in</b>
          </p>
        </div>
      </div>

      <div className="d-flex justify-content-center row mx-0 my-3">
        <div className="col-lg-8 col-sm-10 col-md-10 service_box">
          <div className="d-flex justify-content-center align-items-center my-4">
            <div>
              <img className="select_img" src={`/img/select 1.png`} alt="img" />
            </div>

            <p className=" m-0 px-1 sizel">
              <b> Kindly select the required services</b>{" "}
            </p>
          </div>

          <div className="row mx-0 my-3 col-12 d-flex justify-content-center">
            <div className="col-lg-10 p-0 col-sm-11 col-md-11">
              <Accordion
                defaultExpanded={true}
                expanded={expandedAccordion === 1}
                onChange={handleAccordionChange(1)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>
                    <b className="sizem">Medical Record Review Services</b>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <div className="row mx-5 ">
                      {medicalRecords.medical_records &&
                        medicalRecords.medical_records.map((item, idx) => {
                          return (
                            <div
                              key={idx}
                              className="col-6 row mx-0 my-3 d-flex align-items-center"
                            >
                              <div className="col-12">
                                <Form
                                  className={`checkbox_group ${recordsObj[activeKey] &&
                                    checkDisableState(
                                      item.is_disable ? item.is_disable : null
                                    )
                                    ? "disable_div"
                                    : ""
                                    }`}
                                >
                                  <Form.Check
                                    inline
                                    className={`${default_Checked(item)
                                      ? " "
                                      : " background_clr "
                                      }`}
                                    checked={
                                      recordsObj[item.key] ? true : false
                                    }
                                    label={
                                      <p className="m-0">
                                        {item.title}{" "}
                                        {item.addl_key ? (
                                          <span className="size_vsm">
                                            {" "}
                                            {item.addl_key}
                                          </span>
                                        ) : (
                                          ""
                                        )}
                                      </p>
                                    }
                                    name="group1"
                                    type={`checkbox`}
                                    id={`inline-${item.key}-1`}
                                    onChange={(e) => {
                                      checkboxHandler(
                                        e.target.checked,
                                        item,
                                        "medicalRecords"
                                      );
                                    }}
                                  />
                                </Form>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
          </div>

          <div className="row mx-0 my-4 col-12 d-flex justify-content-center">
            <div
              className={`col-lg-10 p-0 col-sm-11 col-md-11 ${recordsObj["medical_record_retrieval"] ? "disable_div" : ""
                }`}
            >
              <Accordion
                expanded={expandedAccordion === 2}
                onChange={handleAccordionChange(2)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>
                    <b className="sizem">Special Reports (Optional)</b>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <div className="row mx-5 ">
                      {medicalRecords.special_reports &&
                        medicalRecords.special_reports.map((item, idx) => {
                          return (
                            <div
                              key={idx}
                              className="col-6 row mx-0 my-3 d-flex align-items-center"
                            >
                              <div className="col-12">
                                <Form
                                  className={`checkbox_group ${recordsObj[activeKey] &&
                                    checkDisableState(
                                      item.is_disable ? item.is_disable : null
                                    )
                                    ? "disable_div"
                                    : ""
                                    }`}
                                >
                                  <Form.Check
                                    className={`${default_Checked(item)
                                      ? " "
                                      : " background_clr "
                                      }`}
                                    inline
                                    checked={default_Checked(
                                      item,
                                      "special_reports"
                                    )}
                                    label={
                                      <p className="m-0 rel_position">
                                        {item.title}{" "}
                                        {item.is_free ? (
                                          <span className="size_vsm abs_position px-1">
                                            Free{" "}
                                          </span>
                                        ) : (
                                          ""
                                        )}
                                      </p>
                                    }
                                    name="group1"
                                    type={`checkbox`}
                                    id={`inline-${item.key}-1`}
                                  />
                                </Form>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
          </div>

          <div className="row mx-0 my-4 col-12 d-flex justify-content-center">
            <div className="col-lg-10 p-0 col-sm-11 col-md-11">
              <Accordion
                expanded={expandedAccordion === 3}
                onChange={handleAccordionChange(3)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>
                    <b className="sizem">Technical Services (Optional)</b>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <div className="row mx-5 ">
                      {medicalRecords.technical_services &&
                        medicalRecords.technical_services.map((item, idx) => {
                          return (
                            <div
                              key={idx}
                              className="col-6 row mx-0 my-3 d-flex align-items-center"
                            >
                              <div className="col-12">
                                <Form
                                  className={`checkbox_group ${recordsObj[activeKey] &&
                                    checkDisableState(
                                      item.is_disable ? item.is_disable : null
                                    )
                                    ? "disable_div"
                                    : ""
                                    }`}
                                >
                                  <Form.Check
                                    className={`${default_Checked(item)
                                      ? " "
                                      : " background_clr "
                                      }`}
                                    inline
                                    checked={default_Checked(item)}
                                    onChange={(e) => {
                                      if (
                                        item.auto_enabled &&
                                        item.auto_enabled.includes(activeKey)
                                      ) {
                                        e.preventDefault();
                                      } else {
                                        e.target.checked = e.target.checked;
                                      }
                                    }}
                                    label={
                                      <p className="m-0 rel_position">
                                        {item.title}{" "}
                                        {default_Checked(item) &&
                                          item.is_free ? (
                                          <span className="size_vsm abs_position px-1">
                                            Free{" "}
                                          </span>
                                        ) : (
                                          ""
                                        )}
                                      </p>
                                    }
                                    name="group1"
                                    type={`checkbox`}
                                    id={`inline-${item.key}-1`}
                                  />
                                </Form>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
          </div>
          <div className="row mx-0 my-4 mb-5 col-12 d-flex justify-content-center">
            <div className="col-lg-10 p-0 col-sm-11 col-md-11">
              <Form>
                <Form.Check
                  inline
                  defaultChecked={true}
                  label={
                    <p className="m-0 sizes">
                      <b>
                        By clicking this, I hereby agree to the{" "}
                        <span className="text-primary">
                          {" "}
                          Terms & Conditions
                        </span>{" "}
                      </b>
                    </p>
                  }
                  name="group1"
                  type={`checkbox`}
                  id={`inline-terms_condtn-1`}
                />
              </Form>
              <div className=" d-flex justify-content-center">
                <button type="button" class="btn btn-primary">Submit</button>

              </div>
            </div>
          </div>

        </div>
      </div>


      <div className="px-5 bottom_chat_icon">
        <img src="/img/Layer_x0020_1 (1).png" />
      </div>


    </div>
  );
};

export default ServiceContainer;