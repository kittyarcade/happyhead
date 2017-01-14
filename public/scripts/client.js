console.log('meow.js');

var myApp = angular.module('myApp', []);

myApp.controller('MainController', ['$scope', '$http', function($scope, $http){
  console.log('totally angular dude');


  function start() {

          document.getElementById("uptime").innerHTML = "Waiting for data...";
          var deviceID = "2a0022000947353138383138";
          var accessToken = "bde3b78aa80ae0789693bd5f91af1119ddeb4e25";
          var eventSource = new EventSource("https://api.particle.io/v1/devices/" + deviceID + "/events/?access_token=" + accessToken);


          // eventSource.addEventListener('open', function(e) {
          //     console.log("Opened!"); },false);
          //
          // eventSource.addEventListener('error', function(e) {
          //     console.log("Errored!"); },false);

          eventSource.addEventListener('rangeLevel', function(e) {
              var parsedData = JSON.parse(e.data);

              if(parsedData.data >= 500 && parsedData.data<700){
                impactLevel = "low";
              } else if (parsedData.data >= 700 && parsedData.data<900){
                impactLevel = "medium";
              } else if(parsedData.data >= 900 && parsedData.data<1200){
                impactLevel = "high";
              }

              var tempSpan = document.getElementById("uptime");
              var tsSpan   = document.getElementById("tstamp");
              tempSpan.innerHTML += " impact: " + impactLevel;

            tempSpan.style.fontSize = "28px";
              tsSpan.innerHTML = "At timestamp " + parsedData.published_at;
              tsSpan.style.fontSize = "9px";
          }, false);
      }


start();

}]); //end MainController controller
