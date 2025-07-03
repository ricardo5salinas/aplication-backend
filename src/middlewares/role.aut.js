export const IsAdmin = (req, res, next) => {
  if (!req.userId) {
    return res.status(401).json({ message: 'Usuario no autenticado' });
  }
  if (req.userRole !== 2) {
    return res.status(403).json({ message: 'Acceso denegado: se requiere rol de administrador' });
  }
  next();
};