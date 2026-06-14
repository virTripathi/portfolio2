import { Body, Controller, Post } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { ContactDto } from './contact.dto';
import { ContactService } from './contact.service';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  // Tighter limit on the contact endpoint: 3 submissions / minute / IP.
  @Throttle({ default: { ttl: 60_000, limit: 3 } })
  @Post()
  async submit(@Body() body: ContactDto) {
    return this.contactService.send(body);
  }
}
