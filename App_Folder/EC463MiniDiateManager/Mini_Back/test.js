import Food from './food.js';
import FoodEntry from './food_entry.js';
import Meal from './meal.js';
import NutritionForm from "./nutrition_form.js";
import DayTakeIn from './day_takein.js';

export default function TestingSC(){
    var i = 0;
    var food1 = new Food();
    var food2 = new Food();
    food1.set_food({
        Name: "Apple",
        Protein: 20,
        Carbohydrate: 30,
        Fat: 50
    });
    food2.set_food({
        Name: "Pi",
        Protein: 200,
        Carbohydrate: 300,
        Fat: 500
    });
    food2.food_nutri.add(food1.food_nutri);
    //==============================================
    var foodE1 = new FoodEntry();
    foodE1.set_food({
        Name: "Bar",
        Protein: 1,
        Carbohydrate: 2,
        Fat: 3
    });
    foodE1.set_servingsize(3);
    var entry_nu = foodE1.return_nutri();
    var foodE2 = new FoodEntry();
    foodE2.set_entry(food1);
    foodE2.set_servingsize(2);
    //=====================================================
    var meal1 = new Meal();
    var meal2 = new Meal();
    meal1.set_name("Breakfast");
    meal1.add_Entry(foodE1);
    meal1.add_Entry(foodE2);
    //
    meal2.add_Entry(foodE2);
    foodE2.set_servingsize(100);
    meal2.add_Entry(foodE2);
    //=================================================
    var day1 = new DayTakeIn();
    day1.set_name("Monday");
    day1.add_Meal(meal1);

    var day2 = new DayTakeIn();
    day2.copy(day1);
    day2.add_Meal(meal2);
    day2.add_Meal(meal2);
    //==================================================
    return day1;
}