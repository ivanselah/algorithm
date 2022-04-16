class User {
  constructor(private firstName: string, private lastName: string) {}
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
  private internalAge = 4;
  set age(num: number) {
    this.internalAge = num;
  }
}

const songmin = new User('ivan', 'selah');
songmin.age = 10;
console.log(songmin);
