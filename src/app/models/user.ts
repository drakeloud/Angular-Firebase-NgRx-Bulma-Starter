export interface SignUpUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export class User {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    companyId: string;
    emailVerified: boolean;
    photoUrl: string;

    get displayName(): string {
        return `${this.firstName} ${this.lastName}`;
    }

    public static fromJson(jsonUser: any): User {
        if (!jsonUser) {
            return new User();
        }

        const user = new User();
        user.userId = jsonUser.hasOwnProperty('userId') ? jsonUser.userId : null;
        user.firstName = jsonUser.hasOwnProperty('firstName') ? jsonUser.firstName : null;
        user.lastName = jsonUser.hasOwnProperty('lastName') ? jsonUser.lastName : null;
        user.email = jsonUser.hasOwnProperty('email') ? jsonUser.email : null;
        user.companyId = jsonUser.hasOwnProperty('companyId') ? jsonUser.companyId : null;
        user.emailVerified = jsonUser.hasOwnProperty('emailVerified') ? jsonUser.emailVerified : null;
        user.photoUrl = jsonUser.hasOwnProperty('photoUrl') ? jsonUser.photoUrl : null;
        return user;
    }
}
