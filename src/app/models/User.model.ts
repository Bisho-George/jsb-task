export class User {
  id: string;
  firstName: string;
  lastName: string;
  picture: string;

  constructor(id: string, firstName: string, lastName: string, picture: string) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.picture = picture;
  }
}
