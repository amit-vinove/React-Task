import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom'

const Details = () => {

    const [logindata, setLoginData] = useState(() => {
        return JSON.parse(localStorage.getItem('user_login')) || []
      });

    const [userDB,setUserDB] = useState(()=>{
        return JSON.parse(localStorage.getItem('userDB')) || []
    })


    const history = useNavigate();


    const userlogout = ()=>{
        localStorage.removeItem("user_login")
        history("/login");
    }

    const handleDelete = (e,id)=>{
        const newArray = userDB.filter((data) => data.id !== id);
        setUserDB(newArray)

    }

    const addUser = ()=>{
        if(userDB.length < 10){
            history('/addUser')
        }
        else{
            alert("Maximum 10 Users can only be added")
        }
    }
    const editUser = (id)=>{
        history(`/editUser/${id}`)
    }

    useEffect(() => {
        localStorage.setItem("userDB", JSON.stringify(userDB))
    }, [userDB])


    return (
        <>
        <div style={{"display":"flex","justifyContent":"space-between","marginLeft":"15px","marginRight":"15px"}}> 
            <div>
            <h4>Details Page</h4>
            </div>
            <div>
            <h4>User : {logindata[0].name}</h4>
            <h4>Role : {logindata[0].userLevel === '1' ?'User':'Admin'}</h4>
                        <Button onClick={userlogout}>LogOut</Button>
            </div>
        </div>
<br/>
        {
            logindata[0].userLevel === '2' ? <Button variant='success' onClick = {addUser}>Add User</Button> :''
        }
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Password</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {
            logindata[0].userLevel === '1' ?  logindata && logindata.map((data,index)=>(
                <tr key={index}>
                <td>{index+1}</td>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.password}</td>
                <td><Button size="sm" variant="primary" onClick={(e)=>editUser(data.id)}>Edit</Button>{' '}</td>
                </tr>
            )):  userDB && userDB.map((data,index)=>(
                <tr key={index}>
                <td>{index+1}</td>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.password}</td>
                <td><Button size="sm" variant="primary" onClick={(e)=>editUser(data.id)}>Edit</Button>{' '}
                <Button size="sm" variant="danger" onClick={(e)=>handleDelete(e,data.id)} >Delete</Button>{' '}
                 </td>
                </tr>
            ))
        }
      </tbody>
    </Table>

        </>
    )
}

export default Details






















