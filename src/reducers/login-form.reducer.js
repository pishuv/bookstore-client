import loginFormActiomType from "../actions/login-form.action";

export const LOGIN_FORM_INITIAL_STATE = {
    values: {
        email: '',
        password: '',
    },

    validities: {
        email: true,
        password: true,
    },

    errorMessages: {
        email: '',
        password: '',
    },
};

const loginReducer = (state, action) => {
    switch (action.type) {
       case loginFormActiomType.UPDATE_EMAIL: {
           const updatedEmailValue = action.payload.value;
           const updatedIsEmailValid = action.payload.isValid;
           const updatedEmailErrorMessage = action.payload.errorMessage;

           const updatedValues = {...state.values, email: updatedEmailValue};
           const updatedValidities = {...state.values, email: updatedIsEmailValid};
           const updatedErrorMessage = {...state.values, email: updatedEmailErrorMessage};

           const updatedState = {
               values: updatedValues,
               validities: updatedValidities,
               errorMessages: updatedErrorMessage,
           };
           console.log(updatedState)
           return updatedState;
           
    }

    case loginFormActiomType.UPDATE_PASSWORD: {
        const updatedPasswordValue = action.payload.value;
        const updatedIsPasswordValid = action.payload.isValid;
        const updatedPasswordErrorMessage = action.payload.errorMessage;

        const updatedValues = {...state.values, password: updatedPasswordValue};
        const updatedValidities = {...state.values, password: updatedIsPasswordValid};
        const updatedErrorMessage = {...state.values, password: updatedPasswordErrorMessage};

        const updatedState = {
            values: updatedValues,
            validities: updatedValidities,
            errorMessages: updatedErrorMessage,
        };

        return updatedState;
    }

    default: {
        return state;
    }
  }
};

export default loginReducer;