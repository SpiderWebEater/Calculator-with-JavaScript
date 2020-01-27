function Calculator (displayExpression, displayAnswer){
    this.displayExpression= displayExpression;
    this.displayAnswer= displayAnswer;

    this.expression='';  
    this.answer='';
    this.operation = null;
    this.trigOperation =null;
    this.power = null;

}
 
Calculator.prototype.clearAll = function () {
        this.expression='';
        this.answer='';
        this.operation = null;
        this.trigOperation = null;
        this.power=null;
    
}

Calculator.prototype.delete = function() {
    this.answer = this.answer.slice(0, -1);
}


Calculator.prototype.appendNumber = function(number) {
    if ( number === '.' &&  this.answer.includes('.')) return;
    this.answer = this.answer.toString() + number.toString();
    
}

Calculator.prototype.selectOperation = function (operation){
    if(this.answer === '' ) return;
    
    if(this.expression !== '') {
        this.compute();
    }
    this.operation = operation;
    this.expression = this.answer;
    this.answer = '';
}


Calculator.prototype.selectPower = function(operation){
    if(this.answer==='') return;
    if(this.trigOperation)return;
    if(!this.expression){

        if(operation.toString()==='√' || operation.toString()==='x<sup>2</sup>'){
            console.log('in here');
            this.power = operation;
            this.compute();
            return;
        }
    }else{      
    this.compute();
    }
    
   this.power = operation;
   this.expression = this.answer;
   this.answer= '';
}

Calculator.prototype.selectTrigOperation = function (trigOperation){

    if(this.answer === ''){
         this.trigOperation = trigOperation;
         if(this.operation===null && this.expression !=='' ){
             this.operation = 'x';
             return;
         }
         return;
        }
        if(this.operation===null) this.operation = 'x';
    this.trigOperation= trigOperation;
    this.expression = this.answer;
    this.answer = '';
}

Calculator.prototype.compute = function () {
    if(this.power){
        let computation;
        const ans= this.answer;
        const exp = this.expression;
        switch(this.power){
            case 'x<sup>n</sup>':
                computation = Math.pow(exp, ans);
                break;
            case 'x<sup>2</sup>':
                computation = Math.pow(ans, 2);
                break;
            case '√':
                computation = Math.sqrt(ans);
                break;
            default:
                break;
        }
        this.answer = computation;
        this.power = null;
        this.expression='';
        console.log(this.answer);
        return;
    }
    if(this.trigOperation!== null){
        
        const ans = parseFloat(this.answer);
        console.log(ans);
        switch(this.trigOperation){
            case 'Sin':
            this.answer = Math.sin((ans/180)*Math.PI);
            this.trigOperation = null;
            this.compute();
            break;
            case 'Cos':
            this.answer = ans===90? 0: Math.cos(Math.PI*(ans/180));
            this.trigOperation = null;
            this.compute();
            break;
            case 'Tan':
                this.answer = ans===90? Infinity: Math.tan(Math.PI*(ans/180));
                this.trigOperation = null;
                this.compute();
            break;
            case 'ArcSin':
                this.answer = Math.asin((ans/180)*Math.PI);
                this.trigOperation = null;
                this.compute();
            break;
            case 'ArcCos':
                this.answer = Math.acos((ans/180)*Math.PI);
                this.trigOperation = null;
                this.compute();           
             break;
            case 'ArcTan':
                this.answer = Math.atan((ans/180)*Math.PI);
                this.trigOperation = null;
                this.compute();
                default:
                return;
        }
    }
    let computation;
    const exp = parseFloat(this.expression);
    const ans = parseFloat(this.answer);
    console.log(exp, ans)
    if(isNaN(exp)||isNaN(ans)) return;  
    switch (this.operation){
        case '+':
            computation = exp + ans;
            break;
        case '-':
            computation = exp - ans;
            break;
        case 'x':
            computation = exp * ans;
            break;
        case '÷':
            computation = exp / ans;
            break;
            default:
                console.log('bitch')
                break;
    }
    this.answer = computation;
    this.operation = null;
    this.expression ='';
}

Calculator.prototype.getDisplayNumber = function (number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];


    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
}


Calculator.prototype.updateDisplay = function () {
    this.displayAnswer.innerText = this.getDisplayNumber(this.answer);
    if(this.operation != null ){
        if(this.trigOperation!==null){
        this.displayExpression.innerHTML = `${this.getDisplayNumber(this.expression)} ${this.operation}${this.trigOperation}`;
    } else {
        this.displayExpression.innerHTML = `${this.getDisplayNumber(this.expression)} ${this.operation}`
    }
    } else {
        if(this.trigOperation!==null){
            this.displayExpression.innerText = this.trigOperation;
            return;
     
        }
        if(this.power!==null){
            this.displayExpression.innerHTML= `${this.getDisplayNumber(this.expression)} ${this.power}`;
            return;
        }
        this.displayExpression.innerText = '';

    }
}



var $ = document.querySelector;
var _ = document.querySelectorAll;


let numbers = _.call(document,'[data-number]');
let operations = _.call(document,'[data-operation]');
let trigOperations = _.call(document,'[data-trig-operation]');
let powers = _.call(document,'[data-power]');
let clearAll = $.call(document,'[data-clear-all]');
let prevdel = $.call(document,'[data-delete]');        //delete is a reserved keyword
let equals = $.call(document,'[data-equals]');
let displayExpression = $.call(document,'[data-expression]');
let displayAnswer = $.call(document,'[data-answer]');



const calculator = new Calculator(displayExpression, displayAnswer);

numbers.forEach(number => {
    number.addEventListener('click', () => {
        calculator.appendNumber(number.innerText);
        calculator.updateDisplay();
    })
})

operations.forEach(operation =>{
    operation.addEventListener('click', () =>{
        calculator.selectOperation(operation.innerText);
        calculator.updateDisplay();
    })
})

trigOperations.forEach(operation =>{
    operation.addEventListener('click', () => {
        calculator.selectTrigOperation(operation.innerText);
        calculator.updateDisplay();
    })
})

powers.forEach(operation =>{
    operation.addEventListener('click', () =>{
        calculator.selectPower(operation.innerHTML);
        calculator.updateDisplay();
    })
})

equals.addEventListener('click', (button) =>{
    calculator.compute();
    calculator.updateDisplay();
})

clearAll.addEventListener('click',(button)=>{
    calculator.clearAll();
    calculator.updateDisplay();
})

prevdel.addEventListener('click', (button)=>{
    calculator.delete();
    calculator.updateDisplay();
})


