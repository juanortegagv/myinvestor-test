import { useFunds } from './hooks/useFunds.ts';
import FundListTable from './components/FundListTable.tsx';
import Pagination from './components/Pagination.tsx';

const FundsPage = () => {
  const { data, loading, error, page, setPage, pagination, sortKey, sortOrder, toggleSort } = useFunds();

  return (
    <section>
      <h2>Listado de fondos</h2>
      {loading && <p>Loading...</p>}
      {error && <p role="alert">{error}</p>}
      {!loading && !error && data.length === 0 && <p>No hay resultados</p>}
      {!loading && !error && data.length > 0 && (
        <>
          <FundListTable rows={data} sortKey={sortKey} sortOrder={sortOrder} onSort={toggleSort} />
          <Pagination
            page={page}
            totalPages={pagination?.totalPages}
            onPrev={() => setPage(page - 1)}
            onNext={() => setPage(page + 1)}
          />
        </>
      )}
    </section>
  );
};

export default FundsPage;


