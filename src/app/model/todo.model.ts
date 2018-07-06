export class TodoModel {
  constructor(public todo: string, public status: boolean, public created_at?: string,  public finished_at?: string, public id?: number, public isEditing = false) {}
}
