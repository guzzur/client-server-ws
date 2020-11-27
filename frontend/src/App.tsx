import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { isAppLoadedState } from './recoil/atoms';
import './style/app.css';

import EventsList from './components/WorkspacesList';

function App() {
  const [isAppLoaded, setIsAppLoaded] = useRecoilState(isAppLoadedState);

  useEffect(() => {
    setIsAppLoaded(true);
  });

  return <div className="app-container">{isAppLoaded && <EventsList />}</div>;
}

export default App;
