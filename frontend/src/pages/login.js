import React, {useState} from "react"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import {
    MDBBtn,
    MDBContainer,
    MDBInput,
    MDBIcon,
    MDBRow,
    MDBCol,
} from 'mdb-react-ui-kit';
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../features/authAction'
import { useEffect } from 'react'
import Error from '../components/error'
import Spinner from '../components/spinner'
import Cookies from "js-cookie";

export default function Login(){
    const { loading, userInfo, error } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const role = Cookies.get('role')

    const { register, handleSubmit } = useForm()

    const navigate = useNavigate()

    // redirect authenticated user to profile screen
    // useEffect(() => {
    //   if (userInfo && role==='karyawan') {
    //     window.location='/dashboard'
    //   } else if (userInfo && role==='hr') {
    //     window.location='/dashboardHr'
    //   }
    // }, [navigate, userInfo])

    if(userInfo && role=='karyawan'){
      window.location='/dashboard'
    } 

    if(userInfo && role=='hr'){
      window.location='/dashboardHr'
    }

    const submitForm = (data) => {
      dispatch(userLogin(data))
    }

    return(
      <MDBContainer fluid style={{position: 'fixed'}}>
      <MDBRow>

        <MDBCol sm='6'>

          <div className='d-flex flex-row ps-5 pt-lg-5'>
            <MDBIcon className="pt-lg-5"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png" style={{height: '50px', width: '60px'}}/></MDBIcon>
            <span className="h1 fw-bold mb-0 pt-lg-5 pb-lg-5 mx-3">React</span>
          </div>

          <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-lg-5'>

            <h3 className="fw-normal mb-3 ps-5 pb-3 pt-lg-5 pb-lg-5 text-xl">Hello, Please Login</h3>
            {error && <Error>{error}</Error>}

            <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Email' type='email' size="lg" 
            {...register('email')}/>
            <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Password' type='password' size="lg"
            {...register('password')}/>

            <MDBBtn className="mb-4 px-5 mx-5 w-100" size='lg' style={{backgroundColor: '#1D4ED8'}} disabled={loading} onClick={handleSubmit(submitForm)}> {loading ? <Spinner /> : 'Login'}</MDBBtn>
            <p className='ms-5'>Don't have an account? <Link to="/register" className="link" style={{color: '#1D4ED8'}}>Register here</Link></p>

          </div>

        </MDBCol>

        <MDBCol sm='6' className='d-none d-sm-block px-0'>
          <img src="https://img.freepik.com/free-vector/computer-login-concept-illustration_114360-7962.jpg?w=826&t=st=1677032898~exp=1677033498~hmac=afe04fa920dc4a86384f58714d20663d116ea34511c274272b91d24b7c3fecbc" style={{display: 'flex', position: 'fixed', width: '50%', height: '100%'}} />
        </MDBCol>

      </MDBRow>

    </MDBContainer>
    )
}