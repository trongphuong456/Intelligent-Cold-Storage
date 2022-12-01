import React from 'react'
import DatePicker from "react-datepicker";
import { useState } from 'react';
import './datepicker.css'

import "react-datepicker/dist/react-datepicker.css";

const DatePickerComponent = (props) => {
    const {setDatePicker, warehouseId} = props;
    const [startDate, setStartDate] = useState(new Date());
    return (
        <div id='DatePicker'>
            <div className='datepicker-section'>
                <div className='day'><p>DAY:</p></div>
                <div>
                    <DatePicker
                    dateFormat="dd/MM/yyyy"
                    selected={startDate}
                    onChange={(datePicker) => {
                        
                        setStartDate(datePicker);
                        setDatePicker(datePicker);
                    }}
                    />
                </div>
                <div className='warehouse'>WAREHOUSE: <span className='number-warehouse'>{warehouseId}</span></div>

            </div>
        </div>
    );
  };
  
  export default DatePickerComponent;
  
