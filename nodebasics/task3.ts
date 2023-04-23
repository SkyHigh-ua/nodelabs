// 3. Напишіть скрипт, який отримує з командного рядка рядковий параметр - шлях до JSON-файла із масивом рядків - посилань, читає та аналізує його вміст. 
// Скрипт має створити папку «<JSON_filename>_pages» і для кожного посилання із <JSON-файла отримати його HTML-вміст і зберегти цей вміст у окремому файлі в новоствореній папці. 
// Приклад JSON-файла (list.json) прикріплений до цього практичного завдання нижче.
import * as path from 'path';
import * as fs from 'fs';
import * as url from 'url';
import axios from 'axios';

let filename:string = process.argv[2];
fs.mkdir(path.join(__dirname, `${filename}_pages`), err => {
    if (err) throw err;
});
fs.readFile(path.join(__dirname, `${filename}.json`), 'utf8', (err, urldatastr) => {
    if (err) throw err;
    let urldata: string[] = JSON.parse(urldatastr);
    urldata.forEach(siteurl => {
        let urlobj = new url.URL(siteurl);
        axios.get(siteurl).then(response => {
                fs.writeFile(path.join(__dirname, `${filename}_pages`, `${urlobj.host}${urlobj.pathname.split('/').join('-')}`), response.data, err => {
                    if (err) throw err;
                });
            }).catch(error => {
                console.error(error);
            });
    });
});