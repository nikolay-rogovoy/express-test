"use strict";
/* app/controllers/welcomeController.ts */
Object.defineProperty(exports, "__esModule", { value: true });
// Import only what we need from express
const express_1 = require("express");
// Assign router to the express.Router() instance
const router = express_1.Router();
// The / here corresponds to the route that the WelcomeController
// is mounted on in the server.ts file.
// In this case it's /welcome
router.get('/', (req, res) => {
    //Тест декораторов
    /*
    console.log('WelcomeController -> start');
  
    let t: Test = new Test('Hello');
    console.log('t.hello = ' + t.hello);
  
    console.log('foo(12) = ' + t.foo(12));
  
    res.send('Hello, World!');
  
    */
    /*
    let arr = [
      {'num': 1},
      {'num': 2},
      {'num': 3},
      {'num': 4},
      {'num': 5},
    ];
    for (let item of arr) {
      setTimeout(function() {
        console.log(item);
      }, 1000);
    }
    res.send('Таймеры установлены');
    */
    res.send('');
});
router.get('/:name', (req, res) => {
    // Extract the name from the request parameters
    let { name } = req.params;
    // Greet the given name
    res.send(`Hello, ${name}`);
});
// Export the express.Router() instance to be used by server.ts
exports.WelcomeController = router;
