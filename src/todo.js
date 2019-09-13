class Todo {
  constructor(title, description, priority, project, dueDate) {
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.project = project;
    this.dueDate = dueDate;
    this.id = this.generateId();
  }

  generateId() {
    return `_${Math.random().toString(36).substr(2, 9)}`;
  }
}

export default Todo;
