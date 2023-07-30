console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  $('#addButton').on('click', addTask)
  $('#viewTasks').on('click', '.btn-markComplete', taskComplete)
  $('#viewTasks').on('click', '.btn-delete', deleteTask)
  // load existing koalas on page load
  render()

}); // end doc ready

function taskComplete() {
  const taskId = $(this).parent().parent().data('id') //❌ parent.() is TBD

  console.log("Marking task id:", taskId)

  $.ajax({
    method: 'PUT',
    url: `tasks/taskcomplete/${taskId}`
  })
  .then((response) => {
    console.log("Got Id:", taskId)

   render()
  })
  .catch((error) => {
    console.log(error)
})
}

function deleteTask(){
  console.log("You clicked on: ", $(this))

  // getter
  const taskId= $(this).parent().parent().data('id') //❌ parent() is TBD
  console.log('in deleteTask: id is...', taskId)

  // ajax delete request to /tasks/:id
  $.ajax({
    method: 'DELETE',
    url: `/tasks/deletetask/${taskId}`
  })
  .then((response) => {
    // will retrieve latest version of table and rerender to DOM
    render()
  })
}

function addTask() {
{
    console.log( 'in addTask' );
    // get user input and put in an object
    // using a test object
    let taskToSend = {
      task: $('#taskIn').val(),
      complete: false,
    }
    $.ajax({
      type: 'POST',
      url: '/tasks',
      data: taskToSend
  }).then( function (response) {
    $('#taskIn').val(''),
    render()
});
    // call srender with the new obejct
   }; 
 }

function getTasks(){
  console.log( 'in getTaskss' );
  // ajax call to server to get tasks
  $("#viewTasks").empty();
  $.ajax({
    type: 'GET',
    url: '/tasks'
}).then(function (response) {
  for (let i = 0; i < response.length; i++){
    if(response[i].complete == false){
    let newRow = $(`
    <tr id=notComplete>
<td>${response[i].task}</td>
<td>${response[i].complete}</td>
<td>
     <button class="btn-markComplete">
   Complete
     </button>
   </td>
   <td>
     <button class="btn-delete">
      Delete
     </button>
       </td>
    </tr>
    `)
    newRow.data('id',response[i].id)
    $('#viewTasks').append(newRow)
  }else{
    let newRow = $(`
    <tr id=complete>
<td>${response[i].task}</td>
<td>${response[i].complete}</td>
<td>
     <button class="btn-markComplete">
   Complete
     </button>
   </td>
   <td>
     <button class="btn-delete">
      Delete
     </button>
       </td>
    </tr>
    `)
    newRow.data('id',response[i].id)
    $('#viewTasks').append(newRow)
  }
}
});
}

function render(){
  getTasks()
}