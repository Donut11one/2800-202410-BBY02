import React, { useState, useEffect } from 'react';
import { Button } from "./Button";
import { db, auth } from "../fbconfig";
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from "firebase/auth";

const Profile = () => {
    const [userName, setUserName] = useState('BCIT');
    const [userEmail, setUserEmail] = useState('bc@bcit.ca');
    const [deviceInfo, setDeviceInfo] = useState('');

    useEffect(() => {
       
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {   
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

    return (
        <div className="modal flex items-center justify-center" style={{ zIndex: 100 }}>
            <div className="modal-content bg-emerald-950 rounded-lg shadow-lg p-6">
                <h1 className="text-lg"style={{ color: "white" }}>Your Profile</h1><br/>
                <p className="text-lg" style={{ color: "white" }}>UserName: {userName}</p>
                <p className="text-lg" style={{ color: "white" }}>Email: {userEmail}</p>
                <p className="text-lg" style={{ color: "white" }}>Browser: {deviceInfo.browser}</p>
                <p className="text-lg" style={{ color: "white" }}>DeviceType: {deviceInfo.deviceType}</p><br/>
                <Button buttonStyle="btn--outline1" onClick={self.close()}>Close</Button>
            </div>
        </div>
    );
};

export default Profile;

