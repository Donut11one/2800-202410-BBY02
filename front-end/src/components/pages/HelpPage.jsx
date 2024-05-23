import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../../fbconfig";
import { doc, getDoc, addDoc, collection, Timestamp } from "firebase/firestore";
import { Navigate } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";
import "./Home.css";
import Carousel from "../Carousel";


const HelpPage = () => {
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const [user, setUser] = useState(null);
    const [userName, setUserName] = useState("");
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                fetchUserName(user.uid);
            } else {
                setLoading(false);
            }
        });
        return () => unsubscribe();
    }, []);

    const fetchUserName = async (uid) => {
        try {
            const userDocRef = doc(db, "users", uid);
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists()) {
                setUserName(userDocSnap.data().name);
            } else {
                console.error("No such document!");
            }
            setLoading(false);
        } catch (error) {
            console.error("Error fetching user's name:", error);
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            return;
        }
        try {
            await addDoc(collection(db, "messages"), {
                name: userName,
                email: user.email,
                message: message,
                timestamp: Timestamp.fromDate(new Date()),
            });
            setMessage("");
            setSuccess(true);
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    if (!user && !loading) {
        return <Navigate to="/" />;
    }

    return (
        <>
            <Navbar />
            <div className="home min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
                <Carousel />
                <br/>
                <div className="contact-container w-full max-w-md bg-emerald-950 rounded-lg shadow-lg p-6 mt-8">
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="text-xl font-bold text-white mb-4 text-center">We love your questions or any suggestions and you will get a reply from us within 24 hours.</label>
                            <textarea
                                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-green-500 bg-gray-700 text-white"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 bg-green-500 text-white text-sm rounded-md hover:bg-green-600"
                        >
                            Submit
                        </button>
                    </form>
                    {success && <p className="mt-4 text-green-300 text-center text-sm">Thank you for your message. We will get back to you soon!</p>}
                    <div className="mt-6 text-center">
                    </div>
                </div>
                <div className="mt-6 text-center text-sm">
                    <p className="text-white">Or reach out to us directly:</p>
                    <p className="text-white">Email: <a href="mailto:help@documint.com" className="text-blue-500 underline">help@documint.com</a></p>
                    <p className="text-white">Phone: +1 800-980-0055</p>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default HelpPage;