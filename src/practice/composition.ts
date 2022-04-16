/**
 * 상속의 문제점
 * 상속의 깊이가 깊어질 수록 관계가 복잡해짐
 * 다이아몬드상속(📌 타입스크립트 : 하나이상의 상속을 받을 수 없다.)
 * 부모의 수정사항이 발생하면 상속받은 자식들이 모두 영향을 받는다.
 */

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

  class MilkWhiskMixer {
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

  class SugarMakeMixer {
    private getSugar() {
      console.log('getting some sugar .... 🍭');
    }
    makeSugar(cup: CoffeeCup): CoffeeCup {
      this.getSugar();
      return {
        ...cup,
        hasSugar: true,
      };
    }
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
    constructor(beans: number, private milk: MilkWhiskMixer) {
      super(beans);
    }
    makeCoffee(shots: number): CoffeeCup {
      const coffeecup = super.makeCoffee(shots);
      return this.milk.makeMilk(coffeecup);
    }
  }

  class SweetCoffeeMaker extends CoffeeMachine {
    constructor(beans: number, private sugar: SugarMakeMixer) {
      super(beans);
    }
    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      return this.sugar.makeSugar(coffee);
    }
  }

  /**
   * 클래스를 타입으로 가져갈 경우 커플링이 심함
   * 확장성 부족 => 해결책 인터페이스
   */
  class SweetCaffeLatteMachine extends CoffeeMachine {
    constructor(beans: number, private milk: MilkWhiskMixer, private sugar: SugarMakeMixer) {
      super(beans);
    }
    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      return this.sugar.makeSugar(this.milk.makeMilk(coffee));
    }
  }

  const milkMaker = new MilkWhiskMixer();
  const sugarMaker = new SugarMakeMixer();

  const sweetLatte = new SweetCaffeLatteMachine(32, milkMaker, sugarMaker);
  sweetLatte.makeCoffee(2);
}
