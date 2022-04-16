{
  type CoffeeCup = {
    shots: number;
    hasMilk?: boolean;
    hasSugar?: boolean;
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

    constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
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

  class CafeLatteMachine extends CoffeeMachine {
    private milksteamer() {
      console.log('milk steam! 🥛');
    }
    makeCoffee(shots: number): CoffeeCup {
      this.milksteamer();
      const coffeecup = super.makeCoffee(shots);
      return {
        ...coffeecup,
        hasMilk: true,
      };
    }
  }

  class SweetCoffeeMaker extends CoffeeMachine {
    private extractSugar() {
      console.log('getting some sugar .... 🍭');
    }
    makeCoffee(shots: number): CoffeeCup {
      this.extractSugar();
      const coffee = super.makeCoffee(shots);
      return {
        ...coffee,
        hasSugar: true,
      };
    }
  }

  /**
   * 공통된 동일한 API를 호출함으로써 다양한 기능을 활용(다형성)
   */
  const machines: CoffeeMaker[] = [new CoffeeMachine(16), new CafeLatteMachine(32), new SweetCoffeeMaker(32)];

  machines.forEach((machine) => {
    machine.makeCoffee(2);
  });
}
