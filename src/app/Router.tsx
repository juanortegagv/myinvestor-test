import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FundsPage from '../features/funds/FundsPage.tsx';
import PortfolioPage from '../features/portfolio/PortfolioPage.tsx';
import Header from '../components/layout/Header/Header.tsx';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<FundsPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;


