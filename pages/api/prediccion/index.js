import { query, startTransaction, commit, rollback } from '@/utils/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const sql = 'SELECT * FROM predicciones';
      const predicciones = await query(sql);

      res.status(200).json({
        message: 'success',
        predicciones
      });
    } catch (error) {
      console.error('Error al obtener predicciones:', error);
      res.status(500).json({
        message: 'error',
        error: error.message
      });
    }
  } else if (req.method === 'POST') {
    const transaction = await startTransaction();
    try {
      const { predicciones } = req.body;

      const sql = 'INSERT INTO predicciones (usuario_id, partido_id, goles_equipo_a, goles_equipo_b) VALUES (?, ?, ?, ?)';
      for (const prediccion of predicciones) {
        await query(sql, {
          replacements: [prediccion.usuario_id, prediccion.partido_id, prediccion.goles_equipo_a, prediccion.goles_equipo_b],
          transaction
        });
      }

      await commit(transaction);

      res.status(201).json({
        message: 'success',
        predicciones
      });
    } catch (error) {
      await rollback(transaction);
      console.error('Error al crear predicciones:', error);
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
