import React from 'react'
import PropTypes from 'prop-types'

class ImgInit extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return(<img {...this.props} onError={(e)=>{e.target.src=require('./img/default2.gif')}} />)
	}

}
export default ImgInit