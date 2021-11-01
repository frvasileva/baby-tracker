import React from 'react';
import RealmApolloProvider from './graphql/RealmApolloProvider';
import { RealmAppProvider } from './RealmApp';
import { BrowserRouter } from "react-router-dom";
import { Routing } from './Routing';
import { Header } from './ui/layout/Header';

export const APP_ID = "baby-tracker-kzett";

function App() {
  return (
    <RealmAppProvider appId={APP_ID}>
      <BrowserRouter>
        <RealmApolloProvider>
          <Header/>
          <Routing />
        </RealmApolloProvider>
      </BrowserRouter>
    </RealmAppProvider>
  )
}

export default App;