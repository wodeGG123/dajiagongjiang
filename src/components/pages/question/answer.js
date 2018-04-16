import React from 'react'
import PropTypes from 'prop-types'
import { NavBar, Icon, Carousel, Button,  SearchBar, Picker,  Toast, } from 'antd-mobile';
import {Link} from 'react-router'
import CheckBox from 'rootsrc/components/common/checkbox/index.js'
import Common from 'rootsrc/request/common'

var FontAwesome = require('react-fontawesome');
require('./style.scss')

class Main extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			data: [],
			sum:0,
		}
	}
	componentWillMount(){
		Common.questionGet()
		.then((data)=>{
			if(data){
				this.setState({
					data:JSON.parse(data.data.option),
					sum:data.data.count,
				})
			}
		})
	}
	render(){
		let {data} = this.state;
		return(<div className='question-wrap'>
			<NavBar mode="light" icon={<Icon type="left" />} onLeftClick={() => {this.context.router.goBack()}}>市场数据(共{this.state.sum}条回答)</NavBar>
			
			
		      <div>

		        <div className='question-items'>
				{data.map((obj,index)=>{
					return (<QItemCheck key={index} data={{...obj,index}} />)
				})}
				</div>
			
		      </div>
			  
		     
	

			
		</div>)
	}

}
Main.contextTypes = {	
  store: PropTypes.object,
  router: PropTypes.object
};
Main.defaultProps = {
  
};


class QItemCheck extends React.Component{
	static defaultProps = {
		data:{
			title:'您的性别',
			type:1,
			items:[{
				title:'男',
				check:false,
			},
			{
				title:'女',
				check:false,
			},
			]
		}
	}
	constructor(props){
		super(props);
		this.state = {
			data:this.props.data,
			itemId:-1,
		}
	}
	render(){
		return(<dl>
					<dt>{this.state.data.index+1}. {this.state.data.title}</dt>
					{
						this.state.data.items.map((obj,index)=>{
							return (<dd key={index}>
								<span>{obj.title}({obj.num})</span>
							</dd>)
						})
					}
				</dl>)
	}
}


export default Main