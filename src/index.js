import React from 'react'
import ReactDOM from 'react-dom'



import MyRouter from './router/index.js'
import {Provider} from 'react-redux'
import { createStore } from 'redux'
require('../statics/css/style.scss')

const reducer = function (state, action) {
  // ...
  return true;
};
let store = createStore(reducer);

class App extends React.Component {
	render(){
		return (<Provider store={store}><MyRouter/></Provider>)
	}
}

ReactDOM.render(
  <App />,
  document.getElementById('content')
);
