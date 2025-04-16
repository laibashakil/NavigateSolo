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
  },
  { 
    from: "CSIT Room 5", 
    to: "CSIT Room 6", 
    direction: "Exit Room 5 through either door and turn right. Enter Room 6 through its first door.", 
    steps: 5,
    timeSeconds: 8
  },
  { 
    from: "CSIT Room 6", 
    to: "CSIT Room 5", 
    direction: "Exit Room 6 through either door and turn left. Enter Room 5 through either of its doors.", 
    steps: 5,
    timeSeconds: 8
  },
  { 
    from: "CSIT Room 6", 
    to: "CSIT Room 7", 
    direction: "Exit Room 6 through either door and turn right. Enter Room 7 through its first door.", 
    steps: 5,
    timeSeconds: 8
  },
  { 
    from: "CSIT Room 7", 
    to: "CSIT Room 6", 
    direction: "Exit Room 7 through either door and turn left. Enter Room 6 through either of its doors.", 
    steps: 5,
    timeSeconds: 8
  },
  { 
    from: "CSIT Room 7", 
    to: "CSIT Room 8", 
    direction: "Exit Room 7 through either door and turn right. Enter Room 8 through its first door.", 
    steps: 5,
    timeSeconds: 8
  },
  { 
    from: "CSIT Room 8", 
    to: "CSIT Room 7", 
    direction: "Exit Room 8 through either door and turn left. Enter Room 7 through either of its doors.", 
    steps: 5,
    timeSeconds: 8
  },
  { 
    from: "CSIT Room 5", 
    to: "CSIT Room 7", 
    direction: "Exit Room 5 through either door and turn right. Walk past both doors of Room 6 to reach Room 7's first door.", 
    steps: 12,
    timeSeconds: 18
  },
  { 
    from: "CSIT Room 7", 
    to: "CSIT Room 5", 
    direction: "Exit Room 7 through either door and turn left. Walk past both doors of Room 6 to reach Room 5's doors.", 
    steps: 12,
    timeSeconds: 18
  },
  { 
    from: "CSIT Room 6", 
    to: "CSIT Room 8", 
    direction: "Exit Room 6 through either door and turn right. Walk past both doors of Room 7 to reach Room 8's first door.", 
    steps: 12,
    timeSeconds: 18
  },
  { 
    from: "CSIT Room 8", 
    to: "CSIT Room 6", 
    direction: "Exit Room 8 through either door and turn left. Walk past both doors of Room 7 to reach Room 6's doors.", 
    steps: 12,
    timeSeconds: 18
  },
  { 
    from: "CSIT Room 5", 
    to: "CSIT Room 8", 
    direction: "Exit Room 5 through either door and turn right. Walk past both doors of Room 6 and Room 7 to reach Room 8's first door.", 
    steps: 16,
    timeSeconds: 24
  },
  { 
    from: "CSIT Room 8", 
    to: "CSIT Room 5", 
    direction: "Exit Room 8 through either door and turn left. Walk past both doors of Room 7 and Room 6 to reach Room 5's doors.", 
    steps: 16,
    timeSeconds: 24
  },
  { 
    from: "CSIT Lab 3", 
    to: "CSIT Lab 4", 
    direction: "Exit Lab 3 through either door and turn right. Enter Lab 4 through its first door.", 
    steps: 5,
    timeSeconds: 8
  },
  { 
    from: "CSIT Lab 4", 
    to: "CSIT Lab 3", 
    direction: "Exit Lab 4 through either door and turn left. Enter Lab 3 through either of its doors.", 
    steps: 5,
    timeSeconds: 8
  },
  { 
    from: "CSIT Lab 4", 
    to: "CSIT Lab 5", 
    direction: "Exit Lab 4 through either door and turn right. Enter Lab 5 through its first door.", 
    steps: 5,
    timeSeconds: 8
  },
  { 
    from: "CSIT Lab 5", 
    to: "CSIT Lab 4", 
    direction: "Exit Lab 5 through either door and turn left. Enter Lab 4 through either of its doors.", 
    steps: 5,
    timeSeconds: 8
  },
  { 
    from: "CSIT Lab 5", 
    to: "CSIT Project Lab", 
    direction: "Exit Lab 5 through either door and turn right. Enter Project Lab through its first door.", 
    steps: 5,
    timeSeconds: 8
  },
  { 
    from: "CSIT Project Lab", 
    to: "CSIT Lab 5", 
    direction: "Exit Project Lab through either door and turn left. Enter Lab 5 through either of its doors.", 
    steps: 5,
    timeSeconds: 8
  },
  { 
    from: "CSIT Room 1", 
    to: "CSIT Exit", 
    direction: "Exit Room 1, turn right and walk to CSIT Exit", 
    steps: 5,
    timeSeconds: 15
  },
  { 
    from: "CSIT Exit", 
    to: "CSIT Lab Exit", 
    direction: "From CSIT Exit, walk straight then take a right through the passageway, then another right up the ramp to reach CSIT Lab Exit", 
    steps: 25,
    timeSeconds: 35
  },
  { 
    from: "CSIT Lab Exit", 
    to: "CSIT Exit", 
    direction: "From Lab Exit, go down the ramp, take a left through the passageway then another left to reach CSIT Exit", 
    steps: 25,
    timeSeconds: 35
  },
  { 
    from: "CSIT Lab Exit", 
    to: "CSIT Lab 2", 
    direction: "From Lab Exit, walk straight and CSIT Lab 2 will be the third door on your left", 
    steps: 10,
    timeSeconds: 15
  },
  { 
    from: "CSIT Lab 2", 
    to: "CSIT Lab Exit", 
    direction: "Exit Lab 2, turn right and walk to CSIT Lab Exit", 
    steps: 10,
    timeSeconds: 15
  },
  // Add CSIT Entrance connections (one-way only)
  { 
    from: "CSIT Entrance", 
    to: "CSIT Room 1", 
    direction: "From CSIT Entrance, walk straight through the corridor and CSIT Room 1 will be the fourth room (seventh door) on your right", 
    steps: 25,
    timeSeconds: 30
  },
  { 
    from: "CSIT Entrance", 
    to: "CSIT Room 2", 
    direction: "From CSIT Entrance, walk straight through the corridor and CSIT Room 2 will be the third room (fifth door) on your right", 
    steps: 20,
    timeSeconds: 25
  },
  { 
    from: "CSIT Entrance", 
    to: "CSIT Room 3", 
    direction: "From CSIT Entrance, walk straight through the corridor and CSIT Room 3 will be the second room (third door) on your right", 
    steps: 15,
    timeSeconds: 20
  },
  { 
    from: "CSIT Entrance", 
    to: "CSIT Room 4", 
    direction: "From CSIT Entrance, walk straight and CSIT Room 4 will be the first room on your right", 
    steps: 10,
    timeSeconds: 15
  },
  { 
    from: "CSIT Entrance", 
    to: "CSIT Exit", 
    direction: "From CSIT Entrance, walk straight through the entire corridor to reach CSIT Exit", 
    steps: 30,
    timeSeconds: 45
  },
  // Add CSIT Lab Entrance connections (one-way only)
  { 
    from: "CSIT Lab Entrance", 
    to: "CSIT Lab Exit", 
    direction: "From CSIT Lab Entrance, walk straight through the entire corridor to reach CSIT Lab Exit", 
    steps: 30,
    timeSeconds: 45
  },
  { 
    from: "CSIT Lab Entrance", 
    to: "CSIT Lab 4", 
    direction: "From CSIT Lab Entrance, turn right then climb the stairs to first floor, turn right and CSIT Lab 4 will be the third lab room on your right", 
    steps: 40,
    timeSeconds: 65
  },
  { 
    from: "CSIT Lab Entrance", 
    to: "CSIT Lab 5", 
    direction: "From CSIT Lab Entrance, turn right then climb the stairs to first floor, turn right and CSIT Lab 5 will be the sixth room on your right", 
    steps: 45,
    timeSeconds: 70
  },
  { 
    from: "CSIT Lab Entrance", 
    to: "CSIT Project Lab", 
    direction: "From CSIT Lab Entrance, turn right then climb the stairs to first floor, turn right and CSIT Project Lab will be the fifth lab room on your right", 
    steps: 50,
    timeSeconds: 75
  },
  // Update Room 5-8 to Exit connections with stairs
  { 
    from: "CSIT Room 5", 
    to: "CSIT Exit", 
    direction: "Exit Room 5 through either door, turn left and climb down the stairs, then turn right and walk through the entire corridor to reach CSIT Exit", 
    steps: 45,
    timeSeconds: 70
  },
  { 
    from: "CSIT Room 6", 
    to: "CSIT Exit", 
    direction: "Exit Room 6 through either door, turn left and climb down the stairs, then turn right and walk through the entire corridor to reach CSIT Exit", 
    steps: 50,
    timeSeconds: 75
  },
  { 
    from: "CSIT Room 7", 
    to: "CSIT Exit", 
    direction: "Exit Room 7 through either door, turn left and climb down the stairs, then turn right and walk through the entire corridor to reach CSIT Exit", 
    steps: 55,
    timeSeconds: 80
  },
  { 
    from: "CSIT Room 8", 
    to: "CSIT Exit", 
    direction: "Exit Room 8 through either door, turn left and climb down the stairs, then turn right and walk through the entire corridor to reach CSIT Exit", 
    steps: 60,
    timeSeconds: 85
  },
  // Update Lab to Lab Exit connections with stairs
  { 
    from: "CSIT Lab 3", 
    to: "CSIT Lab Exit", 
    direction: "Exit Lab 3, turn left and climb down the stairs, then turn right and walk through the entire corridor to reach CSIT Lab Exit", 
    steps: 45,
    timeSeconds: 70
  },
  { 
    from: "CSIT Lab 4", 
    to: "CSIT Lab Exit", 
    direction: "Exit Lab 4, turn left and climb down the stairs, then turn right and walk through the entire corridor to reach CSIT Lab Exit", 
    steps: 50,
    timeSeconds: 75
  },
  { 
    from: "CSIT Lab 5", 
    to: "CSIT Lab Exit", 
    direction: "Exit Lab 5, turn left and climb down the stairs, then turn right and walk through the entire corridor to reach CSIT Lab Exit", 
    steps: 55,
    timeSeconds: 80
  },
  { 
    from: "CSIT Project Lab", 
    to: "CSIT Lab Exit", 
    direction: "Exit Project Lab, turn left and climb down the stairs, then turn right and walk through the entire corridor to reach CSIT Lab Exit", 
    steps: 60,
    timeSeconds: 85
  },
  // Add missing connections for Lab 3 to Lab 5
  { 
    from: "CSIT Lab 3", 
    to: "CSIT Lab 5", 
    direction: "Exit Lab 3 and turn right, walk past four doors to reach Lab 5", 
    steps: 12,
    timeSeconds: 18
  },
  // Add missing connections for Lab 3 to Project Lab
  { 
    from: "CSIT Lab 3", 
    to: "CSIT Project Lab", 
    direction: "Exit Lab 3 and turn right, walk past three doors to reach Project Lab", 
    steps: 16,
    timeSeconds: 24
  },
  // Add missing connection for Lab Entrance to Lab 3
  { 
    from: "CSIT Lab Entrance", 
    to: "CSIT Lab 3", 
    direction: "From CSIT Lab Entrance, turn right then climb the stairs to first floor, turn right and CSIT Lab 3 will be the first room on your right", 
    steps: 35,
    timeSeconds: 60
  }
];

