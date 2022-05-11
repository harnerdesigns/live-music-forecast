import React, { useState } from "react";
import AdSense from "react-adsense";
import "./Ad.scss";
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
          layout-key="-ee+7u-2p-dp+ym"
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
          layout-key="-ee+7u-2p-dp+ym"
          full-width-responsive={true}
        />
      );
      break;
  }
  return (
    <>
      {AdCode}
      <script
        dangerouslySetInnerHTML={{
          __html: `(adsbygoogle = window.adsbygoogle || []).push({});`,
        }}
      ></script>
    </>
  );
};

export default Ad;
