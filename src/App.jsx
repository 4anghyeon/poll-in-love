import {Provider} from 'react-redux';
import store from './redux/store';
import {GlobalStyle} from './styles/GlobalStyles';
import AppRouter from './shared/AppRouter';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <Provider store={store}>
        <AppRouter />
      </Provider>
      <ToastContainer />
    </QueryClientProvider>
  );
}

export default App;
