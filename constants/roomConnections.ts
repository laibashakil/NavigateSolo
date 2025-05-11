interface RoomConnection {
  from: string;
  to: string;
  direction: string;
  steps: number;
}

// Auto-generated: every direct connection in the adjacency map (both directions)
const roomConnections: RoomConnection[] = [
  // CSIT Room 1
  { from: "CSIT Room 1", to: "CSIT Room 2", direction: "Exit Room 1 through either door and turn right. Enter Room 2 through its first door.", steps: 5 },
  { from: "CSIT Room 2", to: "CSIT Room 1", direction: "Exit Room 2 through its first door and turn left. Enter Room 1 through either door.", steps: 5 },
  { from: "CSIT Room 1", to: "CSIT Room 3", direction: "Exit Room 1 through either door and turn right. Walk past both doors of Room 2 to reach Room 3's first door.", steps: 10 },
  { from: "CSIT Room 3", to: "CSIT Room 1", direction: "Exit Room 3 through its first door and turn left. Walk past Room 2 to reach Room 1.", steps: 10 },
  { from: "CSIT Room 1", to: "CSIT Room 4", direction: "Exit Room 1 through either door and turn right. Walk past both doors of Room 2 and Room 3 to reach Room 4's first door.", steps: 15 },
  { from: "CSIT Room 4", to: "CSIT Room 1", direction: "Exit Room 4 through its first door and turn left. Walk past Room 3 and Room 2 to reach Room 1.", steps: 15 },
  { from: "CSIT Room 1", to: "CSIT Exit", direction: "Exit Room 1, turn right and walk to CSIT Exit.", steps: 10 },
  { from: "CSIT Exit", to: "CSIT Room 1", direction: "From CSIT Exit, walk straight and enter Room 1 through either door.", steps: 10 },
  { from: "CSIT Room 1", to: "CSIT Entrance", direction: "Exit Room 1, turn right and walk to CSIT Exit, then continue to CSIT Entrance.", steps: 20 },
  { from: "CSIT Entrance", to: "CSIT Room 1", direction: "From CSIT Entrance, walk to CSIT Exit, then enter Room 1 through either door.", steps: 20 },
  { from: "CSIT Room 1", to: "CSIT Room 5", direction: "Exit Room 1, turn right and walk to CSIT Exit, then continue to Room 5.", steps: 25 },
  { from: "CSIT Room 5", to: "CSIT Room 1", direction: "Exit Room 5, walk to CSIT Exit, then continue to Room 1.", steps: 25 },
  { from: "CSIT Room 1", to: "CSIT Lab 2", direction: "Exit Room 1, turn right and walk to CSIT Exit, then follow the path to Lab 2.", steps: 30 },
  { from: "CSIT Lab 2", to: "CSIT Room 1", direction: "Exit Lab 2, walk to CSIT Exit, then continue to Room 1.", steps: 30 },

  // CSIT Room 2
  { from: "CSIT Room 2", to: "CSIT Room 3", direction: "Exit Room 2 through its second door and turn right. Enter Room 3 through its first door.", steps: 5 },
  { from: "CSIT Room 3", to: "CSIT Room 2", direction: "Exit Room 3 through its first door and turn left. Enter Room 2 through its second door.", steps: 5 },
  { from: "CSIT Room 2", to: "CSIT Room 4", direction: "Exit Room 2 through its second door and turn right. Walk past Room 3 to reach Room 4's first door.", steps: 10 },
  { from: "CSIT Room 4", to: "CSIT Room 2", direction: "Exit Room 4 through its first door and turn left. Walk past Room 3 to reach Room 2's second door.", steps: 10 },
  { from: "CSIT Room 2", to: "CSIT Exit", direction: "Exit Room 2, turn right and walk to CSIT Exit.", steps: 10 },
  { from: "CSIT Exit", to: "CSIT Room 2", direction: "From CSIT Exit, walk straight and enter Room 2 through either door.", steps: 10 },
  { from: "CSIT Room 2", to: "CSIT Entrance", direction: "Exit Room 2, turn right and walk to CSIT Exit, then continue to CSIT Entrance.", steps: 20 },
  { from: "CSIT Entrance", to: "CSIT Room 2", direction: "From CSIT Entrance, walk to CSIT Exit, then enter Room 2 through either door.", steps: 20 },
  { from: "CSIT Room 2", to: "CSIT Room 5", direction: "Exit Room 2, turn right and walk to CSIT Exit, then continue to Room 5.", steps: 25 },
  { from: "CSIT Room 5", to: "CSIT Room 2", direction: "Exit Room 5, walk to CSIT Exit, then continue to Room 2.", steps: 25 },
  { from: "CSIT Room 2", to: "CSIT Lab 2", direction: "Exit Room 2, turn right and walk to CSIT Exit, then follow the path to Lab 2.", steps: 30 },
  { from: "CSIT Lab 2", to: "CSIT Room 2", direction: "Exit Lab 2, walk to CSIT Exit, then continue to Room 2.", steps: 30 },

  // CSIT Room 3
  { from: "CSIT Room 3", to: "CSIT Room 4", direction: "Exit Room 3 through its second door and turn right. Enter Room 4 through its first door.", steps: 5 },
  { from: "CSIT Room 4", to: "CSIT Room 3", direction: "Exit Room 4 through its first door and turn left. Enter Room 3 through its second door.", steps: 5 },
  { from: "CSIT Room 3", to: "CSIT Exit", direction: "Exit Room 3, turn right and walk to CSIT Exit.", steps: 10 },
  { from: "CSIT Exit", to: "CSIT Room 3", direction: "From CSIT Exit, walk straight and enter Room 3 through either door.", steps: 10 },
  { from: "CSIT Room 3", to: "CSIT Entrance", direction: "Exit Room 3, turn right and walk to CSIT Exit, then continue to CSIT Entrance.", steps: 20 },
  { from: "CSIT Entrance", to: "CSIT Room 3", direction: "From CSIT Entrance, walk to CSIT Exit, then enter Room 3 through either door.", steps: 20 },
  { from: "CSIT Room 3", to: "CSIT Room 5", direction: "Exit Room 3, turn right and walk to CSIT Exit, then continue to Room 5.", steps: 25 },
  { from: "CSIT Room 5", to: "CSIT Room 3", direction: "Exit Room 5, walk to CSIT Exit, then continue to Room 3.", steps: 25 },
  { from: "CSIT Room 3", to: "CSIT Lab 2", direction: "Exit Room 3, turn right and walk to CSIT Exit, then follow the path to Lab 2.", steps: 30 },
  { from: "CSIT Lab 2", to: "CSIT Room 3", direction: "Exit Lab 2, walk to CSIT Exit, then continue to Room 3.", steps: 30 },

  // CSIT Room 4
  { from: "CSIT Room 4", to: "CSIT Exit", direction: "Exit Room 4, turn right and walk to CSIT Exit.", steps: 10 },
  { from: "CSIT Exit", to: "CSIT Room 4", direction: "From CSIT Exit, walk straight and enter Room 4 through either door.", steps: 10 },
  { from: "CSIT Room 4", to: "CSIT Entrance", direction: "Exit Room 4, turn right and walk to CSIT Exit, then continue to CSIT Entrance.", steps: 20 },
  { from: "CSIT Entrance", to: "CSIT Room 4", direction: "From CSIT Entrance, walk to CSIT Exit, then enter Room 4 through either door.", steps: 20 },
  { from: "CSIT Room 4", to: "CSIT Room 5", direction: "Exit Room 4, turn right and walk to CSIT Exit, then continue to Room 5.", steps: 25 },
  { from: "CSIT Room 5", to: "CSIT Room 4", direction: "Exit Room 5, walk to CSIT Exit, then continue to Room 4.", steps: 25 },
  { from: "CSIT Room 4", to: "CSIT Lab 2", direction: "Exit Room 4, turn right and walk to CSIT Exit, then follow the path to Lab 2.", steps: 30 },
  { from: "CSIT Lab 2", to: "CSIT Room 4", direction: "Exit Lab 2, walk to CSIT Exit, then continue to Room 4.", steps: 30 },

  // CSIT Room 5
  { from: "CSIT Room 5", to: "CSIT Room 6", direction: "Exit Room 5 through either door and turn right. Enter Room 6 through its first door.", steps: 5 },
  { from: "CSIT Room 6", to: "CSIT Room 5", direction: "Exit Room 6 through its first door and turn left. Enter Room 5 through either door.", steps: 5 },
  { from: "CSIT Room 5", to: "CSIT Room 7", direction: "Exit Room 5 through either door and turn right. Walk past Room 6 to reach Room 7's first door.", steps: 10 },
  { from: "CSIT Room 7", to: "CSIT Room 5", direction: "Exit Room 7 through its first door and turn left. Walk past Room 6 to reach Room 5.", steps: 10 },
  { from: "CSIT Room 5", to: "CSIT Room 8", direction: "Exit Room 5 through either door and turn right. Walk past Room 6 and Room 7 to reach Room 8's first door.", steps: 15 },
  { from: "CSIT Room 8", to: "CSIT Room 5", direction: "Exit Room 8 through its first door and turn left. Walk past Room 7 and Room 6 to reach Room 5.", steps: 15 },
  { from: "CSIT Room 5", to: "CSIT Exit", direction: "Exit Room 5, turn left and walk to CSIT Exit.", steps: 10 },
  { from: "CSIT Exit", to: "CSIT Room 5", direction: "From CSIT Exit, walk straight and enter Room 5 through either door.", steps: 10 },
  { from: "CSIT Room 5", to: "CSIT Entrance", direction: "Exit Room 5, turn left and walk to CSIT Exit, then continue to CSIT Entrance.", steps: 20 },
  { from: "CSIT Entrance", to: "CSIT Room 5", direction: "From CSIT Entrance, walk to CSIT Exit, then enter Room 5 through either door.", steps: 20 },
  { from: "CSIT Room 5", to: "CSIT Lab 2", direction: "Exit Room 5, turn left and walk to CSIT Exit, then follow the path to Lab 2.", steps: 30 },
  { from: "CSIT Lab 2", to: "CSIT Room 5", direction: "Exit Lab 2, walk to CSIT Exit, then continue to Room 5.", steps: 30 },

  // CSIT Room 6
  { from: "CSIT Room 6", to: "CSIT Room 7", direction: "Exit Room 6 through its second door and turn right. Enter Room 7 through its first door.", steps: 5 },
  { from: "CSIT Room 7", to: "CSIT Room 6", direction: "Exit Room 7 through its first door and turn left. Enter Room 6 through its second door.", steps: 5 },
  { from: "CSIT Room 6", to: "CSIT Room 8", direction: "Exit Room 6 through its second door and turn right. Walk past Room 7 to reach Room 8's first door.", steps: 10 },
  { from: "CSIT Room 8", to: "CSIT Room 6", direction: "Exit Room 8 through its first door and turn left. Walk past Room 7 to reach Room 6's second door.", steps: 10 },
  { from: "CSIT Room 6", to: "CSIT Exit", direction: "Exit Room 6, turn left and walk to CSIT Exit.", steps: 10 },
  { from: "CSIT Exit", to: "CSIT Room 6", direction: "From CSIT Exit, walk straight and enter Room 6 through either door.", steps: 10 },
  { from: "CSIT Room 6", to: "CSIT Entrance", direction: "Exit Room 6, turn left and walk to CSIT Exit, then continue to CSIT Entrance.", steps: 20 },
  { from: "CSIT Entrance", to: "CSIT Room 6", direction: "From CSIT Entrance, walk to CSIT Exit, then enter Room 6 through either door.", steps: 20 },
  { from: "CSIT Room 6", to: "CSIT Lab 2", direction: "Exit Room 6, turn left and walk to CSIT Exit, then follow the path to Lab 2.", steps: 30 },
  { from: "CSIT Lab 2", to: "CSIT Room 6", direction: "Exit Lab 2, walk to CSIT Exit, then continue to Room 6.", steps: 30 },

  // CSIT Room 7
  { from: "CSIT Room 7", to: "CSIT Room 8", direction: "Exit Room 7 through its second door and turn right. Enter Room 8 through its first door.", steps: 5 },
  { from: "CSIT Room 8", to: "CSIT Room 7", direction: "Exit Room 8 through its first door and turn left. Enter Room 7 through its second door.", steps: 5 },
  { from: "CSIT Room 7", to: "CSIT Exit", direction: "Exit Room 7, turn left and walk to CSIT Exit.", steps: 10 },
  { from: "CSIT Exit", to: "CSIT Room 7", direction: "From CSIT Exit, walk straight and enter Room 7 through either door.", steps: 10 },
  { from: "CSIT Room 7", to: "CSIT Entrance", direction: "Exit Room 7, turn left and walk to CSIT Exit, then continue to CSIT Entrance.", steps: 20 },
  { from: "CSIT Entrance", to: "CSIT Room 7", direction: "From CSIT Entrance, walk to CSIT Exit, then enter Room 7 through either door.", steps: 20 },
  { from: "CSIT Room 7", to: "CSIT Lab 2", direction: "Exit Room 7, turn left and walk to CSIT Exit, then follow the path to Lab 2.", steps: 30 },
  { from: "CSIT Lab 2", to: "CSIT Room 7", direction: "Exit Lab 2, walk to CSIT Exit, then continue to Room 7.", steps: 30 },

  // CSIT Room 8
  { from: "CSIT Room 8", to: "CSIT Exit", direction: "Exit Room 8, turn left and walk to CSIT Exit.", steps: 10 },
  { from: "CSIT Exit", to: "CSIT Room 8", direction: "From CSIT Exit, walk straight and enter Room 8 through either door.", steps: 10 },
  { from: "CSIT Room 8", to: "CSIT Entrance", direction: "Exit Room 8, turn left and walk to CSIT Exit, then continue to CSIT Entrance.", steps: 20 },
  { from: "CSIT Entrance", to: "CSIT Room 8", direction: "From CSIT Entrance, walk to CSIT Exit, then enter Room 8 through either door.", steps: 20 },
  { from: "CSIT Room 8", to: "CSIT Lab 2", direction: "Exit Room 8, turn left and walk to CSIT Exit, then follow the path to Lab 2.", steps: 30 },
  { from: "CSIT Lab 2", to: "CSIT Room 8", direction: "Exit Lab 2, walk to CSIT Exit, then continue to Room 8.", steps: 30 },

  // CSIT Lab 2
  { from: "CSIT Lab 2", to: "CSIT Lab Exit", direction: "Exit Lab 2, turn right and walk to Lab Exit.", steps: 5 },
  { from: "CSIT Lab Exit", to: "CSIT Lab 2", direction: "From Lab Exit, walk straight and enter Lab 2.", steps: 5 },
  { from: "CSIT Lab 2", to: "CSIT Lab 3", direction: "Exit Lab 2, turn right and walk to Lab Exit, then follow the path to Lab 3.", steps: 20 },
  { from: "CSIT Lab 3", to: "CSIT Lab 2", direction: "Exit Lab 3, turn left and walk to Lab Exit, then continue to Lab 2.", steps: 20 },
  { from: "CSIT Lab 2", to: "CSIT Lab 4", direction: "Exit Lab 2, turn right and walk to Lab Exit, then follow the path to Lab 4.", steps: 25 },
  { from: "CSIT Lab 4", to: "CSIT Lab 2", direction: "Exit Lab 4, turn left and walk to Lab Exit, then continue to Lab 2.", steps: 25 },
  { from: "CSIT Lab 2", to: "CSIT Lab 5", direction: "Exit Lab 2, turn right and walk to Lab Exit, then follow the path to Lab 5.", steps: 30 },
  { from: "CSIT Lab 5", to: "CSIT Lab 2", direction: "Exit Lab 5, turn left and walk to Lab Exit, then continue to Lab 2.", steps: 30 },
  { from: "CSIT Lab 2", to: "CSIT Project Lab", direction: "Exit Lab 2, turn right and walk to Lab Exit, then follow the path to Project Lab.", steps: 35 },
  { from: "CSIT Project Lab", to: "CSIT Lab 2", direction: "Exit Project Lab, turn left and walk to Lab Exit, then continue to Lab 2.", steps: 35 },

  // CSIT Lab 3
  { from: "CSIT Lab 3", to: "CSIT Lab 4", direction: "Exit Lab 3 through either door and turn right. Enter Lab 4 through either of its doors.", steps: 5 },
  { from: "CSIT Lab 4", to: "CSIT Lab 3", direction: "Exit Lab 4 through either door and turn left. Enter Lab 3 through either of its doors.", steps: 5 },
  { from: "CSIT Lab 3", to: "CSIT Lab 5", direction: "Exit Lab 3 through either door and turn right. Walk past Lab 4 to reach Lab 5.", steps: 10 },
  { from: "CSIT Lab 5", to: "CSIT Lab 3", direction: "Exit Lab 5 through either door and turn left. Walk past Lab 4 to reach Lab 3.", steps: 10 },
  { from: "CSIT Lab 3", to: "CSIT Project Lab", direction: "Exit Lab 3 through either door and turn right. Walk past Lab 4 and Lab 5 to reach Project Lab.", steps: 15 },
  { from: "CSIT Project Lab", to: "CSIT Lab 3", direction: "Exit Project Lab through either door and turn left. Walk past Lab 5 and Lab 4 to reach Lab 3.", steps: 15 },
  { from: "CSIT Lab 3", to: "CSIT Lab Exit", direction: "Exit Lab 3, turn left and walk to Lab Exit.", steps: 10 },
  { from: "CSIT Lab Exit", to: "CSIT Lab 3", direction: "From Lab Exit, walk straight and enter Lab 3.", steps: 10 },
  { from: "CSIT Lab 3", to: "CSIT Lab Entrance", direction: "Exit Lab 3, turn left and walk to Lab Exit, then continue to Lab Entrance.", steps: 15 },
  { from: "CSIT Lab Entrance", to: "CSIT Lab 3", direction: "From Lab Entrance, walk to Lab Exit, then enter Lab 3.", steps: 15 },

  // CSIT Lab 4
  { from: "CSIT Lab 4", to: "CSIT Lab 5", direction: "Exit Lab 4 through either door and turn right. Enter Lab 5 through either of its doors.", steps: 5 },
  { from: "CSIT Lab 5", to: "CSIT Lab 4", direction: "Exit Lab 5 through either door and turn left. Enter Lab 4 through either of its doors.", steps: 5 },
  { from: "CSIT Lab 4", to: "CSIT Project Lab", direction: "Exit Lab 4 through either door and turn right. Walk past Lab 5 to reach Project Lab.", steps: 10 },
  { from: "CSIT Project Lab", to: "CSIT Lab 4", direction: "Exit Project Lab through either door and turn left. Walk past Lab 5 to reach Lab 4.", steps: 10 },
  { from: "CSIT Lab 4", to: "CSIT Lab Exit", direction: "Exit Lab 4, turn left and walk to Lab Exit.", steps: 10 },
  { from: "CSIT Lab Exit", to: "CSIT Lab 4", direction: "From Lab Exit, walk straight and enter Lab 4.", steps: 10 },
  { from: "CSIT Lab 4", to: "CSIT Lab Entrance", direction: "Exit Lab 4, turn left and walk to Lab Exit, then continue to Lab Entrance.", steps: 15 },
  { from: "CSIT Lab Entrance", to: "CSIT Lab 4", direction: "From Lab Entrance, walk to Lab Exit, then enter Lab 4.", steps: 15 },

  // CSIT Lab 5
  { from: "CSIT Lab 5", to: "CSIT Project Lab", direction: "Exit Lab 5 through either door and turn right. Enter Project Lab through its first door.", steps: 5 },
  { from: "CSIT Project Lab", to: "CSIT Lab 5", direction: "Exit Project Lab through its first door and turn left. Enter Lab 5 through either door.", steps: 5 },
  { from: "CSIT Lab 5", to: "CSIT Lab Exit", direction: "Exit Lab 5, turn left and walk to Lab Exit.", steps: 10 },
  { from: "CSIT Lab Exit", to: "CSIT Lab 5", direction: "From Lab Exit, walk straight and enter Lab 5.", steps: 10 },
  { from: "CSIT Lab 5", to: "CSIT Lab Entrance", direction: "Exit Lab 5, turn left and walk to Lab Exit, then continue to Lab Entrance.", steps: 15 },
  { from: "CSIT Lab Entrance", to: "CSIT Lab 5", direction: "From Lab Entrance, walk to Lab Exit, then enter Lab 5.", steps: 15 },

  // CSIT Project Lab
  { from: "CSIT Project Lab", to: "CSIT Lab Exit", direction: "Exit Project Lab, turn left and walk to Lab Exit.", steps: 10 },
  { from: "CSIT Lab Exit", to: "CSIT Project Lab", direction: "From Lab Exit, walk straight and enter Project Lab.", steps: 10 },
  { from: "CSIT Project Lab", to: "CSIT Lab Entrance", direction: "Exit Project Lab, turn left and walk to Lab Exit, then continue to Lab Entrance.", steps: 15 },
  { from: "CSIT Lab Entrance", to: "CSIT Project Lab", direction: "From Lab Entrance, walk to Lab Exit, then enter Project Lab.", steps: 15 },

  // CSIT Exit
  { from: "CSIT Exit", to: "CSIT Lab Exit", direction: "From CSIT Exit, walk straight then take a right through the passageway, then another right up the ramp to reach CSIT Lab Exit.", steps: 20 },
  { from: "CSIT Lab Exit", to: "CSIT Exit", direction: "From Lab Exit, go down the ramp, take a left through the passageway then another left to reach CSIT Exit.", steps: 20 },
  { from: "CSIT Exit", to: "CSIT Entrance", direction: "From CSIT Exit, walk straight to reach CSIT Entrance.", steps: 15 },
  { from: "CSIT Entrance", to: "CSIT Exit", direction: "From CSIT Entrance, walk straight to reach CSIT Exit.", steps: 15 },
  { from: "CSIT Exit", to: "CSIT Lab Entrance", direction: "From CSIT Exit, walk straight then take a right through the passageway, then another right up the ramp to reach CSIT Lab Exit, then continue to Lab Entrance.", steps: 25 },
  { from: "CSIT Lab Entrance", to: "CSIT Exit", direction: "From Lab Entrance, walk to Lab Exit, then go down the ramp, take a left through the passageway then another left to reach CSIT Exit.", steps: 25 },

  // Add missing connections between Rooms 1-4 and Rooms 5-8
  { from: "CSIT Room 1", to: "CSIT Room 6", direction: "Exit Room 1, turn right and walk to CSIT Exit, then continue to Room 6.", steps: 25 },
  { from: "CSIT Room 6", to: "CSIT Room 1", direction: "Exit Room 6, turn left and walk to CSIT Exit, then continue to Room 1.", steps: 25 },
  { from: "CSIT Room 1", to: "CSIT Room 7", direction: "Exit Room 1, turn right and walk to CSIT Exit, then continue to Room 7.", steps: 25 },
  { from: "CSIT Room 7", to: "CSIT Room 1", direction: "Exit Room 7, turn left and walk to CSIT Exit, then continue to Room 1.", steps: 25 },
  { from: "CSIT Room 1", to: "CSIT Room 8", direction: "Exit Room 1, turn right and walk to CSIT Exit, then continue to Room 8.", steps: 25 },
  { from: "CSIT Room 8", to: "CSIT Room 1", direction: "Exit Room 8, turn left and walk to CSIT Exit, then continue to Room 1.", steps: 25 },

  { from: "CSIT Room 2", to: "CSIT Room 6", direction: "Exit Room 2, turn right and walk to CSIT Exit, then continue to Room 6.", steps: 25 },
  { from: "CSIT Room 6", to: "CSIT Room 2", direction: "Exit Room 6, turn left and walk to CSIT Exit, then continue to Room 2.", steps: 25 },
  { from: "CSIT Room 2", to: "CSIT Room 7", direction: "Exit Room 2, turn right and walk to CSIT Exit, then continue to Room 7.", steps: 25 },
  { from: "CSIT Room 7", to: "CSIT Room 2", direction: "Exit Room 7, turn left and walk to CSIT Exit, then continue to Room 2.", steps: 25 },
  { from: "CSIT Room 2", to: "CSIT Room 8", direction: "Exit Room 2, turn right and walk to CSIT Exit, then continue to Room 8.", steps: 25 },
  { from: "CSIT Room 8", to: "CSIT Room 2", direction: "Exit Room 8, turn left and walk to CSIT Exit, then continue to Room 2.", steps: 25 },

  { from: "CSIT Room 3", to: "CSIT Room 6", direction: "Exit Room 3, turn right and walk to CSIT Exit, then continue to Room 6.", steps: 25 },
  { from: "CSIT Room 6", to: "CSIT Room 3", direction: "Exit Room 6, turn left and walk to CSIT Exit, then continue to Room 3.", steps: 25 },
  { from: "CSIT Room 3", to: "CSIT Room 7", direction: "Exit Room 3, turn right and walk to CSIT Exit, then continue to Room 7.", steps: 25 },
  { from: "CSIT Room 7", to: "CSIT Room 3", direction: "Exit Room 7, turn left and walk to CSIT Exit, then continue to Room 3.", steps: 25 },
  { from: "CSIT Room 3", to: "CSIT Room 8", direction: "Exit Room 3, turn right and walk to CSIT Exit, then continue to Room 8.", steps: 25 },
  { from: "CSIT Room 8", to: "CSIT Room 3", direction: "Exit Room 8, turn left and walk to CSIT Exit, then continue to Room 3.", steps: 25 },

  { from: "CSIT Room 4", to: "CSIT Room 6", direction: "Exit Room 4, turn right and walk to CSIT Exit, then continue to Room 6.", steps: 25 },
  { from: "CSIT Room 6", to: "CSIT Room 4", direction: "Exit Room 6, turn left and walk to CSIT Exit, then continue to Room 4.", steps: 25 },
  { from: "CSIT Room 4", to: "CSIT Room 7", direction: "Exit Room 4, turn right and walk to CSIT Exit, then continue to Room 7.", steps: 25 },
  { from: "CSIT Room 7", to: "CSIT Room 4", direction: "Exit Room 7, turn left and walk to CSIT Exit, then continue to Room 4.", steps: 25 },
  { from: "CSIT Room 4", to: "CSIT Room 8", direction: "Exit Room 4, turn right and walk to CSIT Exit, then continue to Room 8.", steps: 25 },
  { from: "CSIT Room 8", to: "CSIT Room 4", direction: "Exit Room 8, turn left and walk to CSIT Exit, then continue to Room 4.", steps: 25 },

  // Add missing connections between Labs and Rooms 5-8
  { from: "CSIT Lab 3", to: "CSIT Room 5", direction: "Exit Lab 3, turn left and walk to Lab Exit, then go down the ramp to reach CSIT Exit, then continue to Room 5.", steps: 30 },
  { from: "CSIT Room 5", to: "CSIT Lab 3", direction: "Exit Room 5, turn left and walk to CSIT Exit, then follow the path to Lab 3.", steps: 30 },
  { from: "CSIT Lab 3", to: "CSIT Room 6", direction: "Exit Lab 3, turn left and walk to Lab Exit, then go down the ramp to reach CSIT Exit, then continue to Room 6.", steps: 30 },
  { from: "CSIT Room 6", to: "CSIT Lab 3", direction: "Exit Room 6, turn left and walk to CSIT Exit, then follow the path to Lab 3.", steps: 30 },
  { from: "CSIT Lab 3", to: "CSIT Room 7", direction: "Exit Lab 3, turn left and walk to Lab Exit, then go down the ramp to reach CSIT Exit, then continue to Room 7.", steps: 30 },
  { from: "CSIT Room 7", to: "CSIT Lab 3", direction: "Exit Room 7, turn left and walk to CSIT Exit, then follow the path to Lab 3.", steps: 30 },
  { from: "CSIT Lab 3", to: "CSIT Room 8", direction: "Exit Lab 3, turn left and walk to Lab Exit, then go down the ramp to reach CSIT Exit, then continue to Room 8.", steps: 30 },
  { from: "CSIT Room 8", to: "CSIT Lab 3", direction: "Exit Room 8, turn left and walk to CSIT Exit, then follow the path to Lab 3.", steps: 30 },

  { from: "CSIT Lab 4", to: "CSIT Room 5", direction: "Exit Lab 4, turn left and walk to Lab Exit, then go down the ramp to reach CSIT Exit, then continue to Room 5.", steps: 30 },
  { from: "CSIT Room 5", to: "CSIT Lab 4", direction: "Exit Room 5, turn left and walk to CSIT Exit, then follow the path to Lab 4.", steps: 30 },
  { from: "CSIT Lab 4", to: "CSIT Room 6", direction: "Exit Lab 4, turn left and walk to Lab Exit, then go down the ramp to reach CSIT Exit, then continue to Room 6.", steps: 30 },
  { from: "CSIT Room 6", to: "CSIT Lab 4", direction: "Exit Room 6, turn left and walk to CSIT Exit, then follow the path to Lab 4.", steps: 30 },
  { from: "CSIT Lab 4", to: "CSIT Room 7", direction: "Exit Lab 4, turn left and walk to Lab Exit, then go down the ramp to reach CSIT Exit, then continue to Room 7.", steps: 30 },
  { from: "CSIT Room 7", to: "CSIT Lab 4", direction: "Exit Room 7, turn left and walk to CSIT Exit, then follow the path to Lab 4.", steps: 30 },
  { from: "CSIT Lab 4", to: "CSIT Room 8", direction: "Exit Lab 4, turn left and walk to Lab Exit, then go down the ramp to reach CSIT Exit, then continue to Room 8.", steps: 30 },
  { from: "CSIT Room 8", to: "CSIT Lab 4", direction: "Exit Room 8, turn left and walk to CSIT Exit, then follow the path to Lab 4.", steps: 30 },

  { from: "CSIT Lab 5", to: "CSIT Room 5", direction: "Exit Lab 5, turn left and walk to Lab Exit, then go down the ramp to reach CSIT Exit, then continue to Room 5.", steps: 30 },
  { from: "CSIT Room 5", to: "CSIT Lab 5", direction: "Exit Room 5, turn left and walk to CSIT Exit, then follow the path to Lab 5.", steps: 30 },
  { from: "CSIT Lab 5", to: "CSIT Room 6", direction: "Exit Lab 5, turn left and walk to Lab Exit, then go down the ramp to reach CSIT Exit, then continue to Room 6.", steps: 30 },
  { from: "CSIT Room 6", to: "CSIT Lab 5", direction: "Exit Room 6, turn left and walk to CSIT Exit, then follow the path to Lab 5.", steps: 30 },
  { from: "CSIT Lab 5", to: "CSIT Room 7", direction: "Exit Lab 5, turn left and walk to Lab Exit, then go down the ramp to reach CSIT Exit, then continue to Room 7.", steps: 30 },
  { from: "CSIT Room 7", to: "CSIT Lab 5", direction: "Exit Room 7, turn left and walk to CSIT Exit, then follow the path to Lab 5.", steps: 30 },
  { from: "CSIT Lab 5", to: "CSIT Room 8", direction: "Exit Lab 5, turn left and walk to Lab Exit, then go down the ramp to reach CSIT Exit, then continue to Room 8.", steps: 30 },
  { from: "CSIT Room 8", to: "CSIT Lab 5", direction: "Exit Room 8, turn left and walk to CSIT Exit, then follow the path to Lab 5.", steps: 30 },

  { from: "CSIT Project Lab", to: "CSIT Room 5", direction: "Exit Project Lab, turn left and walk to Lab Exit, then go down the ramp to reach CSIT Exit, then continue to Room 5.", steps: 30 },
  { from: "CSIT Room 5", to: "CSIT Project Lab", direction: "Exit Room 5, turn left and walk to CSIT Exit, then follow the path to Project Lab.", steps: 30 },
  { from: "CSIT Project Lab", to: "CSIT Room 6", direction: "Exit Project Lab, turn left and walk to Lab Exit, then go down the ramp to reach CSIT Exit, then continue to Room 6.", steps: 30 },
  { from: "CSIT Room 6", to: "CSIT Project Lab", direction: "Exit Room 6, turn left and walk to CSIT Exit, then follow the path to Project Lab.", steps: 30 },
  { from: "CSIT Project Lab", to: "CSIT Room 7", direction: "Exit Project Lab, turn left and walk to Lab Exit, then go down the ramp to reach CSIT Exit, then continue to Room 7.", steps: 30 },
  { from: "CSIT Room 7", to: "CSIT Project Lab", direction: "Exit Room 7, turn left and walk to CSIT Exit, then follow the path to Project Lab.", steps: 30 },
  { from: "CSIT Project Lab", to: "CSIT Room 8", direction: "Exit Project Lab, turn left and walk to Lab Exit, then go down the ramp to reach CSIT Exit, then continue to Room 8.", steps: 30 },
  { from: "CSIT Room 8", to: "CSIT Project Lab", direction: "Exit Room 8, turn left and walk to CSIT Exit, then follow the path to Project Lab.", steps: 30 },

  // Add missing connection for Lab Exit to Room 5
  { from: "CSIT Lab Exit", to: "CSIT Room 5", direction: "From Lab Exit, go down the ramp, take a left through the passageway then another left to reach CSIT Exit, then continue to Room 5.", steps: 25 },
  { from: "CSIT Room 5", to: "CSIT Lab Exit", direction: "Exit Room 5, turn left and walk to CSIT Exit, then follow the path to Lab Exit.", steps: 25 },

  // Add missing connection for Lab Exit to Room 6
  { from: "CSIT Lab Exit", to: "CSIT Room 6", direction: "From Lab Exit, go down the ramp, take a left through the passageway then another left to reach CSIT Exit, then continue to Room 6.", steps: 25 },
  { from: "CSIT Room 6", to: "CSIT Lab Exit", direction: "Exit Room 6, turn left and walk to CSIT Exit, then follow the path to Lab Exit.", steps: 25 },

  // Add missing connection for Lab Exit to Room 7
  { from: "CSIT Lab Exit", to: "CSIT Room 7", direction: "From Lab Exit, go down the ramp, take a left through the passageway then another left to reach CSIT Exit, then continue to Room 7.", steps: 25 },
  { from: "CSIT Room 7", to: "CSIT Lab Exit", direction: "Exit Room 7, turn left and walk to CSIT Exit, then follow the path to Lab Exit.", steps: 25 },

  // Add missing connection for Lab Exit to Room 8
  { from: "CSIT Lab Exit", to: "CSIT Room 8", direction: "From Lab Exit, go down the ramp, take a left through the passageway then another left to reach CSIT Exit, then continue to Room 8.", steps: 25 },
  { from: "CSIT Room 8", to: "CSIT Lab Exit", direction: "Exit Room 8, turn left and walk to CSIT Exit, then follow the path to Lab Exit.", steps: 25 },

  // Add missing connection for Lab Entrance to Lab Exit
  { from: "CSIT Lab Entrance", to: "CSIT Lab Exit", direction: "From Lab Entrance, walk straight to reach Lab Exit.", steps: 5 },
  { from: "CSIT Lab Exit", to: "CSIT Lab Entrance", direction: "From Lab Exit, walk straight to reach Lab Entrance.", steps: 5 },

  // Add missing connections from Lab Entrance to Rooms 5-8
  { from: "CSIT Lab Entrance", to: "CSIT Room 5", direction: "From Lab Entrance, walk straight to reach Lab Exit, then go down the ramp to reach CSIT Exit, then continue to Room 5.", steps: 30 },
  { from: "CSIT Lab Entrance", to: "CSIT Room 6", direction: "From Lab Entrance, walk straight to reach Lab Exit, then go down the ramp to reach CSIT Exit, then continue to Room 6.", steps: 30 },
  { from: "CSIT Lab Entrance", to: "CSIT Room 7", direction: "From Lab Entrance, walk straight to reach Lab Exit, then go down the ramp to reach CSIT Exit, then continue to Room 7.", steps: 30 },
  { from: "CSIT Lab Entrance", to: "CSIT Room 8", direction: "From Lab Entrance, walk straight to reach Lab Exit, then go down the ramp to reach CSIT Exit, then continue to Room 8.", steps: 30 },

  // Add corresponding return connections
  { from: "CSIT Room 5", to: "CSIT Lab Entrance", direction: "Exit Room 5, turn left and walk to CSIT Exit, then follow the path to Lab Exit, then continue to Lab Entrance.", steps: 30 },
  { from: "CSIT Room 6", to: "CSIT Lab Entrance", direction: "Exit Room 6, turn left and walk to CSIT Exit, then follow the path to Lab Exit, then continue to Lab Entrance.", steps: 30 },
  { from: "CSIT Room 7", to: "CSIT Lab Entrance", direction: "Exit Room 7, turn left and walk to CSIT Exit, then follow the path to Lab Exit, then continue to Lab Entrance.", steps: 30 },
  { from: "CSIT Room 8", to: "CSIT Lab Entrance", direction: "Exit Room 8, turn left and walk to CSIT Exit, then follow the path to Lab Exit, then continue to Lab Entrance.", steps: 30 }
];

