import { useNavigate } from 'react-router-dom'

export default function BotonVolver() {
  const navigate = useNavigate()

  return (
    <button
      onClick={() => navigate(-1)}
      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow text-sm text-blue-600 hover:underline mt-4 inline-block"
    >
      ← Volver atrás
    </button>
  )
}