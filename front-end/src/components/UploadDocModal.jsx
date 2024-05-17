import React from "react";
import { useState } from "react";

const UploadDocModal = ({ onClose }) => {
  const [name, setName] = useState(""); // State for user's name
  const [description, setDescription] = useState("");

  const handleUpload = (e) => {
    console.log(e.target.files[0]);
  };

  return (
    <div className="flex items-center justify-center" style={{ zIndex: 100 }}>
      <div className="modal-content bg-emerald-950 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4" style={{ color: "white" }}>
          Upload document
        </h2>
        <div>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="description"
            placeholder="Description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input type="file" onChange={(e) => handleUpload(e)} />
        </div>
        <button onClick={onClose} className="btn btn--outline">
          Close
        </button>
      </div>
    </div>
  );
};

export default UploadDocModal;
