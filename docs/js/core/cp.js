function dataLoad(){var t=$("#example").DataTable({processing:!0,serverSide:!0,ajax:{url:"https://raw.githubusercontent.com/Suriv/cp_json/master/db_gen.json",dataSrc:"1583020800"},columns:[{class:"legends",orderable:!1,data:null,defaultContent:""},{data:"load"},{data:"power"},{data:"cost"}],createdRow:function(a,n,s){var t=n.load.substring(0,4).toLowerCase();$("td",a).eq(1).addClass(t)},order:[[1,"asc"]]}),e=[];$("#example tbody").on("click","tr td.legends",function(){var a=$(this).closest("tr"),n=t.row(a),s=$.inArray(a.attr("id"),e);n.child.isShown()?($(this).removeClass("open"),n.child.hide(),e.splice(s,1)):($(this).addClass("open"),n.child(format(n.data())).show(),-1===s&&e.push(a.attr("id")))}),t.on("draw",function(){$.each(e,function(a,n){$("#"+n+" td.details-control").trigger("click")})})}function format(a){return'<ul class="legend"><li><span>Tipo </span><span>'+a.type+"</span></li><li><span>Carga minima (€)</span><span>"+a.min_load+"</span></li><li><span>Cuota alta (€)</span><span>"+a.high_fee+"</span></li><li><span>Cuota mensual (€)</span><span>"+a.month_fee+"</span></li><li><span>Exceso de ocupacion (€)</span><span>"+a.overcrowding+"</span></li><li><span>Reserva de punto  (€)</span><span>"+a.r_point+"</span></li><li><span>Ubicación </span><span>"+a.location+"</span></li></ul>"}$(function(){dataLoad()});