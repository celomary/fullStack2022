const express = require("express");
const morgan = require('morgan');
const cors = require('cors');

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
];

const app = express();
app.use(express.json());
app.use(morgan('tiny', {
    skip: (req, res) => req.method.toLowerCase() === 'post'
}));

app.use(morgan((tokens, req, res) =>  ([
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body)
  ].join(' ')), {
    skip: (req, res) => req.method.toLowerCase() !== 'post'
}))

app.use(cors());
app.use(express.static('build'));
app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${persons.length} people</br>${(new Date(Date.now())).toString()}</p>`)
})

app.get('/api/persons', (req, res) => {
    res.json(persons);
})

app.get('/api/persons/:id', (req, res) => {
    const id = +req.params.id;
    if (Number.isNaN(id))
    {
        res.status(400).json({
            error: "Invalid id, id must be number"
        })
        return;
    }
    const person = persons.find(person => person.id === id);
    if (!person)
    {
        res.status(404).json({
            error: "Person with recieved id doesn't exist"
        })
        return;
    }
    res.status(200).json(person);
});

app.delete("/api/persons/:id", (req, res)=>{
    const id = +req.params.id;
    if (Number.isNaN(id))
    {
        res.status(400).json({
            error: "Invalid id, id must be number"  
        })
        return; 
    }
    const person = persons.find(({id: personId}) => personId === id);
    if (!person)
    {
        res.status(404).json({
            error: "unable to delete person with invalid id"
        })
    }
    else
    {
        persons = persons.filter(person => person.id !== id);
        res.status(204).json({});
    }
})

app.post('/api/persons', (req, res) => {
    const {name, number} = req.body;

    if (!name || !number)
    {
        res.status(400).json({
            error: "name or number is missing from recieved data, make sure to include them!"
        })
        return;
    }
    if (persons.find(person => person.name === name))
    {
        res.status(400).json({
            error: 'name must be unique'
        })
        return;
    }
    const id = Math.floor(Math.random() * 3000 + 10);
    const newEntry = {name, number, id}
    persons.push(newEntry);
    res.status(204).json({});
})

const PORT = process.env.PORT || 3001;

app.listen(PORT, ()=>{
    console.log("App is listening on PORT", PORT);
})
