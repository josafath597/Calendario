import { useSelector, useDispatch } from 'react-redux';
import { onCloseDateModal, onOpenDateModal, RootState } from '../store';

export const useUiStore = () => {

    const dispatch = useDispatch();

    const { isDateModalOpen } = useSelector((state: RootState) => state.ui);

    const openDateModal = () => {
        dispatch( onOpenDateModal() )
    }

    const closeDateModal = () => {
        dispatch( onCloseDateModal() )
    }

    const toggleDateModal = () => {
        (isDateModalOpen) ? openDateModal() : closeDateModal();
    };


    return {
        //* ¨Propiedades
        isDateModalOpen,
        //* ¨Metodos
        openDateModal,
        closeDateModal,
        toggleDateModal,
    }
};