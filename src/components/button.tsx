import React from "react";
import { getEnv } from "./env";

interface IButtonProps {
    value: string,
    size?: number
}

function debounce(fn, timeout){
    let timer = null;
    return function(){
        console.log('time is ======>>>>', timer);
        if(timer){
            clearTimeout(timer);
        }
        timer = setTimeout(fn, timeout);
    }
}

function throttle(func, waitTime) { //利用闭包，只有执行完了flag才变为true
    let flag = true;
    return function () {
        if (!flag) return;
        flag = false;
        setTimeout(() => {
            func();
            flag = true
        }, waitTime)
    }
} 

const result = () => {
    console.log("我点击了");
}

const testClick = throttle(result, 1000);


export default class Button extends React.Component<IButtonProps, any> {
    private value: string;
    constructor(props){
        super(props);
        this.value = props.value;
    }

    render(){
        return (
            <button onClick={this.getEnvInfo}>{this.value}</button>
        )
    }

    private getEnvInfo = () => {
        // console.log(getEnv('test cordova'));
        testClick();
    }
}

