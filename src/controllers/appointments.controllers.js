import { findAllAppointments, 
        createAppointment, 
        updateAppointment, 
        deleteAppointment 
} from '../models/appointments.model.js';

export const getAppointments = async (req, res, next) => {
    try {
        const appointments = await findAllAppointments();
        res.json(appointments);
    } catch (error) {
        next(error);
    }
};

export const postAppointments = async (req, res, next) => {
    try {
        const newAppointment = await createAppointment(req.body);
        res.json(newAppointment);
    } catch (error) {
        next(error);
    }
};

export const putAppointments = async (req, res, next) => {
    try {
        const updatedAppointment = await updateAppointment(req.params.appointment_id, req.body);
        if (!updatedAppointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.json(updatedAppointment);
    } catch (error) {
        next(error);
    }
};

export const deleteAppointments = async (req, res, next) => {
    try {
        const deletedAppointment = await deleteAppointment(req.params.appointment_id);
        if (!deletedAppointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.json({ message: 'Appointment deleted successfully', appointment: deletedAppointment });
    } catch (error) {
        next(error);
    }
};