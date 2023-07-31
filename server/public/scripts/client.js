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
     <button class="btn btn-outline-primary btn-markComplete">
   Complete
     </button>
   </td>
   <td>
     <button type="button" class="btn btn-outline-danger btn-delete" data-bs-toggle="modal" data-bs-target="#exampleModal">
  DELETE?
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
     <button class="btn btn-outline-primary btn-markComplete" disabled>
   Complete
     </button>
   </td>
   <td>
   <button type="button" class="btn btn-outline-danger btn-delete" data-bs-toggle="modal" data-bs-target="#exampleModal">
   DELETE?
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

// Never got this modal to work 😢
// function modal(){
//   let newRow = $(`
//   <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
//   <div class="modal-dialog">
//     <div class="modal-content">
//       <div class="modal-header">
//         <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
//         <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//       </div>
//       <div class="modal-body">
//         ...
//       </div>
//       <div class="modal-footer">
//         <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
//         <button type="button" class="btn btn-primary">Save changes</button>
//       </div>
//     </div>
//   </div>
// </div>
//   `)
//   $('#viewTasks').append(newRow)
// }