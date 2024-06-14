import { query } from '@/utils/db';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const sql = 'SELECT * FROM resultados_partidos WHERE id = ?';
      const resultados = await query(sql, [id]);

      if (resultados.length === 0) {
        res.status(404).json({
          message: 'Resultado de partido no encontrado',
        });
        return;
      }

      res.status(200).json({
        message: 'success',
        resultado: resultados[0],
      });
    } catch (error) {
      console.error('Error al obtener resultado de partido:', error);
      res.status(500).json({
        message: 'error',
        error: error.message,
      });
    }
  } else if (req.method === 'PUT') {
    try {
      const { goles_equipo_a, goles_equipo_b } = req.body;
      const sql = 'UPDATE resultados_partidos SET goles_equipo_a = ?, goles_equipo_b = ? WHERE id = ?';
      await query(sql, [goles_equipo_a, goles_equipo_b, id]);

      res.status(200).json({
        message: 'success',
        resultado: { id, goles_equipo_a, goles_equipo_b },
      });
    } catch (error) {
      console.error('Error al actualizar resultado de partido:', error);
      res.status(500).json({
        message: 'error',
        error: error.message,
      });
    }
  } else if (req.method === 'DELETE') {
    try {
      const sql = 'DELETE FROM resultados_partidos WHERE id = ?';
      await query(sql, [id]);

      res.status(204).end();
    } catch (error) {
      console.error('Error al eliminar resultado de partido:', error);
      res.status(500).json({
        message: 'error',
        error: error.message,
      });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
