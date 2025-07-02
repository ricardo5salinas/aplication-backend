import {
    findAllAppointments,
    findAppointmentById,
    findAppointmentByDate,
    findAppointmentByPayment,
    createAppointment,
    updateAppointment,
    deleteAppointment,
    } from '../models/appointments.model.js';

    export const getAppointments = async (req, res, next) => {
    try {
        const appointments = await findAllAppointments();
        res.json(appointments);
    } catch (error) {
        next(error);
    }
    };

    export const getAppointmentById = async (req, res, next) => {
    try {
        const appointment = await findAppointmentById(req.params.id);
        if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
        res.json(appointment);
    } catch (error) {
        next(error);
    }
    };

    export const getAppointmentByDate = async (req, res, next) => {
    try {
        const appointments = await findAppointmentByDate(req.params.date);
        res.json(appointments);
    } catch (error) {
        next(error);
    }
    };

    export const getAppointmentByPayment = async (req, res, next) => {
    try {
        const appointment = await findAppointmentByPayment(req.params.payment_id);
        if (!appointment) return res.status(404).json({ message: 'No appointment with this payment ID' });
        res.json(appointment);
    } catch (error) {
        next(error);
    }
    };

    export const postAppointment = async (req, res, next) => {
    try {
        const newAppointment = await createAppointment(req.body);
        res.status(201).json(newAppointment);
    } catch (error) {
        next(error);
    }
    };

    export const putAppointment = async (req, res, next) => {
    try {
        const updated = await updateAppointment(req.params.id, req.body);
        res.json(updated);
    } catch (error) {
        next(error);
    }
    };

    export const deleteAppointmentCtrl = async (req, res, next) => {
    try {
        const deleted = await deleteAppointment(req.params.id);
        res.json({ message: 'Appointment deleted', appointment: deleted });
    } catch (error) {
        next(error);
    }
};
