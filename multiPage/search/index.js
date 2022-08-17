import React from "react";
import ReactDom from "react-dom";
// import logo from "./images/logo.png";
// import './test.css';
// import './main.css';
import "../common";
import { getResult,} from "../util";

const testFun = () => "hello world";

console.log(testFun());

console.log(getResult());



class App extends React.Component{
    render(){
        return(
            <div className="content">
                warrios in 6
            </div>
        )
    }
}

ReactDom.render(
    <App/>,
    document.getElementById('root')
)
