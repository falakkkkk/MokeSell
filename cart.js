document.querySelector('.add-to-cart').addEventListener('click', function(e) {
    e.preventDefault();
    const sizeButton = document.querySelector('.size-btn.active-size');
    const sizePrice = parseFloat(sizeButton.getAttribute('data-price'));
    const quantity = parseInt(document.getElementById('quantityInput').value, 10);
    const selectedScent = document.querySelector('.scent-item.active-scent').getAttribute('data-scent');
    const productName = document.querySelector('.product-title').textContent;
    const productPrice = (sizePrice * quantity).toFixed(2);
    const productImage = document.querySelector('.big-image').src;
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
      <img src="${productImage}" alt="Product Image" class="cart-item-image">
      <div class="cart-item-content">
        <div class="item-info">
          <h4 class="item-name">${productName}</h4>
          <p class="item-volume">${selectedScent}</p>
          <div class="quantity-section">
            <div class="quantity-control">
              <button class="qty-btn">-</button>
              <input type="number" value="${quantity}" min="1" readonly>
              <button class="qty-btn">+</button>
            </div>
            <p class="price-text">Price:</p>
          </div>
        </div>
        <div class="item-remove">
          <a href="#" class="remove-link">Remove</a>
          <p class="item-price">$${productPrice}</p>
        </div>
      </div>`;
    document.getElementById('cartItemsContainer').appendChild(cartItem);
    updateCartSummary();
    document.getElementById('cartPanel').classList.add('active');
    attachCartItemEvents(cartItem);
  });
  function attachCartItemEvents(cartItem) {
    cartItem.querySelectorAll('.remove-link').forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        cartItem.remove();
        updateCartSummary();
      });
    });
    cartItem.querySelector('.qty-btn:nth-child(1)').addEventListener('click', function() {
      let input = cartItem.querySelector('input');
      let val = parseInt(input.value, 10);
      if (val > 1) {
        input.value = val - 1;
        updateCartItemPrice(cartItem);
      }
    });
    cartItem.querySelector('.qty-btn:nth-child(3)').addEventListener('click', function() {
      let input = cartItem.querySelector('input');
      let val = parseInt(input.value, 10);
      input.value = val + 1;
      updateCartItemPrice(cartItem);
    });
  }
  function updateCartItemPrice(cartItem) {
    const quantity = parseInt(cartItem.querySelector('input').value, 10);
    const activeSizeButton = document.querySelector('.size-btn.active-size');
    const sizePrice = parseFloat(activeSizeButton.getAttribute('data-price'));
    const newPrice = (quantity * sizePrice).toFixed(2);
    cartItem.querySelector('.item-price').textContent = `$${newPrice}`;
    updateCartSummary();
  }
  function updateCartSummary() {
    let total = 0;
    document.querySelectorAll('.cart-item').forEach(item => {
      const priceText = item.querySelector('.item-price').textContent.replace('$', '');
      total += parseFloat(priceText);
    });
    document.getElementById('cartTotalPrice').textContent = `$${total.toFixed(2)}`;
  }
  document.getElementById('closeCart').addEventListener('click', function() {
    document.getElementById('cartPanel').classList.remove('active');
  });
  document.querySelectorAll('.remove-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      this.closest('.cart-item').remove();
      updateCartSummary();
    });
  });
  