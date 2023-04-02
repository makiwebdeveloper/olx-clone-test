import { Controller, Get, Param, Res } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('uploads/:img')
  seeUploadedFile(@Param('img') image, @Res() res) {
    return res.sendFile(image, { root: 'uploads' });
  }
}
