import React from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const Root = styled.div`
  color: white;
`;

const StyledHead = styled.h2`
  font-weight: bold;
`;

const StyledPara = styled.p`
  line-height: 1.2;
`;

const StyledLink = styled(Link)`
  color: white !important;
  text-decoration: none;
`;

function Home() {
  return (
    <Root>
      <div className="Home-header">
        <StyledHead>Welcome to After.js</StyledHead>
      </div>
      <StyledPara>
        To get started, edit <code>src/Home.js</code> or{" "}
        <code>src/About.js</code> and save to reload.
      </StyledPara>
      <StyledLink to="/about">About -></StyledLink>
    </Root>
  );
}

Home.getInitialProps = function({
  req,
  res,
  match,
  history,
  location,
  ...ctx
}) {
  return { whatever: "stuff" };
};

export default Home;
