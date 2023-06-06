/**
 * 测试赏析文
 */

import React from 'react';
// import Button from './button';
const ThemeContext = React.createContext({ theme: 'light' }); // 创建

export class ThemeApp extends React.Component {
    render() {
        // 使用一个 Provider 来将当前的 theme 传递给以下的组件树。
        // 无论多深，任何组件都能读取这个值。
        return (
            <ThemeContext.Provider value={{ theme: 'drak1' }}>
                <Toolbar />
            </ThemeContext.Provider>
        );
    }
}

// 中间的组件再也不必指明往下传递 theme 了。
function Toolbar(props) {
    return (
        <div>
            <ThemedText />
        </div>
    );
}

class ThemedText extends React.Component {
    // 指定 contextType 读取当前的 theme context。
    // React 会往上找到最近的 theme Provider，然后使用它的值。
    static contextType = ThemeContext;
    render() {
        return <div>{this.context.theme}</div>;
    }
}
