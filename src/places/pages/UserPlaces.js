import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useHttpClient } from '../../shared/hooks/http-hook';
import PlaceList from '../components/PlaceList';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner.js';
import ErrorModal from '../../shared/components/UIElements/ErrorModal.js';




const UserPlaces = () => {
    const [loadedPlaces, setLoadedPlaces] = useState();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const userId = useParams().userId;

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`
                );
                setLoadedPlaces(responseData.places);
            } catch (err) { }
        };
        fetchPlaces();
    }, [sendRequest, userId]);

    const placeDeleteHandler = (deletePlaceId) => {
        setLoadedPlaces(prevPlaces => prevPlaces.filter(place => place.id !== deletePlaceId))
    }
    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && (
                <div className="center">
                    <LoadingSpinner />
                </div>
            )}
            {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} onDeletePlace={placeDeleteHandler} />}
        </React.Fragment>
    );
};

export default UserPlaces;
