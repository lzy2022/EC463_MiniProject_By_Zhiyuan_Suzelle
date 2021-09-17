export default class NutritionForm{
    constructor(){
        this.Protein = 0;
        this.Protein_unit = "g";
        this.Carbohydrate = 0;
        this.Carbohydrate_unit = "g";
        this.Fat = 0;
        this.Fat_unit = "g";
        this.Calorie = 0;
    }

    load_data(Protein, Carbohydrate, Fat, Calorie)
    {
        this.Protein = Protein;
        this.Carbohydrate = Carbohydrate;
        this.Fat = Fat;
        this.Calorie = Calorie;
    }

    add(form)
    {
        if(typeof form !== "undefined")
        {
            this.Protein += form.Protein;
            this.Carbohydrate += form.Carbohydrate;
            this.Fat += form.Fat;
            this.Calorie += form.Calorie;
        }
    }
}
