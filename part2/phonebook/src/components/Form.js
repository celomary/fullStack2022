import { useState } from "react";

const Form = ({ addPerson }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleInputNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleInputNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!newName.length || !newNumber.length) {
      alert(
        "Please add user name and phone number before adding it to phonebook"
      );
      return;
    }
    addPerson(newName, newNumber);
    setNewName("");
    setNewNumber("");
  };
  return (
    <div>
      <h3>add new</h3>
      <form onSubmit={handleOnSubmit}>
        <div>
          name:{" "}
          <input type="text" value={newName} onChange={handleInputNameChange} />
        </div>
        <div>
          number:{" "}
          <input
            type="text"
            value={newNumber}
            onChange={handleInputNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default Form;
