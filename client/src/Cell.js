import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import stopIcon from "./img/stopIcon.png";
import start2 from "./img/start2.png";
import { useDispatch, useSelector } from "react-redux";
import {
  setCell,
  setMouseDown,
  setMouseDrag,
  setStart,
  setStop,
} from "./features/grid/gridSlice";
import { COLORS, STATUS } from "./Utils/Constants";
import { createSelectorCreator, defaultMemoize } from "reselect";

const StyledCell = styled.div`
  width: 30px;
  height: 30px;
  border: solid black 1px;
  text-align: center;
  background: ${(color) => color.color};
  .draggable-icon {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      height: 24px;
    }
  }
`;
const Cell = React.memo(
  (props) => {
    const { position } = props;
    const isSame = (arr1, arr2) => {
      return (
        arr1.length === arr2.length &&
        arr1.every(function (element, index) {
          return element === arr2[index];
        })
      );
    };
    const isStartCell = useSelector((state) => isSame(position, state.start));
    const isStopCell = useSelector((state) => isSame(position, state.stop));
    const isSettingWall = useSelector((state) => state.mouseDown);
    const [cellColor, setCellColor] = useState("white");
    const isEditMode = useSelector((state) => state.status === STATUS.EDIT);
    const dispatch = useDispatch();
    const customComparator = (previousResult, newResult) => {
      if (previousResult.value === newResult.value) {
        return true;
      }
      return false;
    };

    const createCustomSelector = createSelectorCreator(
      defaultMemoize,
      customComparator
    );

    const customMemoizedSelector = createCustomSelector(
      (state) => state.grid[position[0]][position[1]],
      (cell) => {
        return cell.value;
      }
    );

    const value = useSelector(customMemoizedSelector);
    const handleDragStart = (e, iconType) => {
      e.dataTransfer.setData("iconType", iconType);
      dispatch(setMouseDrag(true));
    };

    const handleMouseDown = (e) => {
      if (!(!isEditMode || isStartCell || isStopCell)) {
        dispatch(
          setCell({
            position: position,
            value: -1,
            color: COLORS.WALL,
          })
        );
        dispatch(setMouseDown(true));
      }
    };

    const handleMouseUp = (e) => {
      if (isEditMode && isSettingWall) {
        dispatch(setMouseDown(false));
      }
    };
    const handleMouseEnter = (e) => {
      if (
        !(isStartCell || isStopCell || value === -1) &&
        isSettingWall &&
        isEditMode
      ) {
        dispatch(
          setCell({
            position: position,
            value: -1,
            color: COLORS.WALL,
          })
        );
      }
    };
    const handleDrop = (e) => {
      const iconType = e.dataTransfer.getData("icontype");
      if (iconType === "start") {
        dispatch(setStart(position));
      } else {
        dispatch(setStop(position));
      }
      dispatch(setMouseDrag(false));
    };

    useEffect(() => {
      const getColor = () => {
        if (value === 0) {
          setCellColor("white");
        } else if (value === 1) {
          setCellColor(COLORS.EXPANDED);
        } else if (value === 2) {
          setCellColor(COLORS.SHORTEST);
        } else if (value === -1) {
          setCellColor(COLORS.WALL);
        }
      };
      getColor();
    }, [position, value]);
    return (
      <StyledCell
        color={cellColor}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseEnter={handleMouseEnter}
      >
        <div
          className="draggable-icon"
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
          }}
        >
          {isStartCell ? (
            <>
              <img
                src={start2}
                draggable={isEditMode ? "true" : "false"}
                onDragStart={(e) => {
                  handleDragStart(e, "start");
                }}
                alt="start"
              />
            </>
          ) : null}
          {isStopCell ? (
            <img
              src={stopIcon}
              draggable={isEditMode ? "true" : "false"}
              onDragStart={(e) => {
                handleDragStart(e, "stop");
              }}
              alt="stop"
            />
          ) : null}
        </div>
      </StyledCell>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.position[0] === nextProps.position[0] &&
      prevProps.position[1] === nextProps.position[1]
    );
  }
);

export default Cell;
