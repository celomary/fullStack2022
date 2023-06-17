import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Persons from "./components/Persons/Persons";
import personServices from "./services/personServices";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filterByName, setFilterByName] = useState("");

  const addPerson = (personName, personNumber) => {
    const person = persons.find(person => person.name === personName);
    if (person) {
      if (window.confirm(`${personName} is already added to the phonebook, replace old number with new one?`))
      {
        const personData = {
          ...person,
          number: personNumber
        };
        personServices.updatePerson(person.id, personData).then( data=> {
          const updatedPersons = persons.map(per => {
            if (per.id === person.id)
              return personData;
            return per
          })
          setPersons(updatedPersons);
        })
      }
      return;
    }
    const personId = persons.length * 10 + 1;
    const newPerson = {
      name: personName,
      number: personNumber,
      id: personId
    }
  
    personServices.createNew(newPerson).then(data => {
      console.log(data);
      setPersons((state) => [
      ...state,
      newPerson
    ]);
    })  
  };

  const filteredPersons = persons.filter((person) =>
    person.name.includes(filterByName)
  );

  const handleDelete = (id, name) => {
    return () => {
      if (window.confirm(`Delete ${name} ?`))
      {
        personServices.deletePerson(id).then(data => {
          setPersons(persons.filter(person => person.id !== id))
        })
      
    }
  }
  }

  useEffect(()=> {
    personServices.getAll().then(data => setPersons(data));
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterByName={filterByName} setFilterByName={setFilterByName} />
      <Form addPerson={addPerson} />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
