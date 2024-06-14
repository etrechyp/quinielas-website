import { query } from '@/utils/db';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  if (method === 'GET') {
    try {
      const sql = `SELECT * FROM partidos WHERE partido_id = ${id}`;
      const partidos = await query(sql);

      if (partidos.length > 0) {
        res.status(200).json({
          message: 'success',
          partido: partidos[0]
        });
      } else {
        res.status(404).json({
          message: 'error',
          error: 'Partido no encontrado'
        });
      }
    } catch (error) {
      console.error('Error al obtener partido por partido_id:', error);
      res.status(500).json({
        message: 'error',
        error: error.message
      });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
