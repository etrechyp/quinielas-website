import { query } from '@/utils/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const sql = 'SELECT * FROM equipos';
      const equipos = await query(sql);

      res.status(200).json({
        message: 'success',
        equipos
      });
    } catch (error) {
      console.error('Error al obtener equipos:', error);
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
