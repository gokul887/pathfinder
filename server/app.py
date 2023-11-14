from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from flask.helpers import send_from_directory
from dijkstra import Dijkstra
from astar import a_star_with_costs
from bfs import BFS
from dfs import DFS

app = Flask(__name__, static_folder='client/build', static_url_path='')
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/dijkstra', methods=['POST'])
@cross_origin()
def find_shortest_path_with_costs():
    data = request.get_json()
    grid = data['grid']
    start = tuple(data['start'])
    stop = tuple(data['stop'])
    cost_map = data.get('cost_map', {})
    shortest_path, expanded_nodes = Dijkstra.dijkstra_with_costs(
        grid, start, stop, cost_map)
    response = {
        'path': shortest_path,
        'expanded_nodes': expanded_nodes
    }
    return jsonify(response)


@app.route('/astar', methods=['POST'])
@cross_origin()
def find_shortest_path_a_star():
    data = request.get_json()
    grid = data['grid']
    start = tuple(data['start'])
    stop = tuple(data['stop'])
    cost_map = data.get('cost_map', {})
    shortest_path, expanded_nodes = a_star_with_costs(
        grid, start, stop, cost_map)
    response = {'path': shortest_path, 'expanded_nodes': expanded_nodes}
    return jsonify(response)


@app.route('/bfs', methods=['POST'])
@cross_origin()
def find_shortest_path_bfs():
    data = request.get_json()
    grid = data['grid']
    start = tuple(data['start'])
    stop = tuple(data['stop'])
    cost_map = data.get('cost_map', {})
    shortest_path, expanded_nodes = BFS.bfs_with_costs(
        grid, start, stop, cost_map)
    response = {'path': shortest_path, 'expanded_nodes': expanded_nodes}
    return jsonify(response)


@app.route('/dfs', methods=['POST'])
@cross_origin()
def find_shortest_path_dfs():
    data = request.get_json()
    grid = data['grid']
    start = tuple(data['start'])
    stop = tuple(data['stop'])
    shortest_path, expanded_nodes = DFS(
        grid, start, stop).dfs_with_custom_order()
    response = {'path': shortest_path, 'expanded_nodes': expanded_nodes}
    return jsonify(response)


@app.route('/')
def home():
    return "Hello Flask"


def serve():
    return send_from_directory(app.static_folder, 'index.html')


if __name__ == "__main__":
    app.run(debug=True)
