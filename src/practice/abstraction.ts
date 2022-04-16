{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

  interface CommercialCoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
    fillCoffeeBeans(beans: number): void;
    clean(): void;
  }

  class CoffeeMachine implements CoffeeMaker, CommercialCoffeeMaker {
    static BEANS_GRAMM_PER_SHOT: number = 7;
    private coffeeBeans: number = 0;

    private constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }

    static makeMachine(coffeeBeans: number): CoffeeMachine {
      return new CoffeeMachine(coffeeBeans);
    }

    fillCoffeeBeans(beans: number) {
      if (beans < 0) throw new Error('input is wrong');
      this.coffeeBeans += beans;
    }

    private grindBeans(shots: number) {
      if (this.coffeeBeans < shots * CoffeeMachine.BEANS_GRAMM_PER_SHOT) {
        throw new Error('Not enough coffee beans');
      }
      this.coffeeBeans -= shots * CoffeeMachine.BEANS_GRAMM_PER_SHOT;
      console.log(`grinding beans for ${shots}`);
    }

    private preheat() {
      console.log(`heating....🔥`);
    }

    private extract(shots: number): CoffeeCup {
      console.log('extracting...');
      return {
        shots,
        hasMilk: false,
      };
    }
    clean() {
      console.log('cleaning.!');
    }

    makeCoffee(shots: number): CoffeeCup {
      this.grindBeans(shots);
      this.preheat();
      return this.extract(shots);
    }
  }
  /**
   * interface 에서 제한된 메서드들만 사용
   */
  const maker: CoffeeMaker = CoffeeMachine.makeMachine(32);
  const maker2: CommercialCoffeeMaker = CoffeeMachine.makeMachine(32);

  class AmateurUser {
    constructor(private machine: CoffeeMaker) {}
    makeCoffee(shots: number) {
      const coffee = this.machine.makeCoffee(shots);
      return coffee;
    }
  }

  class ProBarista {
    constructor(private machine: CommercialCoffeeMaker) {}
    makeCoffee(shots: number) {
      const coffee = this.machine.makeCoffee(shots);
      this.machine.clean();
      return coffee;
    }
  }
}
