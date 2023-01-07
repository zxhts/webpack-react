import React from 'react';
import Children from "./chilldren";
import Button from "@components/button";
import { Test } from '@page/test';
import encrypt from "@chanjet/encryption";
import bg from '../bg.jpg';
import './parent.less'
export class Parent extends React.Component<any, any>{
  private ref: any;
  private data: any;

  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
    this.ref = '';
    this.data = [{id: 1, name: '张三'}]
    const test = new Test();
    // @ts-ignore
    console.log(test.name, test.age, '>>>>>>');
  }

  render() {
    console.log('父组件渲染了');
    return (
      <div>
        {
            this.data.map((item) => {
                return (
                    <Children
                        key ={ item.id}
                        name={item.name}
                     >
                     </Children>
                )
            })
        }
        <Button value={"测试按钮"}></Button>
        <button 
            onClick={this.testClik}
            className="test-button"
        >Click me</button>
        <br/>
        <button onClick={this.importClick}>引包测试</button>
        {/* <img src={bg}></img> */}
      </div>
    );
  }

  testClik = () => {

    this.data = [
        {id: 1, name: '张三'}, 
        // {id: 2, name: '李四'},
        // {id: 3, name: '王五'}
    ]
    this.setState({
      count: this.state.count + 1
    })
  }

  importClick = () => {
    console.log('hahha');
    const key = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApeurA0SpOgF1CL/7k//fDWe1rmR3yhsp1Kv/ioqYSOrIkdD9zoAsa2tnKj5cOpQxco9v9rlkxLNO6pzFtWsQOcWwXRUrlzJibsVCftr7NJq/Cxn5yKMtr3C/RQwBW4ZDjF4a0kylCkLmjKAx4XwdP/QjiHFf+8KsKJxLCa96Ag/W5+6V6oOpQIWU/hq0FbDmd9de9Wo7g+K9Ro8r4zicXRhWZ/OeejvGFkVc/DpzksxbW3Pot+ZzFz7HTpTTlOD3gjbjmqEJKjxSJ8SzzkA9pKxUO9N6e+zTHmbhS8G/PJminbm4TRM9P/2zxcTPxhc4sRP4eO9AZs1na3e8wd4qvQIDAQAB'
    try{
      const res = encrypt('123', key);
      console.log(res, '>>>>');
    }catch(err){
      console.log(err);
    }
   
  }
}


