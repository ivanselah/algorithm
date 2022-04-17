{
  interface IStack<T> {
    readonly size: number;
    push(value: T): void;
    pop(): T | undefined;
  }
  type StackNode<T> = {
    readonly value: T;
    readonly nextNode?: StackNode<T>;
  };

  class Stack<T> implements IStack<T> {
    private head?: StackNode<T>;
    private _size: number = 0;
    get size() {
      return this._size;
    }
    private nextNode?: StackNode<T>;
    push(value: T) {
      const node: StackNode<T> = { value, nextNode: this.head };
      this.head = node;
      this._size += 1;
    }
    pop(): T | undefined {
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
  stack.push(123);
  stack.push(true);
  stack.push({ Hello: 'Welcome', Job: 'GoGo' });
  console.log(stack.pop());
  console.log(stack.pop());
  console.log(stack.pop());
  console.log(stack.pop());
}
