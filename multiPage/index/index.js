/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react";
import ReactDom from "react-dom";
import addDefault from "large-number-hm";
import axios from "axios";
// import axios from "axios";
// import logo from "./images/logo.png";
// import './test.css';
// import './main.css';
// import '../common';

// const testFun = () => {
//     return 'hello world'
// }

// console.log(testFun());

class App extends React.Component {
    constructor() {
        // eslint-disable-next-line prefer-rest-params
        super(...arguments);
        this.state = {
            Text: null,
        };
    }

    loadComponent = () => {
        // eslint-disable-next-line import/extensions
        import("../text.js").then((Text) => {
            this.setState({
                Text: Text.default,
            });
        });
    };

    loadResult = () =>{
        return (
            <div>
                详细测试信息
            </div>
        )
    }

    downLoadFile(path, name) {
        const xhr = new XMLHttpRequest();
        xhr.open("get", path);
        xhr.responseType = "blob";
        xhr.send();
        xhr.onload = function () {
            if (this.status === 200 || this.status === 304) {
                // 如果是IE10及以上，不支持download属性，采用msSaveOrOpenBlob方法，但是IE10以下也不支持msSaveOrOpenBlob
                if ("msSaveOrOpenBlob" in navigator) {
                    navigator.msSaveOrOpenBlob(this.response, name);
                    return;
                }
                // const blob = new Blob([this.response], { type: xhr.getResponseHeader('Content-Type') });
                // const url = URL.createObjectURL(blob);
                const url = URL.createObjectURL(this.response);
                const a = document.createElement("a");
                a.style.display = "none";
                a.href = url;
                a.download = name;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }
        };
    }

    downLoad(){
        // const defaultName = 'ticket.pdf';
        // const fileName = prompt("请输入文件的名字", defaultName);
        // const path = 'http://10.1.145.227:8100/ticket.pdf';
        // // const name = 'new.pdf';

        // // console.log(this);
        // this.downLoadFile(path,fileName);
        // const res = await axios.get('/download/uniapi.pdf');
        // console.log(res);
        var params = new URLSearchParams();
        params.append('username', 'zhaoxianh');
        params.append('password', 'zxh309565@');
        params.append('rememberMe', true);
        const res = axios.post('/download/login', params, {headers: {"Content-Type": "application/x-www-form-urlencoded"}}).then(data => {
            console.log(data)
        })

    }

    render() {
        const { Text } = this.state;
        const result = addDefault("9999", "1");
        return (
            <div className="content">
                warrios wins 2022 NBA Champion
                {result}
                <br />
                {Text ? <Text /> : null}
                <button onClick={this.downLoad.bind(this)}>下载文件</button>
                <br/>
                {this.loadResult()}
            </div>
        );
    }
}

ReactDom.render(<App />, document.getElementById("root"));
