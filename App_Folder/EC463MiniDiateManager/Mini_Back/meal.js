import Food from './food.js';
import NutritionForm from './nutrition_form.js'
import FoodEntry from './food_entry.js';


export default class Meal{
    constructor(){
        this.name = "default_meal_name";
        this.entries = new Array();
    }

    set_name(name)
    {
        this.name = name;
    }

    get_name(){
        return this.name;
    }

    add_Entry(foodentry)
    {
        var i = this.entries.length;
        this.entries[i] = new FoodEntry();
        this.entries[i].copy(foodentry);
    }

    return_nutri()
    {
        var nutri_form = new NutritionForm();
        if(this.entries.length > 0)
            for(let i = 0; i < this.entries.length; i++)
                nutri_form.add(this.entries[i].return_nutri());
        return nutri_form;
    }

    copy(meal)
    {
        this.name = (' ' + meal.name).slice(1);
        this.entries = new Array();
        if(typeof meal.entries !== 'undefined')
        {
            for(let i = 0; i < meal.entries.length; i++)
            {
                this.entries[i] = new FoodEntry();
                this.entries[i].copy(meal.entries[i]);
            }
        }
    }
}