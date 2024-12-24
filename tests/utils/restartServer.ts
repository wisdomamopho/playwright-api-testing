import { exec } from 'child_process';

export async function stopServer() {
    return new Promise<void>((resolve) => {
      // Kill any existing process listening on port 3000
      exec('npx kill-port 3000', (error) => {
        if (error) {
          console.error('Error killing existing server process:', error);
        }    
        resolve();
      });
    });
  }

  export async function startServer() {
    return new Promise<void>((resolve, reject) => {
        // Restart the server
        exec('npx json-server --watch db.json --port 3000', (error, stdout, stderr) => {
          if (error) {
            reject(new Error(`Error starting server: ${error?.message} ${stderr}`));
          } else if (stderr) {
            reject(new Error(`Error starting server: ${stderr}`));
          } else {
            console.log('Server started successfully', stdout);
            resolve();
          }
        });
    });
  }

