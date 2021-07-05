class CalcController{

    constructor(){

        this._displayCalc = "0";
        this._currentDate;
        this.initialize(); 

    }

    /**
     * This method triggers everything that has to start at the opening of the 
     * calculator
    */
    initialize(){

        let displayCalcEl = document.querySelector("#display");
        let dateEl = document.querySelector("#data");
        let timeEl = document.querySelector("#hora");

        displayCalcEl.innerHTML = "4567";
        dateEl.innerHTML = "04/07/2021";
        timeEl.innerHTML = "23:55";

    }

    //GETTERS & SETTERS
    get displayCalc(){
        return this._displayCalc;
    }
    set displayCalc(value){
        this._displayCalc = value;
    }

    get dataAtual(){
        return this._currentDate;
    }
    set dataAtual(date){
        this._currentDate = date;
    }
}