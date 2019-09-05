import Project from './project'
import Todo from './todo'


const projects = []


if(document.getElementById("project") !== null) {
    document.getElementsByClassName("project-items")[0].style.display = "none"
    document.getElementById("project").addEventListener("click", (e) => {
        if(e.target.parentNode.nextSibling.nextSibling.style.display === "none") {
            e.target.parentNode.nextSibling.nextSibling.style.display = ""
        } else {
            e.target.parentNode.nextSibling.nextSibling.style.display = "none"
        }
    })
}


document.getElementById("create-project").addEventListener("click", () => {
    const projectName = document.getElementById("project-name").value
    const project = new Project(projectName)
    projects.push(project)
    renderProjects()
    renderProjectOptions()
    console.log(projects)
})

document.getElementById("create-task").addEventListener("click", () => {
    const title = document.getElementById("todo-title").value
    const description = document.getElementById("todo-description").value
    const priority = document.getElementById("todo-priority").value
    const [project, projectIndex] = document.getElementById("project-options").value.split("-")
    const todo = new Todo(title, description, priority, project)
    projects[projectIndex].todos.push(todo)
    renderTodos()
    console.log(projects[projectIndex])
})

const renderProjectOptions = () => {
    let projectOpionView = ``
    projects.forEach((value, index) => {
        projectOpionView += `
            <option value="${value.name+'-'+index}" id="${index}">${value.name}</option>
        `
    })
    document.getElementById("project-options").innerHTML = projectOpionView
}
const renderProjects = () => {
    let view = ``
    projects.forEach((value, index) => {
        view += ` 
            <a hfref="" class="clearfix" id="project"> 
                <img class="float-left" src="../assets/images/icons/plus.svg" alt="triangle with all three sides equal" height="20px" width="30px" />
                <h6 class="flaot-left">${value.name}</h6>
            </a>
        
        `
    })
    document.getElementById("project-list").innerHTML = view
}

const renderTodos = () => {
    let view = ``
    projects.forEach((value, index) => {
        value.todos.forEach((value1, index1) => {
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
            `
        })
    })
    document.getElementById("todo-items").innerHTML = view
}


// setInterval(() => {
//     document.getElementById("project-list").innerHTML = renderProjects()
//     console.log(renderProjects())
// }, 1000);