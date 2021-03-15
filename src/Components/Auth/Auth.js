import React from "react";
import Form from "./Form";

const nameValidation = (fieldName, fieldValue) => {
    if (fieldValue.trim() === "") {
        return `${fieldName} is required`;
    }
    if (/[^a-zA-Z -]/.test(fieldValue)) {
        return "Invalid characters";
    }
    if (fieldValue.trim().length < 3) {
        return `${fieldName} needs to be at least three characters`;
    }
    return null;
};
const emailValidation = (email) => {
    if (/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
        return null;
    }
    if (email.trim() === "") {
        return "Email is required";
    }
    return "Please enter a valid email";
};
const validate = {
    firstName: (name) => nameValidation("First Name", name),
    lastName: (name) => nameValidation("Last Name", name),
    email: emailValidation,
};
const initialValues = {
    email: "",
    firstName: "",
    lastName: "",
};

const FormVanilla = () => {
    const [values, setValues] = React.useState(initialValues);

    const [errors, setErrors] = React.useState({});

    const [touched, setTouched] = React.useState({});

    // change event handler
    const handleChange = (evt) => {
        const { name, value: newValue, type } = evt.target;

        // keep number fields as numbers
        const value = type === "number" ? +newValue : newValue;

        // save field values
        setValues({
            ...values,
            [name]: value,
        });

        // was the field modified
        setTouched({
            ...touched,
            [name]: true,
        });
    };

    const handleBlur = (evt) => {
        const { name, value } = evt.target;

        // remove whatever error was there previously
        const { [name]: removedError, ...rest } = errors;

        // check for a new error
        const error = validate[name](value);

        // // validate the field if the value has been touched
        setErrors({
            ...rest,
            ...(error && { [name]: touched[name] && error }),
        });
    };

    // form submit handler
    const handleSubmit = (evt) => {
        evt.preventDefault();

        // validate the form
        const formValidation = Object.keys(values).reduce(
            (acc, key) => {
                const newError = validate[key](values[key]);
                const newTouched = { [key]: true };
                return {
                    errors: {
                        ...acc.errors,
                        ...(newError && { [key]: newError }),
                    },
                    touched: {
                        ...acc.touched,
                        ...newTouched,
                    },
                };
            },
            {
                errors: { ...errors },
                touched: { ...touched },
            }
        );
        setErrors(formValidation.errors);
        setTouched(formValidation.touched);

        if (
            !Object.values(formValidation.errors).length && // errors object is empty
            Object.values(formValidation.touched).length === Object.values(values).length && // all fields were touched
            Object.values(formValidation.touched).every((t) => t === true) // every touched field is true
        ) {
            alert(JSON.stringify(values, null, 2));
        }
    };

    return (
        <>
            <Form
                handleBlur={handleBlur}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                errors={errors}
                touched={touched}
                values={values}
            />
        </>
    );
};

export default FormVanilla;