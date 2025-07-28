import React, { useContext } from 'react';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hooks';
import './PlaceForm.css';
import ImageUpload from '../../shared/components/FormElements/ImageUpload.js'
const NewPlace = () => {
    const auth = useContext(AuthContext)
    const { error, sendRequest, clearError, isloading } = useHttpClient()
    const [formState, inputHandler] = useForm(
        {
            title: {
                value: '',
                isValid: false
            },
            description: {
                value: '',
                isValid: false
            },
            address: {
                value: '',
                isValid: false
            },
            image: {
                value: null,
                isValid: false
            }
        },
        false
    );

    const history = useHistory();
    const placeSubmitHandler = async event => {
        alert('places---')
        event.preventDefault();
        console.log(formState.inputs, 'formstate-------'); // send this to the backend!a

        try {
            const formData = new FormData();
            formData.append('title', formState.inputs.title.value);
            formData.append('description', formState.inputs.description.value);
            formData.append('address', formState.inputs.address.value);
            // formData.append('creator', auth.userId);
            formData.append('image', formState.inputs.image.value);
            for (let pair of formData.entries()) {
                console.log(`${pair[0]}:`, pair[1]);
            }

            await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places`, 'POST', formData, {
                Authorization: 'Bearer ' + auth.token
            });

            history.push('/')
        } catch (err) {

        }

    };

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isloading && <div className='center'>
                <LoadingSpinner />
            </div>}

            <form className="place-form" onSubmit={placeSubmitHandler}>
                <Input
                    id="title"
                    element="input"
                    type="text"
                    label="Title"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid title."
                    onInput={inputHandler}
                />
                <Input
                    id="description"
                    element="textarea"
                    label="Description"
                    validators={[VALIDATOR_MINLENGTH(5)]}
                    errorText="Please enter a valid description (at least 5 characters)."
                    onInput={inputHandler}
                />
                <Input
                    id="address"
                    element="input"
                    label="Address"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid address."
                    onInput={inputHandler}
                />
                <ImageUpload id="image" onInput={inputHandler} errorText={"Please provide and imge"} />
                <Button type="submit" disabled={!formState.isValid}>
                    ADD PLACE
                </Button>
            </form>
        </React.Fragment>
    );
};

export default NewPlace;
