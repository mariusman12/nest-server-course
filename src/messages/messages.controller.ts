import { Controller, Get, Post,Body, Param, NotFoundException} from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';


@Controller('messages')
export class MessagesController {

    constructor(public messagesService : MessagesService,
        public messagesService2 : MessagesService,
        public messagesService3 : MessagesService){
        console.log(messagesService === messagesService2);
        console.log(messagesService === messagesService3);


    }

    @Get()
    listMessages(){
        return this.messagesService.findAll()

    }
    @Post()
    createMessage(@Body() body: CreateMessageDto) {
            return this.messagesService.create(body.content)
    }

    @(Get('/:id'))
   async  getMessage(@Param('id') id:string) {
        const message = await this.messagesService.findOne(id)

        if (!message) {
            throw new NotFoundException('Nu avem mesajul cu id-ul respectiv')

        }
        return message;
    }

}
