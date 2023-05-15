import React, { useState, useEffect, Fragment, useContext, useCallback } from "react";
import "./index.scss";
import { BsFillGridFill } from "react-icons/bs";
import { BsList } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import maleImg from "../../assets/images/male.png";
import feMaleImg from "../../assets/images/female.jpg";
import * as Yup from "yup";
import axiosClient from "../../api/axiosClient";
import { totalCostOrder, upperCaseFirstLetter } from "../../utils/helpers";
import Pagination from "../../components/commons/pagination";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { toast } from "react-toastify";
import { debounce } from 'lodash';

function Customer(props) {
  const listTab = [
    { icon: <BsFillGridFill />, name: "Card View", id: "card_view" },
    { icon: <BsList />, name: "List View", id: "list_view" },
    { icon: <AiOutlinePlus />, name: "New Customer", id: "new_customer" },
  ];
  const listTableField = [
    { id: "avatar", custom: true },
    { id: "firstName", name: "First Name" },
    { id: "lastName", name: "Last Name" },
    { id: "address", name: "Address" },
    { id: "city", name: "City" },
    { id: "state", name: "State", custom: true },
    { id: "orderTotals", name: "Order Total", custom: true },
    { id: "viewOrders", custom: true },
  ];

  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("card_view");
  const [customers, setCustomers] = useState([]);
  const [showCustomers, setShowCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [filterField, setFilterFiled] = useState("");
  const [listState, setListState] = useState([])

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
  });

  const CardView = (
    <div className="card_view">
      <div className="row d-flex justify-content-between">
        {showCustomers.map((cust, idx) => (
          <div className="item col-5 my-3" key={cust.id}>
            <div>
              <div
                className="header d-flex justify-content-between p-1"
                onClick={() => navigate(`${cust.id}/detail`)}
              >
                <span>
                  {upperCaseFirstLetter(cust.firstName) +
                    " " +
                    upperCaseFirstLetter(cust.lastName)}
                </span>
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`${cust.id}/edit`);
                  }}
                >
                  <BiEdit />
                </span>
              </div>
              <div className="content pb-2 d-flex">
                {cust.gender === "male" ? (
                  <img src={maleImg} alt="maleImg" />
                ) : (
                  <img src={feMaleImg} alt="feMaleImg" />
                )}
                <span className="d-flex flex-column py-2 ps-3">
                  <span>{cust.city} ,</span>
                  <span>{cust.state.name}</span>
                  <span
                    className="view_order"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`${cust.id}/orders`);
                    }}
                  >
                    View Orders
                  </span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ListView = (
    <div className="list_view">
      <table className="table">
        <thead>
          <tr>
            {listTableField.map((item, idx) => (
              <td className="mx-3" key={item.name}>
                {item.name}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {showCustomers.map((row) => (
            <tr
              key={row.id}
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`${row.id}/detail`)}
            >
              {listTableField.map((item, idx) => {
                if (!item.custom) {
                  return (
                    <td key={item.id}>{upperCaseFirstLetter(row[item.id])}</td>
                  );
                } else {
                  switch (item.id) {
                    case "avatar":
                      return (
                        <td key={item.id}>
                          {row.gender === "male" ? (
                            <img src={maleImg} alt="maleImg" />
                          ) : (
                            <img src={feMaleImg} alt="feMaleImg" />
                          )}
                        </td>
                      );
                    case "state":
                      return <td>{row.state.name}</td>;
                    case "orderTotals":
                      return <td>{totalCostOrder(row.orders)}</td>;
                    default:
                      break;
                  }
                }
              })}

              <td
                style={{ color: "#308fe9", cursor: "pointer" }}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`${row.id}/orders`);
                }}
              >
                View Orders
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const NewCustomer = (
    <div className="new_customer mt-3">
      <Formik
        initialValues={{}}
        validationSchema={validationSchema}
        onSubmit={(values) => handleAddCustomer(values)}
      >
        <Form className="form">
          <div className="mb-2">
            <label htmlFor="firstName">First Name:</label>
            <Field
              className="form-control"
              type="text"
              id="firstName"
              name="firstName"
            />
            <ErrorMessage
              className="err_mes"
              name="firstName"
              component="div"
            />
          </div>

          <div className="mb-2">
            <label htmlFor="lastName">Last Name:</label>
            <Field
              className="form-control"
              type="text"
              id="lastName"
              name="lastName"
            />
            <ErrorMessage className="err_mes" name="lastName" component="div" />
          </div>

          <div className="mb-2">
            <label htmlFor="address">Address:</label>
            <Field
              className="form-control"
              type="text"
              id="address"
              name="address"
            />
            <ErrorMessage className="err_mes" name="address" component="div" />
          </div>

          <div className="mb-2">
            <label htmlFor="city">City:</label>
            <Field className="form-control" type="text" id="city" name="city" />
            <ErrorMessage className="err_mes" name="city" component="div" />
          </div>

          <div className="mb-2">
            <label htmlFor="state">State:</label>
            <Field
              className="form-control"
              as="select" 
              type="text"
              id="state"
              name="state"
            >
              {listState.map((state,idx) => 
                <option key={state._id} value={state.name}>{state.name}</option>
              )}
            </Field>
            <ErrorMessage className="err_mes" name="state" component="div" />
          </div>

          <div className="action_btn my-3 d-flex justify-content-end">
            <span>
              <button
                type="button"
                className="btn btn-secondary me-2"
                onClick={() => navigate("../../")}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-success">
                Add
              </button>
            </span>
          </div>
        </Form>
      </Formik>
      <p className="view_all" onClick={() => navigate("../")}>
        View All Customer
      </p>
    </div>
  );

  const getDataPagination = (page, itemsPerPage, customers) => {
    if (customers.length < itemsPerPage) {
      return customers;
    } else {
      return customers.slice((page - 1) * itemsPerPage, page * itemsPerPage);
    }
  };

  const handleChangeItemsPerPage = (event) => {
    setItemsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const debouneFilter = useCallback(debounce(async (nextValue) => {
    const res = await axiosClient.get("customers", {
      params: {
        search : nextValue.toLowerCase()
      }
    },[]);
    if(res) {
      setCustomers(res)
    }
  }, 500), [])

  const handleFilterChange =  (e) => {
    setFilterFiled(e.target.value);
    debouneFilter(e.target.value)

  };

  const handleAddCustomer = async (values) => {
    const res = await axiosClient.post("customers", {...values});
    if(res){
      toast.success("Add customer success !", {
        autoClose: 500,
        onClose: () => {
            navigate("/")
        }
    })
    }
  }

  const handleActiveTab = (id) => {
    if (
      id === "new_customer" &&
      !JSON.parse(localStorage.getItem("user"))?.token
    ) {
      navigate("../login");
      return;
    }
    setActiveTab(id);
  };

  useEffect(() => {
    const fetchCustomers = async () => {
      const listCustomer = await axiosClient.get("customers")
      const listState = await axiosClient.get("states");
      setListState(listState);
      setCustomers(listCustomer);
    };
    fetchCustomers()
  }, []);

  useEffect(() => {
    setShowCustomers(getDataPagination(currentPage, itemsPerPage, customers));
  }, [currentPage, itemsPerPage, customers]);

  return (
    <div className="customer">
      <div className="navbar">
        <span className="ps-0">
          {listTab.map((tab, idx) => (
            <span
              className={`me-3 tab ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => handleActiveTab(tab.id)}
              key={tab.id}
            >
              {tab.icon}
              <span className="mx-1">{tab.name}</span>
            </span>
          ))}
        </span>
        {activeTab !== "new_customer" && (
          <div className="filter">
            <p className="mb-0">Filter</p>
            <input value={filterField} onChange={handleFilterChange} />
          </div>
        )}
      </div>
      <div className="content">
        {activeTab === "card_view" && CardView}
        {activeTab === "list_view" && ListView}
        {activeTab === "new_customer" && NewCustomer}
        {activeTab !== "new_customer" && customers.length > itemsPerPage && (
          <Pagination
            data={customers}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onHandleChangePage={(page) => handleChangePage(page)}
            onHandleChangeItemsPerPage={(e) => handleChangeItemsPerPage(e)}
          />
        )}
      </div>
    </div>
  );
}

export default Customer;