// Map of which rooms are directly connected to each other
const roomAdjacencyMap: Record<string, string[]> = {
  "CSIT Room 1": ["CSIT Room 2", "CSIT Room 3", "CSIT Room 4", "CSIT Exit", "CSIT Entrance", "CSIT Room 5", "CSIT Room 6", "CSIT Room 7", "CSIT Room 8"],
  "CSIT Room 2": ["CSIT Room 1", "CSIT Room 3", "CSIT Room 4", "CSIT Exit", "CSIT Entrance", "CSIT Room 5", "CSIT Room 6", "CSIT Room 7", "CSIT Room 8"],
  "CSIT Room 3": ["CSIT Room 1", "CSIT Room 2", "CSIT Room 4", "CSIT Exit", "CSIT Entrance", "CSIT Room 5", "CSIT Room 6", "CSIT Room 7", "CSIT Room 8"],
  "CSIT Room 4": ["CSIT Room 1", "CSIT Room 2", "CSIT Room 3", "CSIT Exit", "CSIT Entrance", "CSIT Room 5", "CSIT Room 6", "CSIT Room 7", "CSIT Room 8"],
  "CSIT Room 5": ["CSIT Room 6", "CSIT Room 7", "CSIT Room 8", "CSIT Exit", "CSIT Room 1", "CSIT Room 2", "CSIT Room 3", "CSIT Room 4"],
  "CSIT Room 6": ["CSIT Room 5", "CSIT Room 7", "CSIT Room 8", "CSIT Exit", "CSIT Room 1", "CSIT Room 2", "CSIT Room 3", "CSIT Room 4"],
  "CSIT Room 7": ["CSIT Room 5", "CSIT Room 6", "CSIT Room 8", "CSIT Exit", "CSIT Room 1", "CSIT Room 2", "CSIT Room 3", "CSIT Room 4"],
  "CSIT Room 8": ["CSIT Room 5", "CSIT Room 6", "CSIT Room 7", "CSIT Exit", "CSIT Room 1", "CSIT Room 2", "CSIT Room 3", "CSIT Room 4"],
  "CSIT Lab 2": ["CSIT Lab Exit", "CSIT Room 5", "CSIT Room 6", "CSIT Room 7", "CSIT Room 8"],
  "CSIT Lab 3": ["CSIT Lab 4", "CSIT Lab 5", "CSIT Project Lab", "CSIT Lab Exit", "CSIT Lab Entrance", "CSIT Room 5", "CSIT Room 6", "CSIT Room 7", "CSIT Room 8"],
  "CSIT Lab 4": ["CSIT Lab 3", "CSIT Lab 5", "CSIT Project Lab", "CSIT Lab Exit", "CSIT Lab Entrance", "CSIT Room 5", "CSIT Room 6", "CSIT Room 7", "CSIT Room 8"],
  "CSIT Lab 5": ["CSIT Lab 3", "CSIT Lab 4", "CSIT Project Lab", "CSIT Lab Exit", "CSIT Lab Entrance", "CSIT Room 5", "CSIT Room 6", "CSIT Room 7", "CSIT Room 8"],
  "CSIT Project Lab": ["CSIT Lab 3", "CSIT Lab 4", "CSIT Lab 5", "CSIT Lab Exit", "CSIT Lab Entrance", "CSIT Room 5", "CSIT Room 6", "CSIT Room 7", "CSIT Room 8"],
  "CSIT Exit": ["CSIT Room 1", "CSIT Room 2", "CSIT Room 3", "CSIT Room 4", "CSIT Lab Exit", "CSIT Entrance", "CSIT Room 5", "CSIT Room 6", "CSIT Room 7", "CSIT Room 8"],
  "CSIT Lab Exit": ["CSIT Exit", "CSIT Lab 2", "CSIT Lab 3", "CSIT Lab 4", "CSIT Lab 5", "CSIT Project Lab", "CSIT Room 5", "CSIT Room 6", "CSIT Room 7", "CSIT Room 8"],
  "CSIT Entrance": ["CSIT Room 1", "CSIT Room 2", "CSIT Room 3", "CSIT Room 4", "CSIT Exit", "CSIT Room 5", "CSIT Room 6", "CSIT Room 7", "CSIT Room 8"],
  "CSIT Lab Entrance": ["CSIT Lab Exit", "CSIT Lab 3", "CSIT Lab 4", "CSIT Lab 5", "CSIT Project Lab", "CSIT Room 5", "CSIT Room 6", "CSIT Room 7", "CSIT Room 8"]
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
  if (path.length === 0) return ["No known route to destination"];
  if (path.length === 1) return ["You are already at your destination"];
  
  const directions: string[] = [];
  for (let i = 0; i < path.length - 1; i++) {
    const from = path[i];
    const to = path[i + 1];
    
    const connection = roomConnections.find(
      conn => conn.from === from && conn.to === to
    );
    
    if (connection) {
      directions.push(connection.direction);
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