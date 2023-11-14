import heapq
from utils import *


def heuristic(cell, goal):
    return get_distance_v2(cell, goal)


def a_star_with_costs(grid, start, stop, cost_map):
    rows, cols = len(grid), len(grid[0])
    open_set = [(0, start)]
    came_from = {}
    g_score = {cell: float('inf') for cell in [(
        i, j) for i in range(rows) for j in range(cols)]}
    g_score[start] = 0

    while open_set:
        _, current = heapq.heappop(open_set)

        if current == stop:
            path = []
            while current in came_from:
                path.insert(0, current)
                current = came_from[current]
            path.insert(0, start)
            return path

        for neighbor in get_neighbors(grid, current):
            tentative_g_score = g_score[current] + \
                cost_map.get(get_distance(current, neighbor), 1)

            if tentative_g_score < g_score[neighbor]:
                came_from[neighbor] = current
                g_score[neighbor] = tentative_g_score
                f_score = tentative_g_score + heuristic(neighbor, stop)
                heapq.heappush(open_set, (f_score, neighbor))

    return []


def euclidean_distance(start, stop):
    return ((start[0] - stop[0])**2 + (start[1] - stop[1])**2)**0.5


def a_star_with_costs(grid, start, stop, cost_map):
    rows, cols = len(grid), len(grid[0])
    distance = {cell: float('inf') for cell in [(
        i, j) for i in range(rows) for j in range(cols)]}
    distance[start] = 0
    visited = set()
    expanded_nodes = []
    came_from = {}

    while True:
        unvisited_cells = [(cell, distance[cell] + euclidean_distance(cell, stop))
                           for cell in distance if cell not in visited]
        if not unvisited_cells:
            break
        current, _ = min(unvisited_cells, key=lambda x: x[1])

        visited.add(current)
        expanded_nodes.append(current)

        if current == stop:
            break

        for neighbor in get_neighbors(grid, current):
            new_distance = distance[current] + \
                get_distance_v2(current, neighbor)
            if new_distance < distance[neighbor]:
                distance[neighbor] = new_distance
                came_from[neighbor] = current

    path = []
    current_cell = stop
    while current_cell != start:
        path.insert(0, current_cell)
        current_cell = came_from[current_cell]

    expanded_nodes.append(start)
    return [start] + path, expanded_nodes
