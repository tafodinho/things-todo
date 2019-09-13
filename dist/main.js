!function(e){var t={};function n(o){if(t[o])return t[o].exports;var l=t[o]={i:o,l:!1,exports:{}};return e[o].call(l.exports,l,l.exports,n),l.l=!0,l.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var l in e)n.d(o,l,function(t){return e[t]}.bind(null,l));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);var o=class{constructor(e){this.name=e,this.todos=[],this.id=this.generateId()}generateId(){return`_${Math.random().toString(36).substr(2,9)}`}};var l=class{constructor(e,t,n,o,l){this.title=e,this.description=t,this.priority=n,this.project=o,this.dueDate=l,this.id=this.generateId()}generateId(){return`_${Math.random().toString(36).substr(2,9)}`}};let i=[];window.onload=()=>{null!=window.localStorage.getItem("projects")&&(i=JSON.parse(window.localStorage.getItem("projects")),s(),r())},null!==document.getElementById("project")&&(document.getElementsByClassName("project-items")[0].style.display="none",document.getElementById("project").addEventListener("click",e=>{"none"===e.target.parentNode.nextSibling.nextSibling.style.display?e.target.parentNode.nextSibling.nextSibling.style.display="":e.target.parentNode.nextSibling.nextSibling.style.display="none"})),document.getElementById("project-list").addEventListener("click",e=>{if(1===e.target.id.split("-").length)console.log("project");else if(2===e.target.id.split("-").length){const t=e.target.id.split("-")[0],n=e.target.id.split("-")[1];let o=null,l=null;i.forEach(e=>{e.id!==t||e.todos.forEach(t=>{if(t.id===n)return o=t,void(l=e.name)})}),c(o,l)}else if(3===e.target.id.split("-").length){if("delete"===e.target.id.split("-")[0]){const t=e.target.id.split("-")[1],n=e.target.id.split("-")[2];d(n,t),window.localStorage.clear(),window.localStorage.setItem("projects",JSON.stringify(i)),s()}}}),document.getElementById("create-project").addEventListener("click",()=>{const e=document.getElementById("project-name").value;let t=null;e.length>=1?(t=new o(e),i.push(t),window.localStorage.setItem("projects",JSON.stringify(i)),s(),r()):alert("Project name is required")}),document.getElementById("create-task").addEventListener("click",()=>{const e=document.getElementById("todo-title").value,t=document.getElementById("todo-description").value,n=document.getElementById("todo-priority").value,o=document.getElementById("due-date").value,[r,a]=document.getElementById("project-options").value.split("-"),d=new l(e,t,n,r,o);e.length>=1?(i[a].todos.push(d),window.localStorage.clear(),window.localStorage.setItem("projects",JSON.stringify(i)),c(d,r),s()):alert("Task Title is required")});const r=()=>{let e="";null!=window.localStorage.getItem("projects")?(JSON.parse(window.localStorage.getItem("projects")).forEach((t,n)=>{e+=`\n                <option value="${`${t.name}-${n}`}" id="${n}">${t.name}</option>\n            `}),document.getElementById("project-options").innerHTML=e):document.getElementById("create-task").setAttribute("disabled","true")},s=()=>{let e="";null!=window.localStorage.getItem("projects")&&(JSON.parse(window.localStorage.getItem("projects")).forEach((t,n)=>{e+=` \n                <a hfref="" class="clearfix" id="project"> \n                    <img class="float-left" src="../assets/images/icons/plus.svg" alt="triangle with all three sides equal" height="20px" width="30px" />\n                    <h6 class="float-left">${t.name}</h6>\n                   \n                </a>\n                <ul class="project-items">\n                    ${a(t)}\n                </ul>\n            `}),document.getElementById("project-list").innerHTML=e)},a=e=>{let t="";return e.todos.forEach(n=>{t+=`<li class"project-todos" id="${e.id}-${n.id}">${n.title}<img class="float-right" id ="delete-${e.id}-${n.id}" src="../assets/images/icons/bin.svg" height="20px" width="30px" /></li>`}),t},d=(e,t)=>{let n=null;i.forEach(o=>{if(o.id===t)return o.todos.forEach((t,o)=>{t.id!==e||(n=o)}),void o.todos.splice(n,1)}),console.log(i)},c=(e,t)=>{let n="";n=`\n      <div class="todo-item">\n          <div class="clearfix todo-item-header">\n              <input class="float-left" type="checkbox">\n              <h6 class="float-left">${e.title}</h6>\n          </div>\n          <p>\n              ${e.description}\n          </p>\n          <div class="clearfix todo-item-footer">\n              <h6 class="float-left">Project: </h6>\n              <span cclass="float-left">${t}</span>\n          </div>\n           <div class="clearfix todo-item-footer">\n              <h6 class="float-left">Due Date: </h6>\n              <span cclass="float-left">${e.dueDate}</span>\n          </div>\n      </div>\n  `,document.getElementById("todo-items").innerHTML=n}}]);