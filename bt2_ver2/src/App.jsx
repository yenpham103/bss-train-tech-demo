import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import CatalogConfig from './components/CatalogConfig';

function App() {
  return (
    <Provider store={store}>
      <div className='App'>
        <h1>Catalog Configuration</h1>
        <CatalogConfig />
      </div>
    </Provider>
  );
}

export default App;
