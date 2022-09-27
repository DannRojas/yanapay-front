export class UserModel {
  public _id?: string;
  public names?: string;
  public firstName?: string;
  public lastName?: string;
  public email?: string;
  public business?: string;

  constructor(
    _id: string,
    names: string,
    firstName: string,
    lastName: string,
    email: string,
    business: string
  ) {
    this._id = _id;
    this.names = names;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.business = business;
  }
}
