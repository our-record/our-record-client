import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Main from './pages/Main/Main';
import Register from './pages/Register/Register';
import Information from './pages/Information/Information';
import Anniversary from './pages/Anniversary/Anniversary';
import Record from './components/Record/Record.js';
import GlobalStyle from './styles/GlobalStyle';
import TestForm from './pages/Test/TestForm';
import theme from './styles/theme';

const Routes = () => (
  <>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/information" component={Information} />
          <Route exact path="/anniversary" component={Anniversary} />
          <Route exact path="/record" component={Record} />
          <Route exact path="/test" component={TestForm} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  </>
);

export default Routes;
