const { exec } = require('child_process');
const fs = require('fs');

// Run the test and save output to a file
exec('npx ts-node utils/testNavigation.ts', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error}`);
    return;
  }
  if (stderr) {
    console.error(`Stderr: ${stderr}`);
    return;
  }

  // Save the output to a file
  fs.writeFileSync('navigation-test-results.txt', stdout);
  console.log('✅ Test results saved to navigation-test-results.txt');
}); 