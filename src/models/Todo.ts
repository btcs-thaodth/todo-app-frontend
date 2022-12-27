export interface TodoType {
    id: number,
    title: string,
    content: string,
    status: string,
    created_at: string,
}

export interface CreateTodoForm{
    title: string,
    content: string
  }