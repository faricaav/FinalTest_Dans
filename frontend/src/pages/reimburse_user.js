import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Modal, Button, Form, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faPenToSquare, faTrash, faChevronRight, faChevronLeft, faPlus, faXmark, faUserGroup } from "@fortawesome/free-solid-svg-icons"
import Cookies from "js-cookie";

export default function ReimburseUser(){
    const [reimburse, setReimburse]=useState([]); 
    let [id_user, setIdUser]=useState(0);
    const [tanggal, setTanggal]=useState("");
    const [nominal, setNominal]=useState(0);
    const [deskripsi, setDeskripsi]=useState("");
    const [isModalOpen, setIsModalOpen]=useState(false);
    const [action, setAction]=useState("");
    const [error, setError]=useState("");
    let [token, setToken]=useState("");
    const navigate = useNavigate();

    token = Cookies.get("token")
    id_user = Cookies.get('id_user')

    useEffect(() => {
        getReimburse()
    }, []);

    const getReimburse = () => {
        axios.get("http://localhost:8080/reimburse/byUser/" + id_user, {
          headers: {
            Authorization: `Bearer ${token}`,
          }})
        .then((response) => {
          const dataRes = response.data
          console.log(dataRes)
          setReimburse(dataRes)
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
          setNominal (0),
          setDeskripsi (""),
          setAction ("insert")
        )
    }

    const handleSave = (e) => {
        e.preventDefault()
    
        let form = {
          id_user: id_user,
          tanggal: tanggal,
          nominal: nominal,
          deskripsi: deskripsi
        }
    
        if (action === "insert") {
          axios.post("http://localhost:8080/reimburse", form, {
            headers: {
              Authorization: `Bearer ${token}`,
            }})
            .then(response => {
              handleClose()
              window.location='/reimburseUser'
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
                    <span className='card-label fw-bold fs-3 mb-1'>Reimbursement Data 
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
                        <th className='min-w-140px'>Reimbursement</th>
                        <th className='min-w-140px'>Deskripsi</th>
                        <th className='min-w-120px'>Status</th>
                    </tr>
                    </thead>
                    {/* end::Table head */}
                    {/* begin::Table body */}
                    <tbody align="center">
                    {reimburse.length>0 &&
                    reimburse.map((item, index) => {
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
                            Rp{item.nominal}
                            {/* <span className='text-muted fw-semibold text-muted d-block fs-7'>Code: Paid</span> */}
                            </td>
                            <td className='text-dark fw-normal fs-6'>
                            {item.deskripsi}
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
                    })}{reimburse.length===0 &&
                        <tr className="col-lg-12">
                        <td colSpan="6" className='text-danger fw-normal fs-6'>
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
                <h2 className="fw-bold fs-5">Add Reimbursement</h2>
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
                        <span className='required'>Nominal</span>
                    </label>
                    <input
                        type='number'
                        min={0}
                        className='form-control form-control-lg form-control-solid'
                        name='nominal'
                        placeholder=''
                        value={nominal}
                        onChange={event => {
                        setNominal(event.target.value)}}
                    />
                    {!nominal && (
                        <div className='fv-plugins-message-container text-danger text-sm'>
                        <div data-field='nominal' data-validator='notEmpty' className='fv-help-block'>
                            Nominal is required
                        </div>
                        </div>
                    )}
                    </div>
                    {/*end::Form Group */}

                    {/*begin::Form Group */}
                    <div className='fv-row mt-4 mb-2'>
                    <label className='d-flex align-items-center fs-5 fw-semibold mb-2'>
                        <span className='required'>Deskripsi</span>
                    </label>
                    <input
                        type='text'
                        className='form-control form-control-lg form-control-solid'
                        name='deskripsi'
                        placeholder=''
                        value={deskripsi}
                        onChange={event => {
                        setDeskripsi(event.target.value)}}
                    />
                    {!deskripsi && (
                        <div className='fv-plugins-message-container text-danger text-sm'>
                        <div data-field='deskripsi' data-validator='notEmpty' className='fv-help-block'>
                            Deskripsi is required
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
                        disabled={!tanggal || !deskripsi || !nominal }
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
