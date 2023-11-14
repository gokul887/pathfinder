class DFS:
    def __init__(self, grid, start, stop) -> None:
        self.grid = grid
        self.start = start
        self.stop = stop

    def dfs_with_custom_order(self):
        rows, cols = len(self.grid), len(self.grid[0])
        visited = set()
        expanded_nodes = []
        came_from = {}

        directions = [(0, 1), (1, 0), (0, -1), (-1, 0)]

        def valid_move(row, col):
            if (0 <= row < rows and 0 <= col < cols):
                current_cell = self.grid[row][col]
                return current_cell['value'] != -1
            return False

        def get_next_moves(current):
            moves = []
            cur_row, cur_col = current
            for dr, dc in directions:
                new_row, new_col = cur_row + dr, cur_col + dc
                if valid_move(new_row, new_col):
                    moves.append((new_row, new_col))
            return moves

        stack = [self.start]

        while stack:
            current = stack.pop()
            visited.add(current)
            expanded_nodes.append(current)

            if current == self.stop:
                break

            neighbors = get_next_moves(current)
            for neighbor in neighbors:
                if neighbor not in visited:
                    came_from[neighbor] = current
                    stack.append(neighbor)

        path = []
        current_cell = self.stop
        while current_cell != self.start:
            path.insert(0, current_cell)
            current_cell = came_from[current_cell]

        expanded_nodes.append(self.start)
        return [self.start] + path, expanded_nodes
