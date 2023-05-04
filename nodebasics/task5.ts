// 5. Напишіть власну реалізацію класу EventEmitter (Publisher/Subscriber).

class MyEventEmitter {
    private events: {[name: string]:Function[]} = {};

    public registerHandler(name: string, callback: Function): void {
        this.events[name] = this.events[name] || [];
        this.events[name].push(callback);
    }
    public emitEvent(name: string) {
        this.events[name].forEach(func => func());
    }   
}

const emitter = new MyEventEmitter();
emitter.registerHandler('userUpdated', () => console.log('Обліковий запис користувача оновлено'));
emitter.emitEvent('userUpdated'); // Обліковий запис користувача оновлено