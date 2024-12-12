var cont = 0;
var total = 0;
var seleccionados = [];

// Función para seleccionar/desseleccionar filas
function seleccionar(id_fila) {
    console.log(id_fila);
    let i = seleccionados.indexOf(id_fila);
    if ($("#" + id_fila).hasClass("seleccionada")) {
        $("#" + id_fila).removeClass("seleccionada");
        seleccionados.splice(i, 1);
    } else {
        $("#" + id_fila).addClass("seleccionada");
        seleccionados.push(id_fila);
    }
}

function eliminar(id_filas) {
    for (let i = 0; i < id_filas.length; i++) {
        let precio = Number($("#" + id_filas[i] + " td:nth-child(3)").text());
        total -= precio;
        $("#total").text(total.toFixed(2));
        $("#" + id_filas[i]).remove();
    }
    seleccionados = []; 
}
function agregar(nombre, precio) {
    cont++;
    $("#contador").text(cont);
    var fila = '<tr id="fila' + cont + '" class="selected" onclick="seleccionar(this.id)">' +
        '<td>' + cont + '</td>' +
        '<td>' + nombre + '</td>' +
        '<td>' + precio + '</td></tr>';
    $("#tabla tbody").append(fila);
    total += Number(precio);
    $("#total").text(total.toFixed(2));
}
for (let i = 1; i <= 80; i++) {
    $("#btnag" + i).click(function () { 
        let nombre = $("#nombre" + i).text();
        let precio = $("#precio" + i).text();
        console.log("Has hecho clic al botón " + i);
        console.log(nombre, precio);
        agregar(nombre, precio);
    });
}

// Botón para eliminar elementos seleccionados
$("#btndel").click(function () { 
    eliminar(seleccionados);
});

// Botón para finalizar la compra
$("#btncomprar").click(function () {
    if (total > 0) {
        alert("Compra realizada con éxito. Total: " + total.toFixed(2) + " Bs.");
        // Resetear el carrito
        $("#tabla tbody").empty();
        total = 0;
        $("#total").text(total.toFixed(2));
        cont = 0;
        $("#contador").text(cont);
        seleccionados = [];
    } else {
        alert("El carrito está vacío.");
    }
});
