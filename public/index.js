import React from 'react';
import ReactDOM from 'react-dom';

// Import non-js files like this, with the extension and an exclamation point:
import App from './components/App.jsx!'

(() => {
  ReactDOM.render(
    React.createElement(App, null),
    document.getElementById('app')
  )
})();
