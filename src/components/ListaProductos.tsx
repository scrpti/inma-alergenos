import { useEffect, useState } from 'react'
import axios from 'axios'

type Producto = {
  _id: string
  nombre: string
  urlImagen: string
  alergenos: boolean[]
}

export default function ListaProductos() {
  const [productos, setProductos] = useState<Producto[]>([])

  useEffect(() => {
    axios.get('https://inma-sanidad-api.vercel.app/api/productos')
      .then(res => setProductos(res.data))
      .catch(err => console.error('Error al cargar productos:', err))
  }, [])

  const nombresAlergenos = [
    "Gluten", "Crustáceos", "Huevos", "Pescado", "Cacahuetes", "Soja", "Lácteos",
    "Frutos de cáscara", "Apio", "Mostaza", "Granos de sésamo",
    "Dióxido de azufre y sulfitos", "Moluscos", "Altramuces"
  ]  

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Productos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {productos.map(producto => (
          <div key={producto._id} className="bg-white shadow rounded p-4">
            <img src={producto.urlImagen} alt={producto.nombre} className="w-full h-40 object-cover rounded mb-4" />
            <h3 className="text-xl font-semibold">{producto.nombre}</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {producto.alergenos.map((tiene, i) =>
                tiene ? (
                  <span
                    key={i}
                    className="bg-red-100 text-red-800 text-xs font-medium px-3 py-1 rounded-full"
                  >
                    {nombresAlergenos[i]}
                  </span>
                ) : null
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
