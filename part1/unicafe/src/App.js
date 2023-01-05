import { useState } from 'react';

const StatisticLine = ({ text, value }) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    );
};

const Statistics = ({ good, neutral, bad }) => {
    const calculateAverage = () => {
        return ((good - bad) / (good + bad + neutral)).toFixed(1);
    };

    const calculatePostiveFeedback = () => {
        return ((good * 100) / (good + bad + neutral)).toFixed(1);
    };

    if (!good && !neutral && !bad) return <p>No feedback given</p>;
    return (
        <table>
            <tbody>
                <StatisticLine text={'good'} value={good} />
                <StatisticLine text={'neutral'} value={neutral} />
                <StatisticLine text={'bad'} value={bad} />
                <StatisticLine text={'all'} value={good + bad + neutral} />
                <StatisticLine text={'average'} value={calculateAverage()} />
                <StatisticLine
                    text={'positive'}
                    value={`${calculatePostiveFeedback()} %`}
                />
            </tbody>
        </table>
    );
};

const Button = ({ text, handleClick }) => {
    return <button onClick={handleClick}>{text}</button>;
};

const App = () => {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    return (
        <div>
            <h1>give feedback</h1>
            <Button
                text="good"
                handleClick={() => setGood((state) => state + 1)}
            />
            <Button
                text="neutral"
                handleClick={() => setNeutral((state) => state + 1)}
            />
            <Button
                text="bad"
                handleClick={() => setBad((state) => state + 1)}
            />
            <h1>statistics</h1>
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    );
};

export default App;
