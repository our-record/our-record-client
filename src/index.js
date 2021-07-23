import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';

window.Kakao.init('a64222267a7dea694d2d2f54cb30611a');
window.Kakao.isInitialized();
ReactDOM.render(<Routes />, document.getElementById('root'));
