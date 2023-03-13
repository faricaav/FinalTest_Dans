import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Modal, Button, Form, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Card from "../components/cardHr";
import Cookies from "js-cookie";
import { faFilter, faPenToSquare, faTrash, faChevronRight, faChevronLeft, faPlus, faXmark, faUserGroup } from "@fortawesome/free-solid-svg-icons"

export default function Pengumuman(){
    const [pengumuman, setPengumuman]=useState([]); 
    let [token, setToken]=useState("");
    const [isModalOpen, setIsModalOpen]=useState(false);
    const [title, setTitle]=useState("");
    const [description, setDescription]=useState("");
    const [action, setAction]=useState("");
    const [id_pengumuman, setIdPengumuman] = useState(0);
    const navigate = useNavigate();

    token = Cookies.get("token")

    useEffect(() => {
        getPengumuman()
    }, []);

    const getPengumuman = () => {
        axios.get("http://localhost:8080/hr/announcement/", {
          headers: {
            Authorization: `Bearer ${token}`,
          }})
        .then((response) => {
          const dataRes = response.data
          setPengumuman(dataRes)
        })
    }

    const handleEdit = (item) => {
        let url = "http://localhost:8080/hr/announcement" + `/${item.id_pengumuman}`
        axios.get(url, {
            headers: {
              Authorization: `Bearer ${token}`,
            }})
          .then(res => {
            return(
              setIsModalOpen (true),
              setIdPengumuman(item.id_pengumuman),
              setTitle (item.title),
              setDescription (item.description),
              setAction ("update")
            )
          })
          .catch(error => console.log(error))
    }

    const handleClose = () => {
        setIsModalOpen (false)
    }

    const Drop = (item) => {
        let url = "http://localhost:8080/hr/announcement" + `/${item.id_pengumuman}`
        if (window.confirm("Are you sure to delete this data?")) {
          axios.delete(url, {
            headers: {
              Authorization: `Bearer ${token}`,
            }})
            .then(res => {
              window.location='/dashboardHr'
            })
            .catch(error => console.log(error))
        }
    }

    const handleSave = (e) => {
        e.preventDefault()
    
        let form = {
            title: title,
            description: description
        }
    
        if (action === "update") {
            axios.put("http://localhost:8080/hr/announcement" + `/${id_pengumuman}`, form, {
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
        <div className="flex-1">
            <div className="card-body mx-5 mt-n5">
                    <br/>
                    <div className="row">
                        {pengumuman.map( (item, index) => {
                            return(
                            <Card key={index} data-testid="list-item"
                            title={item.title}
                            deskripsi={item.description.length > 50 ?
                                `${item.description.substring(0, 50)}...` : item.description}
                            onEdit={()=>handleEdit(item)}
                            onDrop={()=>Drop(item)}
                            />
                            )
                        })}
                    </div>

                    <Modal
                        id='kt_modal_create_app'
                        tabIndex={-1}
                        aria-hidden='true'
                        dialogClassName='modal-dialog modal-dialog-centered'
                        show={isModalOpen}
                        onHide={handleClose}
                        >
                        <div className='modal-header'>
                        <h2 className="fw-bold fs-5">Edit Announcement</h2>
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
                                <span className='required'>Title</span>
                            </label>
                            <input
                                type='text'
                                className='form-control form-control-lg form-control-solid'
                                name='title'
                                placeholder=''
                                value={title}
                                onChange={event => {
                                setTitle(event.target.value)}}
                            />
                            {!title && (
                                <div className='fv-plugins-message-container text-danger text-sm'>
                                <div data-field='title' data-validator='notEmpty' className='fv-help-block'>
                                    Title is required
                                </div>
                                </div>
                            )}
                            </div>
                            {/*end::Form Group */}

                            {/*begin::Form Group */}
                            <div className='fv-row mt-4 mb-2'>
                            <label className='d-flex align-items-center fs-5 fw-semibold mb-2'>
                                <span className='required'>Description</span>
                            </label>
                            <textarea
                                type='text'
                                className='form-control form-control-lg form-control-solid'
                                name='description'
                                placeholder=''
                                value={description}
                                onChange={event => {
                                setDescription(event.target.value)}}
                            />
                            {!description && (
                                <div className='fv-plugins-message-container text-danger text-sm'>
                                <div data-field='description' data-validator='notEmpty' className='fv-help-block'>
                                    Description is required
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
                                disabled={!title || !description }
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