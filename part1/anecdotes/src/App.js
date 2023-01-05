import { useState } from 'react';

const Display = ({ anecdote, point }) => {
    return (
        <div>
            <p>{anecdote}</p>
            <p>has {point} votes</p>
        </div>
    );
};

const AnecdoteWithMostVote = ({ points, anecdotes }) => {
    const maxPoint = Math.max(...points);
    const index = points.indexOf(maxPoint);
    return <Display point={maxPoint} anecdote={anecdotes[index]} />;
};

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
    ];
    const [selected, setSelected] = useState(0);
    const [points, setPoints] = useState(new Array(anecdotes.length).fill(0));

    const handleGenerateRandom = () => {
        const randomIndex = Math.floor(Math.random() * anecdotes.length);
        setSelected(randomIndex);
    };

    const handleVote = () => {
        setPoints((state) => {
            const copy = [...state];
            copy[selected] += 1;
            return copy;
        });
    };

    return (
        <div>
            <h1>Anecdote of the day</h1>
            <Display anecdote={anecdotes[selected]} point={points[selected]} />
            <div>
                <button onClick={handleVote}>vote</button>
                <button onClick={handleGenerateRandom}>next anecdote</button>
            </div>
            <h1>Anecdote with most votes</h1>
            <AnecdoteWithMostVote points={points} anecdotes={anecdotes} />
        </div>
    );
};

export default App;
