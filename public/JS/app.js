$(document).ready(function(){
    // photo carousel modal
    $("#demo01").animatedModal();
    // photo carousel
    $("#theTarget").skippr({
        transition: 'slide',
        speed: 1000,
        easing: 'easeOutQuart',
        navType: 'block',
        childrenElementType: 'div',
        arrows: true,
        autoPlay: false,
        autoPlayDuration: 5000,
        keyboardOnAlways: true,
        hidePrevious: false
    });
    // Page transition
    $(".animsition").animsition();
    // $('#all_elements .element').sort(sortDescending).appendTo('#all_elements');

var settings = $.extend({

// menu selector
'menu': ('#menu'),

// trigger selector
'push': ('.push'),

// The side of the navigation menu (either 'right' or 'left')
'side': 'left',

// the width of your menu
'menuWidth': '15.625em',

// animation speed
'speed': '300',

'state': 'closed',

// CSS class added to the menu button when it is open
'activeBtn': 'active',

// allow users to toggle the menu closed with any click
'easyClose': false

}, options);

  $("#AdminBtn").click(function() {
    var adminKey = $("#key").val();
    console.log(adminKey);

  });
});
// document.getElementById('AdminBtn').addEventListener('click', function() {
//   var adminKey = document.getElementById('key').value;
//   console.log(adminKey);
// }, false);


// STICKY NAV --------------------------------------------------------
var win      = $(window),
    fxel     = $('nav'),
    eloffset = fxel.offset().top;

win.scroll(function() {
    if (eloffset < win.scrollTop()) {
        fxel.addClass("fixed");
    } else {
        fxel.removeClass("fixed");
    }
});
// --------------------------------------------------------------------


// BLOG PAGE-----------------------------------------------------------


//  Creates an empty Array
var blogs = [];
function showForm() {
    $(".form").toggle();
}
function closeForm() {
  $(".form").toggle();
}
$("li").sort(function(a,b){
    return new Date($(a)) > new Date($(b));
}).each(function(){
    $("#blogs").prepend(this);
})

function BlogPost(title, description, body, author, Date){
  this.title = title;
  this.description = description;
  this.body = body;
  this.author = author;
  this.date = new Date;
}

function getBlogs(){
  var req = new XMLHttpRequest();
  req.open("GET", "https://pages-blog.firebaseio.com/.json");
  req.onload = function(){
  console.log(req);
  if (200 <= this.status < 400){
    var res = JSON.parse(this.response);
    console.log(res);
    var elemStr = "";
    var edBtn = '';
    blogs.length = 0; // empties the array
    for (var prop in res){
      res[prop]._id = prop;
      blogs.push(res[prop]);
      elemStr += "<br><li><span id='BlogTitle'>" + res[prop].title + "</span><br>Summary:  "
      + res[prop].description + " <br>Author: <b>"
      + res[prop].author + "</b><br>Published: " +  res[prop].date + "<br><br>" +  res[prop].body + "<br><br>"
      + "<button class='editBtn' style='margin-left:10px; text-align:center;' class='btn btn-warning btn-sm' onclick='startEdit(" + (blogs.length - 1) + ")'>Edit</button>"
      + "</li><hr>"
      // console.log(res[prop]);
      $("#blogMessage").hide();
      $("#buttonsGoHere").html('');
    }

    document.getElementById('blogs').innerHTML = elemStr;
    // console.log(res);
    }else {
      console.log(this.response);
    }
  }
  req.send();
}
getBlogs();

 // THIS CODE BLOCK CONTROLS WHAT IS DISPLAYED WHEN ADMIN KEY IS INPUT
document.getElementById('AdminBtn').addEventListener('click', function() {
  var Key = 'admin';
  var adminKey = document.getElementById('key').value;
    if(adminKey === Key) {
      $('.editBtn').css( 'display', 'inline-block')
      $('#delBtn').css( 'display', 'inline-block')
    }
    else {
      alert('Please enter a valid Admin Key!');
      document.getElementById('key').value = '';
    }
    console.log(adminKey);
    document.getElementById('key').value = '';
}, false);


function startEdit(index){
  $("#editTitle").val(blogs[index].title);
  $("#editDescription").val(blogs[index].description);
  $("#editBody").val(blogs[index].body);
  $("#editAuthor").val(blogs[index].author);
  $("#editSubmitButton").html('<button onclick="saveEdit(' + index +')" class="btn btn-primary">Save Changes</button>');
  $("#myModal").modal('toggle');
}

function saveEdit(index){
  var title = $("#editTitle").val();
  var description = $("#editDescription").val();
  var body = $("#editBody").val();
  var author = $("#editAuthor").val();
  var blog = new BlogPost(title, description, body, author, Date);

  $.ajax({
    url: "https://pages-blog.firebaseio.com/" + blogs[index]._id + "/.json",
    type: "PUT",
    data: JSON.stringify(blog)
  }).success(function(res){
     res = this.response
    getBlogs();
  })
  $("#myModal").modal('toggle');
}

function saveBlogs(){
  var title = document.getElementById("blogTitle").value;
  var body = document.getElementById("blogBody").value;
  var description = document.getElementById("blogDescription").value;
  var author = document.getElementById("blogAuthor").value;
  // if feild is empty then return out of function, else execute
  if (title === ""  || body === ""  || author === "") {
    return
  }
  var blog = new BlogPost(title, description, body, author, Date);
  var req = new XMLHttpRequest();
  req.open('POST',"https://pages-blog.firebaseio.com/.json");
  req.onload = function(){
      $(".form").hide();
      getBlogs();
  }
  document.getElementById("blogTitle").value = "";
  document.getElementById("blogDescription").value = "";
  document.getElementById("blogBody").value = "";
  document.getElementById("blogAuthor").value = "";
  req.send(JSON.stringify(blog));

    // setting date created
  var d = new Date();
  var month = d.getMonth()+1;
  var day = d.getDate();
  var output = d.getFullYear() + '/' +
      ((''+month).length<2 ? '0' : '') + month + '/' +
      ((''+day).length<2 ? '0' : '') + day;

document.getElementById("blogs").value = "<br><time>" + output + "</time>";
}


function deleteBlogs() {
  var elemStr = "";
  for (var i=0; i<blogs.length; i+=1){
    elemStr +="<li><input id='"+ blogs[i]._id + "'type='checkbox' value='false' class='form-control' style='dislay:inline-block; margin-right:5px; margin-bottom:5px;'/>" + blogs[i].title + ": " + blogs[i].description + " | " + blogs[i].body + "</li>"
    }
    $("#blogs").html(elemStr);
    $("#buttonsGoHere").html('<button class="btn btn-success" onclick="saveDelete()">Delete Selected</button><button class="btn btn-danger" onclick="cancel()">Cancel</button>');

  }
function cancel(){
  $("#buttonsGoHere").html('');
  getBlogs();
}
var delCount,
    boxes;
function saveDelete(){
  delCount = 0;
  boxes = $(":checkbox:checked");
  if(boxes.length > 0){
    deleteBlogsFunc(boxes[0].id);
  }
}
//  recursive function
function deleteBlogsFunc(id){
  $.ajax({
    url:'https://pages-blog.firebaseio.com/' + id + '/.json', type: 'DELETE'
  }).success(function(){
    delCount += 1;
    if(delCount < boxes.length){
      deleteBlogsFunc(boxes[delCount].id);
    } else {
      getBlogs();
    }
  })
}
