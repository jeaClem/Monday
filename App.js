import React, {Fragment} from 'react';
import {StatusBar, View, Text} from 'react-native';

import { NativeRouter, Route, Link } from "react-router-native";
import Board from './android/app/components/Board';
import BoardSolo from './android/app/components/BoardSolo';


const App = () => {
  return (
    <Fragment>
      <NativeRouter> 


    <Route exact path="/"  component={Board} />
    <Route exact path="/"  component={BoardSolo} />

      </NativeRouter>
      <StatusBar barStyle="light-content" />
    </Fragment>
  );
};

export default App;