// Map of which rooms are directly connected to each other
const roomAdjacencyMap: Record<string, string[]> = {
  "CSIT Room 1": ["CSIT Room 2", "CSIT Room 3", "CSIT Room 4", "CSIT Exit"],
  "CSIT Room 2": ["CSIT Room 1", "CSIT Room 3", "CSIT Room 4", "CSIT Exit"],
  "CSIT Room 3": ["CSIT Room 1", "CSIT Room 2", "CSIT Room 4", "CSIT Exit"],
  "CSIT Room 4": ["CSIT Room 1", "CSIT Room 2", "CSIT Room 3", "CSIT Exit"],
  "CSIT Room 5": ["CSIT Room 6", "CSIT Room 7", "CSIT Room 8", "CSIT Exit"],
  "CSIT Room 6": ["CSIT Room 5", "CSIT Room 7", "CSIT Room 8", "CSIT Exit"],
  "CSIT Room 7": ["CSIT Room 5", "CSIT Room 6", "CSIT Room 8", "CSIT Exit"],
  "CSIT Room 8": ["CSIT Room 5", "CSIT Room 6", "CSIT Room 7", "CSIT Exit"],
  "CSIT Lab 3": ["CSIT Lab 4", "CSIT Lab 5", "CSIT Project Lab", "CSIT Lab Exit"],
  "CSIT Lab 4": ["CSIT Lab 3", "CSIT Lab 5", "CSIT Project Lab", "CSIT Lab Exit"],
  "CSIT Lab 5": ["CSIT Lab 3", "CSIT Lab 4", "CSIT Project Lab", "CSIT Lab Exit"],
  "CSIT Project Lab": ["CSIT Lab 3", "CSIT Lab 4", "CSIT Lab 5", "CSIT Lab Exit"],
  "CSIT Exit": ["CSIT Room 1","CSIT Room 2", "CSIT Room 3", "CSIT Room 4", "CSIT Lab Exit"],
  "CSIT Lab Exit": ["CSIT Exit", "CSIT Lab 2"],
  "CSIT Lab 2": ["CSIT Lab Exit"],
  "CSIT Entrance": ["CSIT Room 1", "CSIT Room 2", "CSIT Room 3", "CSIT Room 4", "CSIT Exit"],
  "CSIT Lab Entrance": ["CSIT Lab Exit","CSIT Lab 3", "CSIT Lab 4", "CSIT Lab 5", "CSIT Project Lab"]
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