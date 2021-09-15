import Food from './food.js';
import NutritionForm from './nutrition_form.js'

export default class FoodEntry{

    constructor(){
        this.entry = new Food();
        this.serving_size = 0;
    }

    set_food(food_form)
    {
        this.entry.set_food(food_form);
    }

    get_food()
    {
        return this.entry;
    }

    set_entry(food)
    {
        this.entry.copy(food);
    }

    get_name()
    {
        return this.entry.get_name();
    }

    set_name(food_name)
    {
        this.entry.set_name(food_name);
    }

    get_servingsize()
    {
        return this.serving_size;
    }

    set_servingsize(size)
    {
        this.serving_size = size;
    }
    
    return_nutri()
    {
        let nutri_form = new NutritionForm()
        for(let i = 0; i < this.serving_size; i++)
            nutri_form.add(this.entry.return_nutri());
        return nutri_form;
    }

    copy(entry)
    {
        this.entry.copy(entry.entry);
        this.serving_size = entry.serving_size;
    }

}