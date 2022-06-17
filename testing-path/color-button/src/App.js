import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { primary, secondary, disable } from './defaults/colors';

export function replaceCamelWithSpaces(colorName){
  if(typeof colorName !== 'string') return null
  //if colorName has spaces, return it
  if(colorName.includes(' ')) return colorName;
  return colorName.replace(/([A-Z])/g, " $1").toLowerCase();
}


function App() {
  const [color, setColor] = useState(primary);
  const [text, setText] = useState(`change to ${replaceCamelWithSpaces(color === primary ? secondary : primary )}`);
  const [disabled, setDisabled] = useState(false);
  const [lastColor, setLastColor] = useState(color);

  useEffect(() => {
    setText(`change to ${replaceCamelWithSpaces(color === primary ? secondary : primary)}`);
  }, [color]);


  const handleDisabled = () => {
    console.log('handleDisabled');
    setDisabled(!disabled);
    if(!disabled) {
      setLastColor(color);
      setColor(disable);
    } else {
      setColor(lastColor);
    }
  }

  const handleClick = () => {
    console.log(color === primary);
    if(color == primary) {
      setColor(secondary);
    }
    else {
      setColor(primary);
    }
  }

  return (
    <div >
      <button style={{ backgroundColor: color }} onClick={handleClick} disabled={disabled} >{text}</button>
      <input id="disable-button-checkbox" type="checkbox" onChange={handleDisabled} />
      <label htmlFor="disable-button-checkbox">Disable button</label>
    </div>
  );
}

export default App;
