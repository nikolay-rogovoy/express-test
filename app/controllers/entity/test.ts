
import {ClassDecorator, FunctionDecorator, LogParameter, PluginDecorator} from './d1'

/**
 * Created by Николай on 28.06.2017.
 */
//import {} from './d1';
//  require(Test)


// @PluginDecorator('param')
@ClassDecorator
export class Test {

  property = "property";
  hello: string;

  constructor(m: string) {
    this.hello = m;
    console.log("Test constructor this.hello = " + this.hello);
  }

  @FunctionDecorator('for foo')
  foo(@LogParameter i: number): number {
    console.log("foo() i = " + i);
    return i * i;
    //return i * i;
  }
}
