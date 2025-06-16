import { findAllPayments, 
        createPayment, 
        updatePayment, 
        deletePayment 
} from '../models/payments.model.js';

export const getPayments = async (req, res, next) => {
    try {
        const payments = await findAllPayments();
        res.json(payments);
    } catch (error) {
        next(error);
    }
};

export const postPayments = async (req, res, next) => {
    try {
        const newPayment = await createPayment(req.body);
        res.json(newPayment);
    } catch (error) {
        next(error);
    }
};

export const putPayments = async (req, res, next) => {
    try {
        const updatedPayment = await updatePayment(req.params.payment_id, req.body);
        if (!updatedPayment) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        res.json(updatedPayment);
    } catch (error) {
        next(error);
    }
};

export const deletePayments = async (req, res, next) => {
    try {
        const deletedPayment = await deletePayment(req.params.payment_id);
        if (!deletedPayment) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        res.json({ message: 'Payment deleted successfully', payment: deletedPayment });
    } catch (error) {
        next(error);
    }
};