import React from 'react'
import PropTypes from 'prop-types'

require('./style.scss')

class Main extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return(<div></div>)
	}

}
Main.contextTypes = {	
  store: PropTypes.object,
  router: PropTypes.object
};
Main.defaultProps = {
  
};
export default Main