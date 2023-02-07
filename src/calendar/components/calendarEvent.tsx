import { FC } from "react"
import { PropsCalendarEvent } from "../../interfaces"


export const calendarEvent: FC<PropsCalendarEvent> = ({ event }) => {

    const { title, user } = event

    return (
        <>
            <strong>{ title }</strong>
            <strong> - { user.name }</strong>

        </>
    )
}
