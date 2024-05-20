
import React, { useState, useEffect } from "react";
import Select from "react-select";

export default function ComboBox({ options, onChange }){

    const [selectedOption, setSelectedOption] = useState(null);

    const handleChange = selectedOption => {
      setSelectedOption(selectedOption);
      onChange(selectedOption);
    };
  
    useEffect(() => {
      // Set initial selected option if needed
      // For example, setSelectedOption(options[0]);
      if(options){
        options.unshift({_id:null, title:''})
      }

    }, [options]);

    return(
        <Select
          value={selectedOption}
          onChange={handleChange}
          options={options}
          isSearchable
          getOptionLabel={option => option.title}
          getOptionValue={option => option._id}
        />
    );

}