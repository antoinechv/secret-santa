// Ce composant affiche la liste des assignments
// Il prend en props le tableau d'assignments
export function AssignmentDisplay({ assignments }) {
  return (
    <ul className="space-y-2">
      {assignments.map((assignment, index) => (
        <li key={index}>
          <span>{assignment.giver}</span> offre un beau cadeau à{" "}
          <span>{assignment.receiver}</span>
        </li>
      ))}
    </ul>
  );
}
