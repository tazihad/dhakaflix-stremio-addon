#!/usr/bin/env node

const { serveHTTP, publishToCentral } = require('stremio-addon-sdk');
const addonInterface = require('./server');

// 1. Grab the public Render URL if available, otherwise default to local testing
const PUBLIC_URL = process.env.RENDER_EXTERNAL_URL || 'http://localhost:7001';

// 2. Start the Stremio addon server
serveHTTP(addonInterface, { 
    port: process.env.PORT || 7001,
    url: PUBLIC_URL + '/manifest.json' // Tells the SDK your exact public manifest endpoint
})
    .then(({ url }) => {
        console.log('===================================================');
        console.log('- Install URL in Stremio: ' + url);
        console.log('===================================================\n');
        
        // Only publish to the central catalog if you're live on Render
        if (process.env.RENDER_EXTERNAL_URL) {
            // publishToCentral(`${PUBLIC_URL}/manifest.json`)
            // .then(result => console.log("Published:", result))
            // .catch(err => console.error(err));
        }
    })
    .catch(err => console.error('STARTUP ERROR:', err));