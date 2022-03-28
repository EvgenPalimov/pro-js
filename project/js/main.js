const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class ProductList {
    constructor(container = '.catalog__products') {
        this.container = container;
        this.products = [];
        this._getProducts()

    }

    _getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .then(data => {
                this.products = data;
                this.render();
            })
            .catch(error => {
                console.log(error);
            })
    }

    // _fetchProducts() {
    //     this.products = [
    //         { id: 1, title: 'Notebook', price: 55000, quantity: 3, image: 'image/product-image-notebook.jpg' },
    //         { id: 2, title: 'Mouse', price: 2000, quantity: 5, image: 'image/product-image-mouse.jpg' },
    //         { id: 3, title: 'Keyboard', price: 1500, quantity: 7, image: 'image/product-image-keyboard.jpg' },
    //         { id: 4, title: 'Gamepad', price: 3500, quantity: 8, image: 'image/product-image-gamepad.jpg' },
    //         { id: 4, title: 'SoundBar', price: 18500, quantity: 9, image: 'image/product-image-soundbar.jpg' },
    //         { id: 4, title: 'Monitor', price: 50, quantity: 10, image: 'image/product-image-monitor.jpg' },
    //     ];
    // }

    _totalPriceOfProducts() {
        let sumProducts = this.products.reduce((sum, { price, quantity }) => sum + price, 0)
        console.log(`Сумма всех товаров, состовляет: ${sumProducts} руб.`)
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.products) {
            const item = new ProductItem(product);
            block.insertAdjacentHTML('beforeend', item.render());
        }
    }
}

class ProductItem {
    constructor(product, image = 'image/product-image-mouse.jpg') {
        this.id = product.id_product;
        this.title = product.product_name;
        this.price = product.price;
        this.image = image;
    }

    render() {
        return `<li class="catalog__products-item">
                    <img class="catalog__products-item-photo" src="${this.image}" alt="product photo">
                    <div class="catalog__products-item-wrp">
                        <h2 class="title_2">${this.title}</h2>
                        <span class="txt">${this.price} руб.</span>
                    </div>
                    <button class="catalog__products-item-btn txt">
                        <svg width="27" height="25" viewBox="0 0 27 25" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21.876 22.2662C21.921 22.2549 21.9423 22.2339 21.96 22.2129C21.9678 22.2037 21.9756 22.1946 21.9835 22.1855C22.02 22.1438 22.0233 22.0553 22.0224 22.0105C22.0092 21.9044 21.9185 21.8315 21.8412 21.8315C21.8375 21.8315 21.8336 21.8317 21.8312 21.8318C21.7531 21.8372 21.6653 21.9409 21.6719 22.0625C21.6813 22.1793 21.7675 22.2662 21.8392 22.2662H21.876ZM8.21954 22.2599C8.31873 22.2599 8.39935 22.1655 8.39935 22.0496C8.39935 21.9341 8.31873 21.8401 8.21954 21.8401C8.12042 21.8401 8.03973 21.9341 8.03973 22.0496C8.03973 22.1655 8.12042 22.2599 8.21954 22.2599ZM21.9995 24.2662C21.9517 24.2662 21.8878 24.2662 21.8392 24.2662C20.7017 24.2662 19.7567 23.3545 19.6765 22.198C19.5964 20.9929 20.4937 19.9183 21.6953 19.8364C21.7441 19.8331 21.7928 19.8315 21.8412 19.8315C22.9799 19.8315 23.9413 20.7324 24.019 21.8884C24.0505 22.4915 23.8741 23.0612 23.4898 23.5012C23.1055 23.9575 22.5764 24.2177 21.9995 24.2662ZM8.21954 24.2599C7.01532 24.2599 6.03973 23.2709 6.03973 22.0496C6.03973 20.8291 7.01532 19.8401 8.21954 19.8401C9.42371 19.8401 10.3994 20.8291 10.3994 22.0496C10.3994 23.2709 9.42371 24.2599 8.21954 24.2599ZM21.1984 17.3938H9.13306C8.70013 17.3938 8.31586 17.1005 8.20331 16.6775L4.27753 2.24768H1.52173C0.993408 2.24768 0.560547 1.80859 0.560547 1.27039C0.560547 0.733032 0.993408 0.292969 1.52173 0.292969H4.99933C5.43134 0.292969 5.81561 0.586304 5.9281 1.01025L9.85394 15.4391H20.5576L24.1144 7.13379H12.2578C11.7286 7.13379 11.2957 6.69373 11.2957 6.15649C11.2957 5.61914 11.7286 5.17908 12.2578 5.17908H25.5886C25.9091 5.17908 26.2141 5.34192 26.3896 5.61914C26.566 5.89539 26.5984 6.23743 26.4697 6.547L22.0795 16.807C21.9193 17.1653 21.5827 17.3938 21.1984 17.3938Z" />
                        </svg>
                        <span>Add to Cart</span>
                    </button>
                </li>`
    }
}

class ShoppingCart {
    constructor(container = '.catalog__header-basket-products') {
        this.modal = document.getElementById('basket-modal');
        this.btn = document.getElementById('btn-basket-modal');

        this.container = container;
        this.products = [];
        this._getProducts()
    }

    _getBasket() {
        this.btn.onclick = () => {
            if (this.modal.style.display == 'none') {
                this.modal.style.display = 'block'
            } else {
                this.modal.style.display = 'none'
            }

        }
    }

    _getProducts() {
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .then(data => {
                this.products = data;
                this.render();
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product in this.products) {
            const item = new ElementsOfBasket(product);
            block.insertAdjacentHTML('beforeend', item.render());
        }
    }
}

class ElementsOfBasket {
    constructor(product, image = 'https://via.placeholder.com/50x50') {
        this.id = product.contents.id_product;
        this.title = product.contents.product_name;
        this.price = product.contents.price;
        this.image = image;
        this.quantity = product.contents.quantity;
        this.amount = product.amount;
        this.countProducts = product.countGoods;
    }

    render() {
        return `<li class="catalog__header-basket-products-item">
                    <img class="catalog__header-basket-products-item-photo" src="${this.image}" alt="product photo">
                    <div class="catalog__header-basket-products-item-wrp">
                        <h2 class="title_2">${this.title}</h2>
                        <span class="txt">${this.amount} руб.</span>
                        <span class="txt">${this.countProducts} шт.</span>
                    </div>
                    <div>
                        <button class="catalog__header-basket-products-item-btn txt">
                          <span>&times;</span>
                        </button>
                        <span class="txt">${this.price} руб.</span>
                    </div>
                </li>`
    }
}

let list = new ProductList();
let listBasket = new ShoppingCart();
let basket_modal = new ShoppingCart();
basket_modal._getBasket()
