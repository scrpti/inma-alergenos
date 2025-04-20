import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CrearProducto = () => {
  const navigate = useNavigate()
  const [nombre, setNombre] = useState('')
  const [imagen, setImagen] = useState<File | null>(null)
  const [trazas, setTrazas] = useState('')
  const [alergenos, setAlergenos] = useState(Array(14).fill(false))

  const nombresAlergenos = [
    "Gluten", "Crustáceos", "Huevos", "Pescado", "Cacahuetes", "Soja", "Lácteos",
    "Frutos de cáscara", "Apio", "Mostaza", "Granos de sésamo",
    "Dióxido de azufre y sulfitos", "Moluscos", "Altramuces"
  ]
  

  const handleCheck = (index: number) => {
    const nuevos = [...alergenos]
    nuevos[index] = !nuevos[index]
    setAlergenos(nuevos)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      console.log('📤 Enviando producto:', {
        nombre,
        imagen,
        trazas,
        alergenos,
        longitud: alergenos.length
      })

      const formData = new FormData()
      formData.append('nombre', nombre)
      formData.append('trazas', trazas)
      formData.append('alergenos', JSON.stringify(alergenos))
      if (imagen) {
        formData.append('imagen', imagen)
      }

      await axios.post('https://inma-sanidad-api.vercel.app/api/productos', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      navigate('/') // volver a home al crear
    } catch (error) {
      console.error('Error al crear producto:', error)
    }
  }

  return (
    <div className="min-h-screen bg-white p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Crear nuevo producto</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-semibold mb-1">Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Subir imagen</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImagen(e.target.files?.[0] || null)}
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Alergenos</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {alergenos.map((valor, index) => (
              <label key={index} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={valor}
                  onChange={() => handleCheck(index)}
                  className="accent-red-600"
                />
                <span>{nombresAlergenos[index]}</span>
              </label>
            ))}
          </div>
        </div>


        <div>
          <label className="block font-semibold mb-1">Trazas</label>
          <input
            type="text"
            value={trazas}
            onChange={(e) => setTrazas(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded"
            required
          />
        </div>

        <div className="flex gap-4">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Crear producto
          </button>
          <button type="button" onClick={() => navigate(-1)} className="text-gray-600 hover:underline">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}

export default CrearProducto
