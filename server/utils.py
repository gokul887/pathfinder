def get_neighbors(grid, cell):
    neighbors = []
    directions = [(1, 0), (-1, 0), (0, 1), (0, -1),
                  (1, 1), (-1, 1), (1, -1), (-1, -1)]

    for dr, dc in directions:
        r, c = cell[0] + dr, cell[1] + dc
        if 0 <= r < len(grid) and 0 <= c < len(grid[0]) and grid[r][c]['value'] != -1:
            neighbors.append((r, c))

    return neighbors


def get_distance(current, neighbor):
    if current[0] - neighbor[0] != 0:
        if current[1] - neighbor[1] != 0:
            return "diagonal"
        else:
            return "horizontal"
    return "vertical"


def get_distance_v2(current, neighbor):
    if current[0] - neighbor[0] != 0:
        if current[1] - neighbor[1] != 0:
            return 1.5
    return 1
