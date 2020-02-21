import React from 'react';

/**
 * Component for creating drop down menu 
 * @component FormSelect
 * @param {object} props json data consisting of language options
 * @return {ReactElement} HTML markup
 */
function FormSelect(props) {
    let options = [];

    options = props.list.map((item, ind)=> {
      return (
        <option key={ind} value={item.name}>
          {item.name}
        </option>
      );
    });
  
    return (
      <select
        onChange={props.onChange}
      >
          <option> -- Select Language -- </option>
        {options}
      </select>
    );
}

export default FormSelect;