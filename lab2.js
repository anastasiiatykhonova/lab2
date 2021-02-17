// forEach
let inputs = document.querySelectorAll('input[type="text"], input[type="password"]');

document.querySelector(".clear").onclick = function () {
    inputs.forEach(function (field) {
        field.value = '';
    });
    return false;
}

document.querySelectorAll(".h3").forEach(function (heading) {
    heading.style.color = "red"
});

// filter
document.querySelector(".check").onclick = function () {
    inputs.forEach(function (field) {
        field.style.borderColor = "black";
    });
    let arrInputs = Array.from(inputs); //так как inputs не совсем массив, а набор элементов
    let wrongFields = arrInputs.filter(function (field) {
        return field.value.length == 0 || field.value.length > 10;
    });
    wrongFields.forEach(function (field) {
        field.style.borderColor = "red";
    });
    return false;
}

// map
document.querySelector(".submit").onclick = function () {
    let arrInputs = Array.from(inputs);
    let filledOutFields = arrInputs.map(function (field) {
        let name;
        if (field.value == '') {
            name = "Поле не заполнено"
        } else {
            name = field.value
        }
        return field.name + '=' + name;
    });
    alert(filledOutFields);
}

// every/some
document.querySelector(".check2").onclick = function () {
    let arrInputs = Array.from(inputs);
    let isEverythingOk = arrInputs.every(function (field) {
        return field.value != '';
    });
    if (isEverythingOk) {
        alert("Все поля заполнены");
    }
    let someFieldEmpty = arrInputs.some(function (field) {
        return field.value == '';
    })
    if (someFieldEmpty) {
        alert("Минимум одно из полей не заполнено!");
    }

}

// Reduce
document.querySelector(".submit2").onclick = function () {
    let arrInputs = Array.from(inputs);
    let filledOutFields = arrInputs.reduce(function (accumulator, field) {
        let name;
        if (field.value == '') {
            name = "Поле не заполнено"
        } else {
            name = field.value
        }
        return accumulator + '\r' + field.name + '=' + name;
    }, '');
    alert(filledOutFields);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

//ООП

let Car = function () {

    this.x = getRandomInt(window.innerWidth);
    this.y = getRandomInt(window.innerHeight);
    this.id = 'id' + getRandomInt(1000);
    var that = this;

    let CarHTML = `<div class="car" style = "top: ${this.x}px; left:${this.y}px;" id="${this.id}">
        <div class="roof"></div>
        <div class="corp"></div>
        <div class="wheelL"></div>
        <div class="wheelR"></div>
    </div>`;

    document.querySelector('body').insertAdjacentHTML('beforeend', CarHTML);

    this.timerId = setInterval(function () {
        that.move();
    }, 2000);

    this.move = function () {
        document.querySelector('#' + this.id).style.left = getRandomInt(window.innerWidth) + 'px';
        document.querySelector('#' + this.id).style.top = getRandomInt(window.innerHeight) + 'px';
    }

    document.querySelector('#' + this.id).onclick = function () {
        that.destructor();
    };

    alert(`car ${this.id} created!`);
};

Car.prototype.destructor = function () {
    clearInterval(this.timerId);
    document.querySelector('#' + this.id).remove();
    alert(`car ${this.id} deleted!`);
}

let CarBlue = function () {
// Вызываем родительский конструктор
    Car.call(this);
    document.querySelector('#' + this.id).classList.add('blue');
}

document.querySelector('.newCar').onclick = function () {
    new Car();
}
document.querySelector('.newCarBlue').onclick = function () {
    new CarBlue();
}
// В прототип записываем родительский прототип
CarBlue.prototype = Object.create(Car.prototype);
// Указываем правильный конструктор наследуемого прототипа
CarBlue.prototype.constructor = CarBlue;

// Переопределяем родительский метод
CarBlue.prototype.destructor = function () {
    alert(`Blue car can't be removed!! It's super car!`);
}
