import { findAllMeds,
    createMed,
    updateMed,
    deleteMed
} from '../models/meds.model.js';

export const getMeds = async (req, res) => {
    try {
        const meds = await findAllMeds();
        res.json(meds);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

export const postMeds = async (req, res) => {
    try {
        const newMed = await createMed(req.body);
        res.json(newMed);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

export const putMeds = async (req, res) => {
    try {
        const updatedMed = await updateMed(req.params.medication_id, req.body);
        if (!updatedMed) {
            return res.status(404).json({ message: 'Medication not found' });
        }
        res.json(updatedMed);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

export const deleteMeds = async (req, res) => {
    try {
        const deletedMed = await deleteMed(req.params.medication_id);
        if (!deletedMed) {
            return res.status(404).json({ message: 'Medication not found' });
        }
        res.json({ message: 'Medication deleted successfully', medication: deletedMed });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};
