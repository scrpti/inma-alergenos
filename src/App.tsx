import { Link } from 'react-router-dom'
import ListaProductos from './components/ListaProductos'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="fixed top-4 left-4">
        <Link to="/crear">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow">
            Crear producto
          </button>
        </Link>
      </div>

      <div className="flex items-center justify-center h-full pt-20">
        {/* GET Productos */}
        <div className="min-h-screen bg-gray-100">
          <ListaProductos />
        </div>
      </div>


    </div>
  );
}

export default App;
