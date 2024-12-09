import { redirect } from 'react-router-dom';

function isAuthenticated() {
    const session = localStorage.getItem('session');

    if (session) throw redirect("/");
    return null;
}

function handleVerificationProtected() {
    const session = localStorage.getItem('session');

    if (!session) throw redirect("/signin");
    return null;
}

async function signIn(email, password, supabase) {
    return await supabase.auth.signInWithPassword({
        email, password
    });
}

async function signUp(email, password, supabase) {
    return await supabase.auth.signUp({
        email, password
    });
}

async function logOut(supabase, navigate) {
    localStorage.removeItem("session");
    localStorage.removeItem("user");

    supabase.auth.signOut()

    return navigate("/signin");
}


export { isAuthenticated, handleVerificationProtected, signIn, signUp, logOut };