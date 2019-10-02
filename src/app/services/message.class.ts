import { ObjectID } from 'mongodb';

export class Message_Data {
    room: string;
    message: string;
    sender: ObjectID;
}