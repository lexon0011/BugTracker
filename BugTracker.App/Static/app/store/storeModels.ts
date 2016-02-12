import { Record, List } from 'immutable';

// http://blog.jhades.org/angular-2-application-architecture-building-flux-like-apps-using-redux-and-immutable-js-js/

// Note: the properties have to be defined as normal public properties, not as public parameters for the constructor.
// Otherwise you will face an "Cannot set on an immutable record." error.

const UserModelRecord = Record({
    uuid: <string>null,
    name: <string>null
});
export class UserModel extends UserModelRecord {
    public uuid:string;
    public name: string;
    
    constructor(uuid:string, name: string) {
        super({ uuid, name });
    }
}

const IssueModelRecord = Record({
    uuid: <string>null,
    title: <string>null
});
export class IssueModel extends IssueModelRecord {
    public title: string;
    
    constructor(uuid:string, title: string) {
        super({ uuid, title });
    }
}

const CurrentUserStateRecord = Record({
    isSet: <boolean>null,
    user: <UserModel>null
});
export class CurrentUserState extends CurrentUserStateRecord {
    public isSet: boolean;
    public user: UserModel;

    constructor(user?: UserModel) {
        super({
            user,
            isSet: user != null
        });
    }
}