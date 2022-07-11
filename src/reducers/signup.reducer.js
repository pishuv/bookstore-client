import signUpFormActionTypes from "../actions/signup-form.action";

export const SIGN_UP_FORM_INITIAL_STATE = {
    values: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        repeatedPassword: '',
    },

    validities: {
        firstName: true,
        lastName: true,
        email: true,
        password: true,
        repeatedPassword: true,
    },

    errorMessages: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        repeatedPassword: '',
    },
};

const signUpFormReducer = (state, action) => {
    switch (action.type) {
        case signUpFormActionTypes.UPDATE_FIRST_NAME: {
            const updatedFirstNameValue = action.payload.value;
            const updatedFirstNameValid = action.payload.isValid;
            const updatedFirstNameErroeMessage = action.payload.errorMessage;

            const updateValues = {...state.values, firstName: updatedFirstNameValue};
            const updateValidities = {...state.validities, firstName: updatedFirstNameValid};
            const updateErrorMessage = {...state.errorMessage, firstName: updatedFirstNameErroeMessage};

            const updateState = {
                values: updateValues,
                validities: updateValidities,
                errorMessages: updateErrorMessage,
            };
            
            return updateState;
        }
        
        case signUpFormActionTypes.UPDATE_LAST_NAME: {
            const updatedLastNameValue = action.payload.value;
            const updatedLastNameValid = action.payload.isValid;
            const updatedLastNameErrorMessage = action.payload.errorMessage;

            const updateValues = {...state.values, lastName: updatedLastNameValue};
            const updateValidities = {...state.validities, lastName: updatedLastNameValid};
            const updateErrorMessage = {...state.errorMessage, lastName: updatedLastNameErrorMessage};

            const updateState = {
                values: updateValues,
                validities: updateValidities,
                errorMessages: updateErrorMessage,
            };
            
            return updateState;
        }

        case signUpFormActionTypes.UPDATE_EMAIL: {
            const updatedEmailValue = action.payload.value;
            const updatedEmailValid = action.payload.isValid;
            const updatedEmailErrorMessage = action.payload.errorMessage;

            const updateValues = {...state.values, email: updatedEmailValue};
            const updateValidities = {...state.validities, email: updatedEmailValid};
            const updateErrorMessage = {...state.errorMessage, email: updatedEmailErrorMessage};

            const updateState = {
                values: updateValues,
                validities: updateValidities,
                errorMessages: updateErrorMessage,
            };
            
            return updateState;
        }
        
        case signUpFormActionTypes.UPDATE_PASSWORD: {
            const updatedPasswordValue = action.payload.value;
            const updatedPasswordValid = action.payload.isValid;
            const updatedPasswordErrorMessage = action.payload.errorMessage;

            const updateValues = {...state.values, password: updatedPasswordValue};
            const updateValidities = {...state.validities, password: updatedPasswordValid};
            const updateErrorMessage = {...state.errorMessage, password: updatedPasswordErrorMessage};

            const updateState = {
                values: updateValues,
                validities: updateValidities,
                errorMessages: updateErrorMessage,
            };
            
            return updateState;
        }

        case signUpFormActionTypes.UPDATE_REPEATED_PASSWORD: {
            const updatedRepeatedPasswordValue = action.payload.value;
            const updatedRepeatedPasswordValid = action.payload.isValid;
            const updatedRepeatedPasswordErrorMessage = action.payload.errorMessage;

            const updateValues = {...state.values, repeatedPassword: updatedRepeatedPasswordValue};
            const updateValidities = {...state.validities, repeatedPassword: updatedRepeatedPasswordValid};
            const updateErrorMessage = {...state.errorMessage, repeatedPassword: updatedRepeatedPasswordErrorMessage};

            const updateState = {
                values: updateValues,
                validities: updateValidities,
                errorMessages: updateErrorMessage,
            };
            
            return updateState;
        }

        default: {
            return state;
        }
    }
};

export default signUpFormReducer;