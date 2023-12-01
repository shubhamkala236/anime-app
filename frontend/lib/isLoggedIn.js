import { cookies } from 'next/headers'

const isLoggedIn = () => {
    const cookieStore = cookies()
    const token = cookieStore?.get('token')?.value;


    if(token===undefined || token===null)
    {
        return false;
    }

    return true;

}

export {isLoggedIn};