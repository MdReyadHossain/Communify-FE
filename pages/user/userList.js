import Drawer from '@/components/_drawer'
import Header from '@/components/_header'
import LayoutHome from '@/components/_layoutHome'
import ToastNotification from '@/components/_toast'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { FiUserPlus } from "react-icons/fi";

const UserList = ({ data }) => {
    const [profile, setProfile] = useState();
    const [jsonData, setJsonData] = useState(data);
    const [toast, setToast] = useState();
    const [toastError, setToastError] = useState(false);
    const router = useRouter();

    const handleSearch = async (text) => {
        try {
            let response;
            if (text == '') {
                response = await axios.get('http://localhost:3000/api/users', {
                    withCredentials: true
                });
            } else {
                response = await axios.get('http://localhost:3000/api/users/all/searchbyusername/' + text, {
                    withCredentials: true
                });
            }
            setJsonData(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const handleSentRequest = async (userId) => {
        try {
            const response = await axios.post('http://localhost:3000/api/users/friend/send/' + sessionStorage.getItem('userId'), {
                user: userId,
                withCredentials: true
            });
            if (response?.data?.status == 403) {
                setToast('Can not send request to this user!');
                setToastError(true);
            }
            else {
                setToast('Requst sent successfully!')
            }
            setTimeout(() => {
                setToast()
                setToastError(false);
            }, 3000);
            // setToast(response.)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (sessionStorage.getItem('userId')) {
            setProfile(sessionStorage.getItem('userName'));
        } else {
            router.push('/login');
        }
    }, [])

    return (
        <>
            <LayoutHome title={profile} profile={profile} handleSearch={handleSearch} />
            <Drawer>
                <div className='w-screen flex flex-col justify-center items-center'>
                    <h2 className='text-2xl py-2'>All Users</h2>
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Number</th>
                                <th>Action</th>
                                <th>Registered</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                jsonData?.map((item) => (
                                    item.user_name != profile && (
                                        <tr>
                                            <th>{item.user_id}</th>
                                            <td>{item.user_name}</td>
                                            <td>{item.email}</td>
                                            <td>{item.number}</td>
                                            <td>
                                                <button className="tooltip tooltip-bottom" data-tip='send request' onClick={() => handleSentRequest(item.user_id)}>
                                                    <FiUserPlus className='text-2xl text-green-600' />
                                                </button>
                                            </td>
                                            <td>{item?.registration_at}</td>
                                        </tr>
                                    )
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <ToastNotification title={toast} error={toastError} />
            </Drawer>
        </>
    )
}
export default UserList;

export async function getServerSideProps() {
    const res = await axios.get('http://localhost:3000/api/users');
    const data = await res.data;

    return { props: { data } }
}
