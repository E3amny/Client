import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {store} from "./reducers/index"
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import {PersistGate} from 'redux-persist/lib/integration/react';
import {persistor} from './reducers/index'
import { JourneyComponent, JourneyProvider } from 'react-journey';

ReactDOM.render(
  <Provider store={store}>
    <Router>
   <React.StrictMode>
   <PersistGate persistor={persistor}>
   <JourneyProvider Component={JourneyComponent}>
     <App />
     </JourneyProvider>,
     </PersistGate>
   </React.StrictMode>

   </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
