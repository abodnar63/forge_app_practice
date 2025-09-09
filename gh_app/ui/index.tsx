import React from 'react';
import ForgeReconciler from '@forge/react';
import { GHToken } from './components/ghtoken/GHToken';

const App = () => {
 
  return (
    <>
      <GHToken />
    </>
  );
};
ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
