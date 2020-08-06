/**
* @author   iSuriv
*
* - dateJson
* - LoadData
* - Format
* - Dark Mode
*/

var chargeAPI ="https://raw.githubusercontent.com/Suriv/cp_json/master/db_gen.json",
n = new Date(),
months=['Enero','Febrero','Marzo','Abril', 'Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
date = months[n.getMonth()];


/**
* @function
* @name dateJson
* @description Function get date
*/


function dateJson(){

  $('header h3').text(months[n.getMonth()]+'  '+n.getFullYear());

  $.ajax({
    url: chargeAPI,
    success: function(data) {

             console.log(JSON.parse(data))
            //this is what I am unsure about?
        }
    });
  // $.getJSON( chargeAPI, function( data){
  //   console.log( data);
  // });

};

/**
* @function
* @name LoadData
* @description Function to load the data
*/


function dataLoad(){
  var dt = $('#example').DataTable( {
   "responsive": true,
   "autoWidth": false,
    "sortable": true,
    "processing": true,
    "serverSide": false,
    "info":     false,
    "lengthChange": false,
    "pageLength": 9,
    "language": {
      "sSearch": "",
      "searchPlaceholder": "Buscar"
    },
    "start": 1,
    "ajax": {
      "url": chargeAPI,
      "dataSrc":date
    },

    "columns": [
        {
            "class":          "legends",
            "orderable":      false,
            "paging":         true,
            "data":           null,
            "defaultContent": ""
        },
        { data: "cpo"},
        { data: "power" },
        { data: "cost" }
    ],
    "createdRow": function ( row, data, index ) {
      var name = data.cpo.substring(0,4).toLowerCase();
      $('td',row).eq(1).addClass(name);

    },
    "order": [[1, 'asc']]
  });

// Array to track the ids of the details displayed rows
  var detailRows = [];

  $('#example tbody').on( 'click', 'tr td.legends', function () {
    var tr = $(this).closest('tr')
    var row = dt.row(tr);
    var idx = $.inArray( tr.attr('id'), detailRows );
    if ( row.child.isShown() ) {
        tr.removeClass('sel');
        $(this).removeClass('open');
        row.child.hide();
        // Remove from the 'open' array
        detailRows.splice( idx, 1 );
    }
    else {
       $(this).addClass('open');
        tr.addClass('sel');
        row.child(format(row.data())).show();
        // Add to the 'open' array
        if ( idx === -1 ) {
            detailRows.push( tr.attr('id') );
            $(this).closest('tr').next().addClass('details');
        }else{
          $(this).closest('tr').next().addClass('details');
        }
    }
  });

    // On each draw, loop over the `detailRows` array and show any child rows
    dt.on( 'draw', function () {
        $.each( detailRows, function ( i, id ) {
            $('#'+id+' td.details-control').trigger( 'click' );
        } );
    } );

};

/**
* @function
* @name Format
* @description Function that formats the data
*/

function format (d) {
  return '<ul class="legend">'+
            '<li>'+
                '<span>'+'Operadores de Punto de Carga '+'</span>'+
                '<span>'+d.cpo+'</span>'+
            '</li>'+
            '<li>'+
            '<span>'+'Potencia '+'</span>'+
            '<span>'+d.power+'</span>'+
            '</li>'+
            '<li>'+
                '<span>'+'Coste '+'</span>'+
                '<span>'+d.cost+'</span>'+
            '</li>'+
            '<li>'+
                '<span>'+'Tipo '+'</span>'+
                '<span>'+d.type+'</span>'+
            '</li>'+
             '<li>'+
                '<span>'+'Carga minima (€)'+'</span>'+
                '<span>'+d.min_load+'</span>'+
            '</li>'+
            '<li>'+
            '<span>'+'Cuota alta (€)'+'</span>'+
            '<span>'+d.high_fee+'</span>'+
            '</li>'+
             '<li>'+
                '<span>'+'Cuota mensual (€)'+'</span>'+
                '<span>'+d.month_fee+'</span>'+
            '</li>'+
             '<li>'+
                '<span>'+'Tasa de inactividad / Exceso   (€)'+'</span>'+
                '<span>'+d.overcrowding+'</span>'+
            '</li>'+
             '<li>'+
                '<span>'+'Reserva de punto  (€)'+'</span>'+
                '<span>'+d.r_point+'</span>'+
            '</li>'+
             '<li>'+
                '<span>'+'Ubicación '+'</span>'+
                '<span><a href='+d.location_url+' target="blank">'+d.location+'</a></span>'+
            '</li>'+
            '<li>'+
                '<span>'+'Aplicación '+'</span>'+
                '<span><a href='+d.app_url+' target="blank">'+d.app_name+'</a></span>'+
            '</li>'+
            '<li>'+
                '<span>'+'Observaciones '+'</span>'+
                '<span>'+d.ob+'</span>'+
            '</li>'+
            '</ul>';
}


$(function() {
  dataLoad();
  dateJson();
});
