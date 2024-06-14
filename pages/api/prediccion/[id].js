import { query, startTransaction, commit, rollback } from '@/utils/db';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const sql = 'SELECT * FROM predicciones WHERE id = ?';
      const prediccion = await query(sql, {
        replacements: [id],
        type: query.SELECT
      });

      if (prediccion.length === 0) {
        res.status(404).json({
          message: 'Prediction not found'
        });
        return;
      }

      res.status(200).json({
        message: 'success',
        prediccion: prediccion[0]
      });
    } catch (error) {
      console.error('Error al obtener predicción:', error);
      res.status(500).json({
        message: 'error',
        error: error.message
      });
    }
  } else if (req.method === 'PUT') {
    const transaction = await startTransaction();
    try {
      const { prediccion } = req.body;
      const sql = 'UPDATE predicciones SET prediccion = ? WHERE id = ?';
      await query(sql, {
        replacements: [prediccion, id],
        transaction
      });

      await commit(transaction);

      res.status(200).json({
        message: 'success',
        prediccion: { id, prediccion }
      });
    } catch (error) {
      await rollback(transaction);
      console.error('Error al actualizar predicción:', error);
      res.status(500).json({
        message: 'error',
        error: error.message
      });
    }
  } else if (req.method === 'DELETE') {
    const transaction = await startTransaction();
    try {
      const sql = 'DELETE FROM predicciones WHERE id = ?';
      await query(sql, {
        replacements: [id],
        transaction
      });

      await commit(transaction);

      res.status(204).end();
    } catch (error) {
      await rollback(transaction);
      console.error('Error al eliminar predicción:', error);
      res.status(500).json({
        message: 'error',
        error: error.message
      });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
