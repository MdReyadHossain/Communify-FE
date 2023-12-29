import Drawer from '@/components/_drawer';
import Header from '@/components/_header';
import LayoutHome from '@/components/_layoutHome';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FaUserTimes, FaUserPlus } from "react-icons/fa";

const Friends = () => {
    const [profile, setProfile] = useState();
    const [jsonData1, setJsonData1] = useState(null);
    const [jsonData2, setJsonData2] = useState(null);
    const [jsonData3, setJsonData3] = useState(null);
    const [requests, setRequests] = useState();
    const [friends, setFriends] = useState('active');
    const [sents, setSents] = useState();
    const router = useRouter();

    const handleActive = (tab) => {
        if (tab == 1) {
            setRequests('active');
            setFriends('');
            setSents('');
        } else if (tab == 2) {
            setRequests('');
            setFriends('active');
            setSents('');
        } else {
            setRequests('');
            setFriends('');
            setSents('active');
        }
    }

    const getFriends = async () => {
        try {
            const response1 = await axios.get('http://localhost:3000/api/users/friend/requests/' + sessionStorage.getItem('userId'), {
                withCredentials: true
            });
            const response2 = await axios.get('http://localhost:3000/api/users/friends/' + sessionStorage.getItem('userId'), {
                withCredentials: true
            });
            const response3 = await axios.get('http://localhost:3000/api/users/friend/request/sents/' + sessionStorage.getItem('userId'), {
                withCredentials: true
            });
            const jsonData1 = response1.data;
            const jsonData2 = response2.data;
            const jsonData3 = response3.data;
            setJsonData1(jsonData1);
            setJsonData2(jsonData2);
            setJsonData3(jsonData3);
        } catch (error) {
            console.error(error);
        }
    }

    const handleReqAccept = async (userId) => {
        try {
            const response = await axios.put('http://localhost:3000/api/users/friend/accept/' + sessionStorage.getItem('userId'), {
                user: userId,
                withCredentials: true
            });
            getFriends();
        } catch (error) {
            console.error(error);
        }
    }

    const handleReqReject = async (userId) => {
        try {
            const response = await axios.patch('http://localhost:3000/api/users/friend/reject/' + sessionStorage.getItem('userId'), {
                user: userId,
                withCredentials: true
            });
            getFriends();
        } catch (error) {
            console.error(error);
        }
    }

    const handleCancelRequest = async (userId) => {
        try {
            const response = await axios.patch('http://localhost:3000/api/users/friend/request/cancel/' + sessionStorage.getItem('userId'), {
                user: userId,
                withCredentials: true
            });
            getFriends();
        } catch (error) {
            console.error(error);
        }
    }

    const handleUnfriend = async (userId) => {
        try {
            const response = await axios.delete('http://localhost:3000/api/users/friend/unfriend/' + sessionStorage.getItem('userId'), {
                data: {
                    user: userId
                },
                withCredentials: true
            });
            getFriends();
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getFriends();
        if (sessionStorage.getItem('userId')) {
            setProfile(sessionStorage.getItem('userName'));
        } else {
            router.push('/login');
        }
    }, [])
    return (
        <>
            <LayoutHome title={'Friends'} profile={profile} />
            <Drawer>
                <div className='w-screen flex flex-col justify-center items-center'>
                    <div role="tablist" className="tabs tabs-lifted">
                        <a role="tab" className={`tab tab-${requests} text-xl`} onClick={() => handleActive(1)}>Requests +</a>
                        <a role="tab" className={`tab tab-${friends} text-xl`} onClick={() => handleActive(2)}>Friends</a>
                        <a role="tab" className={`tab tab-${sents} text-xl`} onClick={() => handleActive(3)}>Sent Requests</a>
                    </div>
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone Number</th>
                                <th className='text-center'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                requests == 'active' ? (
                                    jsonData1?.map((item) => (
                                        <tr>
                                            <th>{item.user_id}</th>
                                            <td>{item.user_name}</td>
                                            <td>{item.email}</td>
                                            <td>{item.number}</td>
                                            <td className='text-center'>
                                                <button className='btn btn-sm btn-outline btn-success mx-2' onClick={() => handleReqAccept(item.user_id)}>
                                                    Accept
                                                </button>
                                                <button className='btn btn-sm btn-outline btn-error mx-2' onClick={() => handleReqReject(item.user_id)}>
                                                    Reject
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : friends == 'active' ? (
                                    jsonData2?.map((item) => (
                                        <tr>
                                            <th>{item.user_id}</th>
                                            <td>{item.user_name}</td>
                                            <td>{item.email}</td>
                                            <td>{item.number}</td>
                                            <td className='text-center'>
                                                <button className="tooltip tooltip-bottom" data-tip='unfriend' onClick={() => handleUnfriend(item.user_id)}>
                                                    <FaUserTimes className='text-red-500 text-2xl' />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    jsonData3?.map((item) => (
                                        <tr>
                                            <th>{item.user_id}</th>
                                            <td>{item.user_name}</td>
                                            <td>{item.email}</td>
                                            <td>{item.number}</td>
                                            <td className='text-center'>
                                                <button className="tooltip tooltip-bottom" data-tip='Cancel' onClick={() => handleCancelRequest(item.user_id)}>
                                                    <FaUserTimes className='text-red-500 text-2xl' />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )
                            }
                        </tbody>
                    </table>
                </div>

            </Drawer>
        </>
    )
}

export default Friends
