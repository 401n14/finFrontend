import React from 'react';

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