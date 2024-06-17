import { query } from '@/utils/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      let { pageSize = 20, pageNumber = 1, torneo_id, tipo_partido, numero_jornada } = req.query;
      const limit = parseInt(pageSize);
      const offset = (parseInt(pageNumber) - 1) * limit;

      let sql = `SELECT * FROM partidos`;
     
      let filters = [];
      let values = [];

      if (torneo_id) {
        filters.push(`torneo_id = ${torneo_id}`);
      }

      if (tipo_partido) {
        filters.push(`tipo_partido = '${tipo_partido}'`);
      }

      if (numero_jornada) {
       filters.push(`numero_jornada = ${numero_jornada}`);
      }

      if (filters.length > 0) {
        sql += ` WHERE ${filters.join(' AND ')}`;
      }

      sql += ` ORDER BY fecha_hora_partido ASC LIMIT ${limit} OFFSET ${offset}`;

      const partidos = await query(sql);

      res.status(200).json({
        message: 'success',
        partidos,
        page: pageNumber,
        pageSize: limit,
      });
    } catch (error) {
      console.error('Error al obtener partidos:', error);
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
