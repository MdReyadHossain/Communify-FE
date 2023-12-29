import Drawer from '@/components/_drawer'
import Header from '@/components/_header'
import LayoutHome from '@/components/_layoutHome'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const Notification = () => {
    const [profile, setProfile] = useState();
    const [jsonData, setJsonData] = useState(null);
    const router = useRouter();

    useEffect(() => {
        getProfile();
        if (sessionStorage.getItem('userId')) {
            setProfile(sessionStorage.getItem('userName'));
        } else {
            router.push('/login');
        }
    }, [])

    async function getProfile() {
        try {
            const response = await axios.get('http://localhost:3000/api/users/notificatoins/' + sessionStorage.getItem('userId'), {
                withCredentials: true
            });
            const jsonData = response.data;
            setJsonData(jsonData);
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <>
            <LayoutHome title={'Notification'} profile={profile} />
            <Drawer>
                <div className='w-screen flex flex-col justify-center items-center'>
                    <h2 className='text-2xl py-2'>Notifications</h2>
                    {
                        jsonData?.map((item, index) => (
                            <div className="card w-96 bg-base-100 shadow-xl mb-1">
                                <div className="card-body">
                                    <h2 className="card-title">{item?.type}</h2>
                                    <p>{item?.notification}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </Drawer >
        </>
    )
}

export default Notification
