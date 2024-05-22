import React, { useState } from "react";
import filehash from "../runScript.js";
//import mintNFT from "../mintNFT.js";

const UploadDocModal = ({ onClose }) => {
  const [name, setName] = useState(""); // State for user's name
  const [description, setDescription] = useState(""); // State for description
  const [file, setFile] = useState(""); // State for file

  const handleSubmit = () => {
    const data = {
      name,
      description,
      file,
    };
    console.log(data);
    //mintNFT(data);
  };

  return (
    <div className="flex items-center justify-center" style={{ zIndex: 100 }}>
      <div className="modal-content bg-emerald-950 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4" style={{ color: "white" }}>
          Upload document
        </h2>
        <div>
          <form id="userUpload">
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="file"
              id="fileupload"
              onChange={async (e) => setFile(await filehash(e.target.files[0]))}
            />
            <button type="button" onClick={handleSubmit}>
              Mint Document
            </button>
          </form>
        </div>
        <button onClick={onClose} className="btn btn--outline">
          Close
        </button>
      </div>
    </div>
  );
};

export default UploadDocModal;
