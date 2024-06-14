import { query } from '@/utils/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { torneo, fecha, tipo_partido } = req.query;
      let sql = 'SELECT * FROM partidos WHERE (equipo_a IS NOT NULL OR equipo_b IS NOT NULL)';
      const params = [];

      if (torneo) {
        sql += ' AND torneo_id = ?';
        params.push(torneo);
      }

      if (fecha) {
        sql += ' AND DATE(fecha_hora_partido) = ?';
        params.push(fecha);
      }

      if (tipo_partido) {
        sql += ' AND tipo_partido = ?';
        params.push(tipo_partido);
      }

      const partidos = await query(sql, params);

      res.status(200).json({
        message: 'success',
        partidos
      });
    } catch (error) {
      console.error('Error al obtener partidos:', error);
      res.status(500).json({
        message: 'error',
        error: error.message
      });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
