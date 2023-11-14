const CONSTANTS = {
  GRIDSIZE: 16,
  STEPINTERVAL: 100,
  ALGORITHM: {
    DIJKSTRA: {
      TITLE: "Dijkstra's Algorithm",
      DESCRIPTION:
        "Explores adjacent cells with updated cumulative costs from a starting cell.",
    },
    ASTAR: {
      TITLE: "A* Algorithm",
      DESCRIPTION:
        "Explores considering both the cost to reach a node and a heuristic estimate, prioritizing nodes likely to lead to the goal.",
    },
    BFS: {
      TITLE: "BFS",
      DESCRIPTION:
        "Explores considering both the cost to reach a node and a heuristic estimate, prioritizing nodes likely to lead to the goal.",
    },
    DFS: {
      TITLE: "DFS",
      DESCRIPTION:
        "Explores considering both the cost to reach a node and a heuristic estimate, prioritizing nodes likely to lead to the goal.",
    },
  },
  CHANGE_CELL_ACTIONS: {
    SINGLE: "single",
    MULTIPLE_SOLUTION: "multiple_solution",
    MULTIPLE_WALLS: "multiple_walls",
  },
};

const COLORS = {
  EXPANDED: "#2f5999",
  SHORTEST: "#ed923c",
  WALL: "#696969",
};

const STATUS = {
  EDIT: "EDIT",
  SOLVING: "SOLVING",
  SOLVED: "SOLVED",
};

export { CONSTANTS, COLORS, STATUS };
