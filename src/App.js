import React,{useState} from 'react';
import './App.css';

const InputWithCheck = ({value,onChange}) => (
    <div className="input-with-check">
      <input 
        type="number" 
        value={value.value} 
        onChange={ e => onChange({value: e.target.value,check: value.check}) } />

      <label className="container-checkbox">
        <input 
          type="checkbox" 
          checked={value.check} 
          onChange={ e => onChange({value: value.value,check: e.target.checked }) } />
        <span className="checkmark"></span>
      </label>
      
    </div>
);

const ButtonOperation = ({addition,substraction,multiplication,division,onClick}) => (
  <button onClick={onClick} >
    {addition ? "+" : substraction ? "-" : multiplication ? "x" : division ? "/": "" }
  </button>
 );

const App = () => {

  const defaultInputValue = {
    input1: {value: 0,check: true},
    input2: {value: 0,check: true},
    input3: {value: 0,check: true}
  };

  const [result,setResult] = useState(0);
  const [inputs,setInputs] = useState(defaultInputValue);

  const clickOperiation = operation => {

    let tempResult = 0;
    const checkedInputs = Object.keys(inputs).map(key => inputs[key] ).filter(el => el.check === true);
    if(checkedInputs.length === 1) return alert("error");
    
    checkedInputs.forEach((el,i)=> {
      if(operation === "addition") 
      tempResult += parseInt(el.value);
      else if(operation === "substraction")
        (i === 0) ? tempResult = parseInt(el.value) : tempResult -= parseInt(el.value);
      else if(operation === "multiplication")
        (i === 0) ? tempResult = parseInt(el.value) : tempResult *= parseInt(el.value);
      else if(operation === "division")
        (i === 0) ? tempResult = parseInt(el.value) : tempResult /= parseInt(el.value);
    });
    setResult(tempResult);
  }

  return (
    <div className="container">
      <div className="input-container">
        <InputWithCheck 
          value={inputs.input1} 
          onChange={(value) => setInputs({...inputs,input1: value}) } />
        <InputWithCheck 
          value={inputs.input2} 
          onChange={(value) => setInputs({...inputs,input2: value}) } />
        <InputWithCheck 
          value={inputs.input3} 
          onChange={(value) => setInputs({...inputs,input3: value}) }/>
      </div>
      <div className="button-container">
        <ButtonOperation 
          onClick={()=> clickOperiation("addition") } addition />
        <ButtonOperation 
          onClick={()=> clickOperiation("substraction") } substraction />
        <ButtonOperation 
          onClick={()=> clickOperiation("multiplication") } multiplication />
        <ButtonOperation 
          onClick={()=> clickOperiation("division") } division />
      </div>
      <hr />
      <p>Hasil: {result}</p>
    </div>
  );
}

export default App;
