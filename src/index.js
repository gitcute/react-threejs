import React from 'react';
import ReactDOM from 'react-dom';
import Three from './pages/three';
import Word from './pages/word';


const Index = () => {
  return <div><Three /></div>;
};

ReactDOM.render(<Index />, document.getElementById('index'));