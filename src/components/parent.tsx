import React from 'react';
import Children from "./chilldren";
import Button from "@components/button";
import { Test } from '@page/test';

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
        <button onClick={this.testClik}>Click me</button>
      </div>
    );
  }

  testClik = () => {
    // //   this.setState({
    // //       count: this.state.count + 1
    // //   })
    // this.ref.changeState();
    this.data = [
        {id: 1, name: '张三'}, 
        // {id: 2, name: '李四'},
        // {id: 3, name: '王五'}
    ]
    this.setState({
      count: this.state.count + 1
    })
  }
}


