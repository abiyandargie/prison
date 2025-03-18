import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";
import "@fontsource/poppins";
import "@fontsource/roboto";

import backgroundImage from "../assets/gurageZone.png";
import ethiopiaFlag from "../assets/centralEthiopiaFlag.png";
import flagofEthiopia from "../assets/Flag-Ethiopia.png";
import guragePrison from "../assets/guragePrison.jpg";

function Welcome() {
  const [messages, setMessages] = useState([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [direction, setDirection] = useState(1);
  const [sideImages, setSideImages] = useState([]);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      try {
        const messagesResponse = await axiosInstance.get("/managemessages/get-messages");
        if (messagesResponse.data?.messages) {
          setMessages(messagesResponse.data.messages);
        } else {
          toast.error("No messages found.");
        }

        const imagesResponse = await axiosInstance.get("/manageimages/get-side-images");
        if (imagesResponse.data?.images) {
          setSideImages(imagesResponse.data.images);
        } else {
          toast.error("No images available.");
        }
      } catch (error) {
        toast.error(`Failed to load content: ${error.response?.data?.message || error.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      const interval = setInterval(() => {
        setDirection(1);
        setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [messages]);

  // Update the clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Calculate rotation angles for watch hands
  const secondsDeg = (time.getSeconds() / 60) * 360;
  const minutesDeg = (time.getMinutes() / 60) * 360;
  const hoursDeg = ((time.getHours() % 12) / 12) * 360 + (time.getMinutes() / 60) * 30;

  return (
    <div
      className="flex flex-col h-screen font-[Poppins] text-gray-900 relative"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="relative flex flex-col h-full">
        {/* Header */}
        <header className="bg-teal-600 bg-opacity-90 text-gray-900 flex justify-between items-center px-5 py-4 shadow-md z-10">
          <div className="flex items-center space-x-4">
            <img src={ethiopiaFlag} alt="Central Ethiopia Flag" className="w-32 h-18 object-contain rounded shadow-md" />
            <h1 className="font-bold text-4xl">Gurage Zone PMS</h1>
            <img src={flagofEthiopia} alt="Ethiopian Flag" className="w-38 h-24 object-contain rounded shadow-md" />
          </div>
          <div className="flex space-x-6 items-center">
            <Link to="/register" className="hover:underline text-xl">Register as Visitor</Link>
            <Link to="/about" className="hover:underline text-xl">About</Link>
            <Link to="/help" className="hover:underline text-xl">Help</Link>
            <Link to="/contact" className="hover:underline text-xl">Contact Us</Link>
            <Link to="/login" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">Login</Link>
          </div>
        </header>
        {/* Static Image on the Left Side */}

        <img
  src={guragePrison} // Replace with your actual image path
  alt="Prison"
  className="absolute left-0 top-12  w-1/3 object-cover shadow-md border-r-4 border-gray-600"
/>


        {/* Main Content */}
        <main className="flex-grow flex items-center justify-center text-center p-10 z-10 relative">

          {/* Left Side Image */}
          {sideImages[0] && (
            <img
              src={sideImages[0]}
              alt="Side Image Left"
              className="w-1/5 h-auto rounded-lg shadow-md hidden md:block"
            />
          )}

          {/* Message Box */}
          <motion.div
            className="bg-white bg-opacity-10 p-12 rounded-lg shadow-2xl max-w-2xl w-full mx-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-5xl font-bold mb-6 font-[Roboto] text-white">
              Welcome to Gurage PMS
            </h1>

            {loading ? (
              <p className="text-2xl text-gray-700 mb-6">Loading messages...</p>
            ) : (
              <div className="relative w-full h-32 overflow-hidden">
                <AnimatePresence custom={direction} mode="wait">
                  <motion.div
                    key={currentMessageIndex}
                    initial={{ x: direction * 100, opacity: 0, scale: 0.9 }}
                    animate={{ x: 0, opacity: 1, scale: 1 }}
                    exit={{ x: -direction * 100, opacity: 0, scale: 0.9 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    className="absolute w-full p-8 text-white text-3xl rounded-lg h-32 bg-gradient-to-r from-blue-500 to-purple-500 shadow-xl"
                  >
                    {messages[currentMessageIndex]?.text}
                  </motion.div>
                </AnimatePresence>
              </div>
            )}
          </motion.div>

          {/* Real Wristwatch Clock with Numbers */}
          <div className="absolute top-20 right-10 flex flex-col items-center">
            <div className="w-40 h-40 flex items-center justify-center rounded-full bg-gray-900 text-white shadow-lg border-4 border-blue-500 relative">
              {/* Clock Numbers */}
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute text-xl font-bold"
                  style={{
                    transform: `rotate(${i * 30}deg) translate(60px) rotate(-${i * 30}deg)`,
                  }}
                >
                  {i === 0 ? 12 : i}
                </div>
              ))}

              {/* Watch Hands */}
              <div className="absolute w-2 h-12 bg-white top-10 left-[48%] origin-bottom rotate-[var(--hourDeg)]" style={{ "--hourDeg": `${hoursDeg}deg` }}></div>
              <div className="absolute w-1.5 h-16 bg-blue-400 top-6 left-[49%] origin-bottom rotate-[var(--minuteDeg)]" style={{ "--minuteDeg": `${minutesDeg}deg` }}></div>
              <div className="absolute w-1 h-16 bg-red-500 top-2 left-[50%] origin-bottom rotate-[var(--secondDeg)]" style={{ "--secondDeg": `${secondsDeg}deg` }}></div>
       
            </div>
  
          </div>
        </main>
        <footer className="bg-teal-800 text-white text-center py-4 ">
        <p className="text-sm">&copy; {new Date().getFullYear()} Wolkite Prison Management. All rights reserved.</p>
      </footer>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Welcome;
