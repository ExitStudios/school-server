import { Role } from "./Role";

export class User {
  private name: string;
  private username: string;
  private password: string;
  private email: string;
  private phoneNumber: string;
  private id: string;
  private role: Role;

  constructor(
    name: string,
    username: string,
    password: string,
    email: string,
    phoneNumber: string,
    id: string,
    role: Role
  ) {
    this.name = name;
    this.username = username;
    this.password = password;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.id = id;
    this.role = role;
  }

  getName() {
    return this.name;
  }

  getUsername() {
    return this.username;
  }

  getPassword() {
    return this.password;
  }

  getEmail() {
    return this.email;
  }

  getPhoneNumber() {
    return this.phoneNumber;
  }

  getId() {
    return this.id;
  }

  getRole() {
    return this.role;
  }
}
