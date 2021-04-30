export class TodoDto {
  constructor(
    public id: String,
    public title: String,
    public description: String,
    public userId?: String,
  ) {}
}
