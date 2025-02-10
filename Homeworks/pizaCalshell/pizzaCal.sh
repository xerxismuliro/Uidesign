#!/bin/bash

echo "Welcome to Pizza Calzone"
echo "Location: 45th Street and 3rd Avenue"
echo "Hours Open: 8am-10pm"
echo "Phone: 555-1234"
echo "Menu:"
echo "1. Margherita  - $12"
echo "2. Pepperoni - $15"
echo "3. BBQ Chicken - $18"
echo "4. Veggie - $14"
echo "5. Hawaiian - $16"

# Prices
MARGHERITA_PRICE=12
PEPPERONI_PRICE=15
BBQ_CHICKEN_PRICE=18
VEGGIE_PRICE=14
HAWAIIAN_PRICE=16
CHEESE_PRICE=2


# price init
total_price=0

# Func to take order
take_order() {
    echo "Where are you ordering from?"
    read location
    echo "Pickup or Delievery, if so when?"
    read time
    echo "what pizza size would like to have ?"
    echo "1. Small"
    echo "2. Medium"
    echo "3. Large"
    read size
    echo "What  crust type would like to have?"
    echo "1. Thin crust"
    echo "2. Thick crust"
    echo "3. Bread crust"
    echo "4. Deep Dish"
    read crust
    echo "Please enter the number of Margherita pizzas 🫒 you want:"
    read margherita_count
    echo "Please enter the number of Pepperoni pizzas 🍕🌶️ you want:"
    read pepperoni_count
    echo "Please enter the number of BBQ Chicken pizzas 🍗 you want:"
    read bbq_chicken_count
    echo "Please enter the number of Veggie pizzas  🍆 🥦 🥬you want:"
    read veggie_count
    echo "Please enter the number of Hawaiian pizzas 🍍 you want:"
    read hawaiian_count
    echo "Do you needed any additional topping? We don't charge for extra toppings."
    read topping

    # Cal ttl price
    total_price=$((margherita_count * MARGHERITA_PRICE + pepperoni_count * PEPPERONI_PRICE + bbq_chicken_count * BBQ_CHICKEN_PRICE + veggie_count * VEGGIE_PRICE + hawaiian_count * HAWAIIAN_PRICE+ Cheese * CHEESE_PRICE))

    # Confirm order
    echo "You have ordered $margherita_count Margherita pizza(s), $pepperoni_count Pepperoni pizza(s), $bbq_chicken_count BBQ Chicken pizza(s), $veggie_count Veggie pizza(s), and $hawaiian_count Hawaiian pizza(s), Cheese $cheese_count."
    echo "Your total price is: \$$total_price"
    echo "Your order will be ready for $time at $location"
    echo "Thank you for ordering from Pizza Calzone! This is brought to you by Isaac, Yanni, and Malachi We hope you enjoy your pizza! 🍕🍕🍕 😎"
}

#func call
take_order