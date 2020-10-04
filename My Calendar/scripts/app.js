
var visible = false;
var important = false;
var showIcon = '<i class="fas fa-eye"></i>'
var hideIcon = '<i class="fas fa-eye-slash"></i>'
var UI = {};
var taskList =[];

function showDetails() {
    console.log("btn clicked!");

    if(!visible) {
        UI.secForm.removeClass('hide');
        UI.btnShow.html(hideIcon+'hide details');
        visible = true;
    }
    else {
        UI.secForm.addClass('hide');
        UI.btnShow.html(showIcon+'show details');
        visible=false;
    }

}

function toggleImportant() {
    
    if(!important) {
       UI.btnImportant.removeClass("far")
       UI.btnImportant.addClass("fas active")
        important = true;
    }
    else {
       UI.btnImportant.removeClass("fas active")
       UI.btnImportant.addClass("far")
        important = false;
    }

}

function saveTask() {
    var title = UI.txtTitle.val();
    var date = UI.txtDate.val();
    var Description = UI.txtDescription.val();
    var alert = UI.txtAlert.val();
    var location = UI.txtLocation.val();
    
    
    var task = new Task(title, important, date, Description, alert, location);
    taskList.push(task);
    clearForm();

    console.log(taskList);

    $.ajax({
        url: 'http://fsdi.azurewebsites.net/api/tasks',
        type:'POST',
        data: JSON.stringify(task),
        contentType:"application/json",
        success: function(res) {
            $("#alertSuccess").removeClass('hide');


            setTimeout(function(){
                $("#alertSuccess").addClass('hide');
            },3000);
        },
        error: function(details) {
            console.log("Error", details);
        }



    });

}

function testGet() {
    $.ajax({
        url:'http://restclass.azurewebsites.net/api/test',
        type:'Get',
        success: function(response) {
            console.log("req succeed", response);
        },
        
        error: function(){
            console.log("Error :(", details);

        }

    });
}

function clearForm(){
    $(".control").val("");
    UI.btnImportant.removeClass("fas active")
    UI.btnImportant.addClass("far")
     important = false;
}

function init() {
    console.log("main page");

    UI = {
        btnShow: $("#btnShow"),
        btnImportant: $("#btnImportant"),
        secForm: $("#secForm"),
        btnSave: $("#btnSave"),
        txtTitle: $("#txtTitle"),
        txtDate: $("#txtDate"),
        txtDescription: $("#txtDescription"),
        txtAlert: $("#txtAlert"),
        txtLocation: $("#txtLocation"),
    };

    console.log(UI);

    // get data from servers

    //hook events
    UI.btnShow.click(showDetails);
    UI.btnImportant.click(toggleImportant);
    UI.btnSave.click(saveTask);

    //set the text of an input field
    
}

window.onload = init;

/* HTTP Request
 * Http methods (verbs)
 * Http status codes
 * 
 * Http vs https */
