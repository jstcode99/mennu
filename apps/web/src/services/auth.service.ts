export const signIn = async (payload: { email: string, password: string }) => {
    return await fetch('http://localhost:3000/auth/sign-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
}

export const signUp = async (payload: { name: string, email: string, password: string }) => {
    return await fetch('http://localhost:3000/auth/sign-up', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
}
