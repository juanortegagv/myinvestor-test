export const supportsNativeDialog = (): boolean => {
  const el = document.createElement('dialog');
  return typeof (el as any).showModal === 'function';
};

export const setDialogOpenState = (
  dialog: HTMLDialogElement,
  open: boolean,
  isNative: boolean
): void => {
  if (open) {
    if (isNative && !dialog.open) {
      (dialog as any).showModal?.();
      return;
    }
    dialog.setAttribute('open', '');
    return;
  }

  if (isNative && dialog.open) {
    (dialog as any).close?.();
    return;
  }
  dialog.removeAttribute('open');
};


