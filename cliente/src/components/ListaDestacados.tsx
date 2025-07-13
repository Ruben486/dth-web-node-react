
const ListaDestacados = ({ itemsDestacados }) => {
  return (
    <>
      <h3 className="font-medium text-slate-700">
        Caracteristicas destacadas:
        </h3>
      
        {itemsDestacados.map((item, idx) => {
          return (
            <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
              <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
              {item}
            </li>
          );
        })}
      
    </>
  );
};

export default ListaDestacados;
