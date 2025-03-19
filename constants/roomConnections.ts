interface RoomConnection {
  from: string;
  to: string;
  direction: string;
  steps: number;
  timeSeconds: number; // Approximate time to walk this path in seconds
}

// Room connection map defining how rooms are connected
const roomConnections: RoomConnection[] = [
  { 
    from: "Laiba's room", 
    to: "Laiba's Lounge", 
    direction: "Go straight out of the room and you're there!", 
    steps: 5,
    timeSeconds: 8
  },
  { 
    from: "Laiba's Lounge", 
    to: "Laiba's room", 
    direction: "Walk straight to the room by choosing the door to your right", 
    steps: 5,
    timeSeconds: 8
  },
  { 
    from: "Laiba's Lounge", 
    to: "Laiba's kitchen", 
    direction: "Walk straight from the lounge to the short hallway to your left and walk straight to the kitchen", 
    steps: 8,
    timeSeconds: 12
  },
  { 
    from: "Laiba's kitchen", 
    to: "Laiba's Lounge", 
    direction: "Walk straight from the kitchen back to the lounge through the short hallway", 
    steps: 8,
    timeSeconds: 12
  },
  { 
    from: "Laiba's room", 
    to: "Laiba's room 2", 
    direction: "Go straight to the door and the door on the right leads to room 2", 
    steps: 10,
    timeSeconds: 15
  },
  { 
    from: "Laiba's room 2", 
    to: "Laiba's room", 
    direction: "Walk straight to the room by choosing the door to your left", 
    steps: 10,
    timeSeconds: 15
  },
];

// Map of which rooms are directly connected to each other
const roomAdjacencyMap: Record<string, string[]> = {
  "Laiba's room": ["Laiba's Lounge", "Laiba's room 2"],
  "Laiba's Lounge": ["Laiba's room", "Laiba's kitchen"],
  "Laiba's kitchen": ["Laiba's Lounge"],
  "Laiba's room 2": ["Laiba's room"]
};

/**
 * Find all possible paths between two locations
 * @param start Starting location name
 * @param end Destination location name
 * @param maxDepth Maximum path length to consider (to prevent infinite loops)
 * @returns Array of possible paths, each an array of location names
 */
const findAllPaths = (
  start: string, 
  end: string, 
  maxDepth: number = 5
): string[][] => {
  const visited: Record<string, boolean> = {};
  const result: string[][] = [];
  
  const dfs = (current: string, path: string[], depth: number) => {
    // Base case: reached max depth or destination
    if (depth >= maxDepth) return;
    if (current === end) {
      result.push([...path, current]);
      return;
    }
    
    // Mark current node as visited in this path
    visited[current] = true;
    
    // Explore adjacent rooms
    const adjacentRooms = roomAdjacencyMap[current] || [];
    for (const nextRoom of adjacentRooms) {
      if (!visited[nextRoom]) {
        dfs(nextRoom, [...path, current], depth + 1);
      }
    }
    
    // Backtrack: mark as unvisited for other paths
    visited[current] = false;
  };
  
  dfs(start, [], 0);
  return result;
};

/**
 * Find the shortest path between two locations
 * @param start Starting location name
 * @param end Destination location name
 * @returns Array of location names representing the shortest path, or empty array if no path found
 */
const findShortestPath = (start: string, end: string): string[] => {
  const paths = findAllPaths(start, end);
  if (paths.length === 0) return [];
  
  // Find the path with the fewest steps
  return paths.reduce((shortest, current) => 
    current.length < shortest.length ? current : shortest
  );
};

/**
 * Convert a path of location names to navigation directions
 * @param path Array of location names representing a path
 * @returns Array of direction strings
 */
const pathToDirections = (path: string[]): string[] => {
  if (path.length < 2) return ["You are already at your destination"];
  
  const directions: string[] = [];
  for (let i = 0; i < path.length - 1; i++) {
    const from = path[i];
    const to = path[i + 1];
    
    const connection = roomConnections.find(
      conn => conn.from === from && conn.to === to
    );
    
    if (connection) {
      if (path.length <= 3) {
        // For short paths, we don't need step numbers
        directions.push(connection.direction);
      } else {
        // For longer paths, add step numbers
        directions.push(`${i + 1}. ${connection.direction}`);
      }
    }
  }
  
  return directions.length ? directions : ["No known route to destination"];
};

export {
  roomConnections,
  roomAdjacencyMap,
  findAllPaths,
  findShortestPath,
  pathToDirections,
  type RoomConnection
}; 