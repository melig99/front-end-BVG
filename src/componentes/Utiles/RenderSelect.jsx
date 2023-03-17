import React, { Component, useState, useEffect } from "react";
import Select from 'react-select';

const RenderSelect = props => {
    const [state, setState] = useState({
        selectedValue: '',
    })

    const onHandleChange = (e) => {
        e.preventDefault()
        const value = e.target.value
        console.log()
        setState(state => (
            {
                selectedValue: e.target.value,
            }
        ))
        props.setSelected(e.target.value )
    }

    const { optionList } = props;
    useEffect(() => {
        setState(prev => ({
            ...prev,
            selectedValue: props.defaultValue,
        }))
    }, [props.defaultValue]);

    console.log('Select check optionlist: ', optionList)

    return (

        <Select value={state.selectedValue} onChange={onHandleChange}>

            {Object.keys(optionList).map((item) => {
                return (
                    <option key={optionList[item].value} value={optionList[item].value}>{optionList[item].label}</option>
                    //console.log(optionList[item].value)
                )
            })}
        </Select>


    )


}

export default RenderSelect;