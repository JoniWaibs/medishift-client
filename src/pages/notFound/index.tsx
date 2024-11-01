import { FaExclamationTriangle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
    const navigate = useNavigate();
  
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center p-8 max-w-md bg-white shadow-lg rounded-lg">
          <FaExclamationTriangle className="text-red-500 text-6xl mb-4 mx-auto" />
          <h1 className="text-4xl font-bold text-gray-800 mb-2">404</h1>
          <p className="text-lg text-gray-600 mb-6">Oops! La página que estás buscando no existe.</p>
          <button
            onClick={() => navigate('/shift/list')}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-200"
          >
            Volver a la página principal
          </button>
        </div>
      </div>
    );
  };

export default NotFound;