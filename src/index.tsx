import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

import './assets/main.scss';

const container = document.getElementById("root")!;
const root = createRoot(container);
let appReady = Promise.resolve();

appReady.then(() => {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
})
