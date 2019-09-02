export class User {
    username: string;
    email:string;
    password:string;
    valid:boolean;
    supp: boolean;
    ofGroupAdminsRole:boolean;
    groupList:string[];
    adminGroupList:string[];
    birthdate?: string;
    age?:number;

    constructor() {
        this.username = "";
        this.email = "";
        this.password = "";
        this.valid = false;
        this.supp = false;
        this.ofGroupAdminsRole = false;
        this.groupList = [];
        this.adminGroupList = [];
    }
}