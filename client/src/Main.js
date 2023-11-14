import React from "react";
import { styled } from "styled-components";
import Sidebar from "./Sidebar/Sidebar";
import Content from "./Content";
import Instructions from "./Instructions/Instructions";

const StyledMainContainer = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  z-index: -100;
  width: 100vw;
  .main-content {
  }
  background: #1b2430;
`;
const StyledCenterContainer = styled.div``;
const Main = () => {
  return (
    <>
      <Instructions />
      <StyledMainContainer>
        <Sidebar />
        <StyledCenterContainer>
          <div className="main-content">
            <Content />
            {/* <Instructions /> */}
          </div>
        </StyledCenterContainer>
      </StyledMainContainer>
    </>
  );
};

export default Main;
