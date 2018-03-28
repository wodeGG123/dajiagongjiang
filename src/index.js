import React from 'react'
import ReactDOM from 'react-dom'



import MyRouter from './router/index.js'
import {Provider} from 'react-redux'
import { createStore } from 'redux'
import reducers from './reducers/index.js'
require('../statics/css/style.scss')

let store = createStore(reducers);

class App extends React.Component {
	render(){
		return (<Provider store={store}><MyRouter /></Provider>)
	}
}

//设置全局store
window.store = store;


ReactDOM.render(
  <App />,
  document.getElementById('content')
);
