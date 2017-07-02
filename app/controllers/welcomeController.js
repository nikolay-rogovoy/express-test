"use strict";
/* app/controllers/welcomeController.ts */
Object.defineProperty(exports, "__esModule", { value: true });
// Import only what we need from express
var express_1 = require("express");
var test_1 = require("./entity/test");
// Assign router to the express.Router() instance
var router = express_1.Router();
// The / here corresponds to the route that the WelcomeController
// is mounted on in the server.ts file.
// In this case it's /welcome
router.get('/', function (req, res) {
    // Reply with a hello world when no name param is provided
    var test = new test_1.Test(1, "name11", "comment11", new Date(), new Date(), null);
    var str = "";
    for (var _i = 0, _a = Object.getOwnPropertyNames(test_1.Test); _i < _a.length; _i++) {
        var propertyName = _a[_i];
        str += propertyName
            + " = "
            + test[propertyName]
            + ", "
            + (test[propertyName] == null ? "" : test[propertyName].constructor.name)
            + "; instanceof = "
            + (test[propertyName] instanceof Date)
            + ";  ";
    }
    res.send('Hello, World!' + str);
});
router.get('/:name', function (req, res) {
    // Extract the name from the request parameters
    var name = req.params.name;
    // Greet the given name
    res.send("Hello, " + name);
});
// Export the express.Router() instance to be used by server.ts
exports.WelcomeController = router;
