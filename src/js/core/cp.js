/**
* @author   iSuriv
*
* - Load Data
*/


(function ($) {
    'use strict';

    tablePrices();


}(jQuery));

function tablePrices(){

  $('#example').DataTable( {
    data : jsonObject,
    ajax: {
      url: 'https://my-json-server.typicode.com/jabrena/latency-problems/greek',
      type: 'GET'
  }
} );

  // var data = [
  //   { firstName: 'john', lastName : 'doe' }
  // ]

  //   var table = $('#example').DataTable({
  //     data : data,
  //     columns : [
  //       {  data : 'firstName',
  //           render : function(data, type, row) {
  //               return '<span class="mycus-class2">'+data+'</span>'
  //           }
  //       },
  //       {  data : 'lastName' }
  //   ]
  // })

};

