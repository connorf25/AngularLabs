export class Channel {
    name: string;
    users: string[];

    constructor(name: string) {
        this.name = name;
        this.users = [];
    }
}

export class Group {
    name: string;
    groupAdmin:string;
    groupAssis:string[];
    channels : Channel[];

    constructor(name: string, admin: string) {
        this.name = name;
        this.groupAdmin = admin;
        this.groupAssis = [];
        this.channels = [];
    }

    addChannel(name: string) {
        let channelData = new Channel(name)
        this.channels.push(channelData);
    }
}