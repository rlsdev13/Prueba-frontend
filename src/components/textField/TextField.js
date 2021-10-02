import React, { useState } from 'react';
import { CSVLink, CSVDownload } from "react-csv";
import { Navbar } from '../ui/Navbar';

const initState = {
    note : '',
}

export const TextField = () => {

    const [formValues, setFormValues] = useState(initState);

    const {
        note,        
    } = formValues;

    const headers = [
        { label : "Note", key : "note"}
    ]


    const handleInputChange = ( { target } ) => {
        setFormValues({
            ...formValues,
            [target.name] : target.value
        });
    }

    const csvReport = {
        data : [formValues],
        headers : headers,
        filename : "Notes.csv"
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();
        console.log(formValues);
        <CSVDownload data={[formValues]} target="_blank" />;
        // dispatch( soporteStartAddNew( formValues ) );
        setFormValues(initState);
    }

    return (
        <>
            <Navbar/>
            <br /><br /><br />
            <div className = "container">
            <form
                onSubmit={ handleSubmitForm }
            >
                <div className="form-floating">
                    <textarea 
                        className="form-control" 
                        placeholder="Leave a comment here" 
                        id="floatingTextarea"
                        name="note"
                        value={ note }
                        onChange={ handleInputChange }
                    >
                    </textarea>
                    <label htmlFor="floatingTextarea">Note</label>
                </div>
                <CSVLink className="btn btn-success mt-2" {...csvReport}>Export to CSV</CSVLink>
            </form>

            </div>

        </>
    )
}
