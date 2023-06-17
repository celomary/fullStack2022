const Total = ({ parts }) => {
  const sumOfExercises = parts.reduce(
    (total, part) => total + part.exercises,
    0
  );
  return <h3>total of {sumOfExercises} exercises</h3>;
};

export default Total;
