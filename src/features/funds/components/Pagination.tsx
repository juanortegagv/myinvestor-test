type Props = Readonly<{
  page: number;
  totalPages: number | undefined;
  onPrev: () => void;
  onNext: () => void;
}>;

const Pagination = ({ page, totalPages, onPrev, onNext }: Props) => {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 12 }}>
      <button type="button" onClick={onPrev} disabled={page <= 1}>
        Anterior
      </button>
      <span>
        Página {page}
        {totalPages ? ` de ${totalPages}` : ''}
      </span>
      <button type="button" onClick={onNext} disabled={!!totalPages && page >= totalPages}>
        Siguiente
      </button>
    </div>
  );
};

export default Pagination;


