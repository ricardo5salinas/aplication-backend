import {Router} from 'express';

const router = Router();

router.get('/users', (req, res) => {
    res.send( 'Obteniendo Usuariosss');
});

router.get('/users/:id', (req, res) => {
    const {id} = req.params;
    res.send( 'Obteniendo Usuariosssss' + id);
});

router.post('/users', (req, res) => {
    res.send( 'Creando Usuario');
});

router.delete('/users/:id', (req, res) => {
    const {id} = req.params;
    res.send( 'Eliminando Usuario');
});

router.put('/users/:id', (req, res) => {
    const {id} = req.params;
    res.send( 'Modificando Usuario' + id);
});

export default router;