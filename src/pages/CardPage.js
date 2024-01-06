import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  DeleteOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { Button, Modal, Table,Form,Input ,Select, message} from "antd";
import LayoutPage from "../Components/Defaultlayout";
import axios from "axios";

const CartPage = () => {
  const[count,setcount]=useState('');
  const[bill,setbill]=useState(false)
  const dispatch = useDispatch();
  const { cardItems } = useSelector((state) => state.rootReducer);
  //handle increament
  const handleIncreament = (record) => {
    dispatch({
      type: "UPDATE_CART",
      payload: { ...record, quantity: record.quantity + 1 },
    });
  };
  const handleDecreament = (record) => {
    if (record.quantity !== 1) {
      dispatch({
        type: "UPDATE_CART",
        payload: { ...record, quantity: record.quantity - 1 },
      });
    }
  };
  const columns = [
    { title: "Name", dataIndex: "name" },
    {
      title: "Image",
      dataIndex: "image",
      render: (image, record) => (
        <img src={image} alt={record.name} height="60" width="60" />
      ),
    },
    { title: "Price", dataIndex: "price" },
    {
      title: "Quantity",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <PlusCircleOutlined
            className="mx-3"
            style={{ cursor: "pointer" }}
            onClick={() => handleIncreament(record)}
          />
          <b>{record.quantity}</b>
          <MinusCircleOutlined
            className="mx-3"
            style={{ cursor: "pointer" }}
            onClick={() => handleDecreament(record)}
          />
        </div>
      ),
    },
    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <DeleteOutlined
          style={{ cursor: "pointer" }}
          onClick={() =>
            dispatch({
              type: "DELETE_FROM_CART",
              payload: record,
            })
          }
        />
      ),
    },
  ];
  useEffect(()=>{
    let temp=0;
    cardItems.forEach(item=>temp=temp+(item.price*item.quantity))
    setcount(temp)
  },[cardItems])
  const handlesubmit=(e)=>{
    axios.post("http://localhost:1200/add",{...e,total:count,carditem:cardItems}).then((res)=>{
      message.success('bill created')
      
      console.log(res)
    }).catch((err)=>{
      console.log(err)
    })
  }
  return (
    <LayoutPage>
      <h1 style={{color:'black'}}>Cart Page</h1>
<center>
      <Table columns={columns} dataSource={cardItems} bordered />
      <div className="d-flex flex-column align-item-end">
    <hr/>
    <h3 style={{color:'black'}}>sub total:-{count}</h3>
    <Button onClick={()=>setbill(true)}>Create Invoice</Button>
      </div>
      <Modal footer={false} onCancel={()=>setbill(false)} visible={bill}>
        <p>invoice model</p>
        <Form
        
              layout="vertical"
              onFinish={handlesubmit}
            >
              <Form.Item name="CustomerName" label="CustomerName">
                <Input/>
              </Form.Item>
              <Form.Item name="custombernumber" label="custombernumber">
                <Input />
              </Form.Item>
              <Form.Item name="payment" label="payment">
                <Select>
                  <Select.Option value="card">Card</Select.Option>
                  <Select.Option value="cash">Cash</Select.Option>
                </Select>
              </Form.Item>
              <div className="bill-it">
            <h5>sub total:-<b>{count}</b></h5>
              </div>
  
              <div className="d-flex justify-content-end">
                <Button type="primary" htmlType="submit">
                  SAVE
                </Button>
              </div>
            </Form>
      </Modal>
      </center>
    </LayoutPage>
  );
};

export default CartPage;