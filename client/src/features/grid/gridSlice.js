import { createSlice } from "@reduxjs/toolkit";
import { CONSTANTS, STATUS } from "../../Utils/Constants";

const initialState = {
  algorithm: "DIJKSTRA",
  grid: Array(CONSTANTS.GRIDSIZE)
    .fill(0)
    .map(() =>
      Array(CONSTANTS.GRIDSIZE).fill({ value: 0, timeout: 0, color: "white" })
    ),
  start: [0, 0],
  stop: [7, 7],
  expanded_nodes: [],
  shortest_path: [],
  mouseDrag: false,
  mouseDown: false,
  walls: [],
  text: " ",
  status: STATUS.EDIT,
  isDiagonalEnabled: false,
};

export const gridSlice = createSlice({
  name: "grid",
  initialState,
  reducers: {
    setAlgorithm: (state, action) => {
      state.algorithm = action.payload;
    },
    setText: (state, action) => {
      state.text = action.payload;
    },
    setGrid: (state, action) => {
      state.grid = action.payload;
    },
    setStart: (state, action) => {
      state.start = action.payload;
    },
    setStop: (state, action) => {
      state.stop = action.payload;
    },
    setExpandedNodes: (state, action) => {
      state.expanded_nodes = action.payload;
    },
    setShortestPath: (state, action) => {
      state.shortest_path = action.payload;
    },
    setMouseDrag: (state, action) => {
      state.mouseDrag = action.payload;
    },
    setMouseDown: (state, action) => {
      state.mouseDown = action.payload;
    },
    setWalls: (state, action) => {
      state.walls = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setIsDiagonalEnabled: (state, action) => {
      state.isDiagonalEnabled = action.payload;
    },
    resetGrid: (state) => {
      state.grid = Array(CONSTANTS.GRIDSIZE)
        .fill(0)
        .map(() =>
          Array(CONSTANTS.GRIDSIZE).fill({
            value: 0,
            timeout: 0,
            color: "white",
          })
        );
    },
    setCell: (state, action) => {
      let grid_2 = [...state.grid.map((row) => [...row])];
      const [row, col] = action.payload.position;
      const value = action.payload.value;
      let color = action.payload.color;
      grid_2[row][col] = {
        ...grid_2[row][col],
        ...(value !== null ? { value: value } : {}),
        ...(color !== null ? { color: color } : {}),
      };
      state.grid = grid_2;
    },
    setCells: (state, action) => {
      let grid_2 = [...state.grid.map((row) => [...row])];
      const coordinates = action.payload.positions;
      let newColor = action.payload.color;
      for (let i = 0; i < coordinates.length; i++) {
        let coordinate = coordinates[i];
        let [row, col] = coordinate;
        grid_2[row][col] = {
          ...grid_2[row][col],
          value: i + 1,
          color: newColor,
          timeout: i + 1,
        };
      }
      state.grid = grid_2;
    },
  },
});

export const {
  setAlgorithm,
  setGrid,
  setStart,
  setStop,
  setExpandedNodes,
  setShortestPath,
  setMouseDrag,
  setMouseDown,
  setWalls,
  setCell,
  setCells,
  setText,
  setStatus,
  setIsDiagonalEnabled,
  resetGrid,
} = gridSlice.actions;

export default gridSlice.reducer;
