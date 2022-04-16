{
  type CoffeeCup = {
    shots: number;
    hasMilk?: boolean;
    hasSugar?: boolean;
  };

  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

  interface MilkMaker {
    makeMilk(cup: CoffeeCup): CoffeeCup;
  }

  interface SugarMaker {
    addSugar(cup: CoffeeCup): CoffeeCup;
  }

  class MilkWhiskMixer implements MilkMaker {
    private milksteamer() {
      console.log('milk steam! 🥛');
    }
    makeMilk(cup: CoffeeCup): CoffeeCup {
      this.milksteamer();
      return {
        ...cup,
        hasMilk: true,
      };
    }
  }

  class SugarMakeMixer implements SugarMaker {
    private getSugar() {
      console.log('getting some sugar .... 🍭');
    }
    addSugar(cup: CoffeeCup): CoffeeCup {
      this.getSugar();
      return {
        ...cup,
        hasSugar: true,
      };
    }
  }

  class NoMilk implements MilkMaker {
    makeMilk(cup: CoffeeCup): CoffeeCup {
      return cup;
    }
  }
  class NoSugar implements SugarMaker {
    addSugar(cup: CoffeeCup): CoffeeCup {
      return cup;
    }
  }

  class CoffeeMachine implements CoffeeMaker {
    static BEANS_GRAMM_PER_SHOT: number = 7;
    private coffeeBeans: number = 0;

    constructor(coffeeBeans: number, private milk: MilkMaker, private sugar: SugarMaker) {
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
      };
    }
    clean() {
      console.log('cleaning.!');
    }

    makeCoffee(shots: number): CoffeeCup {
      this.grindBeans(shots);
      this.preheat();
      const coffee = this.extract(shots);
      return this.sugar.addSugar(this.milk.makeMilk(coffee));
    }
  }

  const milkMaker = new MilkWhiskMixer();
  const sugarMaker = new SugarMakeMixer();
  const noMilk = new NoMilk();
  const noSugar = new NoSugar();

  const coffee = new CoffeeMachine(40, noMilk, sugarMaker);
  console.log(coffee.makeCoffee(1));
}
