


$(function() {

  Page.initPages();

  // TODO: UNCOMMENT THIS TO RE ENABLE LOGIN-REDIRECTION

  //Why doesnt this work

  setTimeout(function() {
    $(".loading-animation").css("opacity", 0);
    setTimeout(function() {
      $(".welcome-page").find("h1").html(`Welcome ${username}`)
      $(".welcome-page").css("opacity", 1);
    }, 1000);
  }, 2000);


  setTimeout(function () {
    $(".loading-page").css("opacity", 0);
    setTimeout(function () {
      $(".loading-page").remove();
    }, 800);
  }, 4500);

  // Design
  $("#page-container").load("./pages/design/preliminary-design/preliminary-design.html");
  // $("#page-container").load("./pages/design/logistics/logistics.html");


  // Monitor status
  // $("#page-container").load("./pages/monitor-status/order-status/order-status.html");
  // $("#page-container").load("./pages/monitor-status/order-status/order-status.html");
  // $("#page-container").load("./pages/monitor-status/order-status/order-status.html");
  // $("#page-container").load("./pages/monitor-status/order-status/order-status.html");

  // Report Generation



  $.getScript( "js/test.js", function( data, textStatus, jqxhr ) {

  }).fail(function(){
    if( arguments[0].readyState==0 ){
        //script failed to load
        console.error("Fauked to load");
    } else {
        //script loaded but failed to parse
        console.error(arguments[2].toString());
    }
  });



  // setTimeout(function () {
  //   initFirebase();
  // }, 1000);


});




// function hashFormat(hash) {
//   let str = hash.replace("#", "");
//   str = formatString(str);
//   return str;
// }





// console.log();











var activePage = "";

function updateBreadCrumbs(type, subType) {

  $breadcrumbs = $(".breadcrumbs");
  $breadcrumbs.css("opacity", 0);

  setTimeout(function () {
    $breadcrumbs.html(`<h3>${formatString(type)} <i class="fas fa-arrow-right"></i> ${formatString(subType)}</h3>`);
    $breadcrumbs.css("opacity", 1);
  }, 300);

  //


  // let type = window.location.hash.substr(1);
  // console.log(type);
}

function updatePage(element) {
  console.log(element)
  Page.updatePage(element);
}
