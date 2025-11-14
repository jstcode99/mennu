import { User } from "@/domain/models/user.model";

export async function fetchAccount() {
    const response = await fetch('http://localhost:3000/account');
    if (!response.ok) throw new Error('Network error');
    return response.json();
}

export async function updateAccount(payload: { name: string; email: string }): Promise<User> {
    const response = await fetch('http://localhost:3000/account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    return response.json().then(data => data as User);
}
