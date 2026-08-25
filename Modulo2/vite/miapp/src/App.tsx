import './App.css';
import type {Curso} from './interfaces/curso';
import CursoItem from './components/CursoItem';

function App() {
  const cursos: Curso[] = [
  {
    id: 1,
    nombre: "Ingeniería Web",
    creditos: 4
  },
  {
    id: 2,
    nombre: "Bases de Datos",
    creditos: 5
  },
  {
    id: 3,
    nombre: "Inteligencia Artificial",
    creditos: 5
  }
];

  return (
    <ul>
      {cursos.map((item) => (
        <CursoItem
          key={item.id}
          curso={item}
        />
      ))}
    </ul>
  
  )
}

export default App
