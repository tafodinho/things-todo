/* eslint-disable no-use-before-define */
import Project from './project';
import Todo from './todo';


let projects = [];
window.onload = () => {
  if (window.localStorage.getItem('projects') != null) {
    projects = JSON.parse(window.localStorage.getItem('projects'));
    renderProjects();
    renderProjectOptions();
  }
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
    console.log('project');
  } else if (e.target.id.split('-').length === 2) {
    const projectId = e.target.id.split('-')[0];
    const todoId = e.target.id.split('-')[1];
    let todoItem = null;
    projects.forEach((project) => {
      if (project.id === projectId) {
        project.todos.forEach((todo) => {
          if (todo.id === todoId) {
            todoItem = todo;
            return;
          }
        });
        return;
      }
    });
    renderTodo(todoItem);
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
  const title = document.getElementById('todo-title').value;
  const description = document.getElementById('todo-description').value;
  const priority = document.getElementById('todo-priority').value;
  const [project, projectIndex] = document.getElementById('project-options').value.split('-');
  const todo = new Todo(title, description, priority, project);
  if (title.length >= 1) {
    projects[projectIndex].todos.push(todo);
    window.localStorage.clear();
    window.localStorage.setItem('projects', JSON.stringify(projects));
    renderTodos();
  } else {
    alert('Task Title is required');
  }
});

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
    JSON.parse(window.localStorage.getItem('projects')).forEach((value, index) => {
      view += ` 
                <a hfref="" class="clearfix" id="project"> 
                    <img class="float-left" src="../assets/images/icons/plus.svg" alt="triangle with all three sides equal" height="20px" width="30px" />
                    <h6 class="float-left">${value.name}</h6>
                   <img class="float-right" id ="deletes" src="../assets/images/icons/bin.svg" alt="triangle with all three sides equal" height="20px" width="30px" />
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
  project.todos.forEach((todo) => {
    titleList += `<li id="${project.id}-${todo.id}">${todo.title}<img class="float-right" id ="${todo.id}" src="../assets/images/icons/bin.svg" height="20px" width="30px" /></li>`;
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
      project.todos.splice(deleteIndex);
      return;
    }
  });
  console.log("deleted")
  // renderProjects();
}

const renderTodos = () => {
  let view = '';
  projects.forEach((value) => {
    value.todos.forEach((value1) => {
      console.log(value1);
      view += `
                <div class="todo-item">
                    <div class="clearfix todo-item-header">
                        <input class="float-left" type="checkbox">
                        <h6 class="float-left">${value1.title}</h6>
                    </div>
                    <p>
                        ${value1.description}
                    </p>
                    <div class="clearfix todo-item-footer">
                        <h6 class="float-left">Project: </h6>
                        <span cclass="float-left">${value.name}</span>
                    </div>
                </div>
            `;
    });
  });
  document.getElementById('todo-items').innerHTML = view;
};
const renderTodo = (todo) => {
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
              <span cclass="float-left">${todo.name}</span>
          </div>
      </div>
  `;
  document.getElementById('todo-items').innerHTML = view;
};


// setInterval(() => {
//     document.getElementById("project-list").innerHTML = renderProjects()
//     console.log(renderProjects())
// }, 1000);
