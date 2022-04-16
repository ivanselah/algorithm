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

  /**
   * 특정한 기능한 자식클래스에서 달라진다면 부모를 추상화클래스로
   */

  abstract class CoffeeMachine implements CoffeeMaker, CommercialCoffeeMaker {
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

    protected abstract extract(shots: number): CoffeeCup;

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
    protected extract(shots: number): CoffeeCup {
      this.milksteamer();
      return {
        shots,
        hasMilk: true,
      };
    }
  }

  class SweetCoffeeMaker extends CoffeeMachine {
    private extractSugar() {
      console.log('getting some sugar .... 🍭');
    }
    protected extract(shots: number): CoffeeCup {
      this.extractSugar();
      return {
        shots,
        hasSugar: true,
      };
    }
  }
}
