import { useDispatch, useSelector } from 'react-redux';
import { onAddNewEvent, onDeleteEvent, onSaveActiveEvent, onUpdateEvent, RootState } from '../store';
import { calendarEvent } from '../calendar/components/calendarEvent';
import { IEvent } from '../interfaces';

export const useCalendarStore = () => {

    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector((state: RootState) => state.calendar);

    const setActiveEvent = ( calendarEvent : IEvent ) => {
        dispatch( onSaveActiveEvent( calendarEvent ) )
    }

    const startSavingEvent = async ( calendarEvent : IEvent ) => {
        // TODO: llegar al Backend
        // Todo bien

        if( calendarEvent._id ) {
            // Actualizar
            dispatch( onUpdateEvent({ ...calendarEvent }) );
        } else {
            dispatch( onAddNewEvent({ ...calendarEvent, _id: new Date().getTime()}) );
        }
    };

    const startDeletingEvent = () => {
        // TODO: Llegar al Backend
        dispatch( onDeleteEvent() );
    }



    return {
        //* ¨Propiedades
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,
        //* ¨Metodos
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
    }
}
