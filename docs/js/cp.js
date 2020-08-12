var chargeAPI="https://raw.githubusercontent.com/Suriv/cp_json/master/db_gen.json",n=new Date,months=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],date=months[n.getMonth()];function dateJson(){$("header h3").text(months[n.getMonth()]+"  "+n.getFullYear()),$.ajax({url:chargeAPI,success:function(a){console.log(JSON.parse(a))}})}function dataLoad(){var e=$("#example").DataTable({responsive:!0,autoWidth:!1,sortable:!0,processing:!0,serverSide:!1,info:!1,lengthChange:!1,pageLength:7,language:{sSearch:"",searchPlaceholder:"Buscar"},start:1,ajax:{url:chargeAPI,dataSrc:date},columns:[{class:"legends",orderable:!1,paging:!0,data:null,defaultContent:""},{data:"cpo"},{data:"power"},{data:"cost"}],createdRow:function(a,n,s){var e=n.cpo.substring(0,4).toLowerCase();$("td",a).eq(1).addClass(e)},order:[[1,"asc"]]}),t=[];$("#example tbody").on("click","tr td.legends",function(){var a=$(this).closest("tr"),n=e.row(a),s=$.inArray(a.attr("id"),t);n.child.isShown()?(a.removeClass("sel"),$(this).removeClass("open"),n.child.hide(),t.splice(s,1)):($(this).addClass("open"),a.addClass("sel"),n.child(format(n.data())).show(),-1===s&&t.push(a.attr("id")),$(this).closest("tr").next().addClass("details"))}),e.on("draw",function(){$.each(t,function(a,n){$("#"+n+" td.details-control").trigger("click")})})}function format(a){return'<ul class="legend"><li><span>Operadores de Punto de Carga </span><span>'+a.cpo+"</span></li><li><span>Potencia </span><span>"+a.power+"</span></li><li><span>Coste </span><span>"+a.cost+"</span></li><li><span>Tipo </span><span>"+a.type+"</span></li><li><span>Carga minima (€)</span><span>"+a.min_load+"</span></li><li><span>Cuota alta (€)</span><span>"+a.high_fee+"</span></li><li><span>Cuota mensual (€)</span><span>"+a.month_fee+"</span></li><li><span>Tasa de inactividad / Exceso   (€)</span><span>"+a.overcrowding+"</span></li><li><span>Reserva de punto  (€)</span><span>"+a.r_point+"</span></li><li><span>Ubicación </span><span><a href="+a.location.url+' target="blank">'+a.location.loc+"</a></span></li><li><span>Aplicación </span><span><a href="+a.app.url+' target="blank">'+a.app.name+"</a></span></li><li><span>Observaciones </span><span>"+a.ob+"</span></li></ul>"}$(function(){dataLoad(),dateJson()});