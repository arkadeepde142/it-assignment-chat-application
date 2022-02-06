import {useContext} from 'react'
import userContext from '../contexts/userContext'
export default function useAuth() {
    const user = useContext(userContext);
    return user;
}