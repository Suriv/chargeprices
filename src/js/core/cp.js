/**
* @requires jQuery/Snap.js
* @author   iSuriv
*
* - Select Legend
* - Translate legend
* - loadSvg
* - Select Legend
*/


(function ($) {
    'use strict';
}(jQuery));


// Load json

function loadElement(){

 var searchParams = new URLSearchParams(window.location.search),
     nbcar = searchParams.get('car'),
     url ='../../json/'+nbcar+'.json';

  $.getJSON(url, function(data){
    $('.vision h2').text(data.name)
    $('.vision h3').text(data.type)
    if (nbcar != "legend"){
      loadSvg(data.url);
    }

    var leg = data.legend;
    $.each (leg, function(i,val){
      $('.legend ul').append('<li id="'+val+'"></li>');
    })

  });
  translateLegend();
  selectParts();
}

// Translate legend

function translateLegend(){
  var url ='../../json/translate.json';
  $.getJSON(url, function(data2){
    var elemenID = data2;
    $.each (elemenID, function(i,val){
      $('.legend ul').find('#'+i+'').attr('data-title',''+val[0].es+'');
    })
  });
}


// Load svg Element

function loadSvg(url){
  var svgElement = Snap("#svgout");
  var car = Snap.load(url, function (loadedFragment) {
          'use strict';
          svgElement.append(loadedFragment);
  });
}





// Select Legend

function selectParts(){
  $('.legend ul li').click(function () {
      var $valImg = $(this).attr('id').substring(1, 5);
      $('[id^=c' + $valImg + '-]').each(function () {
          $(this).fadeOut(500).fadeIn(500);
      });
  });
}
