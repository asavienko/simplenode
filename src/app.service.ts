import {Injectable} from '@nestjs/common';
// import {IPty, spawn} from "node-pty";
import * as os from 'os';
import {spawn} from 'child_process';

@Injectable()
export class AppService {


    getHello(): string {
        return 'Hello World!';
    }

}
