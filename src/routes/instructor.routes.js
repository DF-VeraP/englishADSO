const { Router } = require('express');
const { verifyToken }  = require('../middleware/auth');
const { requireRole }  = require('../middleware/roles');
const ctrl = require('../controllers/instructor.controller');

const router = Router();

router.use(verifyToken, requireRole('instructor', 'admin'));

router.get('/fichas',                                ctrl.getMisFichas);
router.get('/progreso-resumen',                      ctrl.getProgresoResumen);
router.get('/cursos',                                ctrl.getMisCursos);
router.post('/cursos',                               ctrl.crearCurso);
router.put('/cursos/:id',                            ctrl.actualizarCurso);
router.delete('/cursos/:id',                         ctrl.eliminarCurso);
router.post('/fichas/:fichaId/cursos',               ctrl.asignarCursoAFicha);
router.put('/fichas/:fichaId/cursos/:cursoId',       ctrl.actualizarFechaCurso);
router.delete('/fichas/:fichaId/cursos/:cursoId',    ctrl.quitarCursoDeFicha);
router.get('/fichas/:fichaId/progreso',              ctrl.getProgresoFicha);

router.get('/catalogo',                              ctrl.getCatalogo);
router.patch('/cursos/:id/visibilidad',              ctrl.toggleVisibilidad);
router.post('/cursos/:id/duplicar',                  ctrl.duplicarCurso);

module.exports = router;
