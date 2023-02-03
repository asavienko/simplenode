import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TerminalGateway} from "./tui.gateway";

@Module({
    imports: [],
    controllers: [AppController],
    providers: [TerminalGateway, AppService],
})
export class AppModule {
}
