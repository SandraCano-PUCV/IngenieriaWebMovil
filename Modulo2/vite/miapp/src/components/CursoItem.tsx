import type { Curso } from "../interfaces/curso";

interface CursoItemProps {
  curso: Curso;
}

function CursoItem({curso}: CursoItemProps){
    return (
    <li>
      <h2>{curso.nombre}</h2>
      <p>ID: {curso.id}</p>
      <p>Créditos: {curso.creditos}</p>
    </li>
  );
}

export default CursoItem;
