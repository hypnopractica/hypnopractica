/* ===== FAQ ACCORDION ===== */
document.querySelectorAll('.accordion__trigger').forEach(trigger => {
  trigger.addEventListener('click', () => {
    const item = trigger.parentElement;
    const content = item.querySelector('.accordion__content');
    const isOpen = item.classList.contains('is-open');

    // Close all
    document.querySelectorAll('.accordion__item.is-open').forEach(openItem => {
      openItem.classList.remove('is-open');
      openItem.querySelector('.accordion__content').style.maxHeight = '0';
    });

    // Open current if it was closed
    if (!isOpen) {
      item.classList.add('is-open');
      content.style.maxHeight = content.scrollHeight + 'px';
    }
  });
});

/* ===== AUTO-OPEN FAQ ON HASH LINK ===== */
function openFaqByHash() {
  const hash = window.location.hash;
  if (!hash) return;
  const target = document.querySelector(hash);
  if (!target || !target.classList.contains('accordion__item')) return;
  if (target.classList.contains('is-open')) return;
  const trigger = target.querySelector('.accordion__trigger');
  if (trigger) {
    trigger.click();
    setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
  }
}
window.addEventListener('hashchange', openFaqByHash);
window.addEventListener('load', openFaqByHash);

/* ===== PROGRAM MODULES ACCORDION ===== */
document.querySelectorAll('.program__module-trigger').forEach(trigger => {
  trigger.addEventListener('click', () => {
    const module = trigger.closest('.program__module');
    const content = module.querySelector('.program__module-content');
    const isOpen = module.classList.contains('is-open');

    // Close all modules
    document.querySelectorAll('.program__module.is-open').forEach(openModule => {
      openModule.classList.remove('is-open');
      openModule.querySelector('.program__module-content').style.maxHeight = '0';
    });

    // Open current if it was closed
    if (!isOpen) {
      module.classList.add('is-open');
      content.style.maxHeight = content.scrollHeight + 'px';
    }
  });
});
