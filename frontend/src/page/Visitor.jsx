import React, { useState } from "react";
import { Link } from "react-router-dom"; 

function Visitor() {
  const amharicLabel = {
    login: "ግባ",
    signin: "ፍጠር",
    welcome: "እንኳን ወደ ወልቂጤ ማረሚያ ቤት በደህና መጡ !",
    motive: "ሥርዓት የፍትሕ መሠረት ነው፤ በትክክለኛ ሁኔታ የሚሠራ እስር ቤት ደጋፊው ነው።",
    signin2: "ግባ",
  };

  const englishLabel = {
    login: "Login",
    signin: "Signin",
    welcome: "Welcome To Gurage Zone Prison Management System Visitor Page",
    motive: "Order is the foundation of justice; a well-managed prison is its pillar.",
    signin2: "Sign In",
  };

  const [label, setLabel] = useState(englishLabel);

  const handleLanguage = (e) => {
    const selectedLanguage = e.target.value;
    if (selectedLanguage === "amharic") {
      setLabel(amharicLabel);
    } else {
      setLabel(englishLabel);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-green-600 text-white flex justify-between items-center px-5 py-4 shadow-md">
        <h1 className="font-bold text-lg">Prison Management System</h1>
        <div className="flex space-x-6 items-center">
          <Link to='/' className="hover:underline">Home</Link>
          <select className="bg-slate-500 text-white rounded px-2 h-8" onChange={handleLanguage}>
            <option value="english">English</option>
            <option value="amharic">አማርኛ</option>
          </select>
          <Link to="/register" className="hover:underline">Register</Link>
          <Link to="/login" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">{label.login}</Link>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center text-center">
        <h1 className="text-5xl my-10 text-gray-950">{label.welcome}</h1>
        <p className="text-3xl text-gray-900 mb-6">{label.motive}</p>
        <button className="bg-red-500 text-white py-2 px-4 rounded text-xl hover:bg-red-600">
          <Link to="/login">{label.signin2}</Link>
        </button>
        <Link to="/register" className="bg-green-400 rounded px-4 py-2 mt-4 hover:bg-green-500">Register</Link>
      </main>

      <footer className="bg-gray-800 text-white text-center py-4">
        <p className="text-sm">&copy; {new Date().getFullYear()} Wolkite Prison Management. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Visitor;