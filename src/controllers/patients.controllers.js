import { findAllPatients, 
        createPatient, 
        updatePatient, 
        deletePatient
} from '../models/patients.model.js';

export const getPatients = async (req, res, next) => {
    try {
        const patients = await findAllPatients();
        res.json(patients);
    } catch (error) {
        next(error);
    }
};

export const postPatients = async (req, res, next) => {
    try {
        const newPatient = await createPatient(req.body);
        res.json(newPatient);
    } catch (error) {
        if (error.code === 'P2002') {
        return res.status(400).json({ message: 'Identity Card Registred' });
        }
        next(error);
    }
};


export const putPatients = async (req, res, next) => {
    try {
        const updatedPatient = await updatePatient(req.params.patient_id, req.body);
        if (!updatedPatient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.json(updatedPatient);
    } catch (error) {
        next(error);
    }
};

export const deletePatients = async (req, res, next) => {
    try {
        const deletedPatient = await deletePatient(req.params.patient_id);
        if (!deletedPatient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.json({ message: 'Patient deleted successfully', patient: deletedPatient });
    } catch (error) {
        next(error);
    }
};
