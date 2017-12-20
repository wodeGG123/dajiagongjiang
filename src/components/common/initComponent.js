import React from 'react'
import PropTypes from 'prop-types'

class InitComponent extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return(<div></div>)
	}

}
InitComponent.contextTypes = {
  store: PropTypes.object
};
InitComponent.defaultProps = {
  
};
export default InitComponent