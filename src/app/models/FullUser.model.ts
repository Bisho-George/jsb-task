import { User } from './User.model';

export class FullUser extends User {
  email: string;
  registerDate: string;
  updatedDate: string;

  constructor(id: string, firstName: string, lastName: string, picture: string, email: string, registerDate: string, updatedDate: string) {
    super(id, firstName, lastName, picture);
    this.email = email;
    this.registerDate = registerDate;
    this.updatedDate = updatedDate;
  }
}
