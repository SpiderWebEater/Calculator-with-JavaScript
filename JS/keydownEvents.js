document.addEventListener('keypress', function (event) {
    console.log(event.which);
    console.log(event.key);
    let buttons = {
        number: null,
        operation: null,
        power: null,
        trig: null,
        delete: null,
        equals: false
    };
    switch (event.which) {

        case 43:
            buttons.operation = event.key;
            break;
        case 45:
            buttons.operation = event.key;
            break;
        case 42:
            buttons.operation = 'x';
            break;
        case 47:
            buttons.operation = '÷';
            break;
        case 48:
            buttons.number = event.key;
            break;
        case 49:
            buttons.number = event.key;
            break;
        case 50:
            buttons.number = event.key;
            break;
        case 51:
            buttons.number = event.key;
            break;
        case 52:
            buttons.number = event.key;
            break;
        case 53:
            buttons.number = event.key;
            break;
        case 54:
            buttons.number = event.key;
            break;
        case 55:
            buttons.number = event.key;
            break;
        case 56:
            buttons.number = event.key;
            break;
        case 57:
            buttons.number = event.key;
            break;
        case 115:
            buttons.trig = 'Sin';
            break;
        case 83:
            buttons.trig = 'ArcSin';
            break;
        case 116:
            buttons.trig = 'Tan';
            break;
        case 84:
            buttons.trig = 'ArcTan';
            break;
        case 99:
            buttons.trig = 'Cos';
            break;
        case 67:
            buttons.trig = 'ArcCos';
            break;
        case 113:
            buttons.power = '√';
            break;
        case 113:
            buttons.power = '√';
            break;
        case 112:
            buttons.power = 'x<sup>2</sup>';
            break;
        case 80:
            buttons.power = 'x<sup>n</sup>';
            break;
        case 61:
            buttons.equals = true;
            break;
        case 13:
            buttons.equals = true;
            break;
        case 100:
            buttons.delete = "Delete";
            break;
        case 68:
            buttons.delete = "CE";
            break;

        default:
            break;
    }

    if (buttons.number) {
        calculator.appendNumber(buttons.number);
        buttons.number = null;
    }
    if (buttons.operation) {
        calculator.selectOperation(buttons.operation);
        buttons.operation = null;
    }
    if (buttons.trig) {
        calculator.selectTrigOperation(buttons.trig);
        buttons.trig = null;
    }
    if (buttons.power) {
        calculator.selectPower(buttons.power);
        buttons.power = null;
    }
    if (buttons.equals) {
        calculator.compute();
        buttons.equals = false;
    }
    if (buttons.delete === "Delete") {
        calculator.delete();
        buttons.delete = null;
    } else if (buttons.delete === "CE") {
        calculator.clearAll();
        buttons.delete = null;
    }
    calculator.updateDisplay();
})