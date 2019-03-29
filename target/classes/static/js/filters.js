const filterByNoDemandados = servicios =>
  servicios
    .filter(e => e.solicitudes.length <= 0)
    .sort((a, b) => (a.nombre > b.nombre ? 1 : a.nombre < b.nombre ? -1 : 0));

const filterByMasDemandados = servicios => {
  let items = servicios.filter(e => e.solicitudes.length > 0);
  items = items.map(e=>{
	  e.solicitudesTotales = e.solicitudes.length
	  e.precio_acumulado = null
	  return e
  })
  return items.length > 1
    ? items.sort((e, e2) => e2.solicitudesTotales - e.solicitudesTotales)
    : items;
};
const filterByMasIngresos = servicios => {
  let items = servicios.filter(e => e.solicitudes.length > 0);
  items = items.map(e=>{
	  e.precio_acumulado = getSumOfImportes(e.solicitudes)
	  return e
  })
  return items.length > 1
    ? items.sort(
        (e, e2) =>
          e2.precio_acumulado - e.precio_acumulado
      )
    : items;
};

const getSumOfImportes = solicitudes =>
  solicitudes.reduce((a, b) => {
    if (a.importe) return a.importe + b.importe;
    else return a + b.importe;
  }, 0);

const filterProfesionalesByMasDemandados = servicios => {
  let items = servicios.filter(e => e.solicitudes.length > 0);
  return items.length > 1
    ? items.sort((e, e2) => {
        let index = e2.solicitudes.length - e.solicitudes.length;
        if (index === 0) {
          return compareStrings(e.profesional.nombre, e2.profesional.nombre);
        } else return index;
      })
    : items;
};

const compareStrings = (s1, s2) =>
  s1.toLowerCase() < s2.toLowerCase()
    ? -1
    : s1.toLowerCase() < s2.toLowerCase()
    ? 1
    : 0;
