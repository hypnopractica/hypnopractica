class InfiniteCarousel {
  constructor(container) {
    this.container = container;
    this.track = container.querySelector('.carousel__track');
    if (!this.track) return;

    this.speed = 0.5;
    this.position = 0;
    this.isPaused = false;

    // Duplicate items for seamless loop
    this.track.innerHTML += this.track.innerHTML;

    this.track.addEventListener('mouseenter', () => this.isPaused = true);
    this.track.addEventListener('mouseleave', () => this.isPaused = false);

    this.initTouch();
    this.animate();
  }

  animate() {
    if (!this.isPaused) {
      this.position -= this.speed;
      const halfWidth = this.track.scrollWidth / 2;
      if (Math.abs(this.position) >= halfWidth) this.position = 0;
      this.track.style.transform = `translateX(${this.position}px)`;
    }
    requestAnimationFrame(() => this.animate());
  }

  initTouch() {
    let startX, startPos;

    this.track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      startPos = this.position;
      this.isPaused = true;
    }, { passive: true });

    this.track.addEventListener('touchmove', (e) => {
      const diff = e.touches[0].clientX - startX;
      this.position = startPos + diff;
      this.track.style.transform = `translateX(${this.position}px)`;
    }, { passive: true });

    this.track.addEventListener('touchend', () => {
      this.isPaused = false;
    });
  }
}

document.querySelectorAll('.carousel').forEach(el => new InfiniteCarousel(el));
