// Задача 1. Напишіть функцію add(), яка приймає будь-яку кількість параметрів у такому вигляді: 
console.log("Задача 1");

const add = ((a: number) => {
    return (b?: number): number => b === undefined ? a : add(a + b);
}) as Function;

console.log(add(2)(5)(7)(1)(6)(5)(11)()); // 37

// Задача 2. Напишіть функцію, яка бере два рядки і повертає true, якщо вони є анаграмами одне одного. 
console.log("Задача 2");

function isanagram(string1: string, string2: string): boolean {
    return Array.from(string1).sort().every((val, index) => val === Array.from(string2).sort()[index]);
}

console.log(isanagram("aba", "aab"));
console.log(isanagram("abb", "aab"));

// Задача 3. Напишіть функцію, яка глибоко клонує об'єкт, переданий їй параметром. 
console.log("Задача 3");

function deepcopy(obj: object): object {
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

const calc = (a: number, b: number, c: number): number => a+b+c;
const wrapper = (args: Function) => {
    let cache: {[k: string]: number} = {};
    return (...params: number[]): string => {
        if (params.toString() in cache) {
            return `${cache[params.toString()]} from cache`;
        }
        else {
            let result: number = args(...params);
            cache[params.toString()] = result;
            return `${result} calculated`;
        }
    }
};
const cachedCalc = wrapper(calc);
console.log(cachedCalc(2,2,3)); // 7 calculated
console.log(cachedCalc(5,8,1)); // 14 calculated
console.log(cachedCalc(2,2,3)); // 7 from cache