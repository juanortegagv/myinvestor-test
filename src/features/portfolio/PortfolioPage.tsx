import { usePortfolio } from './hooks/usePortfolio.ts';
import PositionList from './components/PositionList.tsx';

const PortfolioPage = () => {
  const { loading, error, positions } = usePortfolio();

  return (
    <section>
      <h2>Cartera</h2>
      {loading && <p>Loading...</p>}
      {error && <p role="alert">{error}</p>}
      {!loading && !error && positions.length === 0 && <p>No hay posiciones</p>}
      {!loading && !error && positions.length > 0 && <PositionList rows={positions} />}
    </section>
  );
};

export default PortfolioPage;


