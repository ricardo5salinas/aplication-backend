import { prisma } from './prismaClient.js';

export const findAllAppointments = async () => {
    return await prisma.appointment.findMany({
        include: {
        patient: true,
        doctor: true,
        payment: true,
        medication: true,
        appointment_detail: true,
        appointment_history: true,
        },
    });
    };

    export const findAppointmentById = async (id) => {
    return await prisma.appointment.findUnique({
        where: { appointment_id: Number(id) },
        include: {
        patient: true,
        doctor: true,
        payment: true,
        medication: true,
        appointment_detail: true,
        appointment_history: true,
        },
    });
    };

    export const findAppointmentByDate = async (date) => {
    return await prisma.appointment.findMany({
        where: { date: new Date(date) },
        include: {
        patient: true,
        doctor: true,
        payment: true,
        },
    });
    };

    export const findAppointmentByPayment = async (payment_id) => {
    return await prisma.appointment.findUnique({
        where: { payment_id: Number(payment_id) },
        include: {
        patient: true,
        doctor: true,
        payment: true,
        },
    });
    };

    export const createAppointment = async (data) => {
        // Convierte la fecha a objeto Date si es string
        const appointmentData = {
            ...data,
            date: new Date(data.date), 
        };

        return await prisma.appointment.create({
            data: appointmentData,
            include: {
                patient: true,
                doctor: true,
                payment: true,
                medication: true,
            },
        });
    };

    export const updateAppointment = async (id, data) => {
    return await prisma.appointment.update({
        where: { appointment_id: Number(id) },
        data,
        include: {
        patient: true,
        doctor: true,
        payment: true,
        medication: true,
        },
    });
    };

    export const deleteAppointment = async (id) => {
    return await prisma.appointment.delete({
        where: { appointment_id: Number(id) },
    });
};
