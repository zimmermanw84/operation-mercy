// Player Base Class
class Player {
  constructor(name) {
    this.name = name;
  }

  logName() {
    console.log(`Hey I am ${this.name}`);
  }
};

export { Player }