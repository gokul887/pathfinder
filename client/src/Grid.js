import React from "react";
import { styled } from "styled-components";
import Cell from "./Cell";
import { CONSTANTS } from "./Utils/Constants";
import { useDispatch } from "react-redux";
import { setMouseDown, setMouseDrag } from "./features/grid/gridSlice";

const StyledGridContainer = styled.div`
  padding: 0px 25px 0px 50px;
`;
const StyledRow = styled.div`
  display: flex;
`;

const Grid = () => {
  const arr = Array(CONSTANTS.GRIDSIZE).fill(0);
  const dispatch = useDispatch();
  const handleGridLeave = () => {
    dispatch(setMouseDown(false));
    dispatch(setMouseDrag(false));
  };
  return (
    <StyledGridContainer onMouseLeave={handleGridLeave}>
      <div>
        {arr.map((row, rowIndex) => (
          <StyledRow key={rowIndex}>
            {arr.map((cell, colIndex) => {
              return (
                <Cell
                  key={[rowIndex, colIndex]}
                  position={[rowIndex, colIndex]}
                />
              );
            })}
          </StyledRow>
        ))}
      </div>
    </StyledGridContainer>
  );
};

export default Grid;
