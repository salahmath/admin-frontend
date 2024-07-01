import React from 'react';
import { createRoot } from 'react-dom/client'; // Importez createRoot depuis "react-dom/client" au lieu de "react-dom"
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { store } from './store/store';
import { Provider } from 'react-redux'
const root = createRoot(document.getElementById('root')); // Utilisez createRoot directement
root.render(
 < Provider store={store}>
    <App />
    </Provider>
);
serviceWorkerRegistration.register();
reportWebVitals();
