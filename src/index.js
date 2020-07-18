import React from 'react';
import ReactDOM from 'react-dom';
import Three from './pages/three';
import Word from './pages/word';
import Test from './pages/test';


const Index = () => {
  return <div><Test /></div>;
};

ReactDOM.render(<Index />, document.getElementById('index'));