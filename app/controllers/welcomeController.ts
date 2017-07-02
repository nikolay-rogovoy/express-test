/* app/controllers/welcomeController.ts */

// Import only what we need from express
import { Router, Request, Response } from 'express';
import {Test} from './entity/test'
// Assign router to the express.Router() instance
const router: Router = Router();


// The / here corresponds to the route that the WelcomeController
// is mounted on in the server.ts file.
// In this case it's /welcome
router.get('/', (req: Request, res: Response) => {
    // Reply with a hello world when no name param is provided
    let test = new Test(1, "name11", "comment11", new Date(), new Date(), null);

    let str = "";

    for(let propertyName of Object.getOwnPropertyNames(test)){
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

router.get('/:name', (req: Request, res: Response) => {
    // Extract the name from the request parameters
    let { name } = req.params;

    // Greet the given name
    res.send(`Hello, ${name}`);
});

// Export the express.Router() instance to be used by server.ts
export const WelcomeController: Router = router;
