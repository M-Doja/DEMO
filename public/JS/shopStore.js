// var user = {};
// function getUsers(){
//   var req = new XMLHttpRequest();
//   req.open("GET", "https://pages-shop.firebaseio.com/.json");
//   req.onload = function(){
//   console.log(req);
//   if (200 <= this.status < 400){
//     var res = JSON.parse(this.response);
//     console.log(res);
//     var elemStr = "";
//     user.length = 0; // empties the array
//     for (var prop in res){
//       res[prop]._id = prop;
//       for(var prop2 in res[prop]) {
//         console.log(res[prop][prop2]);
//         for (var prop3 in res[prop][prop2]) {
//           console.log(res[prop][prop2][prop3]);
//           for (var prop4 in res[prop][prop2][prop3]) {
//             console.log(res[prop][prop2][prop3][prop4].name);
//             var res = res[prop][prop2][prop3][prop4];
//             var str = "<h1>" +res.name + "</h1><br><h4>" + res.companyName + "<br>"
//             + res.memberGrp + "<br>";
//             + "<img src='" + res.photo + "'> ";
//             document.getElementById('showHere').innerHTML = str;
//             getUsers();
//           }
//         }
//       }
    // }
//       // user.push(res[prop]);
//       // elemStr += "<br><li><span id='BlogTitle'>" + res[prop].name + "</span><br>"
//       // + "<img class='img-responsive' src='"+res[prop].photo +"'><br>"
//       // + "Summary:  "+ res[prop].companyName + "<br>"
//       // + "Author: <b>" + res[prop].memberGrp + "</b><br>"
//       // + "Published: " +  res[prop].date + "<br><br>" +  res[prop].body + "<br><br>"
//       // + "<button style='margin-bottom:40px;' class='btn btn-warning btn-sm editBtn' onclick='startEdit(" + (user.length - 1) + ")'>Edit</button>"
//       // + "</li><a href='#'>Top</a><hr class='hr'>"
//       // $("#blogMessage").hide();
//       // $("#buttonsGoHere").html('');
//     }
//     document.getElementById('showHere').innerHTML = str;
//     // console.log(res);
//     }else {
//       console.log(this.response);
//     }
//   }
//   req.send();
// }
// getUsers();
// Get a database reference to our posts
// var ref = new Firebase("https://pages-shop.firebaseio.com/web/uauth");
// // Attach an asynchronous callback to read the data at our posts reference
// ref.on("value", function(snapshot) {
//   console.log(snapshot.val());
// }, function (errorObject) {
//   console.log("The read failed: " + errorObject.code);
// });
