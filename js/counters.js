class CountUp {
  constructor(element, target, duration = 2000) {
    this.element = element;
    this.target = parseFloat(target);
    this.duration = duration;
    this.prefix = element.dataset.prefix || '';
    this.suffix = element.dataset.suffix || '';
    this.decimals = (target.toString().split('.')[1] || '').length;
  }

  start() {
    const startTime = performance.now();
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / this.duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = this.target * eased;

      this.element.textContent = this.prefix +
        current.toFixed(this.decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') +
        this.suffix;

      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      new CountUp(el, el.dataset.target, 2500).start();
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-counter]').forEach(el => {
  counterObserver.observe(el);
});
