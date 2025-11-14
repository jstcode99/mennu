import { useEffect, useState } from 'react';
import { fetchUsers, createUser } from '../services/user.service';
import { Link } from 'react-router';
import { Button } from '@/components/ui/button';

export default function Home() {
    const [users, setUsers] = useState<any[]>([]);

    const handleCreateUser = async () => {
        const newUser = await createUser({
            name: 'New User',
            email: `user${Date.now()}@example.com`,
            password: 'Password123',
        });
        setUsers([...users, newUser]);
    }

    useEffect(() => {
        fetchUsers().then(setUsers).catch(console.error);
    }, []);

    return (
        <div className='p-4 container'>
            <h1 className='text-2xl uppercase'>Users</h1>
            <ul>
                {users.map(u => <li key={u.id}>{u.name} ({u.email})</li>)}
            </ul>
            <Button onClick={handleCreateUser}>
                Crear user
            </Button>
            <hr className='my-4' />
            <Link to="/login">Go to Login</Link>
        </div>
    );
}
