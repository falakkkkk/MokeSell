document.addEventListener('DOMContentLoaded', function() {
    console.log("Payment page loaded.");
  
    // Retrieve the current cart from localStorage and recalculate the subtotal
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
  
    // Update the subtotal using the recalculated cart total
    const subtotalElem = document.getElementById('subtotalValue');
    subtotalElem.textContent = `$${recalculatedTotal.toFixed(2)}`;
  
    // Retrieve the shipping cost from localStorage (set on the Shipping page), defaulting to 0 if not set
    let shippingCost = parseFloat(localStorage.getItem('shippingCost')) || 0;
    const shippingCostElem = document.getElementById('shippingCostValue');
    shippingCostElem.textContent = shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`;
  
    // Calculate and update the final total
    const finalTotal = recalculatedTotal + shippingCost;
    const finalTotalElem = document.getElementById('finalTotalValue');
    finalTotalElem.textContent = `$${finalTotal.toFixed(2)}`;
  
    // Simulate payment processing
    const completePaymentBtn = document.querySelector('.continue-btn');
    completePaymentBtn.addEventListener('click', function() {
      // Here you would integrate with your payment gateway.
      alert("Payment Completed!");
      // Clear cart data and redirect to a confirmation page.
      localStorage.removeItem('cart');
      localStorage.removeItem('cartTotal');
      localStorage.removeItem('shippingCost');
      window.location.href = 'confirmation.html';
    });
  });
  