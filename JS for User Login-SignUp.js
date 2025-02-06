const toggleCircle = document.getElementById('toggleCircle');
const container = document.getElementById('container');

toggleCircle.addEventListener('click', () => {
  container.classList.toggle('right-panel-active');
});
