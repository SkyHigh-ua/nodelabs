// 4. Напишіть скрипт, який отримує з командного рядка числовий параметр – частоту в секундах. 
// Скрипт має виводити на кожному тику (визначеному частотою) наступну системну інформацію:
// - operating system;
// - architecture;
// - current user name;
// - cpu cores models;
// - cpu temperature;
// - graphic controllers vendors and models;
// - total memory, used memory, free memory в GB;
// - дані про батарею (charging, percent, remaining time). 
// Знайдіть і використайте функціональність підходящих модулів.
import * as os from 'os';
import si from 'systeminformation';

let freq:number = +process.argv[2];
setInterval(async () => {
    console.log(`${os.platform()} - operating system;`);
    console.log(`${os.arch()} - architecture;`);
    console.log(`${os.hostname()} - current user name;`);
    os.cpus().forEach((cpu, i) => {console.log(`${cpu.model} - cpu ${i+1} core model;`)});
    console.log(`${(await si.cpuTemperature()).main} - cpu temperature;`);
    let graphics = await si.graphics();
    graphics.controllers.forEach((cont, i) => {
        console.log(`${cont.vendor} - ${i+1} graphic controller vendor;`);
        console.log(`${cont.model} - ${i+1} graphic controller model;`);
    });
    console.log(`${os.totalmem() / Math.pow(1024, 3)} - total memory в GB;`);
    console.log(`${(os.totalmem() - os.freemem()) / Math.pow(1024, 3)} - used memory в GB;`);
    console.log(`${os.freemem() / Math.pow(1024, 3)} - free memory в GB;`);
    let batterydata = await si.battery();
    console.log(`${batterydata.isCharging} - battery charging;`);
    console.log(`${batterydata.percent} - battery percent;`);
    console.log(`${batterydata.timeRemaining}m - battery remaining time;`);
}, freq*1000);