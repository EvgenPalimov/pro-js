Vue.component('cart', {
    props: ['cartItems', 'img', 'visible'],
    template:
        `<div class="catalog__header-basket-modal" id="basket-modal" v-show="visible">
            <div v-if="cartItems.length === 0" class="catalog__header-basket-products-another">
                <span>В корзине нет товаров!</span>
            </div>
            <ul v-else class="catalog__header-basket-products">
                <cart-item v-for="item of cartItems" :key="item.id_product" :img="img" :cart-item="item">
                </cart-item>                       
            </ul>
        </div>`
});

Vue.component('cart-item', {
    props: ['img', 'cartItem'],
    template:
        `<li class="catalog__header-basket-products-item">
            <img class="catalog__header-basket-products-item-photo" :src="img"
                alt="item photo">
            <div class="catalog__header-basket-products-item-wrp">
                <span
                    class="catalog__header-basket-products-item-title">{{ cartItem.product_name }}</span>
                <span class="txt">Количество: {{ cartItem.quantity }} шт.</span>
                <span class="catalog__header-basket-products-item-txt">Общая стоимость товаров:
                    {{cartItem.quantity*cartItem.price}} руб.</span>
            </div>
            <div class="catalog__header-basket-products-item-wrp-2">
                <span class="catalog__header-basket-products-item-title">{{ cartItem.price }}
                    руб.</span>
                <button class="catalog__header-basket-products-item-btn txt"
                    @click="$parent.$emit('delete-product', cartItem)"> <span>&times;</span>
                </button>
            </div>
        </li>`
})