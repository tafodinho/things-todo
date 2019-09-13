class Project {
  constructor(name) {
    this.name = name;
    this.todos = [];
    this.id = this.generateId();
  }

  generateId() {
    return `_${Math.random().toString(36).substr(2, 9)}`;
  }
}

export default Project;
