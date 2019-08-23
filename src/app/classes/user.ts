export class User {
    firstName: string;
    lastName: string;
    userName: string;
    photoUrl: string;

    constructor({ firstName, lastName, userName, photoUrl }) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = userName;
        this.photoUrl = photoUrl;
    }
}
