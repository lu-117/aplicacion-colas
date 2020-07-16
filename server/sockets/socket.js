const { io } = require('../server');

const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();


io.on('connection', (client) => {

    client.on('siguienteTiket', (data, callback) => {

        let siguiente = ticketControl.siguienteTiket();
        console.log(siguiente);
        callback(siguiente);
    });

    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimosCuatro: ticketControl.getUltimosCuatro()
    });

    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        callback(atenderTicket);

        //actualizar/ notificar en los ultimos 4

        //emitir 'ultimosCuatro'

        client.broadcas.emit('ultimosCuatro',{
            ultimosCuatro: ticketControl.getUltimosCuatro()
        });
    });

    

});