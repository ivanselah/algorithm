/**
 * Stack 자료구조
 * LIFO (Last In First Out)
 */

interface IStack {
  readonly size: number;
  push(value: string): void;
  pop(): string | undefined;
}

/**
 * 한 번 만들어지면 이후 변경되지 않도록 readonly 불변성유지
 */
type StackNode = {
  readonly value: string;
  readonly nextNode?: StackNode;
};

class Stack implements IStack {
  private head?: StackNode;
  private _size: number = 0;
  get size() {
    return this._size;
  }
  private nextNode?: StackNode;
  push(value: string) {
    const node: StackNode = { value, nextNode: this.head };
    this.head = node;
    this._size += 1;
  }
  pop(): string | undefined {
    if (this.head === undefined) {
      throw new Error('Stack is Empty!!');
    }
    const node = this.head;
    this.head = node.nextNode;
    this._size -= 1;
    return node.value;
  }
}

const stack = new Stack();
stack.push('Hello');
stack.push('Hell1');
stack.push('Hell2');
stack.push('Hell3');
console.log(stack.pop());
console.log(stack.pop());
console.log(stack.pop());
console.log(stack.pop());
