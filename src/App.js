import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Parent } from './components/parent';
import { ThemeApp } from './components/theme';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <div>webpack + react</div>
                <Parent />
                <br />
                <ThemeApp />
            </header>
        </div>
    );
}

export default App;
