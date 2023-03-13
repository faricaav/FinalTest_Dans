import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Modal, Button, Form, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Card from "../components/card";
import Cookies from "js-cookie";
import { faXmark } from "@fortawesome/free-solid-svg-icons"

export default function Pengumuman(){
    const [pengumuman, setPengumuman]=useState([]); 
    let [token, setToken]=useState("");
    const [isModalOpen, setIsModalOpen]=useState(false);
    const [title, setTitle]=useState("");
    const [description, setDescription]=useState("");
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

    const handleClose = () => {
        setIsModalOpen (false)
    }

    const getPengumumanById = (item) => {
        let url = "http://localhost:8080/hr/announcement" + `/${item.id_pengumuman}`
        axios.get(url, {
            headers: {
              Authorization: `Bearer ${token}`,
            }})
          .then(res => {
            return(
              setIsModalOpen (true),
              setTitle (item.title),
              setDescription (item.description)
            )
          })
          .catch(error => console.log(error))
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
                            detail={()=>getPengumumanById(item)}
                            />
                            )
                        })}
                    </div>
                </div>

                <Modal
                id='kt_modal_create_app'
                tabIndex={-1}
                aria-hidden='true'
                dialogClassName='modal-dialog modal-dialog-centered mw-500px'
                show={isModalOpen}
                onHide={handleClose}
            >
                <div className='modal-header'>
                <div className="flex gap-x-4 items-center">Detail Pengumuman</div>
                {/* begin::Close */}
                <div className='cursor-pointer no-printme' onClick={handleClose}>
                    <FontAwesomeIcon icon={faXmark}/>
                </div>
                {/* end::Close */}
                </div>

                <div className='modal-body table-responsive'>
                <table className='table no-margin '>
                    <tbody>
                    <tr>
                        <th scope='row'>
                        <h6>Title</h6>
                        </th>
                        <td>
                        <span>{title}</span>
                        </td>
                    </tr>
                    <tr>
                        <th scope='row'>
                        <h6>Description </h6>
                        </th>
                        <td>
                        <span>
                            {description}
                        </span>
                        </td>
                    </tr>
                    </tbody>
                    </table>
                </div>
            </Modal>
           
        </div>
    )
}