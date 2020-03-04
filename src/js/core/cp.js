/**
* @author   iSuriv
*
* - LoadData
* - Format
*/

$(function() {

  dataLoad();
});


/**
* @function
* @name LoadData
* @description Function to load the data
*/

function dataLoad(){
  var dt = $('#example').DataTable( {
    "processing": true,
    "serverSide": true,
    "ajax": {
      "url": "https://raw.githubusercontent.com/Suriv/cp_json/master/db_gen.json",
      "dataSrc":"1583020800"
    },
    "columns": [
        {
            "class":          "details-control",
            "orderable":      false,
            "data":           null,
            "defaultContent": ""
        },

        { "data": "load" },
        { "data": "power" },
        { "data": "cost" }
    ],
    "order": [[1, 'asc']]
  });

// Array to track the ids of the details displayed rows
  var detailRows = [];

  $('#example tbody').on( 'click', 'tr td.details-control', function () {
    var tr = $(this).closest('tr');
    var row = dt.row( tr );
    var idx = $.inArray( tr.attr('id'), detailRows );

    if ( row.child.isShown() ) {
        tr.removeClass( 'details' );
        row.child.hide();

        // Remove from the 'open' array
        detailRows.splice( idx, 1 );
    }
    else {
        tr.addClass( 'details' );
        row.child( format( row.data() )).show();

        // Add to the 'open' array
        if ( idx === -1 ) {
            detailRows.push( tr.attr('id') );
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


    return '<ul>'+
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
                '<span>'+'Exceso de ocupacion (€)'+'</span>'+
                '<span>'+d.overcrowding+'</span>'+
            '</li>'+
             '<li>'+
                '<span>'+'Reserva de punto  (€)'+'</span>'+
                '<span>'+d.r_point+'</span>'+
            '</li>'+
             '<li>'+
                '<span>'+'Ubicación '+'</span>'+
                '<span>'+d.location+'</span>'+
            '</li>'+
            '</ul>';
}
