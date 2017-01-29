$(function() {
  console.log('welcome to the DOM');
  getTasks();
  $('#addTaskButton').on('click', addTask);
  $('.displayContainer').on('click', '.complete',  completeTask);

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

    $li.append('<p id="task'+task.id+'">' + task.task + '</p>');
    $li.append('<button id="complete'+task.id+'" class="complete">Complete</button>');
    $li.append('<button id="delete'+task.id+'" class="delete">Delete</button>');

    $('#taskDisplay').append($li);
  }); // end tasks.forEach
} // end displayTasks()

function completeTask() {
  console.log('completeTask called on', $(this).closest('li'));
  $(this).closest('li').addClass('completed');
}// end completeTask()
