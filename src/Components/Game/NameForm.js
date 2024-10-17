import { useState } from 'react';

function NameForm() {
    const [name, setFirstName] = useState('');
    const [greeting, setGreeting] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setGreeting(`Hello, ${name}!`);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Name:
                        <input type="text" value={name} onChange={(e) => setFirstName(e.target.value)} required />
                    </label>
                </div>
                <button type="submit">Submit</button>
            </form>
            {greeting && <h2>{greeting}</h2>}
        </div>
    );
}

export default NameForm;