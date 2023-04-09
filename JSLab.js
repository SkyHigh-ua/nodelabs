// Задача 1. Напишіть функцію add(), яка приймає будь-яку кількість параметрів у такому вигляді: 
console.log("Задача 1");

function add(a) {
    return b => b === undefined ? a : add(a + b);
}

console.log(add(2)(5)(7)(1)(6)(5)(11)()); // 37

// Задача 2. Напишіть функцію, яка бере два рядки і повертає true, якщо вони є анаграмами одне одного. 
console.log("Задача 2");

function isanagram(string1, string2) {
    return Array.from(string1).sort().every((val, index) => val === Array.from(string2).sort()[index]);
}

console.log(isanagram("aba", "aab"));
console.log(isanagram("abb", "aab"));

// Задача 3. Напишіть функцію, яка глибоко клонує об'єкт, переданий їй параметром. 
console.log("Задача 3");

function deepcopy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

let obj = {
    test: 123
};

let objcopy = obj;

console.log(obj === objcopy);
console.log(obj === deepcopy(obj));

// Задача 4. Напишіть функцію-обгортку, яка кешуватиме результат будь-якої іншої функції з довільною кількістю числових параметрів. Приклад (псевдокод):
console.log("Задача 4");

const calc = (a, b, c) => a+b+c;
const wrapper = (args) => {
    let cache = {};
    return (...params) => {
        if (params in cache) {
            return `${cache[params]} from cache`;
        }
        else {
            let result = args(...params);
            cache[params] = result;
            return `${result} calculated`;
        }
    }
};
const cachedCalc = wrapper(calc);
console.log(cachedCalc(2,2,3)); // 7 calculated
console.log(cachedCalc(5,8,1)); // 14 calculated
console.log(cachedCalc(2,2,3)); // 7 from cache