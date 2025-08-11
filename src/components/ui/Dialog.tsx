import { useEffect, useRef, type PropsWithChildren } from 'react';

type DialogProps = PropsWithChildren<Readonly<{ open: boolean; onClose: () => void; title?: string }>>;

const Dialog = ({ open, onClose, title, children }: DialogProps) => {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  return (
    <dialog ref={ref} onClose={onClose} style={{ padding: 0, border: 0, borderRadius: 8 }}>
      <div style={{ padding: 16, minWidth: 320 }}>
        {title ? <h3>{title}</h3> : null}
        {children}
      </div>
    </dialog>
  );
};

export default Dialog;


