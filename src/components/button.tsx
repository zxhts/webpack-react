import React from "react";

interface IButtonProps {
    value: string,
    size?: number
}

export default class Button extends React.Component<IButtonProps, any> {
    private value: string;
    constructor(props){
        super(props);
        this.value = props.value;
    }

    render(){
        return (
            <button>{this.value}</button>
        )
    }
}

