{
  type Todo = {
    title: string;
    description: string;
    label: string;
    priority: 'high' | 'low';
  };

  function updateTodo(todo: Todo, update: Partial<Todo>): Todo {
    return {
      ...todo,
      ...update,
    };
  }

  const todo: Todo = {
    title: 'halo',
    description: 'good',
    label: 'good job',
    priority: 'high',
  };

  const update = updateTodo(todo, { description: 'GOOD', priority: 'low' });
  console.log(update);
}
