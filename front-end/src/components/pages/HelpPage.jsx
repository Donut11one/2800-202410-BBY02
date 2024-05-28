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

            <div className="home min-h-screen flex flex-col items-center justify-center  p-4">
                <Carousel />
                <div className="yiming modal-content w-full max-w-md bg-emerald-950 rounded-lg shadow-lg p-6 mt-8">
                    <form className="space-y-4 yiming" onSubmit={handleSubmit}>
                        <div>
                            <label className="text-xl font-bold text-white mb-4 text-center">Message us</label>
                            <textarea
                                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-green-500 bg-white text-black"
                                placeholder="Feedbacks or suggestions... "
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="btn btn--outline block text-lg w-full py-2 mt-3 rounded-md focus:outline-none"
                        >
                            Submit
                        </button>
                    </form>
                    {success && <p className="mt-4 text-green-300 text-center text-sm">Thank you for your message. We will get back to you soon!</p>}
                    <div className="mt-6 text-center">
                    </div>
                </div>
                <br />
                <div class="yiming w-full max-w-md bg-emerald-950 p-6 space-y-4 rounded-lg shadow-lg">
                    <p class="text-white mb-4 text-lg">Email: <a href="mailto:help@documint.com" class="text-blue-500 underline hover:text-blue-400">help@documint.com</a></p>
                    <p class="text-white text-lg">Phone: +1 800-980-0055</p>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default HelpPage;