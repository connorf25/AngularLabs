import { ObjectID } from 'mongodb';

export class User {
    _id: ObjectID;
    username: string;
    email:string;
    pw:string;
    supp: boolean;
    ofGroupAdminsRole:boolean;
    groupList:string[];
    pic?:string;
    valid?:boolean;
    birthdate?: string;
    age?:number;

    constructor() {
        this.username = "";
        this.email = "";
        this.pw = "";
        this.supp = false;
        this.ofGroupAdminsRole = false;
        this.groupList = [];
    }
}