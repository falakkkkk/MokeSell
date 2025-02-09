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
    
    setInterval(() => showSlide(currentIndex + 1), 3000); // Auto-slide every 3 seconds
    showSlide(currentIndex);
    
    // Hover effect for categories (like you had before)
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
  
  
    // ------------------ DISCOUNT SLIDER-LINE ------------------
    const discountOffers = document.querySelector('.discount-offers');
    const discountItems = document.querySelectorAll('.discount-item');
    const sliderLine = document.querySelector('.slider-line');
  
    discountItems.forEach(item => {
      item.addEventListener('mouseenter', (e) => {
        const itemRect = e.currentTarget.getBoundingClientRect();
        const containerRect = discountOffers.getBoundingClientRect();
        const leftPos = itemRect.left - containerRect.left;
        const width = itemRect.width;
        sliderLine.style.left = leftPos + 'px';
        sliderLine.style.width = width + 'px';
      });
    });
    
    discountOffers.addEventListener('mouseleave', () => {
      sliderLine.style.width = '0';
    });
  
  
  // ------------------ CATEGORIES ARROWS (NEW, minimal) ------------------
    const catPrev = document.querySelector('.cat-prev');
    const catNext = document.querySelector('.cat-next');
    const catList = document.querySelector('.category-list');
  
    let catOffset = 0;
    const catScroll = 180; // how many px to shift per arrow click
  
    catPrev.addEventListener('click', () => {
      catOffset -= catScroll;
      if (catOffset < 0) catOffset = 0;
      catList.style.transform = `translateX(-${catOffset}px)`;
    });
  
    catNext.addEventListener('click', () => {
      catOffset += catScroll;
      // no fancy clamp, minimal approach:
      catList.style.transform = `translateX(-${catOffset}px)`;
    });
  });
  


document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function() {
      document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
      this.classList.add('active');
      const indicator = document.querySelector('.nav-indicator');
      indicator.style.top = this.offsetTop + 'px';
    });
  });
  document.addEventListener("DOMContentLoaded", function() {
    // When the play button is clicked, display the modal by setting its display style to "flex"
    document.getElementById("open-slot-machine").addEventListener("click", function() {
      document.getElementById("slot-machine-modal").style.display = "flex";
    });
  
    // When the close button (×) is clicked, hide the modal by setting its display style to "none"
    document.querySelector(".close-btn").addEventListener("click", function() {
      document.getElementById("slot-machine-modal").style.display = "none";
    });
  });
  document.addEventListener("DOMContentLoaded", function() {
    // ---------------------------
    // Modal: Open and Close Logic
    // ---------------------------
    var openBtn = document.getElementById("open-slot-machine");
    var modal = document.getElementById("slot-machine-modal");
    var closeBtn = document.querySelector(".close-btn");
  
    openBtn.addEventListener("click", function() {
      modal.style.display = "flex";
    });
  
    closeBtn.addEventListener("click", function() {
      modal.style.display = "none";
    });
  
    // ---------------------------
    // Slot Machine Logic
    // ---------------------------
    const symbols = ["7", "🍒", "🍋", "🍉", "⭐", "🍀", "💎"];
  
    const reel1 = document.getElementById("reel1");
    const reel2 = document.getElementById("reel2");
    const reel3 = document.getElementById("reel3");
    const lever = document.getElementById("lever");
    const leverBar = document.getElementById("leverBar");
    const resultMsg = document.getElementById("resultMsg");
  
    let interval1, interval2, interval3;
    let spinning = false;
  
    function getRandomSymbol() {
      return symbols[Math.floor(Math.random() * symbols.length)];
    }
  
    function startSpinning() {
      interval1 = setInterval(() => { reel1.textContent = getRandomSymbol(); }, 80);
      interval2 = setInterval(() => { reel2.textContent = getRandomSymbol(); }, 80);
      interval3 = setInterval(() => { reel3.textContent = getRandomSymbol(); }, 80);
    }
  
    function stopSpinning() {
      setTimeout(() => {
        clearInterval(interval1);
        reel1.textContent = getRandomSymbol();
      }, 1000);
  
      setTimeout(() => {
        clearInterval(interval2);
        reel2.textContent = getRandomSymbol();
      }, 1500);
  
      setTimeout(() => {
        clearInterval(interval3);
        reel3.textContent = getRandomSymbol();
        checkResult();
        spinning = false;
      }, 2000);
    }
  
    function checkResult() {
      const r1 = reel1.textContent;
      const r2 = reel2.textContent;
      const r3 = reel3.textContent;
      if (r1 === r2 && r2 === r3) {
        resultMsg.textContent = "Jackpot! You Win!";
      } else {
        resultMsg.textContent = "Try Again!";
      }
    }
  
    function pullLever() {
      if (spinning) return;
      spinning = true;
      resultMsg.textContent = "";
      leverBar.classList.remove("pull");
      void leverBar.offsetWidth;
      leverBar.classList.add("pull");
      startSpinning();
      stopSpinning();
    }
  
    lever.addEventListener("click", pullLever);
  });
  
  
  