let statusTimer = null;
let confirmModalResolver = null;

export function setStatus(message, kind = '') {
  const status = document.getElementById('backup-status');
  status.textContent = message;
  status.dataset.kind = kind;

  if (statusTimer) clearTimeout(statusTimer);
  statusTimer = window.setTimeout(() => {
    status.textContent = '';
    status.dataset.kind = '';
  }, 3500);
}

export function openConfirmModal(options) {
  const modal = document.getElementById('confirm-modal');
  const title = document.getElementById('confirm-modal-title');
  const copy = document.getElementById('confirm-modal-copy');
  const submit = document.getElementById('confirm-modal-submit');

  if (confirmModalResolver) {
    confirmModalResolver(false);
    confirmModalResolver = null;
  }

  title.textContent = options.title;
  copy.textContent = options.copy;
  submit.textContent = options.submitLabel || 'Confirmer';
  submit.classList.remove('backup-btn--primary', 'backup-btn--danger');
  submit.classList.add(
    options.submitVariant === 'danger' ? 'backup-btn--danger' : 'backup-btn--primary'
  );

  modal.hidden = false;
  syncBodyModalState();

  return new Promise(resolve => {
    confirmModalResolver = resolve;
    window.setTimeout(() => submit.focus(), 0);
  });
}

export function resolveConfirmModal(confirmed) {
  const modal = document.getElementById('confirm-modal');
  const resolver = confirmModalResolver;

  modal.hidden = true;
  syncBodyModalState();
  confirmModalResolver = null;

  if (resolver) resolver(confirmed);
}

export function setupConfirmModal() {
  const modal = document.getElementById('confirm-modal');
  const closeTargets = modal.querySelectorAll('[data-confirm-close]');
  const submit = document.getElementById('confirm-modal-submit');

  closeTargets.forEach(target => {
    target.addEventListener('click', () => resolveConfirmModal(false));
  });

  submit.addEventListener('click', () => resolveConfirmModal(true));

  // Intercept footer external links
  document.querySelector('.site-footer').addEventListener('click', async e => {
    const link = e.target.closest('a[data-confirm-label]');
    if (!link) return;
    e.preventDefault();
    const confirmed = await openConfirmModal({
      title: link.dataset.confirmLabel,
      copy: link.dataset.confirmDesc,
      submitLabel: 'Ouvrir',
    });
    if (confirmed) window.open(link.href, '_blank', 'noopener');
  });
}

export function syncBodyModalState() {
  const adminModal = document.getElementById('admin-modal');
  const confirmModal = document.getElementById('confirm-modal');
  const hasOpenModal = (adminModal && !adminModal.hidden) || (confirmModal && !confirmModal.hidden);
  document.body.classList.toggle('admin-modal-open', Boolean(hasOpenModal));
}
