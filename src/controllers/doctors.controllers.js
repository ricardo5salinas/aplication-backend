import { findAllDoctors, 
        createDoctor, 
        updateDoctor, 
        deleteDoctor
} from '../models/doctors.model.js';

export const getDoctors = async (req, res, next) => {
    try {
        const doctors = await findAllDoctors();
        res.json(doctors);
    } catch (error) {
        next(error);
    }
};

export const postDoctors = async (req, res, next) => {
    try {
        const newDoctor = await createDoctor(req.body);
        res.json(newDoctor);
    } catch (error) {
        next(error);
    }
};

export const putDoctors = async (req, res, next) => {
    try {
        const updatedDoctor = await updateDoctor(req.params.doctor_id, req.body);
        if (!updatedDoctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.json(updatedDoctor);
    } catch (error) {
        next(error);
    }
};

export const deleteDoctors = async (req, res, next) => {
    try {
        const deletedDoctor = await deleteDoctor(req.params.doctor_id);
        if (!deletedDoctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.json({ message: 'Doctor deleted successfully', user: deletedDoctor });
    } catch (error) {
        next(error);
    }
};