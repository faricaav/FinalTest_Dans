import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Modal, Button, Form, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons"
import Cookies from "js-cookie";

export default function LemburUser(){
    const [lembur, setLembur]=useState([]); 
    let [id_user, setIdUser]=useState('');
    const [tanggal, setTanggal]=useState("");
    const [alasan, setAlasan]=useState("");
    const [isModalOpen, setIsModalOpen]=useState(false);
    const [action, setAction]=useState("");
    const [error, setError]=useState("");
    let [token, setToken]=useState("");
    const navigate = useNavigate();

    token = Cookies.get("token")
    id_user = Cookies.get('id_user')

    useEffect(() => {
        getLembur()
    }, []);

    const getLembur = () => {
        axios.get("http://localhost:8080/lembur/byUser/" + id_user, {
          headers: {
            Authorization: `Bearer ${token}`,
          }})
        .then((response) => {
          const dataRes = response.data
          console.log(dataRes)
          setLembur(dataRes)
        })
    }

    const handleClose = () => {
        setIsModalOpen (false)
    }

    const handleAdd = () => {
        return(
          setIsModalOpen (true),
          setIdUser (""),
          setTanggal (""),
          setAlasan (""),
          setAction ("insert")
        )
    }

    const handleSave = (e) => {
        e.preventDefault()
    
        let form = {
          id_user: id_user,
          tanggal: tanggal,
          alasan: alasan
        }
    
        if (action === "insert") {
          axios.post("http://localhost:8080/lembur", form, {
            headers: {
              Authorization: `Bearer ${token}`,
            }})
            .then(response => {
              handleClose()
              window.location='/lemburUser'
            })
            .catch(error => console.log(error))
        } 
        setIsModalOpen(false)
    }

    return (
        <div className="flex-1">
        <div className={`card mx-auto col-11 mt-5 mb-5 rounded-3`}>
          {/* begin::Header */}
            <div className='card-header border-0 pt-3 flex items-center'>
                <h3 className='card-title align-items-start col-12 mt-3 mx-3'>
                    <span className='card-label fw-bold fs-3 mb-1'>Overtime Data 
                        <button
                        className="btn btn-sm btn-primary ml-3"
                        style={{borderRadius:'12px'}}
                        data-toggle="modal"
                        data-target="#modal"
                        onClick={() => handleAdd()}
                        >
                            <FontAwesomeIcon icon={faPlus}/>
                        </button>
                    </span>
                    </h3>
            </div>
            {/* end::Header */}
            {/* begin::Body */}
            <div className='card-body py-3'>
                {/* begin::Table container */}
                <div className='table-responsive'>
                {/* begin::Table */}
                <table className='table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3'>
                    {/* begin::Table head */}
                    <thead>
                    <tr className='fw-bold text-muted' align="center">
                        <th className='min-w-50px'>No</th>
                        <th className='min-w-140px'>Nama</th>
                        <th className='min-w-140px'>Tanggal</th>
                        <th className='min-w-140px'>Alasan</th>
                        <th className='min-w-120px'>Status</th>
                    </tr>
                    </thead>
                    {/* end::Table head */}
                    {/* begin::Table body */}
                    <tbody align="center">
                    {lembur.length>0 &&
                    lembur.map((item, index) => {
                        return (
                        <tr key={index}>
                            <td className='text-dark fw-normal fs-6'>
                            {index+1}
                            </td>
                            <td className='text-dark fw-normal fs-6'>
                            {item.users.name}
                            {/* <span className='text-muted fw-semibold text-muted d-block fs-7'>Code: PH</span> */}
                            </td>
                            <td className='text-dark fw-normal fs-6'>
                            {item.tanggal}
                            {/* <span className='text-muted fw-semibold text-muted d-block fs-7'>Code: Paid</span> */}
                            </td>
                            <td className='text-dark fw-normal fs-6'>
                            {item.alasan}
                            {/* <span className='text-muted fw-semibold text-muted d-block fs-7'>Code: Paid</span> */}
                            </td>
                            <td>
                                {item.status === "pending" && (
                                <Badge bg="warning" className="mt-2 mb-2 text-md fw-normal">Pending</Badge>
                                )}
                                {item.status === "approved" && (
                                <Badge bg="success" className="mt-2 mb-2 text-md fw-normal">Approved</Badge>
                                )}
                                {item.status === "reject" && (
                                <Badge bg="danger" className="mt-2 mb-2 text-md fw-normal">Rejected</Badge>
                                )}
                            </td>
                        </tr>
                        )
                    })}{lembur.length===0 &&
                        <tr className="col-lg-12">
                        <td colSpan="5" className='text-danger fw-normal fs-6'>
                            Data not found
                        </td>
                        </tr>
                    }
                    </tbody>
                    {/* end::Table body */}
                </table>
                {/* end::Table */}
                </div>
                {/* end::Table container */}
            </div>
            {/* begin::Body */}

            <Modal
                id='kt_modal_create_app'
                tabIndex={-1}
                aria-hidden='true'
                dialogClassName='modal-dialog modal-dialog-centered'
                show={isModalOpen}
                onHide={handleClose}
                >
                <div className='modal-header'>
                <h2 className="fw-bold fs-5">Add Overtime</h2>
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
                        <span className='required'>Tanggal</span>
                    </label>
                    <input
                        type='date'
                        className='form-control form-control-lg form-control-solid'
                        name='tanggal'
                        placeholder=''
                        value={tanggal}
                        onChange={event => {
                        setTanggal(event.target.value)}}
                    />
                    {!tanggal && (
                        <div className='fv-plugins-message-container text-danger text-sm'>
                        <div data-field='username' data-validator='notEmpty' className='fv-help-block'>
                            Tanggal is required
                        </div>
                        </div>
                    )}
                    </div>
                    {/*end::Form Group */}

                    {/*begin::Form Group */}
                    <div className='fv-row mt-4 mb-2'>
                    <label className='d-flex align-items-center fs-5 fw-semibold mb-2'>
                        <span className='required'>Alasan</span>
                    </label>
                    <input
                        type='text'
                        className='form-control form-control-lg form-control-solid'
                        name='alasan'
                        placeholder=''
                        value={alasan}
                        onChange={event => {
                        setAlasan(event.target.value)}}
                    />
                    {!alasan && (
                        <div className='fv-plugins-message-container text-danger text-sm'>
                        <div data-field='password' data-validator='notEmpty' className='fv-help-block'>
                            Alasan is required
                        </div>
                        </div>
                    )}
                    </div>
                    {/*end::Form Group */}
                    <div>
                    <button
                        type='submit'
                        className='btn-lg text-white mt-2'
                        style={{backgroundColor: '#1D4ED8'}}
                        onClick={e => handleSave(e)}
                        disabled={!tanggal || !alasan }
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