import {Controller, Get} from '@nestjs/common';
import {AppService} from './app.service';
import {Req, Response, StreamableFile} from '@nestjs/common';
import * as path from "path";
import * as fs from "fs";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    // @Get()
    getHello(): string {
        return this.appService.getHello();
    }
}
