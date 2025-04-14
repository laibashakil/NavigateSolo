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
    from: "CSIT Room 1", 
    to: "CSIT Room 2", 
    direction: "Exit Room 1 through either door and turn right. Enter Room 2 through its first door.", 
    steps: 5,
    timeSeconds: 8
  },
  { 
    from: "CSIT Room 2", 
    to: "CSIT Room 1", 
    direction: "Exit Room 2 through either door and turn left. Enter Room 1 through either of its doors.", 
    steps: 5,
    timeSeconds: 8
  },
  { 
    from: "CSIT Room 2", 
    to: "CSIT Room 3", 
    direction: "Exit Room 2 through either door and turn right. Pass both doors of Room 2 to reach Room 3's first door.", 
    steps: 8,
    timeSeconds: 12
  },
  { 
    from: "CSIT Room 3", 
    to: "CSIT Room 2", 
    direction: "Exit Room 3 through either door and turn left. Enter Room 2 through either of its doors.", 
    steps: 8,
    timeSeconds: 12
  },
  { 
    from: "CSIT Room 3", 
    to: "CSIT Room 4", 
    direction: "Exit Room 3 through either door and turn right. Enter Room 4 through its first door.", 
    steps: 5,
    timeSeconds: 8
  },
  { 
    from: "CSIT Room 4", 
    to: "CSIT Room 3", 
    direction: "Exit Room 4 through either door and turn left. Enter Room 3 through either of its doors.", 
    steps: 5,
    timeSeconds: 8
  },
  { 
    from: "CSIT Room 1", 
    to: "CSIT Room 3", 
    direction: "Exit Room 1 through either door and turn right. Walk past both doors of Room 2 to reach Room 3's first door.", 
    steps: 12,
    timeSeconds: 18
  },
  { 
    from: "CSIT Room 3", 
    to: "CSIT Room 1", 
    direction: "Exit Room 3 through either door and turn left. Walk past both doors of Room 2 to reach Room 1's doors.", 
    steps: 12,
    timeSeconds: 18
  },
  { 
    from: "CSIT Room 2", 
    to: "CSIT Room 4", 
    direction: "Exit Room 2 through either door and turn right. Walk past both doors of Room 3 to reach Room 4's first door.", 
    steps: 12,
    timeSeconds: 18
  },
  { 
    from: "CSIT Room 4", 
    to: "CSIT Room 2", 
    direction: "Exit Room 4 through either door and turn left. Walk past both doors of Room 3 to reach Room 2's doors.", 
    steps: 12,
    timeSeconds: 18
  },
  { 
    from: "CSIT Room 1", 
    to: "CSIT Room 4", 
    direction: "Exit Room 1 through either door and turn right. Walk past both doors of Room 2 and Room 3 to reach Room 4's first door.", 
    steps: 16,
    timeSeconds: 24
  },
  { 
    from: "CSIT Room 4", 
    to: "CSIT Room 1", 
    direction: "Exit Room 4 through either door and turn left. Walk past both doors of Room 3 and Room 2 to reach Room 1's doors.", 
    steps: 16,
    timeSeconds: 24
  }
];

// Map of which rooms are directly connected to each other
const roomAdjacencyMap: Record<string, string[]> = {
  "CSIT Room 1": ["CSIT Room 2", "CSIT Room 3", "CSIT Room 4"],
  "CSIT Room 2": ["CSIT Room 1", "CSIT Room 3", "CSIT Room 4"],
  "CSIT Room 3": ["CSIT Room 1", "CSIT Room 2", "CSIT Room 4"],
  "CSIT Room 4": ["CSIT Room 1", "CSIT Room 2", "CSIT Room 3"]
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