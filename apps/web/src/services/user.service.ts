export async function fetchUsers() {
    const res = await fetch('http://localhost:3000/users');
    if (!res.ok) throw new Error('Network error');
    return res.json();
}

export async function createUser(payload: { name: string; email: string }) {
    const res = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    return res.json();
}
