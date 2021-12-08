import { getCookie } from "./cookie";

export const checkIfAuthenticated = () => {
    const accessToken = getCookie('accessToken');
    if (accessToken) {
        return true;
    } else {
        return false;
    }
}