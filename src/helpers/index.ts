export function formatCurrency (cantidad : number){
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS'
  }).format(cantidad)
}


export function toBoolean(str : string) {
  return str.toLowerCase() === "true"
}