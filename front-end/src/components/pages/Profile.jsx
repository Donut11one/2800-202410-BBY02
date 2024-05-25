import React, { useState, useEffect } from 'react';
import { Button } from "../Button";
import { db, auth } from "../../fbconfig";
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from "firebase/auth";
import Navbar from "../Navbar";
import Footer from '../Footer';
import './styles.css';


const Profile = () => {

    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState('BCIT');
    const [userEmail, setUserEmail] = useState('bc@bcit.ca');
    const [deviceInfo, setDeviceInfo] = useState('');
    const [updbtn, setUpdbtn] = useState(false);

    const handleNameChange = (event) => {
        setUserName(event.target.value);
        setUpdbtn(true);
    };

    const handleEmailChange = (event) => {
        setUserEmail(event.target.value);
        setUpdbtn(true);
    };

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserId(user.uid);
                console.log("Current user ID:", user.uid);
            } else {

                setUserId(null);
                console.log("No user is signed in.");
            }
            const userDocRef = doc(db, "users", user.uid);
            const fetchUserData = async () => {
                const docSnapshot = await getDoc(userDocRef);
                if (docSnapshot.exists()) {
                    setUserName(docSnapshot.data().name);
                    setUserEmail(docSnapshot.data().email);
                    setDeviceInfo(docSnapshot.data().deviceInfo);
                } else {
                    console.log("No such document!");
                }
            };

            fetchUserData();
        });

        return () => unsubscribe();
    }, []);
    const updateUserProfile = async () => {
        if (userId) {
            const userDocRef = doc(db, "users", userId);
            try {
                await updateDoc(userDocRef, {
                    name: userName,
                    email: userEmail
                });
                console.log('User profile updated successfully.');
                setUpdbtn(false); // Reset the update button disable state
            } catch (error) {
                console.error("Error updating document: ", error);
            }
        }
    };
    return (
        <>
            <Navbar />
            {/* <div className="home min-h-screen flex flex-col items-center justify-start bg-gray-100 p-4"> */}
            <div className="profile-page ">
                {/* <div className="modal  items-center justify-start" style={{ zIndex: 100 }}> */}
                <div className='profile-container w-full h-screen flex flex-col items-center justify-center '>
                    <div className='profile-content  yiming bg-emerald-950 w-full max-w-4xl p-6  rounded-lg shadow-md'>
                        <h1 className="text-2xl font-bold text-white-800 mb-6">Your Profile</h1>
                        <div className="profile-field mb-4">
                            <label className="text-lg text-white-800" >Name:</label>
                            <input className="input-field  bg-emerald-950 " type="text"  value={userName} onChange={handleNameChange} />
                        </div>
                        <div className="profile-field mb-4">
                            <label className="text-lg text-white-800">Email:</label>
                            <input className="input-field bg-emerald-950 " type="email" value={userEmail} onChange={handleEmailChange} />
                        </div>
                        <div className="profile-field mb-4">
                            <p className="text-lg text-white-800">Browser: {deviceInfo.browser}</p>
                        </div>
                        <div className="profile-field mb-4">
                            <p className="text-lg text-white-800">Device Type: {deviceInfo.deviceType}</p>
                        </div>
                        <div className="flex mt-4">
                            <Button className="btn--small mr-2" >Close</Button>
                            <button className="btn--medium" disabled={!updbtn} onClick={updateUserProfile}>Update</button>
                        </div>
                    </div>
                </div>

            </div>
            <Footer />
        </>
    );
};

export default Profile;

