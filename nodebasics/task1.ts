// 1. Напишіть функцію, яка приймає будь-який тип масиву та асинхронний колбек, 
// який викликається для кожного елемента масиву послідовно. Результатом виклику 
// має бути масив результатів колбеку. Усі типи мають застосовуватися автоматично (функція шаблону). 
// IDE має розглядати змінні з прикладу так:
// item type = string
// index type = number
// results type = Array<{item: string, index: number}>

(async() => {
    async function runSequent(arr: string[], callback: (item: string, index: number) => Promise<{item: string, index: number}>) {
        return await Promise.all(arr.map(async (item: string, index: number) => await callback(item, index)));
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