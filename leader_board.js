document.addEventListener('DOMContentLoaded', function () {
    const navItems = document.querySelectorAll('.nav-item');
    const indicator = document.querySelector('.nav-indicator');

    navItems.forEach(item => {
        item.addEventListener('click', function () {
            // Remove active class from all items
            navItems.forEach(i => i.classList.remove('active'));

            // Add active class to the clicked item
            this.classList.add('active');

            // Move the indicator to the clicked item
            indicator.style.top = this.offsetTop + 'px';
        });
    });

    // Set the initial position of the indicator
    const activeItem = document.querySelector('.nav-item.active');
    if (activeItem) {
        indicator.style.top = activeItem.offsetTop + 'px';
    }
});
