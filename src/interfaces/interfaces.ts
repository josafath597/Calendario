export interface IEvent {
    _id?: Number;
    title: string;
    notes: string;
    start: Date;
    end: Date;
    bgcolor: string;
    user: { _id: string; name: string; };
}

export interface PropsCalendarEvent {
    event: IEvent
}