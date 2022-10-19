import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthsService {
  login({ createAuthDto }) {
    return `login API`;
  }

  getA;

  logout() {
    return 'logout API';
  }
}
