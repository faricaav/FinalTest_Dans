import { useSelector } from 'react-redux'
import "../styles/dashboard.css"
import { ImUser } from 'react-icons/im'
import { MdEmail } from 'react-icons/md'
import Pengumuman from './pengumuman_hr'
import { useState } from 'react'
import axios from 'axios'
import { Modal } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons"
import Cookies from 'js-cookie'

export default function DashboardHR(){
    const { userInfo } = useSelector((state) => state.auth)
    console.log(userInfo)
    const name = Cookies.get('name')
    const email = Cookies.get('email')
    const [isModalOpen, setIsModalOpen]=useState(false);
    const [file, setFile]=useState(null);
    const [action, setAction]=useState("");
    let [token, setToken]=useState("");
    token = Cookies.get('token');

    const handleAdd = () => {
        return(
          setIsModalOpen (true),
          setFile (null),
          setAction ("insert")
        )
    }

    const handleClose = () => {
        setIsModalOpen (false)
    }

    const handleSave = (e) => {
        e.preventDefault()
    
        let form = new FormData()
        form.append("file", file)
    
        if (action === "insert") {
            axios.post("http://localhost:8080/hr/announcement", form, {
                headers: {
                  Authorization: `Bearer ${token}`,
                }})
            .then(response => {
                handleClose()
                window.location='/dashboardHr'
            })
            .catch(error => console.log(error))
        }
        setIsModalOpen(false)
    }
    return (
        <div className="flex-1 p-7 mt-4">
            <div>
                <h1 className="text-2xl font-semibold mb-4" align="center">Hello {name}! <br/> Welcome Back, See Your Profile and Announcement Below </h1>
                <div role="heading" aria-level="2" className='card w-50 shadow p-2 mb-1 rounded mx-auto' style={{alignItems: 'center'}}>
                        <div style={{display: "flex", justifyContent: "center", marginTop: '10px'}}>
                        <div className="mx-2 text-xl"><ImUser /></div>
                        <span className="origin-left text-black pr-5">
                            Name : {name}
                        </span>
                            |
                        <div className="mx-2 text-xl pl-5"><MdEmail /></div>
                        <span className="origin-left text-black">
                            Email : {email}
                        </span>
                        </div>
                </div>
                <div className='mt-5'>
                    <Pengumuman/>
                </div>
                <div align='center'>
                <button
                    type='submit'
                    className='btn-lg text-white mt-2 mb-2 col-11'
                    style={{backgroundColor: '#1D4ED8'}}
                    onClick={() => handleAdd()}
                >
                    Add Announcement
                </button>
                </div>
                {/* <img className="mb-7 mx-auto" src="https://img.freepik.com/free-vector/ecommerce-internet-shopping-promotion-campaign_335657-2977.jpg?w=1380&t=st=1676962698~exp=1676963298~hmac=191c50ee7a9e0948632ffb2f58e3507f6d0ed91d935877a915f7391a92133b27" style={{width: "65%", height: "75%"}}/> */}
                <Modal
                id='kt_modal_create_app'
                tabIndex={-1}
                aria-hidden='true'
                dialogClassName='modal-dialog modal-dialog-centered'
                show={isModalOpen}
                onHide={handleClose}
                >
                <div className='modal-header'>
                <h2 className="fw-bold fs-5">Add Announcement</h2>
                    {/* begin::Close */}
                    <div onClick={handleClose} className='cursor-pointer'>
                        <FontAwesomeIcon icon={faXmark}/>
                    </div>
                    {/* end::Close */}
                </div>

                <div className='modal-body py-lg-10 px-lg-10' style={{margin: '25px'}}>
                <div className='current' data-kt-stepper-element='content'>
                <div className='w-500'>
                    {/*begin::Form Group */}

                    {/*begin::Form Group */}
                    <div className='fv-row mt-2 mb-2'>
                    <label className='d-flex align-items-center fs-5 fw-semibold mb-2'>
                        <span className='required'>File Excel</span>
                    </label>
                    <input
                        type='file'
                        className='form-control form-control-lg form-control-solid'
                        name='file'
                        placeholder=''
                        onChange={event => {setFile(event.target.files[0])}}
                    />
                    </div>
                    {/*end::Form Group */}

                    <div>
                    <button
                        type='submit'
                        className='btn-lg text-white mt-2'
                        style={{backgroundColor: '#1D4ED8'}}
                        onClick={e => handleSave(e)}
                    >
                        Submit
                    </button>
                    </div>
                    {/*end::Form Group */}
                </div>
                </div>
                </div>
            </Modal>
            </div>
        </div>
    )
}
