import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import Error from '../components/error'
import Spinner from '../components/spinner'
import { registerUser } from '../features/authAction'
import {
  MDBBtn,
  MDBContainer,
  MDBInput,
  MDBIcon,
  MDBRow,
  MDBCol,
} from 'mdb-react-ui-kit';

export default function Register(){
  const { loading, userInfo, error, success } = useSelector(
    (state) => state.auth
  )
  const dispatch = useDispatch()

  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()

  useEffect(() => {
    // redirect authenticated user to profile screen
    if (userInfo) navigate('/dashboard')
    // redirect user to login page if registration was successful
    if (success) navigate('/')
  }, [navigate, userInfo, success])

  const submitForm = (data) => {
    // transform email string to lowercase to avoid case sensitivity issues in login
    dispatch(registerUser(data))
  }

  return (
    <MDBContainer fluid style={{position: 'fixed'}}>
      <MDBRow>

        <MDBCol sm='6'>

          <div className='d-flex flex-row ps-5 pt-lg-5'>
            <MDBIcon className="pt-lg-5"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png" style={{height: '50px', width: '60px'}}/></MDBIcon>
            <span className="h1 fw-bold mb-0 pt-lg-5 pb-lg-5 mx-3">React</span>
          </div>

          <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-lg-5'>

            <h3 className="fw-normal mb-3 ps-5 pb-3 pt-lg-5 pb-lg-5 text-xl">Hello, Please Register Your Account</h3>
            {error && <Error>{error}</Error>}

            <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Nama' type='text' size="lg" 
            {...register('name')}/>
            <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Email' type='email' size="lg" 
            {...register('email')}/>
            <select {...register("role")} className="mb-4 mx-5 px-2 w-100 pb-lg-2 pt-lg-2 border-3 rounded" size="lg">
              <option value="karyawan">Karyawan</option>
              <option value="hr">HR</option>
            </select>
            <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Password' type='password' size="lg"
            {...register('password')}/>

            <MDBBtn className="mb-4 px-5 mx-5 w-100" size='lg' style={{backgroundColor: '#1D4ED8'}} disabled={loading} onClick={handleSubmit(submitForm)}> {loading ? <Spinner /> : 'Register'}</MDBBtn>

          </div>

        </MDBCol>

        <MDBCol sm='6' className='d-none d-sm-block px-0'>
          <img src="https://img.freepik.com/free-vector/computer-login-concept-illustration_114360-7962.jpg?w=826&t=st=1677032898~exp=1677033498~hmac=afe04fa920dc4a86384f58714d20663d116ea34511c274272b91d24b7c3fecbc" style={{display: 'flex', position: 'fixed', width: '50%', height: '100%'}} />
        </MDBCol>

      </MDBRow>

    </MDBContainer>
  )
}