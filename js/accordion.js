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
