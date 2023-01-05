const Header = (props) => {
    return <h1>{props.course}</h1>;
};

const Part = ({ part }) => {
    const { name, exercises } = part;
    return (
        <p>
            {name} {exercises}
        </p>
    );
};

const Content = (props) => {
    return (
        <>
            {props.parts.map((part, index) => (
                <Part part={part} key={index} />
            ))}
        </>
    );
};

const Total = ({ parts }) => {
    const calculateTotal = () => {
        return parts.reduce((total, part) => part.exercises + total, 0);
    };
    return <p>Number of exercises {calculateTotal()}</p>;
};

const App = () => {
    const course = 'Half Stack application development';
    const parts = [
        {
            name: 'Fundamentals of React',
            exercises: 10
        },
        {
            name: 'Using props to pass data',
            exercises: 7
        },
        {
            name: 'State of a component',
            exercises: 14
        }
    ];

    return (
        <div>
            <Header course={course} />
            <Content parts={parts} />
            <Total parts={parts} />
        </div>
    );
};

export default App;
