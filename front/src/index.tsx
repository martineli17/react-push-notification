import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

navigator.serviceWorker.register('./services-works/notification.js')
.then(async service => {
  let subscription = await service.pushManager.getSubscription();
  
  if(!subscription){
    subscription = await service.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: process.env.REACT_APP_PUSH_NOTIFICATION_PUBLIC_KEY
    });
  }

  await axios.post("http://localhost:3002/subscriber/teste-01", subscription);
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);