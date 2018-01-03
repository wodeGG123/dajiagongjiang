import React from 'react'
import PropTypes from 'prop-types'

require('./style.scss')
class CheckBox extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		const data = [{name:'项目1'},{name:'项目2'},{name:'项目3'},{name:'项目4'}]
		return(<div className='checkbox-wrap'>
				{data.map((obj,index)=>{
					return (<div>
					<span>{obj.name}</span>	
				</div>)
				})}
				
		</div>)
	}

}
export default CheckBox