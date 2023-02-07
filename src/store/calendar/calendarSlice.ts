import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';
import { IEvent } from '../../interfaces';

const tempEvent = {
    _id: new Date().getTime(),
    title: 'Cumpleaños del Jefe',
    notes: 'Comprar el pastel',
    start: new Date(),
    end: addHours(new Date(), 1),
    bgcolor: '#fafafa',
    user: {
        _id: '123',
        name: 'Fabian'
    }
}

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        events: [
            tempEvent
        ],
        activeEvent: null as IEvent | null,
    },
    reducers: {
        onSaveActiveEvent: (state, { payload }) => {
            state.activeEvent = payload;
        },
        onAddNewEvent: (state, { payload }) => {
            state.events.push(payload);
            state.activeEvent = null;
        },
        onUpdateEvent: (state, { payload }) => {
            state.events = state.events.map(event => {
                if (event._id === payload._id) {
                    return payload;
                }
                return event;

            })
        },
        onDeleteEvent: (state) => {
            if (state.activeEvent) {
                state.events = state.events.filter(event => event._id !== state.activeEvent?._id);
                state.activeEvent = null;
            }
        },

    },
});

export const { onSaveActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } = calendarSlice.actions;