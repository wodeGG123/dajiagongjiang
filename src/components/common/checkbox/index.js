import React from 'react'
import PropTypes from 'prop-types'

require('./style.scss')
class CheckBox extends React.Component{
	constructor(props){
		super(props);
		let data = [];
		switch(parseInt(this.props.type)){
			case 7:data = [
				{name:'全部',checked:true},
				{name:'环保',checked:false},
				{name:'材料',checked:false},
				{name:'工艺',checked:false},
				{name:'设计',checked:false},
			];break;
			case 8:data = [
				{name:'全部',checked:true},
			];break;
			case 24:data = [
				{name:'全部',checked:true},
				{name:'明星工匠',checked:false},
				{name:'经验交流',checked:false},
				{name:'鉴赏',checked:false}, 
			];break;
			case 23:data = [
				{name:'全部',checked:true},
			];break;
		}
		this.state ={
			data,
			checkId:0
		}
	}
	handleClick(obj,index){
		let _obj = obj
		let _data = this.state.data
		_data[this.state.checkId].checked = false
		_obj.checked = !_obj.checked
		_data[index] = _obj
		this.setState({
			data:_data,
			checkId:index
		},()=>{
			this.props.handleCheck(obj.name)
		})
	}
	render(){
		return(<div className='checkbox-wrap'>
				{this.state.data.map((obj,index)=>{
					return (<div key={index} onClick={()=>{this.handleClick(obj,index)}} className={obj.checked?'checked':''} >
					<span>{obj.name}</span>	
				</div>)
				})}
				
		</div>)
	}

}
export default CheckBox