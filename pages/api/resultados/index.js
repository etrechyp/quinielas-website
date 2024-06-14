import { query } from '@/utils/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const sql = 'SELECT * FROM resultados_partidos';
      const resultados = await query(sql);

      res.status(200).json({
        message: 'success',
        resultados,
      });
    } catch (error) {
      console.error('Error al obtener resultados de partidos:', error);
      res.status(500).json({
        message: 'error',
        error: error.message,
      });
    }
  } else if (req.method === 'POST') {
    try {
      const { partido_id, goles_equipo_a, goles_equipo_b } = req.body;
      const sql = 'INSERT INTO resultados_partidos (partido_id, goles_equipo_a, goles_equipo_b) VALUES (?, ?, ?)';
      const result = await query(sql, [partido_id, goles_equipo_a, goles_equipo_b]);

      res.status(201).json({
        message: 'success',
        resultado: { id: result.insertId, partido_id, goles_equipo_a, goles_equipo_b },
      });
    } catch (error) {
      console.error('Error al crear resultado de partido:', error);
      res.status(500).json({
        message: 'error',
        error: error.message,
      });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
