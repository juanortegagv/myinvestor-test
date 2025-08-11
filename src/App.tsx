import AppRouter from './app/Router.tsx';
import { ApiProvider } from './app/ApiContext.tsx';
import { OrdersProvider } from './features/orders/OrdersContext.tsx';
import { useOrders } from './features/orders/OrdersContext.tsx';
import OrderDialog from './features/orders/OrderDialog.tsx';
import type { Fund } from './shared/types/fund.ts';
import type { PortfolioPosition } from './shared/types/portfolio.ts';

const App = () => (
  <main style={{ fontFamily: 'system-ui, Arial, sans-serif', padding: 16 }}>
    <h1>Funds App</h1>
    <ApiProvider>
      <OrdersProvider>
        <AppRouter />
        <GlobalOrderDialog />
      </OrdersProvider>
    </ApiProvider>
  </main>
);

export default App;

const GlobalOrderDialog = () => {
  const { open, mode, fund, fromPosition, close } = useOrders();
  if (!open) return null;
  return (
    <OrderDialog
      open={open}
      fund={fund as Fund | null}
      fromPosition={fromPosition as PortfolioPosition | null}
      mode={mode ?? 'buy'}
      onClose={close}
    />
  );
};


