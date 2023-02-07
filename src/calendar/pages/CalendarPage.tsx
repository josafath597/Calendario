import { useState } from 'react'

import { Calendar, EventPropGetter, Views } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { calendarEvent, CalendarModal, FabAddNew, FabDelete, Navbar } from "../"
import { getMessagesEs, localizer } from '../../helpers'
import { IEvent } from '../../interfaces'
import { useUiStore, useCalendarStore } from '../../hooks'


export const CalendarPage = () => {

    const { openDateModal } = useUiStore()
    const { events, setActiveEvent } = useCalendarStore()

    // const lastView = localStorage.getItem('lastView') || Views.WEEK
    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || Views.WEEK)

    const eventStyleGetter: EventPropGetter<IEvent>  = ( event , start, end, isSelected ) => {
        const style = {
            backgroundColor: event.user._id === '123' ? '#367CF7' : '#465660',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }
        return { style }
    }

    const onDoubleClick : ( event: IEvent ) => void = ( event ) => {
        openDateModal();
    }

    const onSelect : ( event: IEvent ) => void = ( event ) => {
        setActiveEvent(event)
    }

    const onViewChange : ( view: string) => void = ( view ) => {
        localStorage.setItem('lastView', view)
        setLastView(view)
    }

    const defaultView = Views[lastView as keyof typeof Views] ? Views[lastView as keyof typeof Views] : Views.WEEK;

    return (

        <>
            <Navbar />
            <Calendar 
                <IEvent,{}>
                culture='es'
                localizer={localizer}
                events={events}
                defaultView={defaultView}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc( 100vh - 80px)' }}
                messages = { getMessagesEs() }
                eventPropGetter = { eventStyleGetter }
                components={{
                    event: calendarEvent
                }}
                onDoubleClickEvent={ onDoubleClick }
                onSelectEvent={ onSelect }
                onView={ ( view: string ) => onViewChange(view) }
            />
            <CalendarModal />
            <FabAddNew />
            <FabDelete />

        </>
    )
}
