interface RoomConnection {
  from: string;
  to: string;
  direction: string;
  steps: number;
}

// Room connections organized by type (rooms, labs, entrances/exits)
const roomConnections: RoomConnection[] = [
  // CSIT Rooms (1-8)
  { from: "CSIT Room 1", to: "CSIT Room 2", direction: 
    "1. Exit Room 1 through either door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Enter Room 2 through its first door.", 
    steps: 5 },
  { from: "CSIT Room 2", to: "CSIT Room 1", direction: 
    "1. Exit Room 2 through its first door.\n" +
    "2. Turn right and walk straight.\n" +
    "3. Enter Room 1 through either door.", 
    steps: 5 },
  { from: "CSIT Room 1", to: "CSIT Room 3", direction: 
    "1. Exit Room 1 through either door.\n" +
    "2. Turn left and walk past Room 2.\n" +
    "3. Enter Room 3 through its first door.", 
    steps: 10 },
  { from: "CSIT Room 3", to: "CSIT Room 1", direction: 
    "1. Exit Room 3 through its first door.\n" +
    "2. Turn right and walk past Room 2.\n" +
    "3. Enter Room 1 through either door.", 
    steps: 10 },
  { from: "CSIT Room 1", to: "CSIT Room 4", direction: 
    "1. Exit Room 1 through either door.\n" +
    "2. Turn left and walk past Rooms 2 and 3.\n" +
    "3. Enter Room 4 through its first door.", 
    steps: 15 },
  { from: "CSIT Room 4", to: "CSIT Room 1", direction: 
    "1. Exit Room 4 through its first door.\n" +
    "2. Turn right and walk past Rooms 3 and 2.\n" +
    "3. Enter Room 1 through either door.", 
    steps: 15 },

  { from: "CSIT Room 2", to: "CSIT Room 3", direction: 
    "1. Exit Room 2 through its second door.\n" +
    "2. Turn left.\n" +
    "3. Enter Room 3 through its first door.", 
    steps: 5 },
  { from: "CSIT Room 3", to: "CSIT Room 2", direction: 
    "1. Exit Room 3 through its first door.\n" +
    "2. Turn right.\n" +
    "3. Enter Room 2 through its second door.", 
    steps: 5 },
  { from: "CSIT Room 2", to: "CSIT Room 4", direction: 
    "1. Exit Room 2 through its second door.\n" +
    "2. Turn left.\n" +
    "3. Walk past Room 3 to reach Room 4\'s first door.", 
    steps: 10 },
  { from: "CSIT Room 4", to: "CSIT Room 2", direction: 
    "1. Exit Room 4 through its first door.\n" +
    "2. Turn right.\n" +
    "3. Walk past Room 3 to reach Room 2\'s second door.", 
    steps: 10 },

  { from: "CSIT Room 3", to: "CSIT Room 4", direction: 
    "1. Exit Room 3 through its second door.\n" +
    "2. Turn left.\n" +
    "3. Enter Room 4 through its first door.", 
    steps: 5 },
  { from: "CSIT Room 4", to: "CSIT Room 3", direction: 
    "1. Exit Room 4 through its first door.\n" +
    "2. Turn right.\n" +
    "3. Enter Room 3 through its second door.", 
    steps: 5 },

  { from: "CSIT Room 5", to: "CSIT Room 6", direction: 
    "1. Exit Room 5 through either door.\n" +
    "2. Turn right.\n" +
    "3. Enter Room 6 through its first door.", 
    steps: 5 },
  { from: "CSIT Room 6", to: "CSIT Room 5", direction: 
    "1. Exit Room 6 through its first door.\n" +
    "2. Turn left.\n" +
    "3. Enter Room 5 through either door.", 
    steps: 5 },
  { from: "CSIT Room 5", to: "CSIT Room 7", direction: 
    "1. Exit Room 5 through either door.\n" +
    "2. Turn right.\n" +
    "3. Walk past Room 6 to reach Room 7\'s first door.", 
    steps: 10 },
  { from: "CSIT Room 7", to: "CSIT Room 5", direction: 
    "1. Exit Room 7 through its first door.\n" +
    "2. Turn left.\n" +
    "3. Walk past Room 6 to reach Room 5.", 
    steps: 10 },
  { from: "CSIT Room 5", to: "CSIT Room 8", direction: 
    "1. Exit Room 5 through either door.\n" +
    "2. Turn right.\n" +
    "3. Walk past Room 6 and Room 7 to reach Room 8\'s first door.", 
    steps: 15 },
  { from: "CSIT Room 8", to: "CSIT Room 5", direction: 
    "1. Exit Room 8 through its first door.\n" +
    "2. Turn left.\n" +
    "3. Walk past Room 7 and Room 6 to reach Room 5.", 
    steps: 15 },

  { from: "CSIT Room 6", to: "CSIT Room 7", direction: 
    "1. Exit Room 6 through its second door.\n" +
    "2. Turn right.\n" +
    "3. Enter Room 7 through its first door.", 
    steps: 5 },
  { from: "CSIT Room 7", to: "CSIT Room 6", direction: 
    "1. Exit Room 7 through its first door.\n" +
    "2. Turn left.\n" +
    "3. Enter Room 6 through its second door.", 
    steps: 5 },
  { from: "CSIT Room 6", to: "CSIT Room 8", direction: 
    "1. Exit Room 6 through its second door.\n" +
    "2. Turn right.\n" +
    "3. Walk past Room 7 to reach Room 8\'s first door.", 
    steps: 10 },
  { from: "CSIT Room 8", to: "CSIT Room 6", direction: 
    "1. Exit Room 8 through its first door.\n" +
    "2. Turn left.\n" +
    "3. Walk past Room 7 to reach Room 6\'s second door.", 
    steps: 10 },

  { from: "CSIT Room 7", to: "CSIT Room 8", direction: 
    "1. Exit Room 7 through its second door.\n" +
    "2. Turn right.\n" +
    "3. Enter Room 8 through its first door.", 
    steps: 5 },
  { from: "CSIT Room 8", to: "CSIT Room 7", direction: 
    "1. Exit Room 8 through its first door.\n" +
    "2. Turn left.\n" +
    "3. Enter Room 7 through its second door.", 
    steps: 5 },

  // CSIT Labs (2-5 and Project Lab)
  { from: "CSIT Lab 2", to: "CSIT Lab 3", direction: 
    "1. Exit Lab 2 through the main door.\n" +
    "2. Turn right and walk till the end of the corridor until you reach the stairs on your left.\n" +
    "3. Go up the stairs and turn right.\n"+
    "4. The first door on your right leads to CSIT Lab 3.", 
    steps: 20 },
  { from: "CSIT Lab 3", to: "CSIT Lab 2", direction: 
    "1. Exit CSIT Lab 3 through its main door and turn left.\n" +
    "2. Turn left and go downstairs.\n" +
    "3. Turn right and walk straight.\n" +
    "4. The third door on your right will lead to CSIT Lab 2.",
    steps: 20 },
  { from: "CSIT Lab 3", to: "CSIT Lab 4", direction: 
    "1. Exit Lab 3 through the main door.\n" +
    "2. Turn right and walk straight.\n" +
    "3. The second door on you right leads to CSIT Lab 4.", 
    steps: 5 },
  { from: "CSIT Lab 4", to: "CSIT Lab 3", direction: 
    "1. Exit Lab 4 through the main door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. The second door on your left leads to CSIT Lab 3.", 
    steps: 5 },
  { from: "CSIT Lab 4", to: "CSIT Lab 5", direction: 
    "1. Exit Lab 4 through the main door.\n" +
    "2. Turn right and walk straight.\n" +
    "3. The third door on you right leads to CSIT Lab 5.", 
    steps: 5 },
  { from: "CSIT Lab 5", to: "CSIT Lab 4", direction: 
    "1. Exit Lab 5 through the main door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. The third door on your left leads to CSIT Lab 4.",
    steps: 5 },
  { from: "CSIT Lab 5", to: "CSIT Project Lab", direction: 
    "1. Exit Lab 5 through the main door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. The first door on your left leads to CSIT Project Lab.", 
    steps: 5 },
  { from: "CSIT Project Lab", to: "CSIT Lab 5", direction: 
    "1. Exit Project Lab through the main door.\n" +
    "2. Turn right and walk straight.\n" +
    "3. The first door on your right leads to CSIT Lab 4.", 
    steps: 5 },

  // Entrances and Exits
  { from: "CSIT Entrance", to: "CSIT Exit", direction: 
    "1. From CSIT Entrance, walk straight ahead.\n" +
    "2. Continue walking through the entire corridor.\n",
    steps: 15 },
  { from: "CSIT Exit", to: "CSIT Entrance", direction: 
    "1. From CSIT Exit, walk straight ahead.\n" +
    "2. Continue walking through the entire corridor.\n",
    steps: 15 },
  { from: "CSIT Lab Entrance", to: "CSIT Lab Exit", direction: 
    "1. From Lab Entrance, walk straight ahead.\n" +
    "2. Continue walking through the lab corridor.\n" +
    "3. You will reach Lab Exit.", 
    steps: 10 },
  { from: "CSIT Lab Exit", to: "CSIT Lab Entrance", direction: 
    "1. From Lab Exit, walk straight ahead.\n" +
    "2. Continue walking through the lab corridor.\n" +
    "3. You will reach Lab Entrance.", 
    steps: 10 },

  // Cross-Campus Connections (Rooms, Labs, Entrances/Exits)
  // Room 1 to other sections
  { from: "CSIT Room 1", to: "CSIT Exit", direction: 
    "1. Exit CSIT Room 1, turn right.\n" +
    "2. Walk straight and exit through the main corridor.\n" +
    "3. You will reach CSIT Exit.", 
    steps: 10 },
  { from: "CSIT Exit", to: "CSIT Room 1", direction: 
    "1. From CSIT Exit, walk straight and enter through the first door on your left.\n", 
    steps: 10 },
  { from: "CSIT Room 1", to: "CSIT Entrance", direction: 
    "1. Exit CSIT Room 1, turn left.\n" +
    "2. Walk straight and exit through the main corridor.\n" +
    "3. Continue walking through the main corridor until you reach CSIT Entrance.", 
    steps: 20 },
  { from: "CSIT Entrance", to: "CSIT Room 1", direction: 
    "1. From CSIT Entrance, walk straight ahead.\n" +
    "2. Enter Room 1 through the seventh door on your right." ,
    steps: 20 },
  { from: "CSIT Room 1", to: "CSIT Room 5", direction: 
    "1. Exit CSIT Room 1, turn left.\n" +
    "2. Walk straight and find the stairs on your left.\n" +
    "3. Walk up the stairs to first floor then turn right into the corridor.\n" +
    "4. Walk straight and the first door on your right is CSIT Room 5.", 
    steps: 25 },
  { from: "CSIT Room 5", to: "CSIT Room 1", direction: 
    "1. Exit CSIT Room 5 through either door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Find the stairs on you left.\n" +
    "4. Walk down the stairs to ground floor then turn right into the corridor.\n"+
    "5. Walk straight and the seventh door on your right is CSIT Room 1.", 
    steps: 25 },
  { from: "CSIT Room 1", to: "CSIT Lab 2", direction: 
    "1. Exit CSIT Room 1, turn right.\n" +
    "2. Walk straight and exit through the main corridor.\n" +
    "3. Take a right through the passageway.\n" +
    "4. Take another right up the ramp.\n" +
    "5. Walk straight and the third door on your left is CSIT Lab 2.", 
    steps: 30 },
  { from: "CSIT Lab 2", to: "CSIT Room 1", direction: 
    "1. Exit CSIT Lab 2 through the main door.\n" +
    "2. Turn right and walk straight till you reach the ramp.\n" +
    "3. Walk down the ramp and take a left through the passageway.\n" +
    "4. Walk straight then take another left to reach the main corridor.\n" +
    "5. The first door on your left leads to CSIT Room 1.", 
    steps: 30 },
  { from: "CSIT Room 1", to: "CSIT Room 6", direction: 
    "1. Exit CSIT Room 1, turn left.\n" +
    "2. Walk straight and find the stairs on your left.\n" +
    "3. Walk up the stairs to first floor then turn right into the corridor.\n" +
    "4. Walk straight and the third door on your right is CSIT Room 6.", 
    steps: 25 },
  { from: "CSIT Room 6", to: "CSIT Room 1", direction: 
    "1. Exit CSIT Room 6 through either door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Find the stairs on you left.\n" +
    "4. Walk down the stairs to ground floor then turn right into the corridor.\n"+
    "5. Walk straight and the seventh door on your right is CSIT Room 1.",
    steps: 25 },
  { from: "CSIT Room 1", to: "CSIT Room 7", direction: 
    "1. Exit CSIT Room 1, turn left.\n" +
    "2. Walk straight and find the stairs on your left.\n" +
    "3. Walk up the stairs to first floor then turn right into the corridor.\n" +
    "4. Walk straight and the fifth door on your right is CSIT Room 7.", 
    steps: 30 },
  { from: "CSIT Room 7", to: "CSIT Room 1", direction: 
    "1. Exit CSIT Room 7 through either door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Find the stairs on you left.\n" +
    "4. Walk down the stairs to ground floor then turn right into the corridor.\n"+
    "5. Walk straight and the seventh door on your right is CSIT Room 1.",
    steps: 30 },
  { from: "CSIT Room 1", to: "CSIT Room 8", direction: 
    "1. Exit CSIT Room 1, turn left.\n" +
    "2. Walk straight and find the stairs on your left.\n" +
    "3. Walk up the stairs to first floor then turn right into the corridor.\n" +
    "4. Walk straight and the seventh door on your right is CSIT Room 8.", 
    steps: 35 },
  { from: "CSIT Room 8", to: "CSIT Room 1", direction: 
    "1. Exit CSIT Room 5 through either door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Find the stairs on you left.\n" +
    "4. Walk down the stairs to ground floor then turn right into the corridor.\n"+
    "5. Walk straight and the seventh door on your right is CSIT Room 1.",
    steps: 35 },
  { from: "CSIT Room 1", to: "CSIT Lab 3", direction: 
    "1. Exit CSIT Room 1, turn right.\n" +
    "2. Walk straight and exit through the main corridor.\n" +
    "3. Take a right through the passageway.\n" +
    "4. Take another right up the ramp.\n" +
    "5. Walk straight until you reach stairs on your left.\n" +
    "6. Walk up the stairs to first floor then turn right into the corridor.\n" +
    "7. Walk straight and the first door on your right is CSIT Lab 3.", 
    steps: 35 },
  { from: "CSIT Lab 3", to: "CSIT Room 1", direction: 
    "1. Exit CSIT Lab 3 through its main door and turn left.\n" +
    "2. Turn left and go downstairs.\n" +
    "3. Turn right and walk till the end of the corridor until you reach the ramp.\n" +
    "4. Walk down the ramp and take a left through the passageway.\n" +
    "5. Walk straight then take another left to reach the main corridor.\n" +
    "6. The first door on your left leads to CSIT Room 1.", 
    steps: 35 },
  { from: "CSIT Room 1", to: "CSIT Lab 4", direction: 
    "1. Exit CSIT Room 1, turn right.\n" +
    "2. Walk straight and exit through the main corridor.\n" +
    "3. Take a right through the passageway.\n" +
    "4. Take another right up the ramp.\n" +
    "5. Walk straight until you reach stairs on your left.\n" +
    "6. Walk up the stairs to first floor then turn right into the corridor.\n" +
    "7. Walk straight and the third door on your right is CSIT Lab 4.", 
    steps: 40 },
  { from: "CSIT Lab 4", to: "CSIT Room 1", direction: 
    "1. Exit CSIT Lab 4 through its main door and turn left.\n" +
    "2. Walk straight and take a left to go downstairs.\n" +
    "3. Turn right and walk till the end of the corridor until you reach the ramp.\n" +
    "4. Walk down the ramp and take a left through the passageway.\n" +
    "5. Walk straight then take another left to reach the main corridor.\n" +
    "6. The first door on your left leads to CSIT Room 1.", 
    steps: 40 },
  { from: "CSIT Room 1", to: "CSIT Lab 5", direction: 
    "1. Exit CSIT Room 1, turn right.\n" +
    "2. Walk straight and exit through the main corridor.\n" +
    "3. Take a right through the passageway.\n" +
    "4. Take another right up the ramp.\n" +
    "5. Walk straight until you reach stairs on your left.\n" +
    "6. Walk up the stairs to first floor then turn right into the corridor.\n" +
    "7. Walk straight and the sixth door on your right is CSIT Lab 5.",  
    steps: 45 },
  { from: "CSIT Lab 5", to: "CSIT Room 1", direction: 
    "1. Exit CSIT Lab 5 through its main door and turn left.\n" +
    "2. Walk straight and take a left to go downstairs.\n" +
    "3. Turn right and walk till the end of the corridor until you reach the ramp.\n" +
    "4. Walk down the ramp and take a left through the passageway.\n" +
    "5. Walk straight then take another left to reach the main corridor.\n" +
    "6. The first door on your left leads to CSIT Room 1.",  
    steps: 45 },
  { from: "CSIT Room 1", to: "CSIT Project Lab", direction: 
    "1. Exit CSIT Room 1, turn right.\n" +
    "2. Walk straight and exit through the main corridor.\n" +
    "3. Take a right through the passageway.\n" +
    "4. Take another right up the ramp.\n" +
    "5. Walk straight until you reach stairs on your left.\n" +
    "6. Walk up the stairs to first floor then turn right into the corridor.\n" +
    "7. Walk straight and the fifth door on your right is CSIT Project Lab.", 
    steps: 50 },
  { from: "CSIT Project Lab", to: "CSIT Room 1", direction: 
    "1. Exit the lab through its main door and turn left.\n" +
    "2. Walk straight and take a left to go downstairs.\n" +
    "3. Turn right and walk till the end of the corridor until you reach the ramp.\n" +
    "4. Walk down the ramp and take a left through the passageway.\n" +
    "5. Walk straight then take another left to reach the main corridor.\n" +
    "6. The first door on your left leads to CSIT Room 1.", 
    steps: 50 },

  // Room 2 to other sections
  { from: "CSIT Room 2", to: "CSIT Exit", direction: 
    "1. Exit CSIT Room 2, turn right and walk straight.\n" +
    "2. Continue walking through the main corridor until you reach CSIT Exit.", 
    steps: 10 },
  { from: "CSIT Exit", to: "CSIT Room 2", direction: 
    "1. From CSIT Exit, walk straight and enter through the third door on your left.\n", 

    steps: 10 },
  { from: "CSIT Room 2", to: "CSIT Entrance", direction: 
    "1. Exit CSIT Room 2, turn left and walk straight.\n" +
    "2. Continue walking through the main corridor until you reach CSIT Entrance.", 
    steps: 20 },
  { from: "CSIT Entrance", to: "CSIT Room 2", direction: 
   "1. From CSIT Entrance, walk straight ahead.\n" +
    "2. Enter Room 1 through the fifth door on your right." ,
    steps: 20 },
  { from: "CSIT Room 2", to: "CSIT Room 5", direction: 
    "1. Exit CSIT Room 2, turn left.\n" +
    "2. Walk straight and find the stairs on your left.\n" +
    "3. Walk up the stairs to first floor then turn right into the corridor.\n"+
    "4. Walk straight and the first door on your right is CSIT Room 5.", 
    steps: 25 },
  { from: "CSIT Room 5", to: "CSIT Room 2", direction: 
    "1. Exit CSIT Room 5 through either door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Find the stairs on you left.\n" +
    "4. Walk down the stairs to ground floor then turn right into the corridor.\n"+
    "5. Walk straight and the fifth door on your right is CSIT Room 2.", 
    steps: 25 },
  { from: "CSIT Room 2", to: "CSIT Lab 2", direction: 
    "1. Exit CSIT Room 2, turn right.\n" +
    "2. Walk to CSIT Exit.\n" +
    "3. Take a right through the passageway.\n" +
    "4. Take another right up the ramp.\n" +
    "5. Walk straight and the third door on your left is CSIT Lab 2.", 
    steps: 30 },
  { from: "CSIT Lab 2", to: "CSIT Room 2", direction: 
    "1. Exit CSIT Lab 2 through the main door.\n" +
    "2. Turn right and walk straight till you reach the ramp.\n" +
    "3. Walk down the ramp and take a left through the passageway.\n" +
    "4. Walk straight then take another left to reach the main corridor.\n" +
    "5. The third door on your left leads to CSIT Room 2.",
    steps: 30 },
  { from: "CSIT Room 2", to: "CSIT Room 6", direction: 
    "1. Exit CSIT Room 2, turn left.\n" +
    "2. Walk straight and find the stairs on your left.\n" +
    "3. Walk up the stairs to first floor then turn right into the corridor.\n"+
    "4. Walk straight and the third door on your right is CSIT Room 6.", 
    steps: 25 },
  { from: "CSIT Room 6", to: "CSIT Room 2", direction: 
    "1. Exit CSIT Room 6 through either door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Find the stairs on you left.\n" +
    "4. Walk down the stairs to ground floor then turn right into the corridor.\n"+
    "5. Walk straight and the fifth door on your right is CSIT Room 2.", 
    steps: 25 },
  { from: "CSIT Room 2", to: "CSIT Room 7", direction: 
    "1. Exit CSIT Room 2, turn left.\n" +
    "2. Walk straight and find the stairs on your left.\n" +
    "3. Walk up the stairs to first floor then turn right into the corridor.\n"+
    "4. Walk straight and the fifth door on your right is CSIT Room 7.", 
    steps: 25 },
  { from: "CSIT Room 7", to: "CSIT Room 2", direction: 
    "1. Exit CSIT Room 7 through either door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Find the stairs on you left.\n" +
    "4. Walk down the stairs to ground floor then turn right into the corridor.\n"+
    "5. Walk straight and the fifth door on your right is CSIT Room 2.", 
    steps: 25 },
  { from: "CSIT Room 2", to: "CSIT Room 8", direction: 
    "1. Exit CSIT Room 2, turn left.\n" +
    "2. Walk straight and find the stairs on your left.\n" +
    "3. Walk up the stairs to first floor then turn right into the corridor.\n"+
    "4. Walk straight and the seventh door on your right is CSIT Room 8.", 
    steps: 25 },
  { from: "CSIT Room 8", to: "CSIT Room 2", direction: 
    "1. Exit CSIT Room 8 through either door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Find the stairs on you left.\n" +
    "4. Walk down the stairs to ground floor then turn right into the corridor.\n"+
    "5. Walk straight and the fifth door on your right is CSIT Room 2.", 
    steps: 25 },
  { from: "CSIT Project Lab", to: "CSIT Room 2", direction: 
    "1. Exit the lab through its main door and turn left.\n" +
    "2. Walk straight and take a left to go downstairs.\n" +
    "3. Turn right and walk till the end of the corridor until you reach the ramp.\n" +
    "4. Walk down the ramp and take a left through the passageway.\n" +
    "5. Walk straight then take another left to reach the main corridor.\n" +
    "6. The third door on your left leads to CSIT Room 2.", 
    steps: 40 },
  { from: "CSIT Room 2", to: "CSIT Project Lab", direction: 
    "1. Exit CSIT Room 2, turn right.\n" +
    "2. Walk straight and exit through the main corridor.\n" +
    "3. Take a right through the passageway.\n" +
    "4. Take another right up the ramp.\n" +
    "5. Walk straight until you reach stairs on your left.\n" +
    "6. Walk up the stairs to first floor then turn right into the corridor.\n" +
    "7. Walk straight and the fifth door on your right is CSIT Project Lab.",  
    steps: 40 },

  // Room 3 to other sections
  { from: "CSIT Room 3", to: "CSIT Exit", direction: 
    "1. Exit CSIT Room 3 through its second door.\n" +
    "2. Turn right and walk straight.\n" +
    "3. Continue walking through the main corridor until you reach CSIT Exit.", 
    steps: 10 },
  { from: "CSIT Exit", to: "CSIT Room 3", direction: 
    "1. From CSIT Exit, walk straight and enter through the fifth door on your left.\n",  
    steps: 10 },
  { from: "CSIT Room 3", to: "CSIT Entrance", direction: 
    "1. Exit CSIT Room 3 through its second door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Continue walking through the main corridor until you reach CSIT Entrance.",
    steps: 20 },
  { from: "CSIT Entrance", to: "CSIT Room 3", direction: 
    "1. From CSIT Entrance, walk straight ahead.\n" +
    "2. Enter Room 1 through the third door on your right." ,
    steps: 20 },
  { from: "CSIT Room 3", to: "CSIT Room 5", direction: 
    "1. Exit CSIT Room 3 through its second door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Find the stairs on your left.\n" +
    "4. Walk up the stairs to first floor then turn right into the corridor.\n" +
    "5. Walk straight and the first door on your right is CSIT Room 5.",
    steps: 25 },
  { from: "CSIT Room 5", to: "CSIT Room 3", direction: 
    "1. Exit CSIT Room 5 through either door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Find the stairs on you left.\n" +
    "4. Walk down the stairs to ground floor then turn right into the corridor.\n"+
    "5. Walk straight and the third door on your right is CSIT Room 3.", 
    steps: 25 },
  { from: "CSIT Room 3", to: "CSIT Lab 2", direction: 
    "1. Exit CSIT Room 3 through its second door.\n" +
    "2. Turn right and walk straight.\n" +
    "3. Continue walking through the main corridor until you reach CSIT Exit.\n" +
    "4. Take a right through the passageway.\n" +
    "5. Take another right up the ramp.\n" +
    "6. Walk straight and the third door on your left is CSIT Lab 2.", 
    steps: 30 },
  { from: "CSIT Lab 2", to: "CSIT Room 3", direction: 
    "1. Exit CSIT Lab 2 through the main door.\n" +
    "2. Turn right and walk straight till you reach the ramp.\n" +
    "3. Walk down the ramp and take a left through the passageway.\n" +
    "4. Walk straight then take another left to reach the main corridor.\n" +
    "5. The fifth door on your left leads to CSIT Room 3.", 
    steps: 30 },
  { from: "CSIT Room 3", to: "CSIT Room 6", direction: 
    "1. Exit CSIT Room 3 through its second door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Find the stairs on your left.\n" +
    "4. Walk up the stairs to first floor then turn right into the corridor.\n" +
    "5. Walk straight and the third door on your right is CSIT Room 6.", 
    steps: 25 },
  { from: "CSIT Room 6", to: "CSIT Room 3", direction: 
   "1. Exit CSIT Room 5 through either door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Find the stairs on you left.\n" +
    "4. Walk down the stairs to ground floor then turn right into the corridor.\n"+
    "5. Walk straight and the third door on your right is CSIT Room 3.",
    steps: 25 },
  { from: "CSIT Room 3", to: "CSIT Room 7", direction: 
    "1. Exit CSIT Room 3 through its second door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Find the stairs on your left.\n" +
    "4. Walk up the stairs to first floor then turn right into the corridor.\n" +
    "5. Walk straight and the fifth door on your right is CSIT Room 7.",
    steps: 30 },
  { from: "CSIT Room 7", to: "CSIT Room 3", direction: 
    "1. Exit CSIT Room 7 through either door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Find the stairs on you left.\n" +
    "4. Walk down the stairs to ground floor then turn right into the corridor.\n"+
    "5. Walk straight and the third door on your right is CSIT Room 3.",
    steps: 30 },
  { from: "CSIT Room 3", to: "CSIT Room 8", direction: 
    "1. Exit CSIT Room 3 through its second door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Find the stairs on your left.\n" +
    "4. Walk up the stairs to first floor then turn right into the corridor.\n" +
    "5. Walk straight and the seventh door on your right is CSIT Room 8.",
    steps: 35 },
  { from: "CSIT Room 8", to: "CSIT Room 3", direction: 
    "1. Exit CSIT Room 8 through either door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Find the stairs on you left.\n" +
    "4. Walk down the stairs to ground floor then turn right into the corridor.\n"+
    "5. Walk straight and the third door on your right is CSIT Room 3.",
    steps: 35 },
  { from: "CSIT Room 3", to: "CSIT Lab 3", direction: 
    "1. Exit CSIT Room 3, turn right.\n" +
    "2. Walk straight and exit through the main corridor.\n" +
    "3. Take a right through the passageway.\n" +
    "4. Take another right up the ramp.\n" +
    "5. Walk straight until you reach stairs on your left.\n" +
    "6. Walk up the stairs to first floor then turn right into the corridor.\n" +
    "7. Walk straight and the first door on your right is CSIT Lab 3.", 
    steps: 35 },
  { from: "CSIT Lab 3", to: "CSIT Room 3", direction: 
    "1. Exit CSIT Lab 3 through its main door and turn left.\n" +
    "2. Turn left and go downstairs.\n" +
    "3. Turn right and walk till the end of the corridor until you reach the ramp.\n" +
    "4. Walk down the ramp and take a left through the passageway.\n" +
    "5. Walk straight then take another left to reach the main corridor.\n" +
    "6. The fifth door on your left leads to CSIT Room 3.",
    steps: 35 },
  { from: "CSIT Room 3", to: "CSIT Lab 4", direction: 
    "1. Exit CSIT Room 3, turn right.\n" +
    "2. Walk straight and exit through the main corridor.\n" +
    "3. Take a right through the passageway.\n" +
    "4. Take another right up the ramp.\n" +
    "5. Walk straight until you reach stairs on your left.\n" +
    "6. Walk up the stairs to first floor then turn right into the corridor.\n" +
    "7. Walk straight and the third door on your right is CSIT Lab 4.",
    steps: 40 },
  { from: "CSIT Lab 4", to: "CSIT Room 3", direction: 
    "1. Exit the lab through its main door and turn left.\n" +
    "2. Walk straight and take a left to go downstairs.\n" +
    "3. Turn right and walk till the end of the corridor until you reach the ramp.\n" +
    "4. Walk down the ramp and take a left through the passageway.\n" +
    "5. Walk straight then take another left to reach the main corridor.\n" +
    "6. The fifth door on your left leads to CSIT Room 3.", 
    steps: 40 },
  { from: "CSIT Room 3", to: "CSIT Lab 5", direction: 
    "1. Exit CSIT Room 3, turn right.\n" +
    "2. Walk straight and exit through the main corridor.\n" +
    "3. Take a right through the passageway.\n" +
    "4. Take another right up the ramp.\n" +
    "5. Walk straight until you reach stairs on your left.\n" +
    "6. Walk up the stairs to first floor then turn right into the corridor.\n" +
    "7. Walk straight and the sixth door on your right is CSIT Lab 5.",  
    steps: 45 },
  { from: "CSIT Lab 5", to: "CSIT Room 3", direction: 
    "1. Exit the lab through its main door and turn left.\n" +
    "2. Walk straight and take a left to go downstairs.\n" +
    "3. Turn right and walk till the end of the corridor until you reach the ramp.\n" +
    "4. Walk down the ramp and take a left through the passageway.\n" +
    "5. Walk straight then take another left to reach the main corridor.\n" +
    "6. The fifth door on your left leads to CSIT Room 3.", 
    steps: 45 },
  { from: "CSIT Room 3", to: "CSIT Project Lab", direction: 
    "1. Exit CSIT Room 3, turn right.\n" +
    "2. Walk straight and exit through the main corridor.\n" +
    "3. Take a right through the passageway.\n" +
    "4. Take another right up the ramp.\n" +
    "5. Walk straight until you reach stairs on your left.\n" +
    "6. Walk up the stairs to first floor then turn right into the corridor.\n" +
    "7. Walk straight and the fifth door on your right is CSIT Project Lab.", 
    steps: 50 },
  { from: "CSIT Project Lab", to: "CSIT Room 3", direction: 
    "1. Exit the lab through its main door and turn left.\n" +
    "2. Walk straight and take a left to go downstairs.\n" +
    "3. Turn right and walk till the end of the corridor until you reach the ramp.\n" +
    "4. Walk down the ramp and take a left through the passageway.\n" +
    "5. Walk straight then take another left to reach the main corridor.\n" +
    "6. The fifth door on your left leads to CSIT Room 3.", 
    steps: 50 },

  // Room 4 to other sections
  { from: "CSIT Room 4", to: "CSIT Exit", direction: 
    "1. Exit CSIT Room 4 through its first door.\n" +
    "2. Turn right and walk straight.\n" +
    "3. Continue walking through the main corridor until you reach CSIT Exit.", 
    steps: 10 },
  { from: "CSIT Exit", to: "CSIT Room 4", direction: 
    "1. From CSIT Exit, walk straight and enter through the seventh door on your left.\n", 
    steps: 10 },
  { from: "CSIT Room 4", to: "CSIT Entrance", direction: 
    "1. Exit CSIT Room 4 through its first door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Continue walking through the main corridor until you reach CSIT Entrance.", 
    steps: 20 },
  { from: "CSIT Entrance", to: "CSIT Room 4", direction: 
    "1. From CSIT Entrance, walk straight ahead.\n" +
    "2. Enter Room 1 through the first door on your right." ,
    steps: 20 },
  { from: "CSIT Room 4", to: "CSIT Room 5", direction: 
    "1. Exit CSIT Room 4 through its second door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Find the stairs on your left.\n" +
    "4. Walk up the stairs to first floor then turn right into the corridor.\n" +
    "5. Walk straight and the first door on your right is CSIT Room 5.",
    steps: 25 },
  { from: "CSIT Room 5", to: "CSIT Room 4", direction: 
    "1. Exit CSIT Room 5 through either door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Find the stairs on you left.\n" +
    "4. Walk down the stairs to ground floor then turn right into the corridor.\n"+
    "5. Walk straight and the first door on your right is CSIT Room 4.", 
    steps: 25 },
  { from: "CSIT Room 4", to: "CSIT Lab 2", direction: 
    "1. Exit CSIT Room 4 through its first door.\n" +
    "2. Turn right and walk straight.\n" +
    "3. Continue walking through the main corridor until you reach CSIT Exit.\n" +
    "4. Take a right through the passageway.\n" +
    "5. Take another right up the ramp.\n" +
    "6. Walk straight and the third door on your left is CSIT Lab 2.", 
    steps: 30 },
  { from: "CSIT Lab 2", to: "CSIT Room 4", direction: 
    "1. Exit CSIT Lab 2 through the main door.\n" +
    "2. Turn right and walk straight till you reach the ramp.\n" +
    "3. Walk down the ramp and take a left through the passageway.\n" +
    "4. Walk straight then take another left to reach the main corridor.\n" +
    "5. The seventh door on your left leads to CSIT Room 4.",  
    steps: 30 },
  { from: "CSIT Room 4", to: "CSIT Room 6", direction: 
    "1. Exit CSIT Room 4 through its second door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Find the stairs on your left.\n" +
    "4. Walk up the stairs to first floor then turn right into the corridor.\n" +
    "5. Walk straight and the third door on your right is CSIT Room 6.", 
    steps: 25 },
  { from: "CSIT Room 6", to: "CSIT Room 4", direction: 
    "1. Exit CSIT Room 6 through either door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Find the stairs on you left.\n" +
    "4. Walk down the stairs to ground floor then turn right into the corridor.\n"+
    "5. Walk straight and the first door on your right is CSIT Room 4.", 
    steps: 25 },
  { from: "CSIT Room 4", to: "CSIT Room 7", direction: 
    "1. Exit CSIT Room 4 through its second door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Find the stairs on your left.\n" +
    "4. Walk up the stairs to first floor then turn right into the corridor.\n" +
    "5. Walk straight and the fifth door on your right is CSIT Room 7.",
    steps: 30 },
  { from: "CSIT Room 7", to: "CSIT Room 4", direction: 
    "1. Exit CSIT Room 7 through either door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Find the stairs on you left.\n" +
    "4. Walk down the stairs to ground floor then turn right into the corridor.\n"+
    "5. Walk straight and the first door on your right is CSIT Room 4.", 
    steps: 30 },
  { from: "CSIT Room 4", to: "CSIT Room 8", direction: 
    "1. Exit CSIT Room 4 through its second door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Find the stairs on your left.\n" +
    "4. Walk up the stairs to first floor then turn right into the corridor.\n" +
    "5. Walk straight and the seventh door on your right is CSIT Room 8.",
    steps: 35 },
  { from: "CSIT Room 8", to: "CSIT Room 4", direction: 
    "1. Exit CSIT Room 8 through either door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Find the stairs on you left.\n" +
    "4. Walk down the stairs to ground floor then turn right into the corridor.\n"+
    "5. Walk straight and the first door on your right is CSIT Room 4.", 
    steps: 35 },
  { from: "CSIT Room 4", to: "CSIT Lab 3", direction: 
    "1. Exit CSIT Room 4, turn right.\n" +
    "2. Walk straight and exit through the main corridor.\n" +
    "3. Take a right through the passageway.\n" +
    "4. Take another right up the ramp.\n" +
    "5. Walk straight until you reach stairs on your left.\n" +
    "6. Walk up the stairs to first floor then turn right into the corridor.\n" +
    "7. Walk straight and the first door on your right is CSIT Lab 3.", 
    steps: 35 },
  { from: "CSIT Lab 3", to: "CSIT Room 4", direction: 
    "1. Exit CSIT Lab 3 through its main door and turn left.\n" +
    "2. Turn left and go downstairs.\n" +
    "3. Turn right and walk till the end of the corridor until you reach the ramp.\n" +
    "4. Walk down the ramp and take a left through the passageway.\n" +
    "5. Walk straight then take another left to reach the main corridor.\n" +
    "6. The seventh door on your left leads to CSIT Room 4.",
    steps: 35 },
  { from: "CSIT Room 4", to: "CSIT Lab 4", direction: 
    "1. Exit CSIT Room 4, turn right.\n" +
    "2. Walk straight and exit through the main corridor.\n" +
    "3. Take a right through the passageway.\n" +
    "4. Take another right up the ramp.\n" +
    "5. Walk straight until you reach stairs on your left.\n" +
    "6. Walk up the stairs to first floor then turn right into the corridor.\n" +
    "7. Walk straight and the third door on your right is CSIT Lab 4.", 
    steps: 40 },
  { from: "CSIT Lab 4", to: "CSIT Room 4", direction: 
   "1. Exit the lab through its main door and turn left.\n" +
    "2. Walk straight and take a left to go downstairs.\n" +
    "3. Turn right and walk till the end of the corridor until you reach the ramp.\n" +
    "4. Walk down the ramp and take a left through the passageway.\n" +
    "5. Walk straight then take another left to reach the main corridor.\n" +
    "6. The seventh door on your left leads to CSIT Room 4.",  
    steps: 40 },
  { from: "CSIT Room 4", to: "CSIT Lab 5", direction: 
    "1. Exit CSIT Room 4, turn right.\n" +
    "2. Walk straight and exit through the main corridor.\n" +
    "3. Take a right through the passageway.\n" +
    "4. Take another right up the ramp.\n" +
    "5. Walk straight until you reach stairs on your left.\n" +
    "6. Walk up the stairs to first floor then turn right into the corridor.\n" +
    "7. Walk straight and the sixth door on your right is CSIT Lab 5.", 
    steps: 45 },
  { from: "CSIT Lab 5", to: "CSIT Room 4", direction: 
    "1. Exit the lab through its main door and turn left.\n" +
    "2. Walk straight and take a left to go downstairs.\n" +
    "3. Turn right and walk till the end of the corridor until you reach the ramp.\n" +
    "4. Walk down the ramp and take a left through the passageway.\n" +
    "5. Walk straight then take another left to reach the main corridor.\n" +
    "6. The seventh door on your left leads to CSIT Room 4.",  
    steps: 45 },
  { from: "CSIT Room 4", to: "CSIT Project Lab", direction: 
    "1. Exit CSIT Room 4, turn right.\n" +
    "2. Walk straight and exit through the main corridor.\n" +
    "3. Take a right through the passageway.\n" +
    "4. Take another right up the ramp.\n" +
    "5. Walk straight until you reach stairs on your left.\n" +
    "6. Walk up the stairs to first floor then turn right into the corridor.\n" +
    "7. Walk straight and the fifth door on your right is CSIT Project Lab.", 
    steps: 50 },
  { from: "CSIT Project Lab", to: "CSIT Room 4", direction: 
    "1. Exit the lab through its main door and turn left.\n" +
    "2. Walk straight and take a left to go downstairs.\n" +
    "3. Turn right and walk till the end of the corridor until you reach the ramp.\n" +
    "4. Walk down the ramp and take a left through the passageway.\n" +
    "5. Walk straight then take another left to reach the main corridor.\n" +
    "6. The seventh door on your left leads to CSIT Room 4.",  
    steps: 50 },

  // Room 5 to other sections
  { from: "CSIT Room 5", to: "CSIT Exit", direction: 
    "1. Exit CSIT Room 5 through either door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Find the stairs on your left.\n" +
    "4. Walk down the stairs to ground floor then turn right.\n" +
    "5. Walk through the corridor till you reach CSIT Exit.",
    steps: 10 },
  { from: "CSIT Exit", to: "CSIT Room 5", direction: 
    "1. From CSIT Exit, walk through the entire corridor and find the stairs on your left.\n" +
    "2. Walk up the stairs and turn right.\n" +
    "3. Enter CSIT Room 5 through the first door on you right.", 
    steps: 10 },
  { from: "CSIT Room 5", to: "CSIT Entrance", direction: 
    "1. Exit CSIT Room 5 through either door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Find the stairs on your left.\n" +
    "4. Walk down the stairs to ground floor then turn left.\n" +
    "5. Walk a few steps until you reach CSIT Entrance.", 
    steps: 20 },
  { from: "CSIT Entrance", to: "CSIT Room 5", direction: 
    "1. From CSIT Entrance, turn right and find the stairs.\n" +
    "2. Walk upstairs and turn right.\n" +
    "3. Enter through the first door on you right." ,
    steps: 20 },
  { from: "CSIT Room 5", to: "CSIT Lab 2", direction: 
    "1. Exit CSIT Room 5 through either door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Find the stairs on your left.\n" +
    "4. Walk down the stairs to ground floor then turn right into the corridor.\n" +
    "5. Walk straight and exit through the main corridor.\n" +
    "6. Take a right through the passageway.\n"+
    "7. Take another right up the ramp.\n"+
    "8. Walk straight and the third door on your left is CSIT Lab 2.", 
    steps: 30 },
  { from: "CSIT Lab 2", to: "CSIT Room 5", direction: 
    "1. Exit CSIT Lab 2 through the main door.\n" +
    "2. Turn right and walk straight till you reach the ramp.\n" +
    "3. Walk down the ramp and take a left through the passageway.\n" +
    "4. Walk straight then take another left to reach the main corridor.\n" +
    "5. Walk till the end of the main corridor until you reach the stairs on your left.\n"+
    "6. Go up the stairs and turn right.\n"+
    "7. The first door on your right leads to CSIT Room 5.",
    steps: 30 },
  { from: "CSIT Room 5", to: "CSIT Lab 3", direction: 
    "1. Exit CSIT Room 5 through either door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Find the stairs on your left.\n" +
    "4. Wal down the stairs to ground floor then turn right into the corridor.\n" +
    "5. Walk straight and exit through the main corridor.\n" +
    "6. Take a right through the passageway.\n"+
    "7. Take another right up the ramp.\n"+
    "8. Walk straight until you reach the stairs on your left.\n" +
    "9. Walk up the stairs to first floor. Then turn right to the corridor.\n"+
    "10. Walk straight and the first door on your right is CSIT Lab 3.",
    steps: 35 },
  { from: "CSIT Lab 3", to: "CSIT Room 5", direction: 
    "1. Exit CSIT Lab 3 through its main door and turn left.\n" +
    "2. Turn left and go downstairs.\n" +
    "3. Turn right and walk till the end of the corridor until you reach the ramp.\n" +
    "4. Walk down the ramp and take a left through the passageway.\n" +
    "5. Walk straight then take another left to reach the main corridor.\n" +
    "6. Walk till the end of the main corridor until you reach the stairs on your left.\n"+
    "7. Go up the stairs and turn right.\n"+
    "8. The first door on your right leads to CSIT Room 5.",
    steps: 35 },
  { from: "CSIT Room 5", to: "CSIT Lab 4", direction: 
    "1. Exit CSIT Room 5 through either door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Find the stairs on your left.\n" +
    "4. Wal down the stairs to ground floor then turn right into the corridor.\n" +
    "5. Walk straight and exit through the main corridor.\n" +
    "6. Take a right through the passageway.\n"+
    "7. Take another right up the ramp.\n"+
    "8. Walk straight until you reach the stairs on your left.\n" +
    "9. Walk up the stairs to first floor. Then turn right to the corridor.\n"+
    "10. Walk straight and the third door on your right is CSIT Lab 4.", 
    steps: 40 },
  { from: "CSIT Lab 4", to: "CSIT Room 5", direction: 
    "1. Exit the lab through its main door and turn left.\n" +
      "2. Walk straight and take a left to go downstairs.\n" +
      "3. Turn right and walk till the end of the corridor until you reach the ramp.\n" +
      "4. Walk down the ramp and take a left through the passageway.\n" +
      "5. Walk straight then take another left to reach the main corridor.\n" +
      "6. Walk till the end of the main corridor until you reach the stairs on your left.\n"+
      "7. Go up the stairs and turn right.\n"+
      "8. The first door on your right leads to CSIT Room 5.",
    steps: 40 },
  { from: "CSIT Room 5", to: "CSIT Project Lab", direction: 
    "1. Exit CSIT Room 5 through either door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Find the stairs on your left.\n" +
    "4. Wal down the stairs to ground floor then turn right into the corridor.\n" +
    "5. Walk straight and exit through the main corridor.\n" +
    "6. Take a right through the passageway.\n"+
    "7. Take another right up the ramp.\n"+
    "8. Walk straight until you reach the stairs on your left.\n" +
    "9. Walk up the stairs to first floor. Then turn right to the corridor.\n"+
    "10. Walk straight and the fifth door on your right is CSIT Project Lab.",
    steps: 45 },
  { from: "CSIT Project Lab", to: "CSIT Room 5", direction: 
    "1. Exit the lab through its main door and turn left.\n" +
      "2. Walk straight and take a left to go downstairs.\n" +
      "3. Turn right and walk till the end of the corridor until you reach the ramp.\n" +
      "4. Walk down the ramp and take a left through the passageway.\n" +
      "5. Walk straight then take another left to reach the main corridor.\n" +
      "6. Walk till the end of the main corridor until you reach the stairs on your left.\n"+
      "7. Go up the stairs and turn right.\n"+
      "8. The first door on your right leads to CSIT Room 5.",
    steps: 45 },

  // Room 6 to other sections
  { from: "CSIT Room 6", to: "CSIT Exit", direction: 
    "1. Exit CSIT Room 6 through either door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Find the stairs on your left.\n" +
    "4. Walk down the stairs to ground floor then turn right.\n" +
    "5. Walk through the corridor till you reach CSIT Exit.",
    steps: 10 },
  { from: "CSIT Exit", to: "CSIT Room 6", direction: 
    "1. From CSIT Exit, walk through the entire corridor and find the stairs on your left.\n" +
    "2. Walk up the stairs and turn right.\n" +
    "3. Enter CSIT Room 6 through the third door on you right.", 
    steps: 10 },
  { from: "CSIT Room 6", to: "CSIT Entrance", direction: 
    "1. Exit CSIT Room 6 through either door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Find the stairs on your left.\n" +
    "4. Walk down the stairs to ground floor then turn left.\n" +
    "5. Walk a few steps until you reach CSIT Entrance.",  
    steps: 20 },
  { from: "CSIT Entrance", to: "CSIT Room 6", direction: 
    "1. From CSIT Entrance, turn right and find the stairs.\n" +
    "2. Walk upstairs and turn right.\n" +
    "3. Enter through the third door on you right." ,
    steps: 20 },
  { from: "CSIT Room 6", to: "CSIT Lab 2", direction: 
    "1. Exit CSIT Room 6 through either door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Find the stairs on your left.\n" +
    "4. Walk down the stairs to ground floor then turn right into the corridor.\n" +
    "5. Walk straight and exit through the main corridor.\n" +
    "6. Take a right through the passageway.\n"+
    "7. Take another right up the ramp.\n"+
    "8. Walk straight and the third door on your left is CSIT Lab 2.",
    steps: 30 },
  { from: "CSIT Lab 2", to: "CSIT Room 6", direction: 
    "1. Exit CSIT Lab 2 through the main door.\n" +
    "2. Turn right and walk straight till you reach the ramp.\n" +
    "3. Walk down the ramp and take a left through the passageway.\n" +
    "4. Walk straight then take another left to reach the main corridor.\n" +
    "5. Walk till the end of the main corridor until you reach the stairs on your left.\n"+
    "6. Go up the stairs and turn right.\n"+
    "7. The third door on your right leads to CSIT Room 6.",
    steps: 30 },
  { from: "CSIT Room 6", to: "CSIT Lab 3", direction: 
    "1. Exit CSIT Room 6 through either door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Find the stairs on your left.\n" +
    "4. Wal down the stairs to ground floor then turn right into the corridor.\n" +
    "5. Walk straight and exit through the main corridor.\n" +
    "6. Take a right through the passageway.\n"+
    "7. Take another right up the ramp.\n"+
    "8. Walk straight until you reach the stairs on your left.\n" +
    "9. Walk up the stairs to first floor. Then turn right to the corridor.\n"+
    "10. Walk straight and the first door on your right is CSIT Lab 3.",
    steps: 35 },
  { from: "CSIT Lab 3", to: "CSIT Room 6", direction: 
    "1. Exit CSIT Lab 3 through its main door and turn left.\n" +
    "2. Turn left and go downstairs.\n" +
    "3. Turn right and walk till the end of the corridor until you reach the ramp.\n" +
    "4. Walk down the ramp and take a left through the passageway.\n" +
    "5. Walk straight then take another left to reach the main corridor.\n" +
    "6. Walk till the end of the main corridor until you reach the stairs on your left.\n"+
    "7. Go up the stairs and turn right.\n"+
    "8. The third door on your right leads to CSIT Room 6.", 
    steps: 35 },
  { from: "CSIT Room 6", to: "CSIT Lab 4", direction: 
    "1. Exit CSIT Room 6 through either door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Find the stairs on your left.\n" +
    "4. Wal down the stairs to ground floor then turn right into the corridor.\n" +
    "5. Walk straight and exit through the main corridor.\n" +
    "6. Take a right through the passageway.\n"+
    "7. Take another right up the ramp.\n"+
    "8. Walk straight until you reach the stairs on your left.\n" +
    "9. Walk up the stairs to first floor. Then turn right to the corridor.\n"+
    "10. Walk straight and the third door on your right is CSIT Lab 4.",
    steps: 40 },
  { from: "CSIT Lab 4", to: "CSIT Room 6", direction: 
    "1. Exit the lab through its main door and turn left.\n" +
      "2. Walk straight and take a left to go downstairs.\n" +
      "3. Turn right and walk till the end of the corridor until you reach the ramp.\n" +
      "4. Walk down the ramp and take a left through the passageway.\n" +
      "5. Walk straight then take another left to reach the main corridor.\n" +
      "6. Walk till the end of the main corridor until you reach the stairs on your left.\n"+
      "7. Go up the stairs and turn right.\n"+
      "8. The third door on your right leads to CSIT Room 6.",
    steps: 40 },
  { from: "CSIT Room 6", to: "CSIT Lab 5", direction: 
    "1. Exit CSIT Room 6 through either door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Find the stairs on your left.\n" +
    "4. Wal down the stairs to ground floor then turn right into the corridor.\n" +
    "5. Walk straight and exit through the main corridor.\n" +
    "6. Take a right through the passageway.\n"+
    "7. Take another right up the ramp.\n"+
    "8. Walk straight until you reach the stairs on your left.\n" +
    "9. Walk up the stairs to first floor. Then turn right to the corridor.\n"+
    "10. Walk straight and the sixth door on your right is CSIT Lab 5.", 
    steps: 45 },
  { from: "CSIT Lab 5", to: "CSIT Room 6", direction: 
    "1. Exit the lab through its main door and turn left.\n" +
      "2. Walk straight and take a left to go downstairs.\n" +
      "3. Turn right and walk till the end of the corridor until you reach the ramp.\n" +
      "4. Walk down the ramp and take a left through the passageway.\n" +
      "5. Walk straight then take another left to reach the main corridor.\n" +
      "6. Walk till the end of the main corridor until you reach the stairs on your left.\n"+
      "7. Go up the stairs and turn right.\n"+
      "8. The third door on your right leads to CSIT Room 6.",
    steps: 45 },
  { from: "CSIT Room 6", to: "CSIT Project Lab", direction: 
    "1. Exit CSIT Room 6 through either door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Find the stairs on your left.\n" +
    "4. Wal down the stairs to ground floor then turn right into the corridor.\n" +
    "5. Walk straight and exit through the main corridor.\n" +
    "6. Take a right through the passageway.\n"+
    "7. Take another right up the ramp.\n"+
    "8. Walk straight until you reach the stairs on your left.\n" +
    "9. Walk up the stairs to first floor. Then turn right to the corridor.\n"+
    "10. Walk straight and the fifth door on your right is CSIT Project Lab.",
    steps: 50 },
  { from: "CSIT Project Lab", to: "CSIT Room 6", direction: 
    "1. Exit the lab through its main door and turn left.\n" +
      "2. Walk straight and take a left to go downstairs.\n" +
      "3. Turn right and walk till the end of the corridor until you reach the ramp.\n" +
      "4. Walk down the ramp and take a left through the passageway.\n" +
      "5. Walk straight then take another left to reach the main corridor.\n" +
      "6. Walk till the end of the main corridor until you reach the stairs on your left.\n"+
      "7. Go up the stairs and turn right.\n"+
      "8. The third door on your right leads to CSIT Room 6.", 
    steps: 50 },
  { from: "CSIT Room 6", to: "CSIT Lab Exit", direction: 
    "1. Exit CSIT Room 6 through either door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Find the stairs on your left.\n" +
    "4. Walk down the stairs to ground floor then turn right.\n" +
    "5. Walk straight and exit through the main corridor.\n" +
    "6. Take a right through the passageway.\n" +
    "7. Take another right up the ramp to reach CSIT Lab Exit.", 
    steps: 50 },
  { from: "CSIT Lab Exit", to: "CSIT Room 6", direction: 
    "1. From CSIT Lab Exit, walk straight.\n" +
    "2. Walk down the ramp.\n" +
    "3. Take a left through the passageway.\n" +
    "4. Take another left to reach the main corridor.\n" +
    "5. Walk straight and enter Room 6 through its first door.", 
    steps: 50 },
  { from: "CSIT Room 6", to: "CSIT Lab Entrance", direction: 
    "1. Exit CSIT Room 6 through either door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Find the stairs on your left.\n" +
    "4. Walk down the stairs to ground floor then turn right.\n" +
    "5. Walk straight and exit through the main corridor.\n" +
    "6. Take a right through the passageway.\n" +
    "7. Take another right up the ramp."+
    "8. Walk straight until you reach the CSIT Lab Entrance.",
    steps: 50 },
  { from: "CSIT Lab Entrance", to: "CSIT Room 6", direction: 
    "1. From CSIT Lab Entrance, walk straight.\n" +
    "2. Walk down the ramp.\n" +
    "3. Take a left through the passageway.\n" +
    "4. Take another left to reach the main corridor.\n" +
    "5. Walk straight and enter Room 6 through its first door.", 
    steps: 50 },

  // Room 7 to other sections
  { from: "CSIT Room 7", to: "CSIT Exit", direction: 
    "1. Exit CSIT Room 7 through either door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Find the stairs on your left.\n" +
    "4. Walk down the stairs to ground floor then turn right.\n" +
    "5. Walk through the corridor till you reach CSIT Exit.",
    steps: 10 },
  { from: "CSIT Exit", to: "CSIT Room 7", direction: 
    "1. From CSIT Exit, walk through the entire corridor and find the stairs on your left.\n" +
    "2. Walk up the stairs and turn right.\n" +
    "3. Enter CSIT Room 7 through the fifth door on you right.",
    steps: 10 },
  { from: "CSIT Room 7", to: "CSIT Entrance", direction: 
    "1. Exit CSIT Room 7 through either door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Find the stairs on your left.\n" +
    "4. Walk down the stairs to ground floor then turn left.\n" +
    "5. Walk a few steps until you reach CSIT Entrance.", 

    steps: 20 },
  { from: "CSIT Entrance", to: "CSIT Room 7", direction: 
    "1. From CSIT Entrance, turn right and find the stairs.\n" +
    "2. Walk upstairs and turn right.\n" +
    "3. Enter through the fifth door on you right." ,
    steps: 20 },
  { from: "CSIT Room 7", to: "CSIT Lab 2", direction: 
    "1. Exit CSIT Room 7 through either door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Find the stairs on your left.\n" +
    "4. Walk down the stairs to ground floor then turn right into the corridor.\n" +
    "5. Walk straight and exit through the main corridor.\n" +
    "6. Take a right through the passageway.\n"+
    "7. Take another right up the ramp.\n"+
    "8. Walk straight and the third door on your left is CSIT Lab 2.",
    steps: 30 },
  { from: "CSIT Lab 2", to: "CSIT Room 7", direction: 
    "1. Exit CSIT Lab 2 through the main door.\n" +
    "2. Turn right and walk straight till you reach the ramp.\n" +
    "3. Walk down the ramp and take a left through the passageway.\n" +
    "4. Walk straight then take another left to reach the main corridor.\n" +
    "5. Walk till the end of the main corridor until you reach the stairs on your left.\n"+
    "6. Go up the stairs and turn right.\n"+
    "7. The fifth door on your right leads to CSIT Room 7.",
    steps: 30 },
  { from: "CSIT Room 7", to: "CSIT Lab 3", direction: 
    "1. Exit CSIT Room 7 through either door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Find the stairs on your left.\n" +
    "4. Wal down the stairs to ground floor then turn right into the corridor.\n" +
    "5. Walk straight and exit through the main corridor.\n" +
    "6. Take a right through the passageway.\n"+
    "7. Take another right up the ramp.\n"+
    "8. Walk straight until you reach the stairs on your left.\n" +
    "9. Walk up the stairs to first floor. Then turn right to the corridor.\n"+
    "10. Walk straight and the first door on your right is CSIT Lab 3.",
    steps: 35 },
  { from: "CSIT Lab 3", to: "CSIT Room 7", direction: 
    "1. Exit CSIT Lab 3 through its main door and turn left.\n" +
    "2. Turn left and go downstairs.\n" +
    "3. Turn right and walk till the end of the corridor until you reach the ramp.\n" +
    "4. Walk down the ramp and take a left through the passageway.\n" +
    "5. Walk straight then take another left to reach the main corridor.\n" +
    "6. Walk till the end of the main corridor until you reach the stairs on your left.\n"+
    "7. Go up the stairs and turn right.\n"+
    "8. The fifth door on your right leads to CSIT Room 7.",  
    steps: 35 },
  { from: "CSIT Room 7", to: "CSIT Lab 4", direction: 
    "1. Exit CSIT Room 7 through either door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Find the stairs on your left.\n" +
    "4. Wal down the stairs to ground floor then turn right into the corridor.\n" +
    "5. Walk straight and exit through the main corridor.\n" +
    "6. Take a right through the passageway.\n"+
    "7. Take another right up the ramp.\n"+
    "8. Walk straight until you reach the stairs on your left.\n" +
    "9. Walk up the stairs to first floor. Then turn right to the corridor.\n"+
    "10. Walk straight and the third door on your right is CSIT Lab 4.", 
    steps: 40 },
  { from: "CSIT Lab 4", to: "CSIT Room 7", direction: 
    "1. Exit the lab through its main door and turn left.\n" +
      "2. Walk straight and take a left to go downstairs.\n" +
      "3. Turn right and walk till the end of the corridor until you reach the ramp.\n" +
      "4. Walk down the ramp and take a left through the passageway.\n" +
      "5. Walk straight then take another left to reach the main corridor.\n" +
      "6. Walk till the end of the main corridor until you reach the stairs on your left.\n"+
      "7. Go up the stairs and turn right.\n"+
      "8. The fifth door on your right leads to CSIT Room 7.",
    steps: 40 },
  { from: "CSIT Room 7", to: "CSIT Lab 5", direction: 
    "1. Exit CSIT Room 7 through either door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Find the stairs on your left.\n" +
    "4. Wal down the stairs to ground floor then turn right into the corridor.\n" +
    "5. Walk straight and exit through the main corridor.\n" +
    "6. Take a right through the passageway.\n"+
    "7. Take another right up the ramp.\n"+
    "8. Walk straight until you reach the stairs on your left.\n" +
    "9. Walk up the stairs to first floor. Then turn right to the corridor.\n"+
    "10. Walk straight and the sixth door on your right is CSIT Lab 5.", 
    steps: 45 },
  { from: "CSIT Lab 5", to: "CSIT Room 7", direction: 
    "1. Exit the lab through its main door and turn left.\n" +
      "2. Walk straight and take a left to go downstairs.\n" +
      "3. Turn right and walk till the end of the corridor until you reach the ramp.\n" +
      "4. Walk down the ramp and take a left through the passageway.\n" +
      "5. Walk straight then take another left to reach the main corridor.\n" +
      "6. Walk till the end of the main corridor until you reach the stairs on your left.\n"+
      "7. Go up the stairs and turn right.\n"+
      "8. The fifth door on your right leads to CSIT Room 7.",
    steps: 45 },
  { from: "CSIT Room 7", to: "CSIT Project Lab", direction: 
    "1. Exit CSIT Room 7 through either door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Find the stairs on your left.\n" +
    "4. Wal down the stairs to ground floor then turn right into the corridor.\n" +
    "5. Walk straight and exit through the main corridor.\n" +
    "6. Take a right through the passageway.\n"+
    "7. Take another right up the ramp.\n"+
    "8. Walk straight until you reach the stairs on your left.\n" +
    "9. Walk up the stairs to first floor. Then turn right to the corridor.\n"+
    "10. Walk straight and the fifth door on your right is CSIT Project Lab.",
    steps: 50 },
  { from: "CSIT Project Lab", to: "CSIT Room 7", direction: 
    "1. Exit the lab through its main door and turn left.\n" +
      "2. Walk straight and take a left to go downstairs.\n" +
      "3. Turn right and walk till the end of the corridor until you reach the ramp.\n" +
      "4. Walk down the ramp and take a left through the passageway.\n" +
      "5. Walk straight then take another left to reach the main corridor.\n" +
      "6. Walk till the end of the main corridor until you reach the stairs on your left.\n"+
      "7. Go up the stairs and turn right.\n"+
      "8. The fifth door on your right leads to CSIT Room 7.", 
    steps: 50 },

  // Room 8 to other sections
  { from: "CSIT Room 8", to: "CSIT Exit", direction: 
    "1. Exit CSIT Room 8 through either door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Find the stairs on your left.\n" +
    "4. Walk down the stairs to ground floor then turn right.\n" +
    "5. Walk through the corridor till you reach CSIT Exit.",
    steps: 10 },
  { from: "CSIT Exit", to: "CSIT Room 8", direction: 
    "1. From CSIT Exit, walk through the entire corridor and find the stairs on your left.\n" +
    "2. Walk up the stairs and turn right.\n" +
    "3. Enter CSIT Room 8 through the seventh door on you right.",
    steps: 10 },
  { from: "CSIT Room 8", to: "CSIT Entrance", direction: 
    "1. Exit CSIT Room 8 through either door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Find the stairs on your left.\n" +
    "4. Walk down the stairs to ground floor then turn left.\n" +
    "5. Walk a few steps until you reach CSIT Entrance.", 

    steps: 20 },
  { from: "CSIT Entrance", to: "CSIT Room 8", direction: 
    "1. From CSIT Entrance, turn right and find the stairs.\n" +
    "2. Walk upstairs and turn right.\n" +
    "3. Enter through the seventh door on you right." ,
    steps: 20 },
  { from: "CSIT Room 8", to: "CSIT Lab 2", direction: 
    "1. Exit CSIT Room 8 through either door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Find the stairs on your left.\n" +
    "4. Walk down the stairs to ground floor then turn right into the corridor.\n" +
    "5. Walk straight and exit through the main corridor.\n" +
    "6. Take a right through the passageway.\n"+
    "7. Take another right up the ramp.\n"+
    "8. Walk straight and the third door on your left is CSIT Lab 2.",
    steps: 30 },
  { from: "CSIT Lab 2", to: "CSIT Room 8", direction: 
    "1. Exit CSIT Lab 2 through the main door.\n" +
    "2. Turn right and walk straight till you reach the ramp.\n" +
    "3. Walk down the ramp and take a left through the passageway.\n" +
    "4. Walk straight then take another left to reach the main corridor.\n" +
    "5. Walk till the end of the main corridor until you reach the stairs on your left.\n"+
    "6. Go up the stairs and turn right.\n"+
    "7. The seventh door on your right leads to CSIT Room 8.",
    steps: 30 },
  { from: "CSIT Room 8", to: "CSIT Lab 3", direction: 
    "1. Exit CSIT Room 8 through either door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Find the stairs on your left.\n" +
    "4. Wal down the stairs to ground floor then turn right into the corridor.\n" +
    "5. Walk straight and exit through the main corridor.\n" +
    "6. Take a right through the passageway.\n"+
    "7. Take another right up the ramp.\n"+
    "8. Walk straight until you reach the stairs on your left.\n" +
    "9. Walk up the stairs to first floor. Then turn right to the corridor.\n"+
    "10. Walk straight and the first door on your right is CSIT Lab 3.",
    steps: 35 },
  { from: "CSIT Lab 3", to: "CSIT Room 8", direction: 
    "1. Exit CSIT Lab 3 through its main door and turn left.\n" +
    "2. Turn left and go downstairs.\n" +
    "3. Turn right and walk till the end of the corridor until you reach the ramp.\n" +
    "4. Walk down the ramp and take a left through the passageway.\n" +
    "5. Walk straight then take another left to reach the main corridor.\n" +
    "6. Walk till the end of the main corridor until you reach the stairs on your left.\n"+
    "7. Go up the stairs and turn right.\n"+
    "8. The seventh door on your right leads to CSIT Room 8.", 
    steps: 35 },
  { from: "CSIT Room 8", to: "CSIT Lab 4", direction: 
    "1. Exit CSIT Room 8 through either door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Find the stairs on your left.\n" +
    "4. Wal down the stairs to ground floor then turn right into the corridor.\n" +
    "5. Walk straight and exit through the main corridor.\n" +
    "6. Take a right through the passageway.\n"+
    "7. Take another right up the ramp.\n"+
    "8. Walk straight until you reach the stairs on your left.\n" +
    "9. Walk up the stairs to first floor. Then turn right to the corridor.\n"+
    "10. Walk straight and the third door on your right is CSIT Lab 4.", 
    steps: 40 },
  { from: "CSIT Lab 4", to: "CSIT Room 8", direction: 
    "1. Exit the lab through its main door and turn left.\n" +
      "2. Walk straight and take a left to go downstairs.\n" +
      "3. Turn right and walk till the end of the corridor until you reach the ramp.\n" +
      "4. Walk down the ramp and take a left through the passageway.\n" +
      "5. Walk straight then take another left to reach the main corridor.\n" +
      "6. Walk till the end of the main corridor until you reach the stairs on your left.\n"+
      "7. Go up the stairs and turn right.\n"+
      "8. The seventh door on your right leads to CSIT Room 8.",
    steps: 40 },
  { from: "CSIT Room 8", to: "CSIT Lab 5", direction: 
    "1. Exit CSIT Room 8 through either door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Find the stairs on your left.\n" +
    "4. Wal down the stairs to ground floor then turn right into the corridor.\n" +
    "5. Walk straight and exit through the main corridor.\n" +
    "6. Take a right through the passageway.\n"+
    "7. Take another right up the ramp.\n"+
    "8. Walk straight until you reach the stairs on your left.\n" +
    "9. Walk up the stairs to first floor. Then turn right to the corridor.\n"+
    "10. Walk straight and the sixth door on your right is CSIT Lab 5.", 
    steps: 45 },
  { from: "CSIT Lab 5", to: "CSIT Room 8", direction: 
    "1. Exit the lab through its main door and turn left.\n" +
      "2. Walk straight and take a left to go downstairs.\n" +
      "3. Turn right and walk till the end of the corridor until you reach the ramp.\n" +
      "4. Walk down the ramp and take a left through the passageway.\n" +
      "5. Walk straight then take another left to reach the main corridor.\n" +
      "6. Walk till the end of the main corridor until you reach the stairs on your left.\n"+
      "7. Go up the stairs and turn right.\n"+
      "8. The seventh door on your right leads to CSIT Room 8.",
    steps: 45 },
  { from: "CSIT Room 8", to: "CSIT Project Lab", direction: 
    "1. Exit CSIT Room 8 through either door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Find the stairs on your left.\n" +
    "4. Wal down the stairs to ground floor then turn right into the corridor.\n" +
    "5. Walk straight and exit through the main corridor.\n" +
    "6. Take a right through the passageway.\n"+
    "7. Take another right up the ramp.\n"+
    "8. Walk straight until you reach the stairs on your left.\n" +
    "9. Walk up the stairs to first floor. Then turn right to the corridor.\n"+
    "10. Walk straight and the fifth door on your right is CSIT Project Lab.",
    steps: 50 },
  { from: "CSIT Project Lab", to: "CSIT Room 8", direction: 
    "1. Exit the lab through its main door and turn left.\n" +
      "2. Walk straight and take a left to go downstairs.\n" +
      "3. Turn right and walk till the end of the corridor until you reach the ramp.\n" +
      "4. Walk down the ramp and take a left through the passageway.\n" +
      "5. Walk straight then take another left to reach the main corridor.\n" +
      "6. Walk till the end of the main corridor until you reach the stairs on your left.\n"+
      "7. Go up the stairs and turn right.\n"+
      "8. The seventh door on your right leads to CSIT Room 8.",
    steps: 50 },

  // Lab 2 to other sections
  { from: "CSIT Lab 2", to: "CSIT Lab Exit", direction: 
    "1. Exit CSIT Lab 2, turn right.\n" +
    "2. Walk till the end of the corridor to reach there.\n",
    steps: 10 },
  { from: "CSIT Lab Exit", to: "CSIT Lab 2", direction: 
    "1. From Lab Exit, walk straight.\n" +
    "2. Enter CSIT Lab 2.", 
    steps: 10 },
  { from: "CSIT Lab 2", to: "CSIT Lab Entrance", direction: 
    "1. Exit CSIT Lab 2, turn left.\n" +
    "2. Walk till the end of the corridor to reach there.\n",
    steps: 15 },
  { from: "CSIT Lab Entrance", to: "CSIT Lab 2", direction: 
    "1. From Lab Entrance, walk to Lab Exit.\n" +
    "2. Enter CSIT Lab 2.", 
    steps: 15 },
  { from: "CSIT Lab 2", to: "CSIT Lab 4", direction: 
    "1. Exit Lab 2 through the main door.\n" +
    "2. Turn right and walk till the end of the corridor until you reach the stairs on your left.\n" +
    "3. Go up the stairs and turn right.\n"+
    "4. The third door on your right leads to CSIT Lab 4.",  
    steps: 25 },
  { from: "CSIT Lab 4", to: "CSIT Lab 2", direction: 
    "1. Exit CSIT Lab 4 through its main door and turn left.\n" +
    "2. Walk straight and take a left to go downstairs.\n" +
    "3. Turn right and walk straight.\n" +
    "4. The third door on your right will lead to CSIT Lab 2.",
    steps: 25 },
  { from: "CSIT Lab 2", to: "CSIT Lab 5", direction: 
    "1. Exit Lab 2 through the main door.\n" +
    "2. Turn right and walk till the end of the corridor until you reach the stairs on your left.\n" +
    "3. Go up the stairs and turn right.\n"+
    "4. The sixth door on your right leads to CSIT Lab 5.", 
    steps: 30 },
  { from: "CSIT Lab 5", to: "CSIT Lab 2", direction: 
    "1. Exit CSIT Lab 5 through its main door and turn left.\n" +
    "2. Walk straight and take a left to go downstairs.\n" +
    "3. Turn right and walk straight.\n" +
    "4. The third door on your right will lead to CSIT Lab 2.",
    steps: 30 },
  { from: "CSIT Lab 2", to: "CSIT Project Lab", direction: 
    "1. Exit Lab 2 through the main door.\n" +
    "2. Turn right and walk till the end of the corridor until you reach the stairs on your left.\n" +
    "3. Go up the stairs and turn right.\n"+
    "4. The fifth door on your right leads to CSIT Project Lab.", 
    steps: 35 },
  { from: "CSIT Project Lab", to: "CSIT Lab 2", direction: 
    "1. Exit the lab through its main door and turn left.\n" +
    "2. Walk straight and take a left to go downstairs.\n" +
    "3. Turn right and walk straight.\n" +
    "4. The third door on your right will lead to CSIT Lab 2.", 
    steps: 35 },

  { from: "CSIT Lab 3", to: "CSIT Lab Exit", direction: 
    "1. Exit CSIT Lab 3 through its main door and turn left.\n" +
    "2. Turn left and go downstairs.\n" +
    "3. Turn left and walk until you reach the end of the corridor.",
    steps: 10 },
  { from: "CSIT Lab Exit", to: "CSIT Lab 3", direction: 
    "1. From Lab Exit, walk straight.\n" +
    "2. Enter CSIT Lab 3.", 
    steps: 10 },
  { from: "CSIT Lab 3", to: "CSIT Lab Entrance", direction: 
    "1. Exit CSIT Lab 3 through its main door and turn left.\n" +
    "2. Turn left and go downstairs.\n" +
    "3. Turn right and walk till the end of the corridor until you reach the ramp.",
    steps: 15 },
  { from: "CSIT Lab Entrance", to: "CSIT Lab 3", direction: 
    "1. From Lab Entrance, walk to Lab Exit.\n" +
    "2. Enter CSIT Lab 3.", 
    steps: 15 },
  { from: "CSIT Lab 3", to: "CSIT Lab 5", direction: 
    "1. Exit Lab 3 through the main door.\n" +
    "2. Turn right and walk straight.\n" +
    "3. The fifth door on you right leads to CSIT Lab 5.", 
    steps: 10 },
  { from: "CSIT Lab 5", to: "CSIT Lab 3", direction: 
    "1. Exit Lab 5 through the main door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. The fifth door on your left leads to CSIT Lab 3.",
    steps: 10 },

  { from: "CSIT Lab 4", to: "CSIT Lab Exit", direction: 
    "1. Exit CSIT Lab 3 through its main door and turn left.\n" +
    "2. Walk straight and take a left and go downstairs.\n" +
    "3. Turn left and walk until you reach the end of the corridor.",
    steps: 10 },
  { from: "CSIT Lab Exit", to: "CSIT Lab 4", direction: 
    "1. From Lab Exit, walk straight.\n" +
    "2. Enter CSIT Lab 4.", 
    steps: 10 },
  { from: "CSIT Lab 4", to: "CSIT Lab Entrance", direction: 
    "1. Exit CSIT Lab 3 through its main door and turn left.\n" +
    "2. Walk straight and take a left and go downstairs.\n" +
    "3. Turn right and walk till the end of the corridor until you reach the ramp.",
    steps: 15 },
  { from: "CSIT Lab Entrance", to: "CSIT Lab 4", direction: 
    "1. From Lab Entrance, walk to Lab Exit.\n" +
    "2. Enter CSIT Lab 4.", 
    steps: 15 },

  { from: "CSIT Lab 5", to: "CSIT Lab Exit", direction: 
    "1. Exit CSIT Lab 5 through its main door and turn left.\n" +
    "2. Walk straight and take a left and go downstairs.\n" +
    "3. Turn left and walk until you reach the end of the corridor.",
    steps: 10 },
  { from: "CSIT Lab Exit", to: "CSIT Lab 5", direction: 
    "1. From Lab Exit, walk straight.\n" +
    "2. Enter CSIT Lab 5.", 
    steps: 10 },
  { from: "CSIT Lab 5", to: "CSIT Lab Entrance", direction: 
   "1. Exit CSIT Lab 5 through its main door and turn left.\n" +
    "2. Walk straight and take a left and go downstairs.\n" +
    "3. Turn right and walk till the end of the corridor until you reach the ramp.",
    steps: 15 },
  { from: "CSIT Lab Entrance", to: "CSIT Lab 5", direction: 
    "1. From Lab Entrance, walk to Lab Exit.\n" +
    "2. Enter CSIT Lab 5.", 
    steps: 15 },

  { from: "CSIT Project Lab", to: "CSIT Lab Exit", direction: 
    "1. Exit CSIT Project Lab through its main door and turn left.\n" +
    "2. Walk straight and take a left and go downstairs.\n" +
    "3. Turn left and walk until you reach the end of the corridor.",
    steps: 10 },
  { from: "CSIT Lab Exit", to: "CSIT Project Lab", direction: 
    "1. From Lab Exit, walk straight.\n" +
    "2. Enter CSIT Project Lab.", 
    steps: 10 },
  { from: "CSIT Project Lab", to: "CSIT Lab Entrance", direction: 
    "1. Exit CSIT Project Lab through its main door and turn left.\n" +
    "2. Walk straight and take a left and go downstairs.\n" +
    "3. Turn right and walk till the end of the corridor until you reach the ramp.",
    steps: 15 },
  { from: "CSIT Lab Entrance", to: "CSIT Project Lab", direction: 
    "1. From Lab Entrance, walk to Lab Exit.\n" +
    "2. Enter CSIT Project Lab.", 
    steps: 15 },

  // Entrances/Exits to other sections (Cross-Campus)
  { from: "CSIT Exit", to: "CSIT Lab Exit", direction: 
    "1. From CSIT Exit, walk straight.\n" +
    "2. Take a right through the passageway.\n" +
    "3. Take another right up the ramp.\n" +
    "4. You will reach CSIT Lab Exit.", 
    steps: 20 },
  { from: "CSIT Lab Exit", to: "CSIT Exit", direction: 
    "1. From Lab Exit, go down the ramp.\n" +
    "2. Take a left through the passageway.\n" +
    "3. Take another left.\n" +
    "4. You will reach CSIT Exit.", 
    steps: 20 },
  { from: "CSIT Exit", to: "CSIT Lab Entrance", direction: 
    "1. From CSIT Exit, walk straight.\n" +
    "2. Take a right through the passageway.\n" +
    "3. Take another right up the ramp.\n" +
    "4. Continue to Lab Entrance.", 
    steps: 25 },
  { from: "CSIT Lab Entrance", to: "CSIT Exit", direction: 
    "1. From Lab Entrance, walk to Lab Exit.\n" +
    "2. Go down the ramp.\n" +
    "3. Take a left through the passageway.\n" +
    "4. Take another left to reach CSIT Exit.", 
    steps: 25 },
  { from: "CSIT Room 2", to: "CSIT Lab 2", direction: 
    "1. Exit Room 2 through its first door.\n" +
    "2. Turn right and walk straight through the main corridor.\n" +
    "3. Take a right through the passageway.\n" +
    "4. Take another right up the ramp.\n" +
    "5. Walk straight and the third door on your left is CSIT Lab 2.", 
    steps: 25 },
  { from: "CSIT Lab 2", to: "CSIT Room 2", direction: 
    "1. Exit CSIT Lab 2 through the main door.\n" +
    "2. Turn right and walk straight till you reach the ramp.\n" +
    "3. Walk down the ramp and take a left through the passageway.\n" +
    "4. Walk straight then take another left to reach the main corridor.\n" +
    "5. The third door on your left leads to CSIT Room 2.",
    steps: 25 },
  { from: "CSIT Room 2", to: "CSIT Lab 3", direction: 
    "1. Exit Room 2 through its first door.\n" +
    "2. Turn right and walk straight through the main corridor.\n" +
    "3. Take a right through the passageway.\n" +
    "4. Take another right up the ramp.\n" +
    "5. Walk straight until you reach stairs on your left.\n" +
    "6. Walk up the stairs to first floor then turn right into the corridor.\n" +
    "7. Walk straight and the first door on your right is CSIT Lab 3.", 
    steps: 30 },
  { from: "CSIT Lab 3", to: "CSIT Room 2", direction: 
    "1. Exit CSIT Lab 3 through its main door and turn left.\n" +
    "2. Turn left and go downstairs.\n" +
    "3. Turn right and walk till the end of the corridor until you reach the ramp.\n" +
    "4. Walk down the ramp and take a left through the passageway.\n" +
    "5. Walk straight then take another left to reach the main corridor.\n" +
    "6. The third door on your left leads to CSIT Room 2.", 
    steps: 30 },
  { from: "CSIT Room 2", to: "CSIT Lab 4", direction: 
    "1. Exit Room 2 through its first door.\n" +
    "2. Turn right and walk straight through the main corridor.\n" +
    "3. Take a right through the passageway.\n" +
    "4. Take another right up the ramp.\n" +
    "5. Walk straight until you reach stairs on your left.\n" +
    "6. Walk up the stairs to first floor then turn right into the corridor.\n" +
    "7. Walk straight and the third door on your right is CSIT Lab 4.", 
    steps: 35 },
  { from: "CSIT Lab 4", to: "CSIT Room 2", direction: 
    "1. Exit the lab through its main door and turn left.\n" +
    "2. Walk straight and take a left to go downstairs.\n" +
    "3. Turn right and walk till the end of the corridor until you reach the ramp.\n" +
    "4. Walk down the ramp and take a left through the passageway.\n" +
    "5. Walk straight then take another left to reach the main corridor.\n" +
    "6. The third door on your left leads to CSIT Room 2.", 
    steps: 35 },
  { from: "CSIT Room 2", to: "CSIT Lab 5", direction: 
    "1. Exit Room 2 through its first door.\n" +
    "2. Turn right and walk straight through the main corridor.\n" +
    "3. Take a right through the passageway.\n" +
    "4. Take another right up the ramp.\n" +
    "5. Walk straight until you reach stairs on your left.\n" +
    "6. Walk up the stairs to first floor then turn right into the corridor.\n" +
    "7. Walk straight and the sixth door on your right is CSIT Lab 5.", 
    steps: 40 },
  { from: "CSIT Lab 5", to: "CSIT Room 2", direction: 
    "1. Exit the lab through its main door and turn left.\n" +
    "2. Walk straight and take a left to go downstairs.\n" +
    "3. Turn right and walk till the end of the corridor until you reach the ramp.\n" +
    "4. Walk down the ramp and take a left through the passageway.\n" +
    "5. Walk straight then take another left to reach the main corridor.\n" +
    "6. The third door on your left leads to CSIT Room 2.", 
    steps: 40 },
  { from: "CSIT Room 2", to: "CSIT Project Lab", direction: 
    "1. Exit Room 2 through its first door.\n" +
    "2. Turn right and walk straight through the main corridor.\n" +
    "3. Take a right through the passageway.\n" +
    "4. Take another right up the ramp.\n" +
    "5. Walk straight until you reach stairs on your left.\n" +
    "6. Walk up the stairs to first floor then turn right into the corridor.\n" +
    "7. Walk straight and the fifth door on your right is CSIT Project Lab.", 
    steps: 45 },
  { from: "CSIT Project Lab", to: "CSIT Room 2", direction: 
    "1. Exit the lab through its main door and turn left.\n" +
    "2. Walk straight and take a left to go downstairs.\n" +
    "3. Turn right and walk till the end of the corridor until you reach the ramp.\n" +
    "4. Walk down the ramp and take a left through the passageway.\n" +
    "5. Walk straight then take another left to reach the main corridor.\n" +
    "6. The third door on your left leads to CSIT Room 2.", 
    steps: 45 },
  { from: "CSIT Room 3", to: "CSIT Lab 2", direction: 
    "1. Exit Room 3 through its first door.\n" +
    "2. Turn right and walk straight through the main corridor.\n" +
    "3. Take a right through the passageway.\n" +
    "4. Take another right up the ramp.\n" +
    "5. Walk straight and the third door on your left is CSIT Lab 2.", 
    steps: 30 },
  { from: "CSIT Lab 2", to: "CSIT Room 3", direction: 
    "1. Exit CSIT Lab 2 through the main door.\n" +
    "2. Turn right and walk straight till you reach the ramp.\n" +
    "3. Walk down the ramp and take a left through the passageway.\n" +
    "4. Walk straight then take another left to reach the main corridor.\n" +
    "5. The fifth door on your left leads to CSIT Room 3.", 
    steps: 30 },
  { from: "CSIT Room 3", to: "CSIT Lab 3", direction: 
    "1. Exit Room 3 through its first door.\n" +
    "2. Turn right and walk straight through the main corridor.\n" +
    "3. Take a right through the passageway.\n" +
    "4. Take another right up the ramp.\n" +
    "5. Follow the path to CSIT Lab 3.", 
    steps: 35 },
  { from: "CSIT Lab 3", to: "CSIT Room 3", direction: 
    "1. Exit CSIT Lab 3 through its main door and turn left.\n" +
    "2. Turn left and go downstairs.\n" +
    "3. Turn right and walk till the end of the corridor until you reach the ramp.\n" +
    "4. Walk down the ramp and take a left through the passageway.\n" +
    "5. Walk straight then take another left to reach the main corridor.\n" +
    "6. The fifth door on your left leads to CSIT Room 3.",  
    steps: 35 },
  { from: "CSIT Room 3", to: "CSIT Lab 4", direction: 
    "1. Exit CSIT Room 3, turn right.\n" +
    "2. Walk straight and exit through the main corridor.\n" +
    "3. Take a right through the passageway.\n" +
    "4. Take another right up the ramp.\n" +
    "5. Walk straight until you reach stairs on your left.\n" +
    "6. Walk up the stairs to first floor then turn right into the corridor.\n" +
    "7. Walk straight and the third door on your right is CSIT Lab 4.", 
    steps: 40 },
  { from: "CSIT Lab 4", to: "CSIT Room 3", direction: 
    "1. Exit the lab through its main door and turn left.\n" +
    "2. Walk straight and take a left to go downstairs.\n" +
    "3. Turn right and walk till the end of the corridor until you reach the ramp.\n" +
    "4. Walk down the ramp and take a left through the passageway.\n" +
    "5. Walk straight then take another left to reach the main corridor.\n" +
    "6. The fifth door on your left leads to CSIT Room 3.", 
    steps: 40 },
  { from: "CSIT Room 3", to: "CSIT Lab 5", direction: 
    "1. Exit CSIT Room 3, turn right.\n" +
    "2. Walk straight and exit through the main corridor.\n" +
    "3. Take a right through the passageway.\n" +
    "4. Take another right up the ramp.\n" +
    "5. Walk straight until you reach stairs on your left.\n" +
    "6. Walk up the stairs to first floor then turn right into the corridor.\n" +
    "7. Walk straight and the sixth door on your right is CSIT Lab 5.", 
    steps: 45 },
  { from: "CSIT Lab 5", to: "CSIT Room 3", direction: 
    "1. Exit the lab through its main door and turn left.\n" +
    "2. Walk straight and take a left to go downstairs.\n" +
    "3. Turn right and walk till the end of the corridor until you reach the ramp.\n" +
    "4. Walk down the ramp and take a left through the passageway.\n" +
    "5. Walk straight then take another left to reach the main corridor.\n" +
    "6. The fifth door on your left leads to CSIT Room 3.", 
    steps: 45 },
  { from: "CSIT Room 3", to: "CSIT Project Lab", direction: 
    "1. Exit CSIT Room 3, turn right.\n" +
    "2. Walk straight and exit through the main corridor.\n" +
    "3. Take a right through the passageway.\n" +
    "4. Take another right up the ramp.\n" +
    "5. Walk straight until you reach stairs on your left.\n" +
    "6. Walk up the stairs to first floor then turn right into the corridor.\n" +
    "7. Walk straight and the fifth door on your right is CSIT Project Lab.", 
    steps: 50 },
  { from: "CSIT Project Lab", to: "CSIT Room 3", direction: 
    "1. Exit the lab through its main door and turn left.\n" +
    "2. Walk straight and take a left to go downstairs.\n" +
    "3. Turn right and walk till the end of the corridor until you reach the ramp.\n" +
    "4. Walk down the ramp and take a left through the passageway.\n" +
    "5. Walk straight then take another left to reach the main corridor.\n" +
    "6. The fifth door on your left leads to CSIT Room 3.",  
    steps: 50 },
  { from: "CSIT Room 4", to: "CSIT Lab 2", direction: 
    "1. Exit Room 4 through its first door.\n" +
    "2. Turn right and walk straight through the main corridor.\n" +
    "3. Take a right through the passageway.\n" +
    "4. Take another right up the ramp.\n" +
    "5. Walk straight and the third door on your left is CSIT Lab 2.", 
    steps: 35 },
  { from: "CSIT Lab 2", to: "CSIT Room 4", direction: 
    "1. Exit CSIT Lab 2 through the main door.\n" +
    "2. Turn right and walk straight till you reach the ramp.\n" +
    "3. Walk down the ramp and take a left through the passageway.\n" +
    "4. Walk straight then take another left to reach the main corridor.\n" +
    "5. The seventh door on your left leads to CSIT Room 4.",  
    steps: 35 },
  { from: "CSIT Room 4", to: "CSIT Lab 3", direction: 
    "1. Exit Room 4 through its first door.\n" +
    "2. Turn right and walk straight through the main corridor.\n" +
    "3. Take a right through the passageway.\n" +
    "4. Take another right up the ramp.\n" +
    "5. Follow the path to CSIT Lab 3.", 
    steps: 40 },
  { from: "CSIT Lab 3", to: "CSIT Room 4", direction: 
    "1. Exit CSIT Lab 3 through its main door and turn left.\n" +
    "2. Turn left and go downstairs.\n" +
    "3. Turn right and walk till the end of the corridor until you reach the ramp.\n" +
    "4. Walk down the ramp and take a left through the passageway.\n" +
    "5. Walk straight then take another left to reach the main corridor.\n" +
    "6. The seventh door on your left leads to CSIT Room 4.",
    steps: 40 },
  { from: "CSIT Room 4", to: "CSIT Lab 4", direction: 
    "1. Exit CSIT Room 4, turn right.\n" +
    "2. Walk straight and exit through the main corridor.\n" +
    "3. Take a right through the passageway.\n" +
    "4. Take another right up the ramp.\n" +
    "5. Walk straight until you reach stairs on your left.\n" +
    "6. Walk up the stairs to first floor then turn right into the corridor.\n" +
    "7. Walk straight and the third door on your right is CSIT Lab 4.",
    steps: 45 },
  { from: "CSIT Lab 4", to: "CSIT Room 4", direction: 
    "1. Exit the lab through its main door and turn left.\n" +
    "2. Walk straight and take a left to go downstairs.\n" +
    "3. Turn right and walk till the end of the corridor until you reach the ramp.\n" +
    "4. Walk down the ramp and take a left through the passageway.\n" +
    "5. Walk straight then take another left to reach the main corridor.\n" +
    "6. The seventh door on your left leads to CSIT Room 4.",  
    steps: 45 },
  { from: "CSIT Room 4", to: "CSIT Lab 5", direction: 
    "1. Exit CSIT Room 4, turn right.\n" +
    "2. Walk straight and exit through the main corridor.\n" +
    "3. Take a right through the passageway.\n" +
    "4. Take another right up the ramp.\n" +
    "5. Walk straight until you reach stairs on your left.\n" +
    "6. Walk up the stairs to first floor then turn right into the corridor.\n" +
    "7. Walk straight and the sixth door on your right is CSIT Lab 5.", 
    steps: 50 },
  { from: "CSIT Lab 5", to: "CSIT Room 4", direction: 
    "1. Exit the lab through its main door and turn left.\n" +
    "2. Walk straight and take a left to go downstairs.\n" +
    "3. Turn right and walk till the end of the corridor until you reach the ramp.\n" +
    "4. Walk down the ramp and take a left through the passageway.\n" +
    "5. Walk straight then take another left to reach the main corridor.\n" +
    "6. The seventh door on your left leads to CSIT Room 4.",  
    steps: 50 },
  { from: "CSIT Room 4", to: "CSIT Project Lab", direction: 
    "1. Exit CSIT Room 4, turn right.\n" +
    "2. Walk straight and exit through the main corridor.\n" +
    "3. Take a right through the passageway.\n" +
    "4. Take another right up the ramp.\n" +
    "5. Walk straight until you reach stairs on your left.\n" +
    "6. Walk up the stairs to first floor then turn right into the corridor.\n" +
    "7. Walk straight and the fifth door on your right is CSIT Project Lab.", 
    steps: 55 },
  { from: "CSIT Project Lab", to: "CSIT Room 4", direction: 
    "1. Exit the lab through its main door and turn left.\n" +
    "2. Walk straight and take a left to go downstairs.\n" +
    "3. Turn right and walk till the end of the corridor until you reach the ramp.\n" +
    "4. Walk down the ramp and take a left through the passageway.\n" +
    "5. Walk straight then take another left to reach the main corridor.\n" +
    "6. The seventh door on your left leads to CSIT Room 4.",   
    steps: 55 },
  { from: "CSIT Room 5", to: "CSIT Lab 2", direction: 
    "1. Exit CSIT Room 5 through either door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Find the stairs on your left.\n" +
    "4. Walk down the stairs to ground floor then turn right into the corridor.\n" +
    "5. Walk straight and exit through the main corridor.\n" +
    "6. Take a right through the passageway.\n"+
    "7. Take another right up the ramp.\n"+
    "8. Walk straight and the third door on your left is CSIT Lab 2.", 
    steps: 40 },
  { from: "CSIT Lab 2", to: "CSIT Room 5", direction: 
    "1. Exit CSIT Lab 2 through the main door.\n" +
    "2. Turn right and walk straight till you reach the ramp.\n" +
    "3. Walk down the ramp and take a left through the passageway.\n" +
    "4. Walk straight then take another left to reach the main corridor.\n" +
    "5. Walk till the end of the main corridor until you reach the stairs on your left.\n"+
    "6. Go up the stairs and turn right.\n"+
    "7. The first door on your right leads to CSIT Room 5.",   
    steps: 40 },
  { from: "CSIT Room 5", to: "CSIT Lab 3", direction: 
    "1. Exit CSIT Room 5 through either door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Find the stairs on your left.\n" +
    "4. Wal down the stairs to ground floor then turn right into the corridor.\n" +
    "5. Walk straight and exit through the main corridor.\n" +
    "6. Take a right through the passageway.\n"+
    "7. Take another right up the ramp.\n"+
    "8. Walk straight until you reach the stairs on your left.\n" +
    "9. Walk up the stairs to first floor. Then turn right to the corridor.\n"+
    "10. Walk straight and the first door on your right is CSIT Lab 3.",
    steps: 45 },
  { from: "CSIT Lab 3", to: "CSIT Room 5", direction: 
    "1. Exit CSIT Lab 3 through its main door and turn left.\n" +
    "2. Turn left and go downstairs.\n" +
    "3. Turn right and walk till the end of the corridor until you reach the ramp.\n" +
    "4. Walk down the ramp and take a left through the passageway.\n" +
    "5. Walk straight then take another left to reach the main corridor.\n" +
    "6. Walk till the end of the main corridor until you reach the stairs on your left.\n"+
    "7. Go up the stairs and turn right.\n"+
    "8. The first door on your right leads to CSIT Room 5.",
    steps: 45 },
  { from: "CSIT Room 5", to: "CSIT Lab 4", direction: 
    "1. Exit CSIT Room 5 through either door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Find the stairs on your left.\n" +
    "4. Wal down the stairs to ground floor then turn right into the corridor.\n" +
    "5. Walk straight and exit through the main corridor.\n" +
    "6. Take a right through the passageway.\n"+
    "7. Take another right up the ramp.\n"+
    "8. Walk straight until you reach the stairs on your left.\n" +
    "9. Walk up the stairs to first floor. Then turn right to the corridor.\n"+
    "10. Walk straight and the third door on your right is CSIT Lab 4.",
    steps: 50 },
    { from: "CSIT Lab 4", to: "CSIT Room 5", direction: 
      "1. Exit the lab through its main door and turn left.\n" +
      "2. Walk straight and take a left to go downstairs.\n" +
      "3. Turn right and walk till the end of the corridor until you reach the ramp.\n" +
      "4. Walk down the ramp and take a left through the passageway.\n" +
      "5. Walk straight then take another left to reach the main corridor.\n" +
      "6. Walk till the end of the main corridor until you reach the stairs on your left.\n"+
      "7. Go up the stairs and turn right.\n"+
      "8. The first door on your right leads to CSIT Room 5.",
      steps:45},
  { from: "CSIT Room 5", to: "CSIT Lab 5", direction: 
    "1. Exit CSIT Room 5 through either door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Find the stairs on your left.\n" +
    "4. Wal down the stairs to ground floor then turn right into the corridor.\n" +
    "5. Walk straight and exit through the main corridor.\n" +
    "6. Take a right through the passageway.\n"+
    "7. Take another right up the ramp.\n"+
    "8. Walk straight until you reach the stairs on your left.\n" +
    "9. Walk up the stairs to first floor. Then turn right to the corridor.\n"+
    "10. Walk straight and the sixth door on your right is CSIT Lab 5.", 
    steps: 55 },
  { from: "CSIT Lab 5", to: "CSIT Room 5", direction: 
    "1. Exit the lab through its main door and turn left.\n" +
      "2. Walk straight and take a left to go downstairs.\n" +
      "3. Turn right and walk till the end of the corridor until you reach the ramp.\n" +
      "4. Walk down the ramp and take a left through the passageway.\n" +
      "5. Walk straight then take another left to reach the main corridor.\n" +
      "6. Walk till the end of the main corridor until you reach the stairs on your left.\n"+
      "7. Go up the stairs and turn right.\n"+
      "8. The first door on your right leads to CSIT Room 5.",
    steps: 55 },
  { from: "CSIT Room 5", to: "CSIT Project Lab", direction: 
    "1. Exit CSIT Room 5 through either door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Find the stairs on your left.\n" +
    "4. Wal down the stairs to ground floor then turn right into the corridor.\n" +
    "5. Walk straight and exit through the main corridor.\n" +
    "6. Take a right through the passageway.\n"+
    "7. Take another right up the ramp.\n"+
    "8. Walk straight until you reach the stairs on your left.\n" +
    "9. Walk up the stairs to first floor. Then turn right to the corridor.\n"+
    "10. Walk straight and the fifth door on your right is CSIT Project Lab.",
    steps: 60 },
  { from: "CSIT Project Lab", to: "CSIT Room 5", direction: 
    "1. Exit the lab through its main door and turn left.\n" +
      "2. Walk straight and take a left to go downstairs.\n" +
      "3. Turn right and walk till the end of the corridor until you reach the ramp.\n" +
      "4. Walk down the ramp and take a left through the passageway.\n" +
      "5. Walk straight then take another left to reach the main corridor.\n" +
      "6. Walk till the end of the main corridor until you reach the stairs on your left.\n"+
      "7. Go up the stairs and turn right.\n"+
      "8. The first door on your right leads to CSIT Room 5.",
    steps: 60 },
  { from: "CSIT Room 6", to: "CSIT Lab 2", direction: 
    "1. Exit CSIT Room 6 through either door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Find the stairs on your left.\n" +
    "4. Walk down the stairs to ground floor then turn right into the corridor.\n" +
    "5. Walk straight and exit through the main corridor.\n" +
    "6. Take a right through the passageway.\n"+
    "7. Take another right up the ramp.\n"+
    "8. Walk straight and the third door on your left is CSIT Lab 2.", 
    steps: 45 },
  { from: "CSIT Lab 2", to: "CSIT Room 6", direction: 
    "1. Exit CSIT Lab 2 through the main door.\n" +
    "2. Turn right and walk straight till you reach the ramp.\n" +
    "3. Walk down the ramp and take a left through the passageway.\n" +
    "4. Walk straight then take another left to reach the main corridor.\n" +
    "5. Walk till the end of the main corridor until you reach the stairs on your left.\n"+
    "6. Go up the stairs and turn right.\n"+
    "7. The third door on your right leads to CSIT Room 6.",
    steps: 45 },
  { from: "CSIT Room 6", to: "CSIT Lab 3", direction: 
    "1. Exit CSIT Room 6 through either door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Find the stairs on your left.\n" +
    "4. Wal down the stairs to ground floor then turn right into the corridor.\n" +
    "5. Walk straight and exit through the main corridor.\n" +
    "6. Take a right through the passageway.\n"+
    "7. Take another right up the ramp.\n"+
    "8. Walk straight until you reach the stairs on your left.\n" +
    "9. Walk up the stairs to first floor. Then turn right to the corridor.\n"+
    "10. Walk straight and the first door on your right is CSIT Lab 3.",
    steps: 50 },
  { from: "CSIT Lab 3", to: "CSIT Room 6", direction: 
    "1. Exit CSIT Lab 3 through its main door and turn left.\n" +
    "2. Turn left and go downstairs.\n" +
    "3. Turn right and walk till the end of the corridor until you reach the ramp.\n" +
    "4. Walk down the ramp and take a left through the passageway.\n" +
    "5. Walk straight then take another left to reach the main corridor.\n" +
    "6. Walk till the end of the main corridor until you reach the stairs on your left.\n"+
    "7. Go up the stairs and turn right.\n"+
    "8. The third door on your right leads to CSIT Room 6.", 
    steps: 50 },
  { from: "CSIT Room 6", to: "CSIT Lab 4", direction: 
    "1. Exit CSIT Room 6 through either door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Find the stairs on your left.\n" +
    "4. Wal down the stairs to ground floor then turn right into the corridor.\n" +
    "5. Walk straight and exit through the main corridor.\n" +
    "6. Take a right through the passageway.\n"+
    "7. Take another right up the ramp.\n"+
    "8. Walk straight until you reach the stairs on your left.\n" +
    "9. Walk up the stairs to first floor. Then turn right to the corridor.\n"+
    "10. Walk straight and the third door on your right is CSIT Lab 4.",
    steps: 55 },
  { from: "CSIT Lab 4", to: "CSIT Room 6", direction: 
    "1. Exit the lab through its main door and turn left.\n" +
      "2. Walk straight and take a left to go downstairs.\n" +
      "3. Turn right and walk till the end of the corridor until you reach the ramp.\n" +
      "4. Walk down the ramp and take a left through the passageway.\n" +
      "5. Walk straight then take another left to reach the main corridor.\n" +
      "6. Walk till the end of the main corridor until you reach the stairs on your left.\n"+
      "7. Go up the stairs and turn right.\n"+
      "8. The third door on your right leads to CSIT Room 6.",
    steps: 55 },
  { from: "CSIT Room 6", to: "CSIT Lab 5", direction: 
    "1. Exit CSIT Room 6 through either door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Find the stairs on your left.\n" +
    "4. Wal down the stairs to ground floor then turn right into the corridor.\n" +
    "5. Walk straight and exit through the main corridor.\n" +
    "6. Take a right through the passageway.\n"+
    "7. Take another right up the ramp.\n"+
    "8. Walk straight until you reach the stairs on your left.\n" +
    "9. Walk up the stairs to first floor. Then turn right to the corridor.\n"+
    "10. Walk straight and the sixth door on your right is CSIT Lab 5.", 
    steps: 60 },
  { from: "CSIT Lab 5", to: "CSIT Room 6", direction: 
    "1. Exit the lab through its main door and turn left.\n" +
      "2. Walk straight and take a left to go downstairs.\n" +
      "3. Turn right and walk till the end of the corridor until you reach the ramp.\n" +
      "4. Walk down the ramp and take a left through the passageway.\n" +
      "5. Walk straight then take another left to reach the main corridor.\n" +
      "6. Walk till the end of the main corridor until you reach the stairs on your left.\n"+
      "7. Go up the stairs and turn right.\n"+
      "8. The third door on your right leads to CSIT Room 6.",
    steps: 60 },
  { from: "CSIT Room 6", to: "CSIT Project Lab", direction: 
    "1. Exit CSIT Room 6 through either door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Find the stairs on your left.\n" +
    "4. Wal down the stairs to ground floor then turn right into the corridor.\n" +
    "5. Walk straight and exit through the main corridor.\n" +
    "6. Take a right through the passageway.\n"+
    "7. Take another right up the ramp.\n"+
    "8. Walk straight until you reach the stairs on your left.\n" +
    "9. Walk up the stairs to first floor. Then turn right to the corridor.\n"+
    "10. Walk straight and the fifth door on your right is CSIT Project Lab.",
    steps: 65 },
  { from: "CSIT Project Lab", to: "CSIT Room 6", direction: 
    "1. Exit the lab through its main door and turn left.\n" +
      "2. Walk straight and take a left to go downstairs.\n" +
      "3. Turn right and walk till the end of the corridor until you reach the ramp.\n" +
      "4. Walk down the ramp and take a left through the passageway.\n" +
      "5. Walk straight then take another left to reach the main corridor.\n" +
      "6. Walk till the end of the main corridor until you reach the stairs on your left.\n"+
      "7. Go up the stairs and turn right.\n"+
      "8. The third door on your right leads to CSIT Room 6.",
    steps: 65 },
  { from: "CSIT Room 7", to: "CSIT Lab 2", direction: 
    "1. Exit CSIT Room 7 through either door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Find the stairs on your left.\n" +
    "4. Walk down the stairs to ground floor then turn right into the corridor.\n" +
    "5. Walk straight and exit through the main corridor.\n" +
    "6. Take a right through the passageway.\n"+
    "7. Take another right up the ramp.\n"+
    "8. Walk straight and the third door on your left is CSIT Lab 2.",
    steps: 50 },
  { from: "CSIT Lab 2", to: "CSIT Room 7", direction: 
    "1. Exit CSIT Lab 2 through the main door.\n" +
    "2. Turn right and walk straight till you reach the ramp.\n" +
    "3. Walk down the ramp and take a left through the passageway.\n" +
    "4. Walk straight then take another left to reach the main corridor.\n" +
    "5. Walk till the end of the main corridor until you reach the stairs on your left.\n"+
    "6. Go up the stairs and turn right.\n"+
    "7. The fifth door on your right leads to CSIT Room 7.",
    steps: 50 },
  { from: "CSIT Room 7", to: "CSIT Lab 3", direction: 
    "1. Exit CSIT Room 7 through either door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Find the stairs on your left.\n" +
    "4. Wal down the stairs to ground floor then turn right into the corridor.\n" +
    "5. Walk straight and exit through the main corridor.\n" +
    "6. Take a right through the passageway.\n"+
    "7. Take another right up the ramp.\n"+
    "8. Walk straight until you reach the stairs on your left.\n" +
    "9. Walk up the stairs to first floor. Then turn right to the corridor.\n"+
    "10. Walk straight and the first door on your right is CSIT Lab 3.",
    steps: 55 },
  { from: "CSIT Lab 3", to: "CSIT Room 7", direction: 
    "1. Exit CSIT Lab 3 through its main door and turn left.\n" +
    "2. Turn left and go downstairs.\n" +
    "3. Turn right and walk till the end of the corridor until you reach the ramp.\n" +
    "4. Walk down the ramp and take a left through the passageway.\n" +
    "5. Walk straight then take another left to reach the main corridor.\n" +
    "6. Walk till the end of the main corridor until you reach the stairs on your left.\n"+
    "7. Go up the stairs and turn right.\n"+
    "8. The fifth door on your right leads to CSIT Room 7.", 
    steps: 55 },
  { from: "CSIT Room 7", to: "CSIT Lab 4", direction: 
    "1. Exit CSIT Room 7 through either door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Find the stairs on your left.\n" +
    "4. Wal down the stairs to ground floor then turn right into the corridor.\n" +
    "5. Walk straight and exit through the main corridor.\n" +
    "6. Take a right through the passageway.\n"+
    "7. Take another right up the ramp.\n"+
    "8. Walk straight until you reach the stairs on your left.\n" +
    "9. Walk up the stairs to first floor. Then turn right to the corridor.\n"+
    "10. Walk straight and the third door on your right is CSIT Lab 4.",
    steps: 60 },
  { from: "CSIT Lab 4", to: "CSIT Room 7", direction: 
    "1. Exit the lab through its main door and turn left.\n" +
      "2. Walk straight and take a left to go downstairs.\n" +
      "3. Turn right and walk till the end of the corridor until you reach the ramp.\n" +
      "4. Walk down the ramp and take a left through the passageway.\n" +
      "5. Walk straight then take another left to reach the main corridor.\n" +
      "6. Walk till the end of the main corridor until you reach the stairs on your left.\n"+
      "7. Go up the stairs and turn right.\n"+
      "8. The fifth door on your right leads to CSIT Room 7.",
    steps: 60 },
  { from: "CSIT Room 7", to: "CSIT Lab 5", direction: 
    "1. Exit CSIT Room 7 through either door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Find the stairs on your left.\n" +
    "4. Wal down the stairs to ground floor then turn right into the corridor.\n" +
    "5. Walk straight and exit through the main corridor.\n" +
    "6. Take a right through the passageway.\n"+
    "7. Take another right up the ramp.\n"+
    "8. Walk straight until you reach the stairs on your left.\n" +
    "9. Walk up the stairs to first floor. Then turn right to the corridor.\n"+
    "10. Walk straight and the sixth door on your right is CSIT Lab 5.", 
    steps: 65 },
  { from: "CSIT Lab 5", to: "CSIT Room 7", direction: 
    "1. Exit the lab through its main door and turn left.\n" +
      "2. Walk straight and take a left to go downstairs.\n" +
      "3. Turn right and walk till the end of the corridor until you reach the ramp.\n" +
      "4. Walk down the ramp and take a left through the passageway.\n" +
      "5. Walk straight then take another left to reach the main corridor.\n" +
      "6. Walk till the end of the main corridor until you reach the stairs on your left.\n"+
      "7. Go up the stairs and turn right.\n"+
      "8. The fifth door on your right leads to CSIT Room 7.",
    steps: 65 },
  { from: "CSIT Room 7", to: "CSIT Project Lab", direction: 
    "1. Exit CSIT Room 7 through either door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Find the stairs on your left.\n" +
    "4. Wal down the stairs to ground floor then turn right into the corridor.\n" +
    "5. Walk straight and exit through the main corridor.\n" +
    "6. Take a right through the passageway.\n"+
    "7. Take another right up the ramp.\n"+
    "8. Walk straight until you reach the stairs on your left.\n" +
    "9. Walk up the stairs to first floor. Then turn right to the corridor.\n"+
    "10. Walk straight and the fifth door on your right is CSIT Project Lab.",
    steps: 70 },
  { from: "CSIT Project Lab", to: "CSIT Room 7", direction: 
    "1. Exit the lab through its main door and turn left.\n" +
      "2. Walk straight and take a left to go downstairs.\n" +
      "3. Turn right and walk till the end of the corridor until you reach the ramp.\n" +
      "4. Walk down the ramp and take a left through the passageway.\n" +
      "5. Walk straight then take another left to reach the main corridor.\n" +
      "6. Walk till the end of the main corridor until you reach the stairs on your left.\n"+
      "7. Go up the stairs and turn right.\n"+
      "8. The fifth door on your right leads to CSIT Room 7.",
    steps: 70 },
  { from: "CSIT Room 8", to: "CSIT Lab 2", direction: 
    "1. Exit CSIT Room 8 through either door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Find the stairs on your left.\n" +
    "4. Walk down the stairs to ground floor then turn right into the corridor.\n" +
    "5. Walk straight and exit through the main corridor.\n" +
    "6. Take a right through the passageway.\n"+
    "7. Take another right up the ramp.\n"+
    "8. Walk straight and the third door on your left is CSIT Lab 2.",
    steps: 55 },
  { from: "CSIT Lab 2", to: "CSIT Room 8", direction: 
   "1. Exit CSIT Lab 2 through the main door.\n" +
    "2. Turn right and walk straight till you reach the ramp.\n" +
    "3. Walk down the ramp and take a left through the passageway.\n" +
    "4. Walk straight then take another left to reach the main corridor.\n" +
    "5. Walk till the end of the main corridor until you reach the stairs on your left.\n"+
    "6. Go up the stairs and turn right.\n"+
    "7. The seventh door on your right leads to CSIT Room 8.",
    steps: 55 },
  { from: "CSIT Room 8", to: "CSIT Lab 3", direction: 
    "1. Exit CSIT Room 8 through either door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Find the stairs on your left.\n" +
    "4. Walk down the stairs to ground floor then turn right into the corridor.\n" +
    "5. Walk straight and exit through the main corridor.\n" +
    "6. Take a right through the passageway.\n"+
    "7. Take another right up the ramp.\n"+
    "8. Walk straight until you reach the stairs on your left.\n" +
    "9. Walk up the stairs to first floor. Then turn right to the corridor.\n"+
    "10. Walk straight and the first door on your right is CSIT Lab 3.",
    steps: 60 },
  { from: "CSIT Lab 3", to: "CSIT Room 8", direction: 
    "1. Exit CSIT Lab 3 through its main door and turn left.\n" +
    "2. Turn left and go downstairs.\n" +
    "3. Turn right and walk till the end of the corridor until you reach the ramp.\n" +
    "4. Walk down the ramp and take a left through the passageway.\n" +
    "5. Walk straight then take another left to reach the main corridor.\n" +
    "6. Walk till the end of the main corridor until you reach the stairs on your left.\n"+
    "7. Go up the stairs and turn right.\n"+
    "8. The seventh door on your right leads to CSIT Room 8.", 
    steps: 60 },
  { from: "CSIT Room 8", to: "CSIT Lab 4", direction: 
    "1. Exit CSIT Room 8 through either door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Find the stairs on your left.\n" +
    "4. Wal down the stairs to ground floor then turn right into the corridor.\n" +
    "5. Walk straight and exit through the main corridor.\n" +
    "6. Take a right through the passageway.\n"+
    "7. Take another right up the ramp.\n"+
    "8. Walk straight until you reach the stairs on your left.\n" +
    "9. Walk up the stairs to first floor. Then turn right to the corridor.\n"+
    "10. Walk straight and the third door on your right is CSIT Lab 4.",
    steps: 65 },
  { from: "CSIT Lab 4", to: "CSIT Room 8", direction: 
    "1. Exit the lab through its main door and turn left.\n" +
      "2. Walk straight and take a left to go downstairs.\n" +
      "3. Turn right and walk till the end of the corridor until you reach the ramp.\n" +
      "4. Walk down the ramp and take a left through the passageway.\n" +
      "5. Walk straight then take another left to reach the main corridor.\n" +
      "6. Walk till the end of the main corridor until you reach the stairs on your left.\n"+
      "7. Go up the stairs and turn right.\n"+
      "8. The seventh door on your right leads to CSIT Room 8.",
    steps: 65 },
  { from: "CSIT Room 8", to: "CSIT Lab 5", direction: 
    "1. Exit CSIT Room 8 through either door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Find the stairs on your left.\n" +
    "4. Wal down the stairs to ground floor then turn right into the corridor.\n" +
    "5. Walk straight and exit through the main corridor.\n" +
    "6. Take a right through the passageway.\n"+
    "7. Take another right up the ramp.\n"+
    "8. Walk straight until you reach the stairs on your left.\n" +
    "9. Walk up the stairs to first floor. Then turn right to the corridor.\n"+
    "10. Walk straight and the sixth door on your right is CSIT Lab 5.", 
    steps: 70 },
  { from: "CSIT Lab 5", to: "CSIT Room 8", direction: 
   "1. Exit the lab through its main door and turn left.\n" +
      "2. Walk straight and take a left to go downstairs.\n" +
      "3. Turn right and walk till the end of the corridor until you reach the ramp.\n" +
      "4. Walk down the ramp and take a left through the passageway.\n" +
      "5. Walk straight then take another left to reach the main corridor.\n" +
      "6. Walk till the end of the main corridor until you reach the stairs on your left.\n"+
      "7. Go up the stairs and turn right.\n"+
      "8. The seventh door on your right leads to CSIT Room 8.",
    steps: 70 },
  { from: "CSIT Room 8", to: "CSIT Project Lab", direction: 
    "1. Exit CSIT Room 8 through either door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Find the stairs on your left.\n" +
    "4. Wal down the stairs to ground floor then turn right into the corridor.\n" +
    "5. Walk straight and exit through the main corridor.\n" +
    "6. Take a right through the passageway.\n"+
    "7. Take another right up the ramp.\n"+
    "8. Walk straight until you reach the stairs on your left.\n" +
    "9. Walk up the stairs to first floor. Then turn right to the corridor.\n"+
    "10. Walk straight and the fifth door on your right is CSIT Project Lab.",
    steps: 75 },
  { from: "CSIT Project Lab", to: "CSIT Room 8", direction: 
    "1. Exit the lab through its main door and turn left.\n" +
      "2. Walk straight and take a left to go downstairs.\n" +
      "3. Turn right and walk till the end of the corridor until you reach the ramp.\n" +
      "4. Walk down the ramp and take a left through the passageway.\n" +
      "5. Walk straight then take another left to reach the main corridor.\n" +
      "6. Walk till the end of the main corridor until you reach the stairs on your left.\n"+
      "7. Go up the stairs and turn right.\n"+
      "8. The seventh door on your right leads to CSIT Room 8.",
    steps: 75 },
  { from: "CSIT Room 5", to: "CSIT Lab Exit", direction: 
    "1. Exit CSIT Room 5 through either door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Find the stairs on your left.\n" +
    "4. Walk down the stairs to ground floor then turn right.\n" +
    "5. Walk straight and exit through the main corridor.\n" +
    "6. Take a right through the passageway.\n" +
    "7. Take another right up the ramp to reach CSIT Lab Exit.", 
    steps: 45 },
  { from: "CSIT Lab Exit", to: "CSIT Room 5", direction: 
    "1. From CSIT Lab Exit, walk straight.\n" +
    "2. Walk down the ramp.\n" +
    "3. Take a left through the passageway.\n" +
    "4. Take another left to reach the main corridor.\n" +
    "5. Walk straight and enter Room 5 through its first door.", 
    steps: 45 },
  { from: "CSIT Room 5", to: "CSIT Lab Entrance", direction: 
    "1. Exit CSIT Room 5 through either door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Find the stairs on your left.\n" +
    "4. Walk down the stairs to ground floor then turn right.\n" +
    "5. Walk straight and exit through the main corridor.\n" +
    "6. Take a right through the passageway.\n" +
    "7. Take another right up the ramp."+
    "8. Walk straight until you reach the CSIT Lab Entrance.",
    steps: 45 },
  { from: "CSIT Lab Entrance", to: "CSIT Room 5", direction: 
    "1. From CSIT Lab Entrance, walk straight.\n" +
    "2. Walk down the ramp.\n" +
    "3. Take a left through the passageway.\n" +
    "4. Take another left to reach the main corridor.\n" +
    "5. Walk straight and enter Room 5 through its first door.", 
    steps: 45 },
  { from: "CSIT Room 7", to: "CSIT Lab Exit", direction: 
    "1. Exit CSIT Room 7 through either door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Find the stairs on your left.\n" +
    "4. Walk down the stairs to ground floor then turn right.\n" +
    "5. Walk straight and exit through the main corridor.\n" +
    "6. Take a right through the passageway.\n" +
    "7. Take another right up the ramp to reach CSIT Lab Exit.", 
    steps: 55 },
  { from: "CSIT Lab Exit", to: "CSIT Room 7", direction: 
    "1. From CSIT Lab Exit, walk straight.\n" +
    "2. Walk down the ramp.\n" +
    "3. Take a left through the passageway.\n" +
    "4. Take another left to reach the main corridor.\n" +
    "5. Walk straight and enter Room 7 through its first door.", 
    steps: 55 },
  { from: "CSIT Room 7", to: "CSIT Lab Entrance", direction: 
    "1. Exit CSIT Room 7 through either door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Find the stairs on your left.\n" +
    "4. Walk down the stairs to ground floor then turn right.\n" +
    "5. Walk straight and exit through the main corridor.\n" +
    "6. Take a right through the passageway.\n" +
    "7. Take another right up the ramp."+
    "8. Walk straight until you reach the CSIT Lab Entrance.",
    steps: 55 },
  { from: "CSIT Lab Entrance", to: "CSIT Room 7", direction: 
    "1. From CSIT Lab Entrance, walk straight.\n" +
    "2. Walk down the ramp.\n" +
    "3. Take a left through the passageway.\n" +
    "4. Take another left to reach the main corridor.\n" +
    "5. Walk straight and enter Room 7 through its first door.", 
    steps: 55 },
  { from: "CSIT Room 8", to: "CSIT Lab Exit", direction: 
    "1. Exit CSIT Room 8 through either door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Find the stairs on your left.\n" +
    "4. Walk down the stairs to ground floor then turn right.\n" +
    "5. Walk straight and exit through the main corridor.\n" +
    "6. Take a right through the passageway.\n" +
    "7. Take another right up the ramp to reach CSIT Lab Exit.", 
    steps: 60 },
  { from: "CSIT Lab Exit", to: "CSIT Room 8", direction: 
    "1. From CSIT Lab Exit, walk straight.\n" +
    "2. Walk down the ramp.\n" +
    "3. Take a left through the passageway.\n" +
    "4. Take another left to reach the main corridor.\n" +
    "5. Walk straight and enter Room 8 through its first door.", 
    steps: 60 },
  { from: "CSIT Room 8", to: "CSIT Lab Entrance", direction: 
    "1. Exit CSIT Room 8 through either door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. Find the stairs on your left.\n" +
    "4. Walk down the stairs to ground floor then turn right.\n" +
    "5. Walk straight and exit through the main corridor.\n" +
    "6. Take a right through the passageway.\n" +
    "7. Take another right up the ramp."+
    "8. Walk straight until you reach the CSIT Lab Entrance.",
    steps: 60 },
  { from: "CSIT Lab Entrance", to: "CSIT Room 8", direction: 
    "1. From CSIT Lab Entrance, walk straight.\n" +
    "2. Walk down the ramp.\n" +
    "3. Take a left through the passageway.\n" +
    "4. Take another left to reach the main corridor.\n" +
    "5. Walk straight and enter Room 8 through its first door.", 
    steps: 60 },
  { from: "CSIT Lab 3", to: "CSIT Project Lab", direction: 
    "1. Exit Lab 3 through the main door.\n" +
    "2. Turn right and walk straight.\n" +
    "3. The fourth door on you right leads to CSIT Project Lab.", 
    steps: 45 },
  { from: "CSIT Project Lab", to: "CSIT Lab 3", direction: 
    "1. Exit Project Lab through the main door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. The fourth door on your left leads to CSIT Lab 3.",
    steps: 45 },
  { from: "CSIT Lab 4", to: "CSIT Project Lab", direction: 
    "1. Exit Lab 4 through the main door.\n" +
    "2. Turn right and walk straight.\n" +
    "3. The second door on you right leads to CSIT Project Lab.", 
    steps: 50 },
  { from: "CSIT Project Lab", to: "CSIT Lab 4", direction: 
    "1. Exit Project Lab through the main door.\n" +
    "2. Turn left and walk straight.\n" +
    "3. The second door on your left leads to CSIT Lab 4.", 
    steps: 50 },
    { from: "CSIT Entrance", to: "CSIT Lab Entrance", direction: 
      "1. Walk straight till the end of the corridor.\n" +
      "2. Take a right through the passageway.\n" +
      "3. Take the first right up the ramp and you're there!.\n"+
    "4. Walk till the end of the corridor till you reach the steps outside.",
      steps: 65 },
    { from: "CSIT Entrance", to: "CSIT Lab 2", direction: 
      "1. Walk straight till the end of the corridor.\n" +
      "2. Take a right through the passageway.\n" +
      "3. Take the first right up the ramp.\n" +
      "4. Walk straight and the third door on your left will be CSIT Lab 2", 
      steps: 65 },
      { from: "CSIT Exit", to: "CSIT Lab 2", direction: 
        "1. Take a right through the passageway.\n" +
        "2. Take the first right up the ramp.\n" +
        "3. Walk straight and the third door on your left will be CSIT Lab 2", 
        steps: 65 },
      { from: "CSIT Entrance", to: "CSIT Lab Exit", direction: 
        "1. Walk straight till the end of the corridor.\n" +
        "2. Take a right through the passageway.\n" +
        "3. Take the first right up the ramp and you're there!.\n",
        steps: 65 },
      { from: "CSIT Entrance", to: "CSIT Lab 3", direction: 
        "1. Walk straight till the end of the corridor.\n" +
        "2. Take a right through the passageway.\n" +
        "3. Take the first right up the ramp.\n" +
        "4. Walk till the end of the corridor then find the stairs on your left. \n"+
        "5. Walk upstairs then turn right, the first door on your right will be CSIT Lab 3", 
        steps: 65 },
        { from: "CSIT Exit", to: "CSIT Lab 3", direction: 
          "1. Take a right through the passageway.\n" +
          "2. Take the first right up the ramp.\n" +
          "3. Walk till the end of the corridor then find the stairs on your left. \n"+
          "4. Walk upstairs then turn right, the first door on your right will be CSIT Lab 3", 
          steps: 65 },
        { from: "CSIT Entrance", to: "CSIT Lab 4", direction: 
          "1. Walk straight till the end of the corridor.\n" +
          "2. Take a right through the passageway.\n" +
          "3. Take the first right up the ramp.\n" +
          "4. Walk till the end of the corridor then find the stairs on your left. \n"+
          "5. Walk upstairs then turn right, the third door on your right will be CSIT Lab 4", 
          steps: 65 },
          { from: "CSIT Exit", to: "CSIT Lab 4", direction: 
            "1. Take a right through the passageway.\n" +
            "2. Take the first right up the ramp.\n" +
            "3. Walk till the end of the corridor then find the stairs on your left. \n"+
            "4. Walk upstairs then turn right, the third door on your right will be CSIT Lab 4", 
            steps: 65 },
          { from: "CSIT Entrance", to: "CSIT Lab 5", direction: 
            "1. Walk straight till the end of the corridor.\n" +
            "2. Take a right through the passageway.\n" +
            "3. Take the first right up the ramp.\n" +
            "4. Walk till the end of the corridor then find the stairs on your left. \n"+
            "5. Walk upstairs then turn right, the sixth door on your right will be CSIT Lab 5", 
            steps: 65 },
            { from: "CSIT Exit", to: "CSIT Lab 5", direction: 
              "1. Take a right through the passageway.\n" +
              "2. Take the first right up the ramp.\n" +
              "3. Walk till the end of the corridor then find the stairs on your left. \n"+
              "4. Walk upstairs then turn right, the sixth door on your right will be CSIT Lab 5", 
              steps: 65 },
            { from: "CSIT Entrance", to: "CSIT Project Lab", direction: 
              "1. Walk straight till the end of the corridor.\n" +
              "2. Take a right through the passageway.\n" +
              "3. Take the first right up the ramp.\n" +
              "4. Walk till the end of the corridor then find the stairs on your left. \n"+
              "5. Walk upstairs then turn right, the fifth door on your right will be CSIT Project Lab.", 
              steps: 65 },
              { from: "CSIT Exit", to: "CSIT Project Lab", direction: 
                "1. Take a right through the passageway.\n" +
                "2. Take the first right up the ramp.\n" +
                "3. Walk till the end of the corridor then find the stairs on your left. \n"+
                "4. Walk upstairs then turn right, the fifth door on your right will be CSIT Project Lab.", 
                steps: 65 },
  { from: "CSIT Lab Entrance", to: "CSIT Entrance", direction: 
    "1. From CSIT Lab Entrance, walk straight.\n" +
    "2. Walk down the ramp.\n" +
    "3. Take a left through the passageway.\n" +
    "4. Take another left to reach the main corridor.\n" +
    "5. Continue walking through the main corridor until you reach CSIT Entrance.", 
    steps: 15 },
    { from: "CSIT Lab 2", to: "CSIT Entrance", direction: 
      "1. Exit CSIT Lab 2 through the main door.\n" +
    "2. Turn right and walk straight till you reach the ramp.\n" +
    "3. Walk down the ramp and take a left through the passageway.\n" +
    "4. Walk straight then take another left to reach the main corridor.\n" +
    "5. Walk till the end of the main corridor and you're there!",
    steps: 10 },
    { from: "CSIT Lab 2", to: "CSIT Exit", direction: 
      "1. Exit CSIT Lab 2 through the main door.\n" +
    "2. Turn right and walk straight till you reach the ramp.\n" +
    "3. Walk down the ramp and take a left through the passageway.\n" +
    "4. Walk straight then take another left to reach the main corridor.",
    steps: 10 },
    { from: "CSIT Lab 3", to: "CSIT Entrance", direction: 
    "1. Exit CSIT Lab 3 through its main door and turn left.\n" +
    "2. Walk straight and take a left to go downstairs.\n" +
    "3. Turn right and walk till the end of the corridor until you reach the ramp.\n" +
    "4. Walk down the ramp and take a left through the passageway.\n" +
    "5. Walk straight then take another left to reach the main corridor.\n" +
    "6. Walk till the end of the main corridor and you're there!",
    steps: 10 },
    { from: "CSIT Lab 4", to: "CSIT Entrance", direction: 
      "1. Exit CSIT Lab 4 through its main door and turn left.\n" +
      "2. Walk straight and take a left to go downstairs.\n" +
      "3. Turn right and walk till the end of the corridor until you reach the ramp.\n" +
      "4. Walk down the ramp and take a left through the passageway.\n" +
      "5. Walk straight then take another left to reach the main corridor.\n" +
      "6. Walk till the end of the main corridor and you're there!",
      steps: 10 },
      { from: "CSIT Project Lab", to: "CSIT Entrance", direction: 
        "1. Exit CSIT Project Lab through its main door and turn left.\n" +
        "2. Walk straight and take a left to go downstairs.\n" +
        "3. Turn right and walk till the end of the corridor until you reach the ramp.\n" +
        "4. Walk down the ramp and take a left through the passageway.\n" +
        "5. Walk straight then take another left to reach the main corridor.\n" +
        "6. Walk till the end of the main corridor and you're there!",
        steps: 10 },
      { from: "CSIT Lab 5", to: "CSIT Entrance", direction: 
        "1. Exit CSIT Lab 5 through its main door and turn left.\n" +
        "2. Walk straight and take a left to go downstairs.\n" +
        "3. Turn right and walk till the end of the corridor until you reach the ramp.\n" +
        "4. Walk down the ramp and take a left through the passageway.\n" +
        "5. Walk straight then take another left to reach the main corridor.\n" +
        "6. Walk till the end of the main corridor and you're there!",
        steps: 10 },
    { from: "CSIT Lab 3", to: "CSIT Exit", direction: 
      "1. Exit CSIT Lab 3 through its main door and turn left.\n" +
      "2. Turn left and go downstairs.\n" +
      "3. Turn right and walk till the end of the corridor until you reach the ramp.\n" +
      "4. Walk down the ramp and take a left through the passageway.\n" +
      "5. Walk straight then take another left to reach the main corridor.",
      steps: 10 },
      { from: "CSIT Lab 4", to: "CSIT Exit", direction: 
        "1. Exit CSIT Lab 4 through its main door and turn left.\n" +
        "2. Walk straight and take a left and go downstairs.\n" +
        "3. Turn right and walk till the end of the corridor until you reach the ramp.\n" +
        "4. Walk down the ramp and take a left through the passageway.\n" +
        "5. Walk straight then take another left to reach the main corridor.",
        steps: 10 },
        { from: "CSIT Lab 5", to: "CSIT Exit", direction: 
          "1. Exit CSIT Lab 5 through its main door and turn left.\n" +
          "2. Walk straight and take a left and go downstairs.\n" +
          "3. Turn right and walk till the end of the corridor until you reach the ramp.\n" +
          "4. Walk down the ramp and take a left through the passageway.\n" +
          "5. Walk straight then take another left to reach the main corridor.",
          steps: 10 },
          { from: "CSIT Project Lab", to: "CSIT Exit", direction: 
            "1. Exit CSIT Project Lab through its main door and turn left.\n" +
            "2. Walk straight and take a left and go downstairs.\n" +
            "3. Turn right and walk till the end of the corridor until you reach the ramp.\n" +
            "4. Walk down the ramp and take a left through the passageway.\n" +
            "5. Walk straight then take another left to reach the main corridor.",
            steps: 10 }
];

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
    
    // Mark current room as visited
    visited[current] = true;
    
    // Find all connected rooms
    const connectedRooms = roomConnections
      .filter(conn => conn.from === current)
      .map(conn => conn.to);
    
    // Explore connected rooms
    for (const nextRoom of connectedRooms) {
      if (!visited[nextRoom]) {
        dfs(nextRoom, [...path, current], depth + 1);
      }
    }
    
    // Backtrack
    visited[current] = false;
  };
  
  dfs(start, [], 0);
  return result;
};

/**
 * Find the shortest path between two locations
 * @param start Starting location name
 * @param end Destination location name
 * @returns Array of location names representing the shortest path
 */
const findShortestPath = (start: string, end: string): string[] => {
  const allPaths = findAllPaths(start, end);
  if (allPaths.length === 0) return [];
  
  return allPaths.reduce((shortest, current) => 
    current.length < shortest.length ? current : shortest
  );
};

/**
 * Convert a path of room names into a list of directions
 * @param path Array of room names representing a path
 * @returns Array of directions to follow
 */
const pathToDirections = (path: string[]): string[] => {
  // If path is empty or only has one location, you're already there
  if (path.length <= 1) {
    return ["You are already at your destination"];
  }
  
  const directions: string[] = [];
  
  for (let i = 0; i < path.length - 1; i++) {
    const current = path[i];
    const next = path[i + 1];
    
    const connection = roomConnections.find(
      conn => conn.from === current && conn.to === next
    );
    
    if (connection) {
      directions.push(connection.direction);
    }
  }
  
  return directions;
};

export {
  roomConnections,
  findAllPaths,
  findShortestPath,
  pathToDirections
}; 