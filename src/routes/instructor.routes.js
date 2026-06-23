const { Router } = require('express');
const { verifyToken }  = require('../middleware/auth');
const { requireRole }  = require('../middleware/roles');
const ctrl = require('../controllers/instructor.controller');

const router = Router();

router.use(verifyToken, requireRole('instructor', 'admin'));

router.get('/fichas',                                ctrl.getMisFichas);
router.get('/cursos',                                ctrl.getMisCursos);
router.post('/cursos',                               ctrl.crearCurso);
router.put('/cursos/:id',                            ctrl.actualizarCurso);
router.delete('/cursos/:id',                         ctrl.eliminarCurso);
router.post('/fichas/:fichaId/cursos',               ctrl.asignarCursoAFicha);
router.delete('/fichas/:fichaId/cursos/:cursoId',    ctrl.quitarCursoDeFicha);

module.exports = router;
