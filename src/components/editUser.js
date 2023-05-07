import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import SIgn_img from './SIgn_img'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';

const EditUser = () => {

    const history = useNavigate();
    const [data, setData] = useState(() => {
        return JSON.parse(localStorage.getItem('userDB')) || []
    });

    let params  = useParams();

    const obj  = data.filter((x)=>{
        return x.id === parseInt(params.id)
    })[0]

    // const [data, setData] = useState([])
    const [inpval, setInpval] = useState({
        id:obj.id,
        name:obj.name,
        email: obj.email,
        password:obj.password,
        userLevel: obj.userLevel
    })

    const getdata = (e) => {
        const { value, name } = e.target;
        setInpval(() => {
            return {
                ...inpval,
                [name]: value
            }
        })
    }

    const addData = (e) => {
        e.preventDefault();
        const { name, email, password } = inpval;

        if (name === "") {
            toast.error(' name field is requred!', {
                position: "top-center",
            });
        } else if (email === "") {
            toast.error('email field is requred', {
                position: "top-center",
            });
        } else if (!email.includes("@")) {
            toast.error('plz enter valid email addres', {
                position: "top-center",
            });
        } else if (password === "") {
            toast.error('password field is requred', {
                position: "top-center",
            });
        } else if (password.length < 5) {
            toast.error('password length greater five', {
                position: "top-center",
            });
        } else {
            setData([
                ...data.map((x)=>{
                    if(x.id === parseInt(params.id)){
                        return{...x,...inpval}
                    }
                    return x
                })
            ])
            setTimeout(() => {
                history("/details")
            }, 1000)
        }

    }

    useEffect(() => {
        localStorage.setItem("userDB", JSON.stringify(data))
    }, [data])

    return (
        <>
            <div className="container mt-3">
                <section className='d-flex justify-content-between'>
                    <div className="left_data mt-3 p-3" style={{ width: "100%" }}>
                        <h3 className='text-center col-lg-6'>Edit User</h3>
                        <Form >
                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">

                                <Form.Control type="text" value={inpval.name} name='name' onChange={getdata} placeholder="Enter Your Name" />
                            </Form.Group>
                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">

                                <Form.Control type="email" value={inpval.email} name='email' onChange={getdata} placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-6" controlId="userLevel">
                            <Form.Select  aria-label="Default select example" value={inpval.userLevel} name="userLevel" onChange={getdata}>
                                <option>User Level</option>
                                <option value="1">User</option>
                                <option value="2">Admin</option>
                            </Form.Select>
                            </Form.Group>


                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicPassword">

                                <Form.Control type="password" name='password' value={inpval.password} onChange={getdata} placeholder="Password" />
                            </Form.Group>

                            <Button variant="primary" className='col-lg-6' onClick={addData} style={{ background: "rgb(67, 185, 127)" }} type="submit">
                                Submit
                            </Button>
                        </Form>
                    </div>
                </section>
                <ToastContainer />
            </div>
        </>
    )
}

export default EditUser