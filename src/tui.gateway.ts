import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import {AppService} from "./app.service";
import Server from "ws"
import {IPty, spawn} from "node-pty";

@WebSocketGateway()
export class TerminalGateway implements OnGatewayConnection, OnGatewayDisconnect {
    constructor(private readonly appService: AppService
    ) {
    }

    @WebSocketServer()
    public server: Server;


    async handleConnection(client) {

        console.log("handleConnection");

        console.log("getTui");
        const term: IPty = spawn('sh', [], {
            name: 'xterm-color',
            cols: 80,
            rows: 30,
            cwd: process.env.HOME,
            env: process.env
        });

        term.onData(function (data) {
            console.log("data: " + data);
            // client.stdout.write(data);
            client.send(data);
        });

        // term.write('ls -l')
        // term.resize(100, 40);

        client.on('message', function incoming(message) {
            console.log('client.on(\'message\')', message.toString())
            // client.emit('message', message.toString());
            term.write(message)
        });
        // console.log(this.server)
        // this.server.on('message', function incoming(data) {
        //     console.log("data: " + data);
        //
        //     // term?.write(data);
        // });


        return term
    }

    async handleDisconnect() {
        console.log("handleDisconnect")
    }

    @SubscribeMessage('newMessage')
    async onChat(client, message) {
        console.log('message', message);
    }

    @SubscribeMessage('message')
    async onMessage(client, message) {
        console.log('message', message);
    }
}