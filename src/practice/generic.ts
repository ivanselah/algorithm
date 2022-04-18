interface Either<L, R> {
  left: () => L;
  right: () => R;
}

class SimpleEither<L, R> implements Either<L, R> {
  constructor(private leftValue: L, private rightValue: R) {}
  left(): L {
    return this.leftValue;
  }
  right(): R {
    return this.rightValue;
  }
}

const either = new SimpleEither('Hello', 123);

/** Generic Constrains */

interface Employee {
  pay(): void;
}

class FullTimeEmployee implements Employee {
  pay() {
    console.log('full time!!');
  }
  workFullTime() {}
}

class PartTimeEmployee implements Employee {
  pay() {
    console.log('part time!!');
  }
  workPartTime() {}
}

function payBad(employee: Employee): Employee {
  employee.pay();
  return employee;
}

function payGood<T extends Employee>(employee: T): T {
  employee.pay();
  return employee;
}

const ivan = new FullTimeEmployee();
const ivanAfterPay = payGood(ivan);
ivanAfterPay.workFullTime();

const selah = new PartTimeEmployee();
const selahAfterPay = payGood(selah);
selahAfterPay.workPartTime();

const obj1 = {
  name: 'ivanselah',
  age: 34,
};

const obj2 = {
  fruit: '🍎',
};

function getValue<O, K extends keyof O>(obj: O, key: K): O[K] {
  return obj[key];
}

console.log(getValue(obj1, 'name'));
console.log(getValue(obj1, 'age'));
console.log(getValue(obj2, 'fruit'));
