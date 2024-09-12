import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import CatalogConfiguration from './components/CatalogConfiguration';
import './styles/CatalogConfiguration.css';

function App() {
  return (
    <Provider store={store}>
      <div className='catalog-container'>
        <h1>Catalog Configuration</h1>
        <CatalogConfiguration />
      </div>
    </Provider>
  );
}

export default App;
