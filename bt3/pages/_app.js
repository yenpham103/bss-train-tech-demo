import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import catalogReducer from '../store/catalogSlice';

const store = configureStore({
  reducer: {
    catalog: catalogReducer,
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
