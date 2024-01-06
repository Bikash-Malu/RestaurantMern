import React, { useEffect, useState } from 'react'
import LayoutPage from '../Components/Defaultlayout'
import axios from 'axios';
import { Modal, Button, Table, Form, Input, Select, message } from "antd";

import {
  DeleteOutlined,
  EditOutlined
} from "@ant-design/icons";
import { useDispatch } from 'react-redux';
const Items = () => {
  const dispatch = useDispatch();
  const [item, setitem] = useState([]);
  const[popup,setpopup]=useState(false);
  const[edititem,setedititem]=useState(null);
  useEffect(() => {
    getallitem();
    deleteitem();
  }, []);
  const getallitem = async () => {
   await axios
      .get("http://localhost:1200/items")
      .then((res) => {
        // console.log(res.data);
        
        // setpopup(false)
        setitem(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleOk = () => {
    alert("click")
  };

  const handlesubmit=(value)=>{
    if(edititem===null)
    {
    try{
      axios.post("http://localhost:1200/save",{...value}).then((res)=>{
        message.success("item added succesfully")
        window.location.reload()
       value=null;
        console.log(res)
    
    
    }).catch((err)=>{
      console.log(err)
    })
    }
    catch(error){
      console.log(error)
    }
  }
  else{
    try{
      axios.put(`http://localhost:1200`,{...value,itemId:edititem._id}).then((res)=>{
        message.success("update sucessfully")
        window.location.reload()
        console.log(res)
      }).catch((err)=>{
        console.log(err)
      })
    }
    catch(error){
      console.log(error)
    }
  }
}

  const deleteitem=(id)=>{
  axios.delete(`http://localhost:1200/${id}`).then((res)=>{
    console.log(res)
    message.success("deleted succesfully")
    deleteitem();
  }).catch((err)=>{
    console.log(err)
  })
  }
  const columns = [
    { title: "Name", dataIndex: "name" },
    {
      title: "Image",
      dataIndex: "image",
      render: (image, record) => (
        <img src={image} alt={record.name} height="60" width="60" style={{borderRadius:'30%'}}/>
      ),
    },
    { title: "Price", dataIndex: "price" },
    
    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <>
        <DeleteOutlined
        onClick={()=>{deleteitem(id)}}
          style={{ cursor: "pointer",marginRight:'8px' }}
        />
        <EditOutlined 
        onClick={()=>{setedititem(record); setpopup(true)}}
        style={{cursor:'pointer'}} />
        </>
      ),
    },
  ];
  return (
    <div>
      <LayoutPage>
        <div className=" d-flex justify-content-between">
        <h1 style={{color:'black'}}>items</h1>
        <Button onClick={()=>setpopup(true)} >Add the Item</Button>
        </div>
      <Table columns={columns} dataSource={item} bordered />

      {
        popup&&(
        <Modal title={`${edititem!==null ?'edit item':'add new item'}`} open={popup}   onOk={handleOk} onCancel={()=>{setpopup(false);setedititem(null)}}>
<Form
          initialValues={edititem}
              layout="vertical"
              onFinish={handlesubmit}
            >
              <Form.Item name="name" label="Name">
                <Input />
              </Form.Item>
              <Form.Item name="price" label="Price">
                <Input />
              </Form.Item>
              <Form.Item name="image" label="Image URL">
                <Input />
              </Form.Item>
              <Form.Item name="category" label="Category">
                <Select>
                  <Select.Option value="drinks">Drinks</Select.Option>
                  <Select.Option value="rice">Rice</Select.Option>
                  <Select.Option value="noodles">Noodels</Select.Option>
                </Select>
              </Form.Item>
  
              <div className="d-flex justify-content-end">
                <Button type="primary" htmlType="submit">
                  SAVE
                </Button>
              </div>
            </Form>
        </Modal>
          
        )
      }
      </LayoutPage>
    </div>
  )
}

export default Items