import {Provider} from 'react-redux';
import store from './redux/store';
import {GlobalStyle} from './styles/GlobalStyles';
import AppRouter from './shared/AppRouter';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
