import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TodoDto } from 'src/models/create-todo.dto';
import { TodosDocument } from 'src/models/todos.schema';

@Injectable()
export class TodosService {
  constructor(
    @InjectModel('Todos') private readonly todosModel: Model<TodosDocument>,
  ) {}

  async createTodo(todo: TodoDto, userId: String): Promise<String> {
    const newTodo = new this.todosModel({
      id: todo.id,
      title: todo.title,
      description: todo.description,
      userId: userId,
    });
    const res = await newTodo.save();
    console.log(res);
    return res.userId;
  }

  async getAllTodos(userId: String) {
    const todos = await this.todosModel.find({ userId: userId }).exec();
    console.log(todos);
    todos.map((todo) => ({
      id: todo.id,
      title: todo.title,
      description: todo.description,
      userId: todo.userId,
    }));
    return todos;
  }
}
