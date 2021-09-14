import Food from './food.js';
import NutritionForm from './nutrition_form.js'
import FoodEntry from './food_entry.js';
import Meal from './meal.js';
import DayTakeIn from './day_takein.js';

export default class BackEnd{
    constructor(){
        this.current_day = new DayTakeIn();
        this.saved_day = new Array();
        this.saved_meal = new Array();
        this.saved_food = new Array();
    }

    check_namelist(name, list)
    {
        if(list.length > 0)
            for(let i = 0; i < list.length; i++)
                if(name == list[i].get_name())
                    return true;
        return false;
    }

    add_dayList(day){
        //check if the day is saved
        if(this.check_namelist(day.get_name(), this.saved_day) == false)
        {
            var i = this.saved_day.length;
            this.saved_day[i] = new DayTakeIn();
            this.saved_day[i].copy(day);
            return true;
        }
        return false;
    }

    add_mealList(meal){

    }

    add_foodList(food){

    }


    //print day sum
    //print meal sum
    //print food sum
}

