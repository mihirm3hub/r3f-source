import React from 'react';
import { state } from '../store';
import { AiFillCloseCircle } from 'react-icons/ai';


const Hotspot = ({ text, id }) => {
  const containerClass = id ? 'dark' : 'light';
  return (
    <div className={`text-container ${containerClass}`}>
      <div
        style={{
          width: '10px',
          height: '10px',
        }}
      >
        <AiFillCloseCircle
          // size="1.5em"
          // color={state.night ? '#ffffff' : '#A3A3A3'}
          // onClick={() => {
          //   state.textHide = false;
          //   state.value = '';
          // }}
          style={{
            position: 'absolute',
            padding: '2px',
            top: '8px',
            right: '8px',
            cursor: 'pointer',
            zIndex: 10,
            
          }}
        />
      </div>
      <h3>{text[0]}</h3>
      <p>{text[1]}</p>
    </div>
  );
};

export default Hotspot;
