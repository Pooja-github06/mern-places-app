import React, { useEffect, useState } from 'react';

import UsersList from '../components/UsersList';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { useHttpClient } from '../../shared/hooks/http-hook';
const Users = () => {
    // const [isLoading, setIsLoading] = useState(false);
    // const [error, setError] = useState();
    const [loadedUser, setLoadedUser] = useState();
    const { isloading, error, sendRequest, clearError } = useHttpClient()
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/users`);
                // const responseData = await response.json();
                console.log('✅ Response received:', response);
                setLoadedUser(response.users)
            } catch (err) {

            }

        }
        fetchUsers();

    }, [sendRequest])




    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isloading && (<div className='center'>
                <LoadingSpinner />
            </div>)}
            {!isloading && loadedUser && <UsersList items={loadedUser} />}
        </React.Fragment>
    )
};

export default Users;
