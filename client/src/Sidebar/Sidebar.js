import React from "react";
import { styled } from "styled-components";
import { CONSTANTS, STATUS } from "../Utils/Constants";
import { useDispatch, useSelector } from "react-redux";
import {
  resetGrid,
  setAlgorithm,
  setStatus,
  setText,
} from "../features/grid/gridSlice";

const StyledSidebar = styled.div`
  height: 100vh;
  width: 20vw;
  background: #212b38;
  text-align: center;
  color: #17cf97;
  font-family: "Rubik Mono One", monospace;
  display: flex;
  flex-direction: column;
  flex-flow: column;
  z-index: 4;
  h2 {
    text-align: center;
    margin: 40px;
    flex: 0 1 auto;
  }
  .algorithms {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1 1 auto;
    .algo-button {
      padding: 20px;
      width: 100%;
      border: none;
      background: none;
      color: #17cf97;
      font-family: "Rubik Mono One", monospace;
      font-size: 16px;
      cursor: pointer;
      &:hover {
        background: #36465c;
      }
    }
  }
`;
const Sidebar = () => {
  const status = useSelector((state) => state.status);
  const dispatch = useDispatch();
  const handleButtonClick = (e) => {
    console.log(status);
    if (status !== STATUS.SOLVING) {
      dispatch(setAlgorithm(e.target.innerHTML));
      dispatch(setStatus(STATUS.EDIT));
      dispatch(setText(" "));
      dispatch(resetGrid());
    }
  };
  return (
    <StyledSidebar>
      <h2>Pathfinder</h2>
      <div className="algorithms">
        {Object.keys(CONSTANTS.ALGORITHM).map((algorithm) => (
          <div key={algorithm}>
            <button className="algo-button" onClick={handleButtonClick}>
              {algorithm}
            </button>
          </div>
        ))}
      </div>
    </StyledSidebar>
  );
};

export default Sidebar;
