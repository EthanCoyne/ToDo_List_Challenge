$(function() {
  console.log('welcome to the DOM');
  getTasks();
  $('#addTaskButton').on('click', addTask);
  $('.displayContainer').on('click', '.completeButton',  completeTask);
  $('.displayContainer').on('click', '.delete', deleteTask);

}); // end doc ready


function addTask(event) {
  event.preventDefault();
  console.log('addTask() called');
  var formData = $(this).closest('form').serialize();
  console.log(formData);
  $(this).closest('form').find("input[type=text], textarea").val("");

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
    var $completedLi = $('<li class="completed"></li>')

    if(task.completed == 0) {
    $li.append('<p id="task'+task.id+'">' + task.task + '</p>');
    $li.append('<button id="'+task.id+'" class="completeButton">Complete</button>');
    $li.append('<button id="'+task.id+'" class="delete">Delete</button>');
    $('#taskDisplay').append($li);
  } else {
    $completedLi.append('<p id="task'+task.id+'">' + task.task + '</p>');
    $completedLi.append('<button id="'+task.id+'" class="completeButton">Completed!</button>');
    $completedLi.append('<button id="'+task.id+'" class="delete">Delete</button>');
    $('#taskDisplay').append($completedLi);
  }

  }); // end tasks.forEach
} // end displayTasks()

function completeTask() {
  console.log('completeTask called on', $(this).closest('li'));
  $(this).closest('li').addClass('completed');
  $(this).text('Completed!');
  var taskId = $(this).attr('id');
  $.ajax({
    url: '/tasks/' + taskId,
    type: 'PUT',
    success: function() {
      console.log('completeTask PUT for: ', taskId);
      getTasks();
    }
  }); //end ajax PUT
}// end completeTask()

function deleteTask() {
  console.log('deleteTask called on ', $(this).closest('li'));
  event.preventDefault();
  var taskId=$(this).attr('id');
  var okToDelete = confirm("Are you sure you want to delete this task?");
    if(okToDelete == true){
      $.ajax({
      url:'/tasks/'+ taskId,
      type: 'DELETE',
      success: function() {
        getTasks();
      }
      }); // end ajax DELETE
    } else {
      return;
    }
  // console.log('clicked id: ', taskId);

}
