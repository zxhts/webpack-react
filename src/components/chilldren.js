import React from 'react';

export default class Children extends React.Component{

    constructor(props){
        super(props);
        this.count = props.count;
        this.state = {
            stamp: 0
        }
    }

    componentDidMount() {
        console.log(`挂载了`);
    }

    componentDidUpdate(){
        console.log("组件更新了");
    }
    render(){
        // console.log('子组件渲染了');
        // const count = this.props.count
        return (
            <div>
                {/* <p>我是{this.props.name}</p> */}
                <div
                    style={
                        {
                            width: "24px",
                            height: "24px",
                            background: "#FFFFFF",
                            border: "1.15px solid rgba(255,140,66,1)",
                            borderRadius: "50%",
                            // lineHeight: "24px",
                            // textAlign: "center"
                            display: "flex",
                            alignItems: 'center',
                            justifyContent: "center"
                        }
                    }
                >
                    <div style={
                        {
                            width: "18px", 
                            height: "18px", 
                            background:"#FF8C42",
                            fontSize: "13.44px",
                            fontWeight: 600,
                            fontFamily: "PingFangSC-Semibold",
                            color: "#FFFFFF",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: 'center',
                            justifyContent: "center"
                        }
                    }>
                     {this.props.count}
                    </div>
                </div>
                
            </div>
        )
    }

    changeState = () => {
        this.setState({
            stamp: this.state.stamp + 1
        })
    }
}