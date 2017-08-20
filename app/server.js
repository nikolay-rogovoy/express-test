"use strict";
/* app/server.ts */
Object.defineProperty(exports, "__esModule", { value: true });
// Import everything from express and assign it to the express variable
const express = require("express");
// Import WelcomeController from controllers entry point
const controllers_1 = require("./controllers");
// Create a new express application instance
const app = express();
// The port the express app will listen on
const port = process.env.PORT || 3333;
// Mount the WelcomeController at the /welcome route
app.use('/welcome', controllers_1.WelcomeController);
// Serve the application at the given port
app.listen(port, () => {
    // Success callback
    console.log(`Listening at http://localhost:${port}/`);
});
