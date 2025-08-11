import AppRouter from './app/Router.tsx';
import { ApiProvider } from './app/ApiContext.tsx';

const App = () => (
  <main style={{ fontFamily: 'system-ui, Arial, sans-serif', padding: 16 }}>
    <h1>Funds App</h1>
    <ApiProvider>
      <AppRouter />
    </ApiProvider>
  </main>
);

export default App;


