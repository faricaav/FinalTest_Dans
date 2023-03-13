import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Modal, Button, Form, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import moment from 'moment'
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import Cookies from "js-cookie";

export default function Absen(){
    const [absen, setAbsen]=useState([]); 
    let [id_user, setIdUser]=useState(0);
    const [tanggal, setTanggal]=useState("");
    const [jam_masuk, setJamMasuk]=useState("");
    const [jam_keluar, setJamKeluar]=useState("");
    const [isModalOpen, setIsModalOpen]=useState(false);
    const [action, setAction]=useState("");
    const [error, setError]=useState("");
    let [token, setToken]=useState("");
    const navigate = useNavigate();

    token = Cookies.get("token")
    id_user = Cookies.get('id_user')

    useEffect(() => {
        getAbsen()
    }, []);

    const getAbsen = () => {
        axios.get("http://localhost:8080/absen/byUser/" + id_user, {
          headers: {
            Authorization: `Bearer ${token}`,
          }})
        .then((response) => {
          const dataRes = response.data
          console.log(dataRes)
          setAbsen(dataRes)
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
          setJamMasuk(""),
          setJamKeluar (""),
          setAction ("insert")
        )
    }

    const handleCheckOut = (item) => {

        let form = {
          jam_keluar: moment().format('HH:mm:ss')
        }

        let url = "http://localhost:8080/absen/clockOut" + `/${item.id_absen}`
        
        if (window.confirm("are you sure to checkout?")) {
          axios.put(url, form, {
            headers: {
            Authorization: `Bearer ${token}`,
            }})
            .then(response => {
            window.location='/absen'
            })
            .catch(error => console.log(error))
        }
    }

    const handleSave = (e) => {
        e.preventDefault()

        let form = {
          id_user: id_user,
          tanggal: moment().format('YYYY-MM-DD'),
          jam_masuk: moment().format('HH:mm:ss')
        }

        axios.get("http://localhost:8080/absen/byUser/" + id_user, {
          headers: {
            Authorization: `Bearer ${token}`
          }},
          )
        .then((response) => {
          const dataRes = response.data
          const lastIndex = dataRes.length - 1;
          const formattedDate = moment(dataRes[lastIndex].tanggal).format("YYYY-MM-DD");
          console.log(formattedDate)
            if(formattedDate === moment().format("YYYY-MM-DD")){
                window.alert('you have already check in')
            } else if (moment().hour>10){
                window.alert('you can not check in now')
            } else {
                if(window.confirm('are you sure to check in now?')){
                    axios.post("http://localhost:8080/absen/clockIn", form, {
                        headers: {
                        Authorization: `Bearer ${token}`,
                        }})
                        .then(response => {
                        handleClose()
                        window.location='/absen'
                        })
                        .catch(error => console.log(error))
                }
            }
        })
    }

    return (
        <div className="flex-1">
        <div className={`card mx-auto col-11 mt-5 mb-5 rounded-3`}>
          {/* begin::Header */}
            <div className='card-header border-0 pt-3 flex items-center'>
                <h3 className='card-title align-items-start col-12 mt-3 mx-3'>
                    <span className='card-label fw-bold fs-3 mb-1'>Absen Data 
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
                        <th className='min-w-140px'>Jam Masuk</th>
                        <th className='min-w-140px'>Jam Keluar</th>
                        <th className='min-w-140px'>Check out</th>
                    </tr>
                    </thead>
                    {/* end::Table head */}
                    {/* begin::Table body */}
                    <tbody align="center">
                    {absen.length>0 &&
                    absen.map((item, index) => {
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
                            {item.jam_masuk}
                            {/* <span className='text-muted fw-semibold text-muted d-block fs-7'>Code: Paid</span> */}
                            </td>
                            <td className='text-dark fw-normal fs-6'>
                            {item.jam_keluar}
                            {/* <span className='text-muted fw-semibold text-muted d-block fs-7'>Code: Paid</span> */}
                            </td>
                            <td>
                            {moment().hour()<=19 && item.jam_keluar == null &&
                            <button
                                type='submit'
                                className='btn-lg text-white'
                                style={{backgroundColor: '#1D4ED8'}}
                                onClick={() => handleCheckOut(item)}
                            >
                                Check Out
                            </button>}
                            {moment().hour()>19 &&
                                <button
                                type='submit'
                                className='btn-lg text-white'
                                style={{backgroundColor: 'rgba(0,0,0,0.5)'}}
                                disabled={true}
                            >
                                Check Out
                            </button>
                            }
                            </td>
                        </tr>
                        )
                    })}{absen.length===0 &&
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
                {moment().hour() >= 6 && moment().hour() <= 10 && 
                <button
                    type='submit'
                    className='btn-lg text-white mt-2 mb-2 col-12'
                    style={{backgroundColor: '#1D4ED8'}}
                    onClick={e => handleSave(e)}
                >
                    Check In
                </button>}
                {moment().hour() > 10 && 
                <button
                    type='submit'
                    className='btn-lg text-white mt-2 mb-2 col-12'
                    onClick={e => handleSave(e)}
                    style={{backgroundColor: 'rgba(0,0,0,0.5)'}}
                    disabled={true}
                >
                    Check In
                </button>}
                {/* end::Table container */}
            </div>
            {/* begin::Body */}
      </div>
      </div>
    )
}