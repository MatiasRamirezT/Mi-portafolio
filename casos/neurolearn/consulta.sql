-- Tasa de error por competencia. Sin respuestas, la tasa queda en NULL.
WITH resumen AS (
  SELECT c.codigo, c.nombre, COUNT(r.id) AS intentos,
         SUM(CASE WHEN r.correcta = 0 THEN 1 ELSE 0 END) AS errores
  FROM competencias AS c
  LEFT JOIN respuestas AS r ON r.competencia = c.codigo
  GROUP BY c.codigo, c.nombre
)
SELECT codigo, nombre, intentos, errores,
       ROUND(100.0 * errores / NULLIF(intentos, 0), 1) AS tasa_error
FROM resumen
ORDER BY tasa_error DESC, intentos DESC, codigo;
