document.addEventListener('DOMContentLoaded', function() {
    console.log("Payment page loaded.");
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let recalculatedTotal = 0;
    const orderItemsContainer = document.querySelector('.order-items');
    orderItemsContainer.innerHTML = '';
    cart.forEach(item => {
      recalculatedTotal += item.price * item.quantity;
      const orderItem = document.createElement('article');
      orderItem.className = 'order-item';
      orderItem.innerHTML = `
        <figure>
          <img src="${item.image}" alt="${item.title}">
        </figure>
        <section class="order-item-details">
          <p class="product-name">${item.title}</p>
          <p class="product-quantity">Qty: ${item.quantity}</p>
          <p class="product-price">$${(item.price * item.quantity).toFixed(2)}</p>
        </section>
      `;
      orderItemsContainer.appendChild(orderItem);
    });
    const subtotalElem = document.getElementById('subtotalValue');
    subtotalElem.textContent = `$${recalculatedTotal.toFixed(2)}`;
    let shippingCost = parseFloat(localStorage.getItem('shippingCost')) || 0;
    const shippingCostElem = document.getElementById('shippingCostValue');
    shippingCostElem.textContent = shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`;
    const finalTotal = recalculatedTotal + shippingCost;
    const finalTotalElem = document.getElementById('finalTotalValue');
    finalTotalElem.textContent = `$${finalTotal.toFixed(2)}`;
    const completePaymentBtn = document.querySelector('.continue-btn');
    completePaymentBtn.addEventListener('click', function() {
      alert("Payment Completed!");
      localStorage.removeItem('cart');
      localStorage.removeItem('cartTotal');
      localStorage.removeItem('shippingCost');
      window.location.href = 'confirmation.html';
    });
  });
  