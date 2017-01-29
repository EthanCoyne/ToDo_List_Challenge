$(function() {
  console.log('welcome to the DOM');
  $('#addTaskButton').on('click', addTask)
  getTasks();
}); // end doc ready


function addTask(event) {
  event.preventDefault();
  console.log('addTask() called');
  var formData = $(this).closest('form').serialize();
  console.log(formData);

  $.ajax({
    url:'/tasks',
    type: 'POST',
    data:formData,
    success: function(formData){
      console.log('ajax success, returned: ', formData);
      getTasks();
    }
  }); // end ajax POST
}// end addTask()


function getTasks() {
  console.log('getTasks ajax call made');
  $.ajax({
    url: '/tasks',
    type:'GET',
    success: displayTasks
  }); //end ajax
} // end getTasks

function displayTasks(tasks) {
  console.log('displayTasks() called', tasks);
  $('#taskDisplay').empty();

  tasks.forEach(function(task) {
    var $li = $('<li></li>');

    $li.append('<p>' + task.task + '</p>');
    $li.append('<button id="'+task.id+'" class="complete">Complete</button>');
    $li.append('<button id="'+task.id+'" class="delete">Delete</button>');

    $('#taskDisplay').append($li);
  }); // end tasks.forEach
} // end displayTasks()
