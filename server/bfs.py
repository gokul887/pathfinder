from collections import deque
from utils import get_neighbors, get_distance


class BFS:
    def bfs_with_costs(grid, start, stop, cost_map):
        rows, cols = len(grid), len(grid[0])
        distance = {cell: float('inf') for cell in [(
            i, j) for i in range(rows) for j in range(cols)]}
        distance[start] = 0
        visited = set()
        expanded_nodes = []
        came_from = {}

        queue = deque([start])

        while queue:
            current = queue.popleft()
            visited.add(current)
            expanded_nodes.append(current)

            if current == stop:
                break

            for neighbor in get_neighbors(grid, current):
                new_distance = distance[current] + \
                    cost_map.get(get_distance(current, neighbor), 1)
                if neighbor not in visited and new_distance < distance[neighbor]:
                    distance[neighbor] = new_distance
                    came_from[neighbor] = current
                    queue.append(neighbor)

        path = []
        current_cell = stop
        while current_cell != start:
            path.insert(0, current_cell)
            current_cell = came_from[current_cell]

        expanded_nodes.append(start)
        return [start] + path, expanded_nodes
