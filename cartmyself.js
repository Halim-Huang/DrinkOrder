//
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', getready)
} 
else {
    getready()
}

function getready(){
    var RemoveCartButton = document.getElementsByClassName('btn-danger')
    console.log(RemoveCartButton)
    //for迴圈 對所有按鈕進行以下處理
    for (var i=0; i<RemoveCartButton.length; i++){
        var button = RemoveCartButton[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('product-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    var addToCartButtons_2 = document.getElementsByClassName('product-item-button-2')
    for (var i = 0; i < addToCartButtons_2.length; i++) {
        var button = addToCartButtons_2[i]
        button.addEventListener('click', addToCartClicked_2)
    }
}

function removeCartItem(event){
    var clicked = event.target
    clicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('product-name')[0].innerText
    var size = shopItem.getElementsByClassName('product-size')[0].innerText
    var price = shopItem.getElementsByClassName('product-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('product-photo')[0].src
    console.log(title, size, price, imageSrc)
    addItemToCart(title, size, price, imageSrc)
    updateCartTotal()
}

function addToCartClicked_2(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('product-name')[0].innerText
    var size = shopItem.getElementsByClassName('product-size')[1].innerText
    var price = shopItem.getElementsByClassName('product-price')[1].innerText
    var imageSrc = shopItem.getElementsByClassName('product-photo')[0].src
    console.log(title, size, price, imageSrc)
    addItemToCart(title, size, price, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, size, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    var cartSizes = document.getElementsByClassName('cart-items')[0]
    var cartSizeNames = cartSizes.getElementsByClassName('cart-size')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title && cartSizeNames[i].innerText == size) {
            alert('This item is already added to the cart')
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="photo" src=${imageSrc} width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
            <span class="cart-size cart-column">${size}</span>
            <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}