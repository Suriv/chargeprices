function dataLoad(){var t=$("#example").DataTable({processing:!0,serverSide:!0,ajax:{url:"https://raw.githubusercontent.com/Suriv/cp_json/master/db_gen.json",dataSrc:"1583020800"},columns:[{class:"details-control",orderable:!1,data:null,defaultContent:""},{data:"load"},{data:"power"},{data:"cost"}],order:[[1,"asc"]]}),i=[];$("#example tbody").on("click","tr td.details-control",function(){var a=$(this).closest("tr"),n=t.row(a),s=$.inArray(a.attr("id"),i);n.child.isShown()?(a.removeClass("details"),n.child.hide(),i.splice(s,1)):(a.addClass("details"),n.child(format(n.data())).show(),-1===s&&i.push(a.attr("id")))}),t.on("draw",function(){$.each(i,function(a,n){$("#"+n+" td.details-control").trigger("click")})})}function format(a){return"<ul><li><span>Tipo </span><span>"+a.type+"</span></li><li><span>Carga minima (€)</span><span>"+a.min_load+"</span></li><li><span>Cuota alta (€)</span><span>"+a.high_fee+"</span></li><li><span>Cuota mensual (€)</span><span>"+a.month_fee+"</span></li><li><span>Exceso de ocupacion (€)</span><span>"+a.overcrowding+"</span></li><li><span>Reserva de punto  (€)</span><span>"+a.r_point+"</span></li><li><span>Ubicación </span><span>"+a.location+"</span></li></ul>"}$(function(){dataLoad()});