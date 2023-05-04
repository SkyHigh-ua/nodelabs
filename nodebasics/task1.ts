// 1. Напишіть функцію, яка приймає будь-який тип масиву та асинхронний колбек, 
// який викликається для кожного елемента масиву послідовно. Результатом виклику 
// має бути масив результатів колбеку. Усі типи мають застосовуватися автоматично (функція шаблону). 
// IDE має розглядати змінні з прикладу так:
// item type = string
// index type = number
// results type = Array<{item: string, index: number}>

(async() => {
    async function runSequent<T, RES>(arr: Array<T>, callback: (item: T, index: number) => Promise<RES>) {
        let result: Awaited<RES>[] = [];
        for (let i = 0; i < arr.length; i++) {
            let newitem = await callback(arr[i], i);
            result.push(newitem);
        }
        return result;
    };

    const array: Array<string> = ["one", "two", "three"];
    const results = await runSequent(array, (item, index) =>
        Promise.resolve({
            item,
            index,
        })
    );

    console.log(results);
})();