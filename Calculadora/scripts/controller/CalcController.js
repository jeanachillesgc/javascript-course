class CalcController{

    constructor(){

        this._locale = "pt-BR";
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._currentDate;
        this.initialize(); 

    }

    /**
     * This method triggers everything that has to start at the opening of the 
     * calculator
    */
    initialize(){        

        this.setDisplayDateTime();   
        
        /* It updates the time on the calculator every second */
        setInterval(() =>{
            this.setDisplayDateTime();
        }, 1000);

    }

    /* This method updates the time on the calculator */
    setDisplayDateTime(){

        this.displayDate = this.currentDate.toLocaleDateString(this_locale, {
            day: "2-digit",
            month: "long",
            year: "numeric"
        });
        this.displayTime = this.currentDate.toLocaleTimeString("pt-BR");

    }

    //GETTERS & SETTERS
    get displayTime(){
        return this._timeEl.innerHTML;
    }
    set displayTime(value){
        this._timeEl.innerHTML = value;
    }

    get displayDate(){
        return this._dateEl.innerHTML;
    }
    set displayDate(value){
        this._dateEl.innerHTML = value;
    }

    get displayCalc(){
        return this._displayCalcEl.innerHTML;
    }
    set displayCalc(value){
        this._displayCalcEl.innerHTML = value;
    }

    get currentDate(){
        return new Date();
    }
    set currentDate(date){
        this._currentDate = date;
    }
}