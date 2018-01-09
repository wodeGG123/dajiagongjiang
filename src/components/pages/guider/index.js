import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router'

require('./style.scss');

class Guider extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return(<div className='welcom'>
			<Link to='/home/index'>欢迎光临</Link>
		</div>)
	}

}

export default Guider