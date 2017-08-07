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

router.get('/:name', (req: Request, res: Response) => {
  // Extract the name from the request parameters
  let {name} = req.params;

  // Greet the given name
  res.send(`Hello, ${name}`);
});

// Export the express.Router() instance to be used by server.ts
export const WelcomeController: Router = router;
