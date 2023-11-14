import React from "react";
import { styled } from "styled-components";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  resetGrid,
  setCell,
  setStatus,
  setText,
} from "./features/grid/gridSlice";
import { CONSTANTS, STATUS } from "./Utils/Constants";
import Grid from "./Grid";
import TypeWriter from "./Utils/TypeWriter";
import { PiPencilSimpleFill, PiPencilSimpleSlashFill } from "react-icons/pi";
const StyledContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80vw;
  .diagonal-enabled {
    color: white;
  }
  .algorithm-info {
    margin-top: 50px;
    color: white;
    font-family: "Barlow Condensed", sans-serif;
    text-align: center;
    span {
      font-size: 30px;
    }
    p {
      font-weight: 300;
      font-size: 20px;
      font-style: italic;
      max-width: 40vw;
    }
  }
  .grid-container {
    display: flex;
    .icon {
      background: #17cf97;
      height: 50px;
      width: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 24px;
    }
  }
  .typewriter {
    font-family: "Courier Prime", monospace;
    color: #17cf97;
    margin: 20px;
    min-height: 20px;
  }
  .buttons {
    display: flex;
  }
`;

const StyledButton = styled.button`
  background: #17cf97;
  box-shadow: none;
  border: none;
  width: 140px;
  font-size: 16px;
  border-radius: 10px;
  padding: 7.5px 0px;
  margin: 20px;
  font-weight: 700;
`;

const Content = () => {
  const grid = useSelector((state) => state.grid);
  const start = useSelector((state) => state.start);
  const stop = useSelector((state) => state.stop);
  const algorithm = useSelector((state) => state.algorithm);
  const text = useSelector((state) => state.text);
  const status = useSelector((state) => state.status);
  const dispatch = useDispatch();

  const setValuesForResponse = (expanded_nodes, shortestPathRes) => {
    if (status === STATUS.EDIT) {
      dispatch(setText("Expanding nodes..."));
      expanded_nodes.forEach((node, index) => {
        setTimeout(() => {
          dispatch(
            setCell({
              position: node,
              value: 1,
            })
          );
        }, index * CONSTANTS.STEPINTERVAL);
      });

      const pathDelay = CONSTANTS.STEPINTERVAL * (expanded_nodes.length + 1);

      shortestPathRes.forEach((node, index) => {
        setTimeout(() => {
          if (text !== "Showing optimal path...") {
            dispatch(setText("Showing optimal path..."));
          }
          dispatch(
            setCell({
              position: node,
              value: 2,
            })
          );
        }, index * CONSTANTS.STEPINTERVAL + pathDelay);
      });
      setTimeout(() => {
        dispatch(setStatus(STATUS.SOLVED));
      }, (expanded_nodes.length + shortestPathRes.length) * CONSTANTS.STEPINTERVAL);
    }
  };

  const handleButtonClick = () => {
    if (status === STATUS.EDIT) {
      dispatch(setStatus(STATUS.SOLVING));
      fetchShortestPath();
    } else if (status === STATUS.SOLVED) {
      dispatch(setText(" "));
      dispatch(setStatus(STATUS.EDIT));
      dispatch(resetGrid());
    }
  };
  const fetchShortestPath = async () => {
    const data = {
      grid: grid,
      start: start,
      stop: stop,
      cost_map: {
        horizontal: 1,
        vertical: 1,
        diagonal: 10,
      },
    };
    const res = await axios.post(`/${algorithm.toLowerCase()}`, data);
    const shortestPathRes = res.data["path"];
    res.data["expanded_nodes"].pop();
    const expanded_nodes = res.data["expanded_nodes"];
    setValuesForResponse(expanded_nodes, shortestPathRes);
  };
  return (
    <StyledContentContainer>
      <div className="algorithm-info">
        <span>{CONSTANTS.ALGORITHM[algorithm].TITLE}</span>
        <p>{CONSTANTS.ALGORITHM[algorithm].DESCRIPTION}</p>
      </div>
      <span className="typewriter">
        <TypeWriter text={text} />
      </span>
      <div className="grid-container">
        <Grid />
        <div className="icon">
          {status === STATUS.EDIT ? (
            <PiPencilSimpleFill />
          ) : (
            <PiPencilSimpleSlashFill />
          )}
        </div>
      </div>
      <div className="buttons">
        <StyledButton onClick={handleButtonClick}>
          <span>{status === STATUS.EDIT ? "Solve" : "Edit"}</span>
        </StyledButton>
      </div>
    </StyledContentContainer>
  );
};

export default Content;
