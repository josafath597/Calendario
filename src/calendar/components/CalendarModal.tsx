import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { addHours, differenceInSeconds } from 'date-fns';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'

import Modal from 'react-modal';

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import es from 'date-fns/locale/es';
import { useCalendarStore, useUiStore } from '../../hooks';
import { IEvent } from '../../interfaces';

registerLocale('es', es);

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

export const CalendarModal = () => {

    const { isDateModalOpen, closeDateModal } = useUiStore();
    const { activeEvent, startSavingEvent } = useCalendarStore();

    const [formValues, setFormValues] = useState<IEvent>({
        title: '',
        notes: '',
        start: new Date(),
        end: addHours(new Date(), 2),
        bgcolor: '#fafafa',
        user: { _id: '', name: '' }
    })
    const [formSubmitted, setFormSubmitted] = useState(false);

    const titleClass = useMemo(() => {
        if (!formSubmitted) return '';
        return formValues.title.length <= 0 ? 'invalid' : 'valid';
    }, [formValues.title, formSubmitted])

    useEffect(() => {
        if (activeEvent != null) {
            setFormValues({ ...activeEvent });
        }

    }, [activeEvent])


    const onInputChange = <T extends HTMLInputElement | HTMLTextAreaElement>({ target }: ChangeEvent<T>) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const onCloseModal = () => {
        closeDateModal();
    }

    const onDateChanged = (date: Date | null, changing: 'start' | 'end') => {
        if (date != null) {
            setFormValues({
                ...formValues,
                [changing]: date
            })
        }
    }

    const onSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormSubmitted(true);

        const difference = differenceInSeconds(formValues.end, formValues.start);

        if (isNaN(difference) || difference <= 0) {
            Swal.fire('Error', 'Revisar las fechas ingresadas', 'error');
            return;
        }

        if (formValues.title.length <= 0) {
            console.log('Error en el titulo');
            return;
        }

        console.log(formValues)

        //TODO
        await startSavingEvent( formValues );
        closeDateModal();
        setFormSubmitted(false);
        // Remover Errores en pantalla
        // Cerrar el modal
    }

    return (
        <Modal
            isOpen={isDateModalOpen}
            onRequestClose={onCloseModal}
            style={customStyles}
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
        >
            <h1> Nuevo evento </h1>
            <hr />
            <form className="container" onSubmit={onSubmit}>

                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label>
                    <DatePicker
                        selected={formValues.start}
                        onChange={(date) => onDateChanged(date, 'start')}
                        className="form-control"
                        dateFormat="Pp"
                        showTimeSelect
                        locale='es'
                        timeCaption='Hora'
                    />
                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>
                    <DatePicker
                        minDate={formValues.start}
                        selected={formValues.end}
                        onChange={(date) => onDateChanged(date, 'end')}
                        className="form-control"
                        dateFormat="Pp"
                        showTimeSelect
                        locale='es'
                        timeCaption='Hora'
                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        // className="form-control is-valid"
                        className={`form-control is-${titleClass}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={formValues.title}
                        onChange={onInputChange}

                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea
                        typeof="text"
                        className="form-control"
                        placeholder="Notas"
                        rows={5}
                        name="notes"
                        value={formValues.notes}
                        onChange={onInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}
