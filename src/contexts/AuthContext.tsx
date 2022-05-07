import Auth from "api/auth";
import React, { useContext, useEffect, useState } from "react";

const Token = {
    set: token => localStorage.setItem('token', token),
    get: () => localStorage.getItem('token') || '',
    clear: () => localStorage.removeItem('token')
}
const AuthContext = React.createContext<any>(undefined);

const AuthProvider = ({children}) => {
    const [ user, setUser ] = useState<any>({});

    const logIn = token => {
        Token.set(token);
        Auth.me().then(res => setUser(res.data)).catch(err => {});
    } 
    const logOut = () => {
        Token.clear();
        setUser({});
    }
    const reload = () => Auth.me().then(res => setUser(res.data)).catch(err => setUser({}));

    useEffect(() => {
        const token = Token.get();
        if (token) Auth.me().then(res => setUser(res.data)).catch(err => setUser({}));
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, reload, logIn, logOut }} >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;