import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { EyeOutlined } from "@ant-design/icons";
import ReactToPrint from "react-to-print";
import { useReactToPrint } from "react-to-print";
import axios from "axios";
import { Modal, Button, Table } from "antd";
import "../styles/InvoiceStyles.css";
import LayoutPage from "../Components/Defaultlayout";
const BillsPage = () => {
  const componentRef = useRef();
  const dispatch = useDispatch();
  const [billsData, setBillsData] = useState([]);
  const [popupModal, setPopupModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const getAllBills = async () => {
    try {
    await axios.post("http://localhost:1200/bikash").then((res)=>{
        console.log(res.data)
        setBillsData(res.data)
      })
    } catch (error) {
      dispatch({ type: "HIDE_LOADING" });
      console.log(error);
    }
  };
  //useEffect
  useEffect(() => {
    getAllBills();
    //eslint-disable-next-line
  }, []);
  //print function
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  //able data
  const columns = [
    { title: "ID ", dataIndex: "_id" },
    {
      title: "Cutomer Name",
      dataIndex: "CustomerName",
    },
    { title: "Contact No", dataIndex: "custombernumber" },
    { title: "Total", dataIndex: "total" },
    {title:'items',dataIndex:'carditem',
    render: (id, record) => (
      <div>
     { record.carditem.map((data,i)=>{
        console.log(data.name);
        <div>{data.name}</div>
        
      })}
      </div>
    ),
},
    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <EyeOutlined
            style={{ cursor: "pointer" }}
            onClick={() => {
              setSelectedBill(record);
              setPopupModal(true);
            }}
          />
        </div>
      ),
    },
  ];
  console.log(selectedBill);
  return (
    <LayoutPage>
      <div className="d-flex justify-content-between">
        <h1 style={{color:'black'}}>Invoice list</h1>
      </div>

      <Table columns={columns} dataSource={billsData} bordered />

      {popupModal && (
        <Modal
          width={400}
          pagination={false}
          title="Invoice Details"
          visible={popupModal}
          onCancel={() => {
            setPopupModal(false);
          }}
          footer={false}
        >
          {/* ============ invoice modal start ==============  */}
          <div id="invoice-POS" ref={componentRef}>
            <center id="top">
              <div className="logo" />
              <div className="info">
                <h2>Bikash Pos</h2>
                <p> Contact : 9583856595 | Bhubaneswar Odisha</p>
              </div>
              {/*End Info*/}
            </center>
            {/*End InvoiceTop*/}
            <div id="mid">
              <div className="mt-2">
                <p>
                  Customer Name : <b>{selectedBill.CustomerName}</b>
                  <br />
                  Phone No : <b>{selectedBill.custombernumber}</b>
                  <br />
                 
                  <br />
                </p>
                <hr style={{ margin: "5px" }} />
              </div>
            </div>
            {/*End Invoice Mid*/}
            <div id="bot">
              <div id="table">
                <table>
                  <tbody>
                    <tr className="tabletitle">
                      <td className="item">
                        <h6>Item</h6>
                      </td>
                      <td className="Hours">
                        <h6>Qty</h6>
                      </td>
                      <td className="Rate">
                        <h6>Price</h6>
                      </td>
                      <td className="Rate">
                        <h6>Total</h6>
                      </td>
                    </tr>
                    {selectedBill.carditem.map((item) => (
                      <>
                      
                        <tr className="service">
                          <td className="tableitem">
                            <p className="itemtext">{item.name}</p>
                          </td>
                          <td className="tableitem">
                            <p className="itemtext">{item.quantity}</p>
                          </td>
                          <td className="tableitem">
                            <p className="itemtext">{item.price}</p>
                          </td>
                          <td className="tableitem">
                            <p className="itemtext">
                              {item.quantity * item.price}
                            </p>
                          </td>
                        </tr>
                      </>
                    ))}

                    <tr className="tabletitle">
                      <td />
                      <td />
                      
                      <td className="payment text-center">
                        <h6 className="text-center">
                         total- <b>{selectedBill.total}</b>
                        </h6>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/*End Table*/}
              <div id="legalcopy">
                <p className="legal text-center">
                  <strong>Thank you for your order!</strong> 
                  <b> bikashmalu1@gmail.com</b>
                </p>
              </div>
            </div>
            {/*End InvoiceBot*/}
          </div>
          {/*End Invoice*/}
          <div className="d-flex justify-content-end mt-3">
            <Button type="primary" onClick={handlePrint}>
              Print
            </Button>
          </div>
          {/* ============ invoice modal ends ==============  */}
        </Modal>
      )}
    </LayoutPage>
  );
};

export default BillsPage;