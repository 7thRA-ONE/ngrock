import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Define a route to handle file sending
app.get('/download/:id', (req, res) => {
  // Extract the ID from the request parameters
  const fileId = req.params.id;

  // Example: mapping IDs to file paths
  const fileMap = {
    'zerotwo': 'creds.json',
    'shikimori': 'creds-shiki.json',
    'mai': 'creds-mai.json',
    // Add more mappings as needed
  };

  // Check if the requested ID exists in the file map
  if (fileMap[fileId]) {
    const filePath = path.join(__dirname, fileMap[fileId]);

    // Send the file
    res.sendFile(filePath, { 
      dotfiles: 'deny',
      headers: {
        'Content-Type': 'application/json', // Set appropriate Content-Type
      }
    }, (err) => {
      if (err) {
        console.error('Error sending file:', err);
        if (err.code === 'ENOENT') {
          res.status(404).send('File not found');
        } else {
          res.status(500).send('Internal server error');
        }
      } else {
        console.log('File sent successfully');
      }
    });
  } else {
    // If the requested ID doesn't exist in the file map
    res.status(404).send('File not found');
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
