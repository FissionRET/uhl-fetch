const fs = require('fs');
const Table = require('cli-table3');
const stripAnsi = require('strip-ansi');

// Read data from file
fs.readFile('data.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  // Split data into rows and columns
  const rows = data.trim().split('\n').map(row => row.split('\t'));

  // Create table
  const table = new Table({
    head: rows[0], // Header row
    colWidths: [20, 20, 30, 10, 25, 35, 25, 25] // Adjust column widths as needed
  });

  // Add rows to the table (skipping header row)
  for (let i = 1; i < rows.length; i++) {
    table.push(rows[i]);
  }

  // Convert table to string and strip ANSI codes
  const tableString = stripAnsi(table.toString());

  // Write table to file
  fs.writeFile('formatted_table.txt', tableString, 'utf8', (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return;
    }
    console.log('Table saved to formatted_table.txt');
  });
});
