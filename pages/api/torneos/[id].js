import { query } from '@/utils/db';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const sql = `SELECT * FROM torneos WHERE torneo_id = ${id}`;
      const torneo = await query(sql);

      if (torneo.length === 0) {
        return res.status(404).json({
          message: `Torneo con ID ${id} no encontrado`
        });
      }

      res.status(200).json({
        message: 'success',
        torneo: torneo[0]
      });
    } catch (error) {
      console.error(`Error al obtener torneo con ID ${id}:`, error);
      res.status(500).json({
        message: 'error',
        error: error.message
      });
    }
  } else if (req.method === 'PUT') {
    const { nombre, fecha_inicio, fecha_fin } = req.body;
    
    try {
      const sql = `
        UPDATE torneos
        SET nombre = '${nombre}', fecha_inicio = '${fecha_inicio}', fecha_fin = '${fecha_fin}'
        WHERE torneo_id = ${id}
      `;
      
      await query(sql);
      
      res.status(200).json({
        message: `Torneo con ID ${id} actualizado exitosamente`,
        torneo: {
          torneo_id: parseInt(id),
          nombre,
          fecha_inicio,
          fecha_fin
        }
      });
    } catch (error) {
      console.error(`Error al actualizar torneo con ID ${id}:`, error);
      res.status(500).json({
        message: 'error',
        error: error.message
      });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
