document.addEventListener('DOMContentLoaded', function(){
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItemsContainer = document.getElementById('cartItemsContainer');
  const subtotalElem = document.getElementById('subtotalValue');
  const totalElem = document.getElementById('totalValue');
  
  function renderCart(){
    cartItemsContainer.innerHTML = '';
    if(cart.length === 0){
      cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
      subtotalElem.textContent = '$0.00';
      totalElem.textContent = '$0.00';
      return;
    }
    
    let subtotal = 0;
    cart.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;
      
      const cartItem = document.createElement('article');
      cartItem.className = 'cart-item';
      cartItem.innerHTML = `
        <figure class="product-image">
          <img src="${item.image}" alt="Product Image" class="product-img">
        </figure>
        <section class="product-info">
          <section class="product-details">
            <p class="product-name">${item.title}</p>
            <p class="product-volume-price">
              <span class="product-volume">${item.size}</span>
              <span class="product-price">$${item.price.toFixed(2)}</span>
            </p>
            <p class="product-scent">Scent: ${item.scent}</p>
          </section>
          <nav class="quantity-controls">
            <button class="qty-minus" data-index="${index}">-</button>
            <input type="text" class="qty-input" value="${item.quantity}" readonly>
            <button class="qty-plus" data-index="${index}">+</button>
          </nav>
          <aside class="remove-item">
            <a href="#" class="remove-link" data-index="${index}">REMOVE</a>
          </aside>
        </section>
      `;
      cartItemsContainer.appendChild(cartItem);
    });
    
    subtotalElem.textContent = `$${subtotal.toFixed(2)}`;
    totalElem.textContent = `$${subtotal.toFixed(2)}`;
    localStorage.setItem('cartTotal', subtotal.toFixed(2));
  }
  
  renderCart();
  
  cartItemsContainer.addEventListener('click', function(e){
    const index = e.target.getAttribute('data-index');
    if(index === null) return;
    if(e.target.classList.contains('qty-minus')){
      if(cart[index].quantity > 1) { cart[index].quantity--; }
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
    }
    if(e.target.classList.contains('qty-plus')){
      cart[index].quantity++;
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
    }
    if(e.target.classList.contains('remove-link')){
      cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
    }
  });
  
  const promoInput = document.getElementById('promoCode');
  promoInput.addEventListener('change', function(){
    const code = promoInput.value.trim();
    let subtotal = parseFloat(localStorage.getItem('cartTotal')) || 0;
    if(code === 'PROMO10'){ subtotal *= 0.9; }
    totalElem.textContent = `$${subtotal.toFixed(2)}`;
  });
  
  const checkoutBtn = document.querySelector('.checkout-btn');
  checkoutBtn.addEventListener('click', function(){
    localStorage.setItem('cartTotal', subtotalElem.textContent.replace('$',''));
    window.location.href = 'shipping.html';
  });
});
