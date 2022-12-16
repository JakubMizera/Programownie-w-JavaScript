import React, { useEffect, useState } from 'react';
import OpenWeatherApi from '../APIs/OpenWeatherApi';
import axios from 'axios';

import GetLocation from './GetLocation';

const App = () => {

  return (
    <div>
      <GetLocation/>
    </div>
  )
};

export default App;
