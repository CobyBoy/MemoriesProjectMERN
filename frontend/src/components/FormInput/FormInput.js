import React from 'react'
import { TextField } from '@material-ui/core';

const FormInput = ({ name, label, value, inputRefs, index, onChange }) => {
    return (
        <>
            <TextField name={ name } variant="outlined" label={ label } fullWidth value={ value } inputRef={ (element) => { inputRefs.current[index] = element; } }
                onChange={ onChange }
            />
        </>
    )
}

export default FormInput;
