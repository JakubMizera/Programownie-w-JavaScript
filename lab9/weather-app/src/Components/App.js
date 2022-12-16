import React, { useEffect, useState } from 'react';
import GetLocation from './GetLocation';

import './../Style/App.css';

const App = () => {

  return (
    <div className='container'>
      <GetLocation/>
    </div>
  )
};

export default App;
