// Simple Node.js server for localhost development with 404 support
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.mp4': 'video/mp4',
    '.ico': 'image/x-icon'
};

function serve404(res) {
    const notFoundPath = path.join(__dirname, '404.html');
    fs.readFile(notFoundPath, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('500 Internal Server Error');
            return;
        }
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end(data);
    });
}

function serveFile(filePath, res) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            serve404(res);
            return;
        }
        
        const ext = path.extname(filePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';
        
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    });
}

const server = http.createServer((req, res) => {
    // Remove query string and decode URL
    let urlPath = decodeURIComponent(req.url.split('?')[0]);
    
    // Default to index.html for root
    if (urlPath === '/') {
        urlPath = '/index.html';
    }
    
    // Construct full file path
    let fullPath = path.join(__dirname, urlPath);
    
    // Check if path exists
    fs.stat(fullPath, (err, stats) => {
        if (err) {
            // Path doesn't exist - check if it's a directory that needs index.html
            if (urlPath.endsWith('/')) {
                const indexPath = path.join(fullPath, 'index.html');
                fs.access(indexPath, fs.constants.F_OK, (err) => {
                    if (err) {
                        serve404(res);
                    } else {
                        serveFile(indexPath, res);
                    }
                });
            } else {
                // Try adding index.html for directory requests
                const indexPath = path.join(fullPath, 'index.html');
                fs.access(indexPath, fs.constants.F_OK, (err) => {
                    if (err) {
                        serve404(res);
                    } else {
                        serveFile(indexPath, res);
                    }
                });
            }
            return;
        }
        
        // Path exists
        if (stats.isDirectory()) {
            // It's a directory - try index.html
            const indexPath = path.join(fullPath, 'index.html');
            fs.access(indexPath, fs.constants.F_OK, (err) => {
                if (err) {
                    serve404(res);
                } else {
                    serveFile(indexPath, res);
                }
            });
        } else {
            // It's a file - serve it
            serveFile(fullPath, res);
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    console.log('Press Ctrl+C to stop the server');
    console.log('\nTry visiting a non-existent page like: http://localhost:3000/nonexistent');
});

