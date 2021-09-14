import NutritionForm from './nutrition_form.js';

export default class Food{
    constructor(){
        this.name = "default_food_name";
        this.food_nutri = new NutritionForm();
    }

    set_food(food_form)
    {
        this.name = food_form.Name;
        this.food_nutri.load_data(food_form.Protein, food_form.Carbohydrate, food_form.Fat);
    }

    return_nutri(){
        return this.food_nutri;
    }
    
    get_name(){
        return this.name;
    }

    set_name(food_name){
        this.name = food_name;
    }

    copy(food)
    {
        this.name = food.name;
        this.food_nutri = new NutritionForm();
        this.food_nutri.add(food.return_nutri());
    }

}