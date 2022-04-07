const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        products: [],
        filtered: [],
        cartItems: [],
        countProducts: 0,
        imgCatalog: 'image/product-image-mouse.jpg',
        userSearch: '',
        visible: false
    },
    methods: {
        filter() {
            const regexp = new RegExp(this.userSearch, 'i');
            this.filtered = this.products.filter(product => regexp.test(product.product_name));

        },

        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },

        addProduct(product) {
            if (this.cartItems.indexOf(product) == -1) {
                let itemCart = Object.assign(product, { quantity: 1 });
                this.cartItems.push(itemCart);
                this.countProducts++;
            } else {
                this.cartItems.find(item => item.id_product === product.id_product).quantity++;
                this.countProducts++;
            }
        },

        deleteProduct(product) {
            let item = this.cartItems.find(item => item.id_product === product.id_product);
            if (item.quantity > 1) {
                item.quantity--;
                this.countProducts--;
            } else {
                this.cartItems.splice(this.cartItems.indexOf(product), 1);
                this.countProducts--;
            }
        }
    },

    mounted() {
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.$data.products.push(el);
                    this.$data.filtered.push(el);
                }
            });
        this.getJson(`getProducts.json`)
            .then(data => {
                for (let el of data) {
                    this.$data.products.push(el);
                    this.$data.products.push(el);
                }
            })
    }
})
