// Handle hamburger menu toggle on small screens
const hamburgerBtn = document.getElementById('hamburgerBtn');
const navLinks = document.getElementById('navLinks');

hamburgerBtn.addEventListener('click', () => {
  // Toggle the max-height of nav links to show/hide them
  if (navLinks.style.maxHeight) {
    navLinks.style.maxHeight = null;
  } else {
    navLinks.style.maxHeight = navLinks.scrollHeight + "px";
  }
});
