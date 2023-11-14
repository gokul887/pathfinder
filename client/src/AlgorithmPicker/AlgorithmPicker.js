import React from "react";
import { styled } from "styled-components";
import { CONSTANTS } from "../Utils/Constants";
import { useDispatch } from "react-redux";
import { setAlgorithm } from "../features/grid/gridSlice";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledButtonContainer = styled.div`
  display: flex;
  button {
    background: #17cf97;
    box-shadow: none;
    border: none;
    width: 140px;
    font-size: 20px;
    border-radius: 10px;
    margin: 20px;
  }
`;

const AlgorithmPicker = () => {
  const dispatch = useDispatch();
  return (
    <StyledContainer>
      {/* <h1>Visualize</h1> */}
      <StyledButtonContainer>
        {Object.keys(CONSTANTS.ALGORITHM).map((algorithm) => (
          <button
            key={algorithm}
            onClick={() => {
              dispatch(setAlgorithm(CONSTANTS.ALGORITHM.DIJKSTRA));
            }}
          >
            <h6>{algorithm}</h6>
          </button>
        ))}
      </StyledButtonContainer>
    </StyledContainer>
  );
};

export default AlgorithmPicker;
