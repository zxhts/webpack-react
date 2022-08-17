import { appPage } from "./appPage";

@appPage
export class Test {
  constructor() {
    console.log('我是构造函数')
  }
  name: string = 'zzb'; 
  public age: number = 20;
}