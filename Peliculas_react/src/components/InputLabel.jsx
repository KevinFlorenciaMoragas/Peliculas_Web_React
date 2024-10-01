import React from 'react'

export default function InputLabel(props) {
    return (
        <>
            <div className="mb-3">
                <label htmlFor={props.labelFor} className="form-label">{props.label}</label>
                <input type={props.inputType} className="form-control" id={props.inputId} value={props.value} onChange={props.onChange} required>
                </input>
            </div>
        </>
    )
}
