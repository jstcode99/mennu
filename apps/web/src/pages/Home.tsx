import { useEffect, useState } from 'react';
import { fetchUsers, createUser } from '../services/user.service';
import { Link } from 'react-router';

export default function Home() {
    const [users, setUsers] = useState<any[]>([]);

    useEffect(() => {
        fetchUsers().then(setUsers).catch(console.error);
    }, []);

    return (
        <div className='p-4 container'>
            <h1 className='text-2xl uppercase'>Users</h1>
            <ul>
                {users.map(u => <li key={u.id}>{u.name} ({u.email})</li>)}
            </ul>
            <button onClick={() => createUser({ name: 'Test', email: 't@t.com' }).then(() => fetchUsers().then(setUsers))}>
                Crear user
            </button>
            <hr className='my-4' />
            <Link to="/login">Go to Login</Link>
        </div>
    );
}
