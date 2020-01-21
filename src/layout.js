import React from "react";
import { Global, css } from "@emotion/core";

const globalStyles = css`
  body {
    height: 100vh;
    background-color: #222222;
    font-family: "Courier New", Courier, monospace;
    color: white;
  }
`;

function withLayout(Page) {
  return function PageWrapper(props) {
    return (
      <>
        <Global styles={globalStyles} />
        <Page {...props} />
      </>
    );
  };
}

export { withLayout };
