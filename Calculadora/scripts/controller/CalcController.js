class CalcController{

    constructor(){

        this._operation = [];
        this._locale = "pt-BR";
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._currentDate;
        this.initialize(); 
        this.initButtonsEvents();

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

    /**
     * Here we define one or more events(click // click drag), split it using
     * the " " and add it into an array "events".
     * ForEach event inside events we add a listener inside the element that
     * we set in the method's parameter.
     */
    addEventListenerAll(element, events, fn){

        events.split(" ").forEach(event => {
            element.addEventListener(event, fn, false);
        });

    }    

    /**
     * Inside the #buttons and #parts ids we have the necessary to select all of 
     * the calculator's buttons. In this method we select all of the g tags children
     * of the #buttons and #parts, and add click and drag events on them using the
     * method addEventListenerAll
    **/
    initButtonsEvents(){

        let buttons = document.querySelectorAll("#buttons > g, #parts > g");

        buttons.forEach((btn, index)=>{

            this.addEventListenerAll(btn, "click drag", e=>{

                let textBtn = btn.className.baseVal.replace("btn-", "");

                this.execBtn(textBtn);

            });

            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e =>{
                btn.style.cursor = "pointer";
            });

        });

    }

    clearAll(){

        this._operation = [];

    }

    clearEntry(){

        this._operation.pop();

    }

    setError(){

        this.displayCalc = "Error";

    }

    getLastOperation(){
        return this._operation[this._operation.length-1];
    }

    setLastOperation(value){
        this._operation[this._operation.length-1] = value;
    }

    isOperator(value){
        return (["+", "-", "*", "%", "/"].indexOf(value) > -1);
    }

    pushOperation(value){

        this._operation.push(value);

        if(this._operation.length > 3){            
            this.calc();
        }
    }
    
    calc(){
        let last = this._operation.pop();
        let result = eval(this._operation.join(""));
        this._operation = [result, last];
    }

    setLastNumberToDisplay(){
        
    }

    addOperation(value){

        if(isNaN(this.getLastOperation())){
            //String
            if(this.isOperator(value)){
                this.setLastOperation(value);
            }else if(isNaN(value)){
                
            }else{
                this.pushOperation(value);
            }

        }else{

            //Number
            if(this.isOperator(value)){
                this.pushOperation(value);
            }else{
                
                let newValue = this.getLastOperation().toString() + value.toString();
                this.setLastOperation(parseInt(newValue));
                this.setLastNumberToDisplay();

            }
            
        }


        console.log(this._operation);

    }

    execBtn(value){

        switch(value){

            case "ac":
                this.clearAll();
                break;
            case "ce":
                this.clearEntry();
                break;   
            case "soma":
                this.addOperation("+");
                break;
            case "subtracao":
                this.addOperation("-");
                break;
            case "divisao":
                this.addOperation("/");
                break;
            case "multiplicacao":
                this.addOperation("*");
                break;
            case "porcento":
                this.addOperation("%");
                break;
            case "igual":
                
                break;
            case "ponto":
                this.addOperation(".");
                break;            
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
            case "0":
                this.addOperation(parseInt(value));
                break;
            default:
                this.setError();
                break;

        }

    }

    /* This method updates the time on the calculator */
    setDisplayDateTime(){

        this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
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