import { query } from '@/utils/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const sql = 'SELECT * FROM torneos';
      const torneos = await query(sql);

      res.status(200).json({
        message: 'success',
        torneos
      });
    } catch (error) {
      console.error('Error al obtener torneos:', error);
      res.status(500).json({
        message: 'error',
        error: error.message
      });
    }
  } else if (req.method === 'POST') {
    const { nombre, fecha_inicio, fecha_fin } = req.body;
    
    try {
      const sql = `
        INSERT INTO torneos (nombre, fecha_inicio, fecha_fin)
        VALUES ('${nombre}', '${fecha_inicio}', '${fecha_fin}')
      `;
      
      const result = await query(sql);
      
      res.status(200).json({
        message: 'Torneo creado exitosamente',
        torneo: {
          torneo_id: result.insertId,
          nombre,
          fecha_inicio,
          fecha_fin
        }
      });
    } catch (error) {
      console.error('Error al crear torneo:', error);
      res.status(500).json({
        message: 'error',
        error: error.message
      });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
