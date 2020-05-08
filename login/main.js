$(function() {

  dbs.connect();

// asdf


  let el = document.getElementById('login-form');

  el.addEventListener('submit', function(e){
    let user = $("#username").val();
    let password = $("#password").val();

    // console.log((user=="user" || user=="admin") && password=="revinno");

    checkUserDetails(user, password);

    // return true;
  }, true);
});

const dbs = new Firebase();

function checkUserDetails(user, password) {
  dbs.get("user-details", function(userData) {

    let userkeys = Object.keys(userData);

    for ( let i=0; i<userkeys.length; i++ ) {
      let key = userkeys[i];
      let userdatum = userData[key]
      console.log(userdatum)

      if ( user == userdatum.username
        && md5(password + "revinno") == userdatum.password ) {
          // console.log("Working");
          submitForm(key);
          return;
      }
    }

    $("#login-form").addClass("active-shake");
    $("#login-form").find("p").addClass("visible")
    setTimeout(function () {
      $("#login-form").removeClass("active-shake");
    }, 600);


  });
}

function submitForm(hash) {
  // $loginForm = $("#login-form");
  // $loginForm.attr("action", `../#${hash}`);

  dbs.set(`user-status/${hash}`, {
    "latest-ping": Date.now(),
    "login-status": true,
  });



  window.location.href = window.location.href.replace("/login/", "") + "#" + hash;




  console.log("details valid");

  // $("#login-form").submit();
}
