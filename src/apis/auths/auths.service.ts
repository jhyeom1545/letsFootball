import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthsService {
  login() {
    return `login API`;
  }

  logout() {
    return 'logout API';
  }
}
