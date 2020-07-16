// Comando para establecer la conexión 

var socket = io();

var label = $('#lblNuevoTicket')

socket.on('connect', function() {

    console.log('Conectado al servidor');
});
socket.on('disconnect', function() {


    console.log('Desconectado al servidor');
});

socket.on('estadoActual', function(resp) {

    label.text(resp.actual);
    console.log(resp);

})

/* $('button').on('click', function() {
    socket.emit('estadoActual', null, function(estadoActual) {

        label.text(estadoActual);
    });
}); */

$('button').on('click', function() {
    socket.emit('siguienteTiket', null, function(siguienteTiket) {

        label.text(siguienteTiket);
    });
});