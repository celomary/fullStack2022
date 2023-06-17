const Person = ({ person: { name, number, id }, handleDelete }) => {
  return (
    <p>
      {name} {number}
      <button onClick={handleDelete(id, name)}>delete</button>
    </p>
  );
};

export default Person;
