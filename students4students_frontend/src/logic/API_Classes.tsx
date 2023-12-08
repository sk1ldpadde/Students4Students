// This file contains all the interfaces which are used in API-related calls

export interface User {
  first_name: string;
  surname: string;
  age: string;
  degree: string;
  semester: string;
  partner_company: string;
  email: string;
  username: string;
  password: string;
}

export interface HTTPResponse {
  code: number;
  message: string;
}
