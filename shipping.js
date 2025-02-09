document.addEventListener('DOMContentLoaded', function() {
    console.log("Shipping page loaded.");
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartTotal = 0;
    const orderItemsContainer = document.getElementById('orderItemsContainer');
    orderItemsContainer.innerHTML = '';
    cart.forEach(item => {
      cartTotal += item.price * item.quantity;
      const orderItem = document.createElement('article');
      orderItem.className = 'order-item';
      orderItem.innerHTML = `
        <figure>
          <img src="${item.image}" alt="${item.title}">
        </figure>
        <section class="order-item-details">
          <p class="order-item-name">${item.title}</p>
          <p class="order-item-quantity">Qty: ${item.quantity}</p>
          <p class="order-item-price">$${(item.price * item.quantity).toFixed(2)}</p>
        </section>
      `;
      orderItemsContainer.appendChild(orderItem);
    });
    
    const subtotalElem = document.getElementById('subtotalValue');
    const shippingCostElem = document.getElementById('shippingCostValue');
    const totalElem = document.getElementById('totalValue');
    
    subtotalElem.textContent = `$${cartTotal.toFixed(2)}`;
    let shippingCost = 0;
    shippingCostElem.textContent = "Free";
    totalElem.textContent = `$${(cartTotal + shippingCost).toFixed(2)}`;
    
    function updateTotal() {
      const total = cartTotal + shippingCost;
      totalElem.textContent = `$${total.toFixed(2)}`;
    }
    
    const standardRadio = document.getElementById('standard');
    const expressRadio = document.getElementById('express');
    
    standardRadio.addEventListener('change', function() {
      if (this.checked) {
        shippingCost = 0;
        shippingCostElem.textContent = "Free";
        updateTotal();
      }
    });
    
    expressRadio.addEventListener('change', function() {
      if (this.checked) {
        shippingCost = 10;
        shippingCostElem.textContent = `$10.00`;
        updateTotal();
      }
    });
    
    const continueBtn = document.querySelector('.continue-btn');
    continueBtn.addEventListener('click', function() {
      window.location.href = 'payment.html';
    });
  });
  