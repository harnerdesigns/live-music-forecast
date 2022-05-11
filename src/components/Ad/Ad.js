import React, { useState } from "react";
import "./Ad.scss";
const Ad = ({ type, style }) => {
    let AdCode;
    switch(type){
        case "feed":
            AdCode = <ins className="adsbygoogle"
            style={{ display: "block", ...style }}
            data-ad-format="fluid"
            data-ad-layout-key="-ee+7u-2p-dp+ym"
            data-ad-client="ca-pub-5546207212206045"
            data-ad-slot="6315873557"></ins>
        break;
        default: 
            AdCode = <ins
            className="adsbygoogle"
            style={{ display: "block", ...style }}
            data-ad-client="ca-pub-5546207212206045"
            data-ad-slot="4922900839"
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></ins>
        break;
    }
  return (
    <>
        {AdCode}
      <script dangerouslySetInnerHTML={{__html:`(adsbygoogle = window.adsbygoogle || []).push({});`}}></script>
    </>
  );
};

export default Ad;
