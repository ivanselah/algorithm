type CoffeeCup = {
  shots: number;
  hasMilk: boolean;
};

class CoffeeMaker {
  static BEANS_GRAMM_PER_SHOT: number = 7;
  private coffeeBeans: number = 0;

  private constructor(coffeeBeans: number) {
    this.coffeeBeans = coffeeBeans;
  }

  static makeMachine(coffeeBeans: number): CoffeeMaker {
    return new CoffeeMaker(coffeeBeans);
  }

  fillCoffeeBeans(beans: number) {
    if (beans < 0) throw new Error('input is wrong');
    this.coffeeBeans += beans;
  }

  makeCoffee(shots: number): CoffeeCup {
    if (this.coffeeBeans < shots * CoffeeMaker.BEANS_GRAMM_PER_SHOT) {
      throw new Error('Not enough coffee beans');
    }
    this.coffeeBeans -= shots * CoffeeMaker.BEANS_GRAMM_PER_SHOT;
    return {
      shots,
      hasMilk: false,
    };
  }
}

const maker = CoffeeMaker.makeMachine(32);
maker.fillCoffeeBeans(-1);
