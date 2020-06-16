/**
* @author   iSuriv
*
* - LoadData
* - Format
* - Dark Mode
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
    "sortable": true,
    "processing": true,
    "serverSide": true,
    "ajax": {
      "url": "https://raw.githubusercontent.com/Suriv/cp_json/master/db_gen.json",
      "dataSrc":"1590969600"
    },

    "columns": [
        {
            "class":          "legends",
            "orderable":      false,
            "paging":         true,
            "data":           null,
            "defaultContent": ""
        },
        { data: "load"},
        { data: "power" },
        { data: "cost" }
    ],
    "createdRow": function ( row, data, index ) {
      var name = data.load.substring(0,4).toLowerCase();
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
                '<span>'+'Gestor de carga '+'</span>'+
                '<span>'+d.load+'</span>'+
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
                '<span>'+d.location+'</span>'+
            '</li>'+
            '</ul>';
}
