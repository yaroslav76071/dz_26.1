const addDataBtn = document.querySelector('.btn-add-product')
const updDataBtn = document.querySelector('.btn-add-sales')
const makeDefault = document.querySelector('.btn-make-default')
const modal = document.querySelector('#add-product-modal')
const form = document.getElementById('add-product-form')
const getDataBtn = document.querySelector('.leftContainer>.btn-get-product')
const getDataSaleBtn = document.querySelector('.rightContainer>.btn-get-product')

getDataBtn.addEventListener('click', async (e) => {
  e.preventDefault()
  try {
    const response = await fetch('/products')
    const products = await response.json()
    const list = document.querySelector('#left-products')
    list.innerHTML = ''
    products.forEach(product => {
      list.insertAdjacentHTML('beforeend', `
        <li>
          <span>${product.title}</span>
          <div class="prices">
            <span class="price">
              ${product.price}
            </span>
          </div>
        </li>
      `)
    })
  } catch (error) {
    console.error(error)
  }
})

getDataSaleBtn.addEventListener('click', async (e) => {
  e.preventDefault()
  try {
    const response2 = await fetch('/products-action')
    const products2 = await response2.json()
    const list2 = document.querySelector('#right-products')
    list2.innerHTML = ''
    products2.forEach(product2 => {
      list2.insertAdjacentHTML('beforeend', `
        <li>
          <span>${product2.title}</span>
          <div class="prices">
            <span class="price">
              ${product2.price}
            </span>
            <span class="new-price">
              ${product2.newPrice}
            </span>
          </div>
        </li>
      `)
    })
  } catch (error) {
    console.error(error)
  }
})

addDataBtn.addEventListener('click', (e) => {
  e.preventDefault()
  modal.style.display = "block"
})
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = "none"
  }
})

form.addEventListener('submit', async (e) => {
  e.preventDefault()
  const title = form.elements.title.value;
  const price = form.elements.price.value;
  const onSale = false;
  try {
    const response = await fetch('/add-product', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, price, onSale })
    });
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.log(err.message);
  }
})

updDataBtn.addEventListener('click', async (e) => {
  e.preventDefault()
  try {
    const response = await fetch('/upd-products', {
      method: 'PATCH'
    })
    const result = await response.json()
    console.log(result)
  }
  catch (error) {
    console.log(error)
  }
})

makeDefault.addEventListener('click', async (e) => {
  e.preventDefault()
  try {
    const response = await fetch('/makeDefault', {
      method: 'GET'
    })
    const result = await response.json()
    console.log(result)
  }
  catch (error) {
    console.log(error)
  }
})