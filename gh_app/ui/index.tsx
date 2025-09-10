import React, { useState } from 'react';
import ForgeReconciler from '@forge/react';
import { GHToken, GHTokenForm, Repositories } from './components';
import NavigationContext from './common/navigationContext'
import { VIEW } from './common/constants'

const App = () => {
  const [currentView, setCurrentView] = useState<VIEW>(VIEW.GHToken);
  const renderComponent = () => {
    switch(currentView) {
      case VIEW.GHToken:
        return <GHToken />
      case VIEW.GHTokenForm:
        return <GHTokenForm />
      case VIEW.Repositories:
        return <Repositories />
      default:
        return <>Unknown View</>
    }
  }
  return (
    <NavigationContext.Provider value={{setCurrentView}}>
      {
        renderComponent()
      }
    </NavigationContext.Provider>
  );
};
ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
