import React from "react";

const MetamaskInfo = () => {
  return (
    <>
      <div className="metamask-video">
        <p>Learn more about metamask and start minting your documents</p>
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/YVgfHZMFFFQ`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded YouTube"
        ></iframe>
      </div>
    </>
  );
};

export default MetamaskInfo;
