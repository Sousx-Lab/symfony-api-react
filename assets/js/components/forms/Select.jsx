import React from 'react';

const Select = ({name, label, value, error = "", onChange, children}) => {
    return (
    <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <select name={name} value={value} id={name} onChange={onChange}
         className={"form-control" +(error && " is-invalid")}>      
            {children}
        </select>
        {error && 
        <p className="invalid-feedback">{error}</p>}
    </div>);
};

export default Select;