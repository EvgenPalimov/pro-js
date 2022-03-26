class Ingredients {
    /**
     * 
     * @param {number} id - Индификатор
     * @param {number} category - 0 - размер Гамбургера, 1 - начинка, 2 - добавка
     * @param {string} name - Название
     * @param {number} price - Цена
     * @param {number} kkal - Каллории
     */
    constructor(id, category, name, price, kkal) {
        this.id = id;
        this.category = category;
        this.name = name;
        this.price = price;
        this.kkal = kkal;
    }
}

class Hamburger {
    constructor() {
        /**
         * 
         * @param {number} price - Общая стоимость гамбургера
         * @param {number} kkal - Общее количество калорий в гамбургере
         * @param {string} hamburger - Название гамбургера
         * @param toppings - Список, содержащий название добавок
         */
        this.ingredients = [
            new Ingredients(1, 0, 'Маленький гамбургер', 50, 20),
            new Ingredients(2, 0, 'Большой гамбургер', 100, 40),
            new Ingredients(3, 1, 'Сыр', 10, 20),
            new Ingredients(4, 1, 'Салат', 20, 5),
            new Ingredients(5, 1, 'Картофель', 15, 10),
            new Ingredients(6, 2, 'Приправа', 15, 0),
            new Ingredients(7, 2, 'Майонез', 20, 5),
        ];
        this.price = 0;
        this.kkal = 0;
        this.hamburger = '';
        this.toppings = [];
    }

    addHamburger(hamburger, filling) {
        let ingredient = this.ingredients.find(ingredient => ingredient.name == hamburger);
        let topping = this.ingredients.find(topping => topping.name == filling);
        try {
            if (topping.category === 1) {
                this.toppings.push(topping.name);
                this.price += topping.price;
                this.kkal += topping.kkal;
            }
            this.hamburger += ingredient.name
            this.price += ingredient.price;
            this.kkal += ingredient.kkal;
        } catch (error) {
            throw new SyntaxError('Вы забыли выбрать начинку')
        }
    }

    addTopping(topping) {
        let ingredient = this.ingredients.find(ingredient => ingredient.name == topping);
        this.toppings.push(ingredient.name);
        this.price += ingredient.price;
        this.kkal += ingredient.kkal;
    }
    removeTopping(topping) {
        let ingredient = this.ingredients.find(ingredient => ingredient.name == topping);
        this.toppings.splice(ingredient, 1);
        this.price -= ingredient.price;
        this.kkal -= ingredient.kkal;
    }
    getHamburger() {
        console.log(`Вы выбрали - ${this.hamburger}!`)
    }
    getToppings() {
        console.log('Выбранные ингридиенты:')
        this.toppings.forEach((item, i) => console.log(`№${++i}: ${item}`));
    }
    calculatePrice() {
        console.log(`Стоимость вашего гамбургера состовляет ${this.price} руб.`)
    }
    calculateCalories() {
        console.log(`Коллорийность вашего гамбургера состовляет ${this.price} калорий`)
    }
}



let food = new Hamburger;

// food.addHamburger('Маленький гамбургер'); - Ошибка, срабатывает проверил!
food.addHamburger('Маленький гамбургер', 'Сыр');
food.addTopping('Салат');
food.removeTopping('Салат');
food.addTopping('Майонез');
food.getHamburger();
food.getToppings();
food.calculatePrice();
food.calculateCalories();
