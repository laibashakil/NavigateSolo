import { findShortestPath, pathToDirections } from "../constants/roomConnections";

const locations = [
  "CSIT Room 1",
  "CSIT Room 2",
  "CSIT Room 3",
  "CSIT Room 4",
  "CSIT Room 5",
  "CSIT Room 6",
  "CSIT Room 7",
  "CSIT Room 8",
  "CSIT Lab 2",
  "CSIT Lab 3",
  "CSIT Lab 4",
  "CSIT Lab 5",
  "CSIT Project Lab",
  "CSIT Entrance",
  "CSIT Exit",
  "CSIT Lab Exit",
  "CSIT Lab Entrance"
];

const testNavigation = () => {
  console.log("\n🧭 Navigation Test Results\n");
  console.log("=".repeat(80));

  locations.forEach((start) => {
    locations.forEach((end) => {
      console.log(`\n📍 From: ${start}`);
      console.log(`🎯 To: ${end}`);
      console.log("-".repeat(80));

      const path = findShortestPath(start, end);
      const directions = pathToDirections(path);

      if (directions.length === 0) {
        console.log("❌ No route found");
      } else {
        console.log("📝 Directions:");
        directions.forEach((direction, index) => {
          console.log(`${index + 1}. ${direction}`);
        });
      }
      console.log("=".repeat(80));
    });
  });
};

// Run the test
testNavigation(); 