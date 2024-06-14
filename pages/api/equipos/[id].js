import { query } from '@/utils/db';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  if (method === 'GET') {
    try {
      const sql = `SELECT * FROM equipos WHERE equipo_id = ${id}`;
      const equipos = await query(sql);

      if (equipos.length > 0) {
        res.status(200).json({
          message: 'success',
          equipo: equipos[0]
        });
      } else {
        res.status(404).json({
          message: 'error',
          error: 'Equipo no encontrado'
        });
      }
    } catch (error) {
      console.error('Error al obtener equipo por equipo_id:', error);
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
