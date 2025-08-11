import { useEffect, useMemo, useRef, type PropsWithChildren } from 'react';
import { supportsNativeDialog, setDialogOpenState } from './dialogUtils.ts';
import { StyledDialog, DialogBody } from './Dialog.styles.ts';

type DialogProps = PropsWithChildren<Readonly<{ open: boolean; onClose: () => void; title?: string }>>;

const Dialog = ({ open, onClose, title, children }: DialogProps) => {
  const ref = useRef<HTMLDialogElement>(null);
  const fallback = useMemo(() => !supportsNativeDialog(), []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    setDialogOpenState(el, open, !fallback);
  }, [open, fallback]);

  return (
    <StyledDialog ref={ref} onClose={onClose} $fallback={fallback}>
      <DialogBody>
        {title ? <h3>{title}</h3> : null}
        {children}
      </DialogBody>
    </StyledDialog>
  );
};

export default Dialog;


