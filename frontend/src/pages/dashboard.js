import { useSelector } from 'react-redux'
import "../styles/dashboard.css"
import { ImUser } from 'react-icons/im'
import { MdEmail } from 'react-icons/md'
import Pengumuman from './pengumuman'
import Cookies from 'js-cookie'

export default function Dashboard(){
    const { userInfo } = useSelector((state) => state.auth)
    console.log(userInfo)
    const name = Cookies.get('name')
    const email = Cookies.get('email')
    // if(!localStorage.getItem('userToken')){
    //     localStorage.removeItem('userToken')
    //     localStorage.removeItem('name')
    //     localStorage.removeItem('email')
    //     localStorage.removeItem('role')
    //     localStorage.removeItem('id_user')
    //     window.location="/"
    // }
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
                {/* <img className="mb-7 mx-auto" src="https://img.freepik.com/free-vector/ecommerce-internet-shopping-promotion-campaign_335657-2977.jpg?w=1380&t=st=1676962698~exp=1676963298~hmac=191c50ee7a9e0948632ffb2f58e3507f6d0ed91d935877a915f7391a92133b27" style={{width: "65%", height: "75%"}}/> */}
            </div>
        </div>
    )
}
