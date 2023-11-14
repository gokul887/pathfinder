from utils import *


class Dijkstra:
    def dijkstra_with_costs(grid, start, stop, cost_map):
        rows, cols = len(grid), len(grid[0])
        distance = {cell: float('inf') for cell in [(
            i, j) for i in range(rows) for j in range(cols)]}
        distance[start] = 0
        visited = set()
        expanded_nodes = []
        came_from = {}

        while True:
            unvisited_cells = [
                cell for cell in distance if cell not in visited]
            if not unvisited_cells:
                break
            min_dist_cell = min(
                unvisited_cells, key=lambda cell: distance[cell])

            visited.add(min_dist_cell)
            expanded_nodes.append(min_dist_cell)

            if min_dist_cell == stop:
                break

            for neighbor in get_neighbors(grid, min_dist_cell):
                new_distance = distance[min_dist_cell] + \
                    get_distance_v2(min_dist_cell, neighbor)
                if new_distance < distance[neighbor]:
                    distance[neighbor] = new_distance
                    came_from[neighbor] = min_dist_cell

        path = []
        current_cell = stop
        while current_cell != start:
            path.insert(0, current_cell)
            current_cell = came_from[current_cell]

        expanded_nodes.append(start)
        return [start] + path, expanded_nodes
