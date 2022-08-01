export class UserModel{
    constructor(
        public _id: any,
        public username: string,
        public email: string,
        public role: string,
        public password: string
    ){}
 }