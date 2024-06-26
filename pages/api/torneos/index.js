import { query } from '@/utils/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { pageSize = 20, pageNumber = 1, torneo_id } = req.query;
      const limit = parseInt(pageSize);
      const offset = (parseInt(pageNumber) - 1) * limit;
      
      let sql = `SELECT * FROM torneos`;

      let filters = [];
      let values = [];

      if (torneo_id) {
        filters.push(`torneo_id = ${torneo_id}`);
      }

      if (filters.length > 0) {
        sql += ` WHERE ${filters.join(' AND ')}`;
      }

      sql += ` ORDER BY torneo_id ASC LIMIT ${limit} OFFSET ${offset}`;

      const torneos = await query(sql);

      res.status(200).json({
        message: 'success',
        torneos,
        page: parseInt(pageNumber),
        pageSize: limit,
      });
    } catch (error) {
      console.error('Error al obtener los torneos:', error);
      res.status(500).json({
        message: 'error',
        error: error.message,
      });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
