import { prisma } from './prismaClient.js';

export const findAllPatients = async () => {
    return await prisma.patient.findMany();
    };

    export const createPatient = async (data) => {
    return await prisma.patient.create({
        data: {
        identity_card: data.identity_card,
        first_name: data.first_name,
        last_name: data.last_name,
        birth_date: new Date(data.birth_date),
        phone: data.phone || null,
        address: data.address || null,
        },
    });
    };

    export const updatePatient = async (patient_id, data) => {
    return await prisma.patient.update({
        where: {
        patient_id: Number(patient_id),
        },
        data: {
        identity_card: data.identity_card,
        first_name: data.first_name,
        last_name: data.last_name,
        birth_date: data.birth_date ? new Date(data.birth_date) : undefined,
        phone: data.phone,
        address: data.address,
        },
    });
    };

    export const deletePatient = async (patient_id) => {
    return await prisma.patient.delete({
        where: {
        patient_id: Number(patient_id),
        },
    });
};
