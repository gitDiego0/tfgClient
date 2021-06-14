export default function getPrice(precioHabitacion, fechaEntrada, fechaSalida) {
  // const dia = 24 * 60 * 60 * 1000; //Horas*minutos*segundos*milisegudnos
  // console.log("dia:", dia);
  // const dias = Math.round(Math.abs((fechaEntrada - fechaSalida) / dia));

  // const precioFinal = precioHabitacion * dias;

  const diff =
    new Date(fechaSalida).getTime() - new Date(fechaEntrada).getTime();

  const dias = diff / (1000 * 3600 * 24);
  if (dias === 0) {
    return precioHabitacion;
  } else {
    const precioFinal = precioHabitacion * dias;
    return precioFinal;
  }
}
