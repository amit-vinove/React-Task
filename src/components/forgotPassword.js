import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import SIgn_img from './SIgn_img'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';

const ForgotPassword = () => {

    const history = useNavigate();
    const [data, setData] = useState(() => {
        return JSON.parse(localStorage.getItem('userDB')) || []
    });

    // const [data, setData] = useState([])
    const [inpval, setInpval] = useState({
        email: '',
        password: '',
        confirmPassword:''
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
        const { email, password , confirmPassword} = inpval;

        if (email === "") {
            toast.error(' name field is requred!', {
                position: "top-center",
            });
        } else if (password != confirmPassword) {
            toast.error('Password should be same', {
                position: "top-center",
            });
        } else if (password === "") {
            toast.error('password field is requred', {
                position: "top-center",
            });
        } else if (password.length < 5) {
            toast.error('password length should be greater than five', {
                position: "top-center",
            });
        } else {
            setData([
                ...data.map((x) => {
                    if (x.email === inpval.email) {
                        return { ...x, password:inpval.password }
                    }
                    return x
                })
            ])
            setTimeout(() => {
                history("/login")
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
                        <h3 className='text-center col-lg-6'>Forgot Password</h3>
                        <Form >
                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">

                                <Form.Control type="email" name='email' onChange={getdata} placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicPassword">

                                <Form.Control type="text" name='password' onChange={getdata} placeholder="Password" />
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicPassword">

                                <Form.Control type="text" name='confirmPassword' onChange={getdata} placeholder="confirm Password" />
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

export default ForgotPassword