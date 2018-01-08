import React from 'react'
import PropTypes from 'prop-types'

require('./style.scss')
class CheckBox extends React.Component{
	constructor(props){
		super(props);
		this.state ={
			data:[{name:'环保',checked:false},{name:'材料',checked:false},{name:'工艺',checked:false},{name:'设计',checked:false}]
		}
	}
	handleClick(obj,index){
		let _obj = obj
		let _data = this.state.data
		_obj.checked = !_obj.checked
		_data[index] = _obj
		this.setState({
			data:_data
		})
	}
	render(){
		return(<div className='checkbox-wrap'>
				{this.state.data.map((obj,index)=>{
					return (<div onClick={()=>{this.handleClick(obj,index)}} className={obj.checked?'checked':''} >
					<span>{obj.name}</span>	
				</div>)
				})}
				
		</div>)
	}

}
export default CheckBox