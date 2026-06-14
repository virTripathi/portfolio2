import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { StatsService } from './stats.service';

@Controller('github-stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get()
  async getStats(@Query('username') username?: string) {
    if (!username || !/^[a-zA-Z0-9-]{1,39}$/.test(username)) {
      throw new BadRequestException('A valid GitHub username is required.');
    }
    return this.statsService.getGithubStats(username);
  }
}
