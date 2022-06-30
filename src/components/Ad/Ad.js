import React, { useState } from "react";
import AdSense from "react-adsense";
const Ad = ({ type, style }) => {
  let AdCode;
  switch (type) {
    case "feed":
      AdCode = (
        <AdSense.Google
          client="ca-pub-5546207212206045"
          slot="6315873557000"
          style={{ display: "block", ...style }}
          format="fluid"
          layoutKey="-ee+7u-2p-dp+ym"
        />
      );
      break;
    default:
      AdCode = (
        <AdSense.Google
          client="ca-pub-5546207212206045"
          slot="4922900839"
          style={{ display: "block", ...style }}
          format="auto"
          responsive="true"
        />
      );
      break;
  }
  return (
    <>
      {/* {AdCode} */}
    </>
  );
};

export default Ad;
