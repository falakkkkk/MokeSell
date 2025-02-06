document.addEventListener('DOMContentLoaded', function() {
    // ------------------ Carousel Code ------------------
    const slides = document.querySelectorAll('.carousel-slide');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const carouselContainer = document.querySelector('.carousel-container');
    const categories = document.querySelectorAll('.category');
  
    let currentIndex = 0;
  
    function showSlide(index) {
        if (index >= slides.length) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = slides.length - 1;
        } else {
            currentIndex = index;
        }
        const offset = -currentIndex * 100;
        carouselContainer.style.transform = `translateX(${offset}%)`;
    }
  
    prevButton.addEventListener('click', () => showSlide(currentIndex - 1));
    nextButton.addEventListener('click', () => showSlide(currentIndex + 1));
  
    setInterval(() => showSlide(currentIndex + 1), 3000);
    showSlide(currentIndex);
  
    // Hover effect for categories
    categories.forEach(category => {
        category.addEventListener('mouseenter', () => {
            categories.forEach(cat => {
                if (cat !== category) {
                    cat.style.transform = 'scale(0.8)';
                    cat.style.transition = 'transform 0.3s ease';
                }
            });
            category.style.transform = 'scale(1.05)';
            category.style.transition = 'transform 0.3s ease';
        });
  
        category.addEventListener('mouseleave', () => {
            categories.forEach(cat => {
                cat.style.transform = 'scale(1)';
                cat.style.transition = 'transform 0.3s ease';
            });
        });
    });
  
    // ------------------ FAVORITES SLIDER ------------------
    const favoriteItems = document.querySelectorAll('.favorite-item');
    const favPrevBtn = document.querySelector('.favorites-prev');
    const favNextBtn = document.querySelector('.favorites-next');
    const favContainer = document.querySelector('.favorites-container');
  
    let favoritesIndex = Math.floor(favoriteItems.length / 2);
  
    function getCircularOffset(i, center, length) {
      let offset = i - center;
      let half = Math.floor(length / 2);
  
      if (offset > half) offset -= length;
      if (offset < -half) offset += length;
  
      return offset;
    }
  
    function updateFavorites() {
      const itemSpacing = 210;
      const maxScale = 1.14;
      const scaleStep = 0.12;
  
      favoriteItems.forEach((item, i) => {
        const offset = getCircularOffset(i, favoritesIndex, favoriteItems.length);
  
        let scale = maxScale - Math.abs(offset) * scaleStep;
        if (scale < 0.65) scale = 0.65;
  
        const translateX = offset * itemSpacing;
        const zIndex = 100 - Math.abs(offset);
  
        item.style.transform = `translateX(${translateX}px) scale(${scale})`;
        item.style.zIndex = zIndex;
      });
    }
  
    function showPrevFavorite() {
      favoritesIndex = (favoritesIndex - 1 + favoriteItems.length) % favoriteItems.length;
      updateFavorites();
    }
  
    function showNextFavorite() {
      favoritesIndex = (favoritesIndex + 1) % favoriteItems.length;
      updateFavorites();
    }
  
    favPrevBtn.addEventListener('click', showPrevFavorite);
    favNextBtn.addEventListener('click', showNextFavorite);
  
    favoriteItems.forEach((item, i) => {
      item.addEventListener('click', () => {
        favoritesIndex = i;
        updateFavorites();
      });
    });
  
    let startX = 0;
    favContainer.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });
  
    favContainer.addEventListener('touchend', (e) => {
      const endX = e.changedTouches[0].clientX;
      const diff = endX - startX;
      if (diff > 50) {
        showPrevFavorite();
      } else if (diff < -50) {
        showNextFavorite();
      }
    });
  
    updateFavorites();
  
  
    // ------------------ TOP PICKS SLIDER ------------------
    const topPicksItems = document.querySelectorAll('.top-picks-item');
    const topPicksPrev  = document.querySelector('.top-picks-prev');
    const topPicksNext  = document.querySelector('.top-picks-next');
    const topPicksContainer = document.querySelector('.top-picks-container');
  
    let topPicksIndex = Math.floor(topPicksItems.length / 2);
  
    function getCircularOffsetTop(i, center, length) {
      let offset = i - center;
      let half = Math.floor(length / 2);
  
      if (offset > half) offset -= length;
      if (offset < -half) offset += length;
  
      return offset;
    }
  
    function updateTopPicks() {
      const itemSpacing = 210;
      const maxScale = 1.14;
      const scaleStep = 0.12;
  
      topPicksItems.forEach((item, i) => {
        const offset = getCircularOffsetTop(i, topPicksIndex, topPicksItems.length);
  
        let scale = maxScale - Math.abs(offset) * scaleStep;
        if (scale < 0.65) scale = 0.65;
  
        const translateX = offset * itemSpacing;
        const zIndex = 100 - Math.abs(offset);
  
        item.style.transform = `translateX(${translateX}px) scale(${scale})`;
        item.style.zIndex = zIndex;
      });
    }
  
    function showPrevTopPick() {
      topPicksIndex = (topPicksIndex - 1 + topPicksItems.length) % topPicksItems.length;
      updateTopPicks();
    }
  
    function showNextTopPick() {
      topPicksIndex = (topPicksIndex + 1) % topPicksItems.length;
      updateTopPicks();
    }
  
    topPicksPrev.addEventListener('click', showPrevTopPick);
    topPicksNext.addEventListener('click', showNextTopPick);
  
    topPicksItems.forEach((item, i) => {
      item.addEventListener('click', () => {
        topPicksIndex = i;
        updateTopPicks();
      });
    });
  
    let startXTop = 0;
    topPicksContainer.addEventListener('touchstart', (e) => {
      startXTop = e.touches[0].clientX;
    });
  
    topPicksContainer.addEventListener('touchend', (e) => {
      const endXTop = e.changedTouches[0].clientX;
      const diff = endXTop - startXTop;
      if (diff > 50) {
        showPrevTopPick();
      } else if (diff < -50) {
        showNextTopPick();
      }
    });
  
    updateTopPicks();
  });
  