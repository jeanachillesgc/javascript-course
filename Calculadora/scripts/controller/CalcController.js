class CalcController{

    constructor(){

        this._lastOperator = "";
        this._lastNumber = "";
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

        this.setLastNumberToDisplay();

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
        this._lastNumber = "";
        this._lastOperator = "";
        this.setLastNumberToDisplay();

    }

    clearEntry(){

        this._operation.pop();
        this.setLastNumberToDisplay();

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

    // It checks if the inserted value is and operator.
    isOperator(value){
        return (["+", "-", "*", "%", "/"].indexOf(value) > -1);
    }

    /**
     * It checks if the _operation array has more than 3 values in it, and if
     * so it triggers the calc() method, if not it just pushs a new value.
     *  
     */ 
    pushOperation(value){

        this._operation.push(value);

        if(this._operation.length > 3){            
            this.calc();
        }

    }

    getResult(){
        return eval(this._operation.join(""));
    }
    
    /**
     * It evaluates the operation inside the _operation array.
     */
    calc(){

        let last = "";   
        this._lastOperator = this.getLastItem();

        if(this._operation.length < 3){

            let firstItem = this._operation[0];
            this._operation = [firstItem, this._lastOperator, this._lastNumber];

        }

        if(this._operation.length > 3){

            last = this._operation.pop();
            this._lastOperator = this.getLastItem();
            this._lastNumber = this.getResult();

        }else if(this._operation.length == 3){

            this._lastOperator = this.getLastItem();
            this._lastNumber = this.getLastItem(false);

        }
        
        let result = this.getResult();

        if(last == "%"){
            
            result /= 100;
            this._operation = [result];

        }else{

            this._operation = [result];
            if(last) this._operation.push(last);

        }
        
        this.setLastNumberToDisplay();

    }

    /**
     * If the last item in the _operation array is an operator, it returns the
     * operator. If not, it returns the number.
     */
    getLastItem(isOperator = true){
        let lastItem;

        for(let i = this._operation.length-1; i >= 0; i--){
            
            if(this.isOperator(this._operation[i]) == isOperator){
                lastItem = this._operation[i];
                break;
            }          
        }

        if(!lastItem){
            lastItem = (isOperator) ? this._lastOperator : this._lastNumber;
        }

        return lastItem;
    }

    /**
     * It updates the calculator's display with the last number in the _operation 
     * array.
     */
    setLastNumberToDisplay(){
        
        let lastNumber = this.getLastItem(false);
        if(!lastNumber) lastNumber = 0;
        this.displayCalc = lastNumber;

    }

    /**
     * It checks if the last item that was inserted in the _operation array is a
     * number or and operator. If it is and operator, it adds in another index
     * of the array. If it is a number, it concatenates with the last number, or
     * it is inserted in the next index of the array.
     * 
     */
    addOperation(value){

        if(isNaN(this.getLastOperation())){
            //String
            if(this.isOperator(value)){
                this.setLastOperation(value);
            }else{

                this.pushOperation(value);
                this.setLastNumberToDisplay();

            }

        }else{

            //Number
            if(this.isOperator(value)){
                this.pushOperation(value);
            }else{
                
                let newValue = this.getLastOperation().toString() + value.toString();
                this.setLastOperation(newValue);
                this.setLastNumberToDisplay();

            }
            
        }


        console.log(this._operation);

    }

    addDot(){

        let lastOperation = this.getLastOperation();

        if(this.isOperator(lastOperation) || !lastOperation){
            this.pushOperation("0.");
        }else{
            this.setLastOperation(lastOperation.toString() + ".");
        }

        this.setLastNumberToDisplay();

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
                this.calc();
                break;
            case "ponto":
                this.addDot();
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