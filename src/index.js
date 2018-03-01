import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {HashRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './store'
// import {SocketProvider} from 'socket.io-react'
// import io from 'socket.io-client'

// const socket =io.connect('http://localhost:3010')

ReactDOM.render(


/* <SocketProvider socket={socket}>\ */
    
<Provider store={store}>
        <HashRouter>

            <App/>

        </HashRouter>
</Provider>

// </SocketProvider>

, document.getElementById('root'));
