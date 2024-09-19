import React, { useState } from 'react';
import axios from 'axios';

function DisplayPage({ onLogout }) {
    const [userInput, setUserInput] = useState('');
    const [userId, setUserId] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        let url = 'http://localhost:3000/';
        let method = 'GET';
        let data = {};

        switch (userInput.toLowerCase()) {
            case 'read':
                url += 'users';
                break;
            case 'create':
                url += 'users';
                method = 'POST';
                data = { email, password, roles: [role] };
                break;
            case 'update':
                if (!userId) {
                    setResponseMessage('Please provide an ID to update');
                    return;
                }
                url += `users/${userId}`;
                method = 'PUT';
                data = { email, password, roles: [role] };
                break;
            case 'delete':
                if (!userId) {
                    setResponseMessage('Please provide an ID to delete');
                    return;
                }
                url += `users/${userId}`;
                method = 'DELETE';
                break;
            default:
                setResponseMessage('Invalid input');
                return;
        }

        try {
            const response = await axios({
                url,
                method,
                data,
            });
            setResponseMessage(`Success: ${JSON.stringify(response.data)}`);
        } catch (error) {
            setResponseMessage(`Error: ${error.message}`);
        }
    };

    return (
        <div>
            <h2>Display Page</h2>
            <form onSubmit={handleSubmit}>
                <label>Enter Action (read, create, update, delete):</label>
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    required
                />
                {userInput.toLowerCase() === 'create' && (
                    <>
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <label>Role:</label>
                        <input
                            type="text"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            required
                        />
                    </>
                )}
                {(userInput.toLowerCase() === 'update' || userInput.toLowerCase() === 'delete') && (
                    <>
                        <label>ID:</label>
                        <input
                            type="text"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            required
                        />
                        {(userInput.toLowerCase() === 'update') && (
                            <>
                                <label>Email:</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <label>Password:</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <label>Role:</label>
                                <input
                                    type="text"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                />
                            </>
                        )}
                    </>
                )}
                <button type="submit" onClick={handleSubmit}>Submit</button>
            </form>
            <p>{responseMessage}</p>
            <button onClick={onLogout}>Logout</button>
        </div>
    );
}

export default DisplayPage;
