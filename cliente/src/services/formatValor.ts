export const formatValor = (valor: number): string => {

  if (isNaN(valor)) {
    return null
  };

  const valorFormateado = '$ ' + valor.toLocaleString('es-AR',
    {
      minimumFractionDigits: 2, // Mínimo de dos decimales
      maximumFractionDigits: 2
    });
  return valorFormateado
};
