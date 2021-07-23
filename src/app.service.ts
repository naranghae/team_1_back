import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getAll(): string {
    return 'book search'; //바꾸면 화면에서 바뀜
  }
}
