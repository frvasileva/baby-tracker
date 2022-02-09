import { useState } from 'react';
import RealmApolloProvider from './graphql/RealmApolloProvider';
import { RealmAppProvider } from './RealmApp';
import { BrowserRouter } from "react-router-dom";
import { Routing } from './Routing';
import ChildContext from './context/ChildContext';

export const APP_ID = "baby-tracker-kzett";

function App() {

  var item = localStorage.getItem('currentChildId') || "";
  console.log("item", item);
  const [currentChildId, setCurrentChildId] = useState(item);
  const value = { currentChildId, setCurrentChildId };
  console.log("currentChild", currentChildId);

  return (
    <RealmAppProvider appId={APP_ID}>
      <BrowserRouter>
        <ChildContext.Provider value={value}>
          <RealmApolloProvider>
            <Routing />
          </RealmApolloProvider>
        </ChildContext.Provider>
      </BrowserRouter>

    </RealmAppProvider>
  )
}

export default App;