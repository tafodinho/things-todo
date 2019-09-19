/* eslint-disable no-useless-return */
/* eslint-disable no-use-before-define */
import Project from './project';
import Todo from './todo';


let projects = [];

window.onload = () => {
  if (window.localStorage.getItem('projects') != null) {
    projects = JSON.parse(window.localStorage.getItem('projects'));
  } else {
    const defaultProject = new Project('default');
    projects.push(defaultProject);
    window.localStorage.setItem('projects', JSON.stringify(projects));
  }
  renderProjects();
  renderProjectOptions();
};

if (document.getElementById('project') !== null) {
  document.getElementsByClassName('project-items')[0].style.display = 'none';
  document.getElementById('project').addEventListener('click', (e) => {
    if (e.target.parentNode.nextSibling.nextSibling.style.display === 'none') {
      e.target.parentNode.nextSibling.nextSibling.style.display = '';
    } else {
      e.target.parentNode.nextSibling.nextSibling.style.display = 'none';
    }
  });
}

document.getElementById('project-list').addEventListener('click', (e) => {
  if (e.target.id.split('-').length === 1) {

  } else if (e.target.id.split('-').length === 2) {
    const projectId = e.target.id.split('-')[0];
    const todoId = e.target.id.split('-')[1];
    let todoItem = null;
    let projectName = null;
    projects.forEach((project) => {
      if (project.id === projectId) {
        project.todos.forEach((todo) => {
          if (todo.id === todoId) {
            todoItem = todo;
            projectName = project.name;
            return;
          }
        });
        return;
      }
    });
    renderTodo(todoItem, projectName);
  } else if (e.target.id.split('-').length === 3) {
    const value = e.target.id.split('-')[0];
    if (value === 'delete') {
      const projectId = e.target.id.split('-')[1];
      const todoId = e.target.id.split('-')[2];
      deleteTodo(todoId, projectId);
      window.localStorage.clear();
      window.localStorage.setItem('projects', JSON.stringify(projects));
      renderProjects();
    } else if (value === 'edit') {
      const projectId = e.target.id.split('-')[1];
      const todoId = e.target.id.split('-')[2];
      editTodo(todoId, projectId);
    }
  }
});

document.getElementById('create-project').addEventListener('click', () => {
  const projectName = document.getElementById('project-name').value;
  let project = null;
  if (projectName.length >= 1) {
    project = new Project(projectName);
    projects.push(project);
    window.localStorage.setItem('projects', JSON.stringify(projects));
    renderProjects();
    renderProjectOptions();
  } else {
    alert('Project name is required');
  }
});


document.getElementById('create-task').addEventListener('click', () => {
  const task = document.getElementById('create-task').innerHTML;
  if (task === 'Update') {
    editItem();
  } else if (task === 'Submit') {
    createTodo();
  }
});
const createTodo = () => {
  const title = document.getElementById('todo-title').value;
  const description = document.getElementById('todo-description').value;
  const priority = document.getElementById('todo-priority').value;
  const dueDate = document.getElementById('due-date').value;
  const [project, projectIndex] = document.getElementById('project-options').value.split('-');
  const todo = new Todo(title, description, priority, project, dueDate);
  if (title.length >= 1) {
    projects[projectIndex].todos.push(todo);
    window.localStorage.clear();
    window.localStorage.setItem('projects', JSON.stringify(projects));
    renderTodo(todo, project);
    renderProjects();
  } else {
    alert('Task Title is required');
  }
};

const renderProjectOptions = () => {
  let projectOpionView = '';
  if (window.localStorage.getItem('projects') != null) {
    JSON.parse(window.localStorage.getItem('projects')).forEach((value, index) => {
      projectOpionView += `
                <option value="${`${value.name}-${index}`}" id="${index}">${value.name}</option>
            `;
    });
    document.getElementById('project-options').innerHTML = projectOpionView;
  } else {
    document.getElementById('create-task').setAttribute('disabled', 'true');
  }
};

const renderProjects = () => {
  let view = '';
  if (window.localStorage.getItem('projects') != null) {
    JSON.parse(window.localStorage.getItem('projects')).forEach((value) => {
      view += ` 
                <a hfref="" class="clearfix" id="project"> 
                    <img class="float-left" src="../assets/images/icons/plus.svg" alt="triangle with all three sides equal" height="20px" width="30px" />
                    <h6 class="float-left">${value.name}</h6>
                   
                </a>
                <ul class="project-items">
                    ${renderTodoTitles(value)}
                </ul>
            `;
    });
    document.getElementById('project-list').innerHTML = view;
  }
};

const renderTodoTitles = (project) => {
  let titleList = '';
  project.todos.forEach(({ id, title }) => {
    titleList += `<li class"project-todos" 
                  id="${project.id}-${id}">${title}
                  <img class="float-right" 
                  id ="delete-${project.id}-${id}" 
                  src="../assets/images/icons/bin.svg" 
                  height="20px" width="30px" />
                  <img class="float-right" 
                  id ="edit-${project.id}-${id}" 
                  src="../assets/images/icons/edit.svg" 
                  height="20px" width="30px" />
                  </li>`;
  });
  return titleList;
};

const deleteTodo = (todoId, projectId) => {
  let deleteIndex = null;
  projects.forEach((project) => {
    if (project.id === projectId) {
      project.todos.forEach((todo, index) => {
        if (todo.id === todoId) {
          deleteIndex = index;
          return;
        }
      });
      project.todos.splice(deleteIndex, 1);
      return;
    }
  });
};

const editTodo = (todoId, projectId) => {
  let todoItem = null;
  let projectName = null;
  let todoIndex = null;
  let projectIndex = null;
  projects.forEach((project, index1) => {
    if (project.id === projectId) {
      project.todos.forEach((todo, index2) => {
        if (todo.id === todoId) {
          todoItem = todo;
          projectName = project.name;
          todoIndex = index2;
          projectIndex = index1;
          return;
        }
      });
      return;
    }
  });
  document.getElementById('todo-title').value = todoItem.title;
  document.getElementById('todo-description').value = todoItem.description;
  document.getElementById('todo-priority').value = todoItem.priority;
  document.getElementById('due-date').value = todoItem.dueDate;
  document.getElementById('project-options').value = projectName;
  document.getElementById('create-task').innerHTML = 'Update';
  document.getElementById('edit-id').value = `${projectIndex}-${todoIndex}`;
};

const editItem = () => {
  const title = document.getElementById('todo-title').value;
  const description = document.getElementById('todo-description').value;
  const priority = document.getElementById('todo-priority').value;
  const dueDate = document.getElementById('due-date').value;
  const projectName = document.getElementById('project-options').value;
  const projectIndex = document.getElementById('edit-id').value.split('-')[0];
  const todoIndex = document.getElementById('edit-id').value.split('-')[1];

  projects[projectIndex].todos[todoIndex].title = title;
  projects[projectIndex].todos[todoIndex].description = description;
  projects[projectIndex].todos[todoIndex].priority = priority;
  projects[projectIndex].todos[todoIndex].dueDate = dueDate;
  projects[projectIndex].name = projectName;
  window.localStorage.clear();
  window.localStorage.setItem('projects', JSON.stringify(projects));
  renderProjects();
  document.getElementById('create-task').innerHTML = 'Submit';
  document.getElementById('edit-id').value = '';
};

const renderTodo = (todo, projectName) => {
  let view = '';
  view = `
      <div class="todo-item">
          <div class="clearfix todo-item-header">
              <input class="float-left" type="checkbox">
              <h6 class="float-left">${todo.title}</h6>
          </div>
          <p>
              ${todo.description}
          </p>
          <div class="clearfix todo-item-footer">
              <h6 class="float-left">Project: </h6>
              <span cclass="float-left">${projectName}</span>
          </div>
           <div class="clearfix todo-item-footer">
              <h6 class="float-left">Due Date: </h6>
              <span cclass="float-left">${todo.dueDate}</span>
          </div>
      </div>
  `;
  document.getElementById('todo-items').innerHTML = view;
};
