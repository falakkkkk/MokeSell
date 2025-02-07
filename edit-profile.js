
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function() {
      document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
      this.classList.add('active');
      const indicator = document.querySelector('.nav-indicator');
      indicator.style.top = this.offsetTop + 'px';
    });
  });
  