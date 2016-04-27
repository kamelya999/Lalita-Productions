$(document).ready(function() {
  console.log('were ready');

  var tasks = [];
  var incomplete = 0;
  var done = 0;
  var progress = 0;

  htmlTask = function(task) {
    var html = "<div class='row tasks-list-item'> <div class='col-xs-12'> <div class='checkbox'><label><input type='checkbox' id='cbox" + task.id + "' onclick='getDoneCount(" + task.id + ")'> " + task.title + "</label><span>" + task.completed + "</span></div></div></div>";
    return html;
  };

  htmlDate = function() {
    var date = new Date();
    var html = "<p>" + date.getDate() + "</p>" + "<span> Monday </span>";
    return html;
  };

  taskData = function() {
    var url = 'http://jsonplaceholder.typicode.com/todos';
    var data = $.ajax({
      url: url,
      method: 'GET'
    }).then(function(response) {
      tasks = response;
      main();
    });
  };

  main = function() {
    var htmlTasks = [];
    for (var i = 0; i < tasks.length; i++) {
      htmlTasks.push(htmlTask(tasks[i]));
    }
    $('.tasks-list').html(htmlTasks.join(""));
    for (var i = 0; i < tasks.length; i++) {
      if (tasks[i].completed === true) {
        done += 1;
      } else {
        incomplete += 1;
      }
    }
    console.log('completed: ', done);
    console.log('incomplete: ', incomplete);

    progress = (done / tasks.length) * 100;

    console.log('progress: ', progress);

    $('#progress').text(progress + "%");
    $('#date').html(htmlDate());
  };

  taskData();
});


// List of todos:
// 1. GET data
// 2. Create html functions
// 3. Loop through data
// 4. Inject results into each container


// Watch for events (example click)
// Rerender (Steps 2 through 4)
