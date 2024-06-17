import { query } from '@/utils/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { pageSize = 20, pageNumber = 1, usuario_id, cedula, codigo_empleado, empresa } = req.query;
      const limit = parseInt(pageSize);
      const offset = (parseInt(pageNumber) - 1) * limit;

      let sql = `SELECT * FROM usuarios`;

      let filters = [];
      let values = [];

      if (usuario_id) {
        filters.push(`usuario_id = ${usuario_id}`);
      }

      if (cedula) {
        filters.push(`cedula = ${cedula}`);
      }

      if (codigo_empleado) {
        filters.push(`codigo_empleado = '${codigo_empleado}'`);
      }

      if (empresa) {
        filters.push(`empresa = ${empresa}`);
      }

      if (filters.length > 0) {
        sql += ` WHERE ${filters.join(' AND ')}`;
      }

      sql += ` ORDER BY usuario_id ASC LIMIT ${limit} OFFSET ${offset}`;

      const usuarios = await query(sql);

      res.status(200).json({
        message: 'success',
        usuarios,
        page: parseInt(pageNumber),
        pageSize: limit,
      });
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
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
