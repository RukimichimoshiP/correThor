import React from 'react';
import ReactDOM from 'react-dom/client';
import { TokenProvider } from './contexts/tokenContext';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <TokenProvider>
        <App />
    </TokenProvider>
);