export class User {
    username: string;
    email:string;
    pw:string;
    supp: boolean;
    ofGroupAdminsRole:boolean;
    groupList:string[];
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