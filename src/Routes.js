import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Main from './pages/Main/Main';
import Register from './pages/Register/Register';
import Information from './pages/Information/Information';
import Anniversary from './pages/Anniversary/Anniversary';
import Record from './components/Record/Record.js';
import Story from './components/Story/Story';
import GlobalStyle from './styles/GlobalStyle';
import TestForm from './pages/Test/TestForm';
import theme from './styles/theme';
import Chart from './pages/Chart/Chart';

const Routes = () => (
  <>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/register" exact component={Register} />
          <Route path="/information" exact component={Information} />
          <Route path="/anniversary" exact component={Anniversary} />
          <Route path="/record" exact component={Record} />
          <Route path="/story" exact component={Story} />
          <Route path="/test" exact component={TestForm} />
          <Route path="/information_edit" exact component={Information} />
          <Route path="/chart" exact component={Chart} />
          <Redirect path="/*" component={Register} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  </>
);

export default Routes;
