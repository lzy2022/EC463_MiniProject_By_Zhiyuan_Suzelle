import Food from './food.js';
import NutritionForm from './nutrition_form.js'
import FoodEntry from './food_entry.js';
import Meal from './meal.js';

export default class DayTakeIn{
    constructor(){
        this.name = "default_date";
        this.meals = new Array();
    }

    set_name(name)
    {
        this.name = name;
    }

    get_name(){
        return this.name;
    }

    add_Meal(meal)
    {
        var i = this.meals.length;
        this.meals[i] = new Meal();
        this.meals[i].copy(meal);
    }

    return_nutri()
    {
        var nutri_form = new NutritionForm();
        if(this.meals.length > 0)
            for(let i = 0; i < this.meals.length; i++)
                nutri_form.add(this.meals[i].return_nutri());
        return nutri_form;
    }

    copy(day)
    {
        this.name = day.name;
        this.meals = new Array();
        for(let i = 0; i < day.meals.length; i++)
        {
            this.meals[i] = new Meal();
            this.meals[i].copy(day.meals[i]);
        }
    }

}