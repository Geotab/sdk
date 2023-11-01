export  default class Logger {
    Logger(name) {
        this.name = name;
        this.id = -1;
    }
    
    startLogging() {
        this.id = setInterval(() => console.log(`Logger: ${this.name}`), 1000);
    }
    
    clear() {
        clearInterval(this.id);
    }
}