import React from 'react'
import { Button, Card } from 'antd';
import { useDispatch } from 'react-redux';

const Listofitem = (props) => {
    const { Meta } = Card;
    const dispath=useDispatch();
    const handleAddtoCard=()=>{
      dispath({
        type:'AddtoCard',
        payload:{...props.item,quantity:1}
      })
      
    }
  return (
    <div>
      <Card className='mt-4'
    hoverable
    style={{ width: 240}}
    cover={<img alt="example" src={props.item.image} height={250}/>}
  
 >

    <Meta className='text-center' title={props.item.name}/>
    <div className='item-button'>
    <Button onClick={handleAddtoCard}>Add to Card</Button>

    </div>

  </Card>
    </div>
  )
}

export default Listofitem
