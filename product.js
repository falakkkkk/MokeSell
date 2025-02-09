const tabButtons = document.querySelectorAll('.tab-btn')
const tabContents = document.querySelectorAll('.tab-content')

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    tabButtons.forEach(b => b.classList.remove('active-tab'))
    tabContents.forEach(c => c.style.display = 'none')
    btn.classList.add('active-tab')
    const target = btn.getAttribute('data-target')
    document.getElementById(target).style.display = 'block'
  })
})

const sizeButtons = document.querySelectorAll('.size-btn')
const priceElement = document.getElementById('productPrice')

sizeButtons.forEach(button => {
  button.addEventListener('click', () => {
    sizeButtons.forEach(b => b.classList.remove('active-size'))
    button.classList.add('active-size')
    const newPrice = button.getAttribute('data-price')
    priceElement.textContent = `$${newPrice}`
  })
})

const decrementBtn = document.getElementById('decrementBtn')
const incrementBtn = document.getElementById('incrementBtn')
const quantityInput = document.getElementById('quantityInput')

decrementBtn.addEventListener('click', () => {
  let val = parseInt(quantityInput.value, 10)
  if (val > 1) {
    quantityInput.value = val - 1
  }
})

incrementBtn.addEventListener('click', () => {
  let val = parseInt(quantityInput.value, 10)
  quantityInput.value = val + 1
})

const thumbnailImages = document.querySelectorAll('.thumbnail-img')
const bigImage = document.querySelector('.big-image')

thumbnailImages.forEach(thumb => {
  thumb.addEventListener('click', () => {
    thumbnailImages.forEach(t => t.classList.remove('active-thumb'))
    thumb.classList.add('active-thumb')
    bigImage.src = thumb.src.replace('80x80', '400x400')
  })
})

const scentItems = document.querySelectorAll('.scent-item')

scentItems.forEach(item => {
  item.addEventListener('click', () => {
    scentItems.forEach(i => i.classList.remove('active-scent'))
    item.classList.add('active-scent')
    const selectedScent = item.getAttribute('data-scent')
    console.log('Selected scent:', selectedScent)
  })
})

const tabsSlider = document.getElementById('tabsSlider')

tabsSlider.addEventListener('input', () => {
  console.log('Slider value:', tabsSlider.value)
})
