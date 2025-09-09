import React from 'react';
import ForgeReconciler, { Text, Button } from '@forge/react';
import { useFetchData } from './hooks/useFetchData'


const App = () => {
  const {data, fetchData} = useFetchData();
 
  return (
    <>
      <Button onClick={fetchData}>Fetch Data</Button>
      <Text>{data}</Text>
    </>
  );
};
ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
