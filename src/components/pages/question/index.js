import React from 'react'
import PropTypes from 'prop-types'
import { NavBar, Icon, Carousel, Button,  SearchBar, Picker } from 'antd-mobile';
require('./style.scss')

class Main extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return(<div className='question-wrap'>
			<NavBar mode="light" icon={<Icon type="left" />} onLeftClick={() => {console.log(this.context.router);this.context.router.goBack()}}>问卷调查</NavBar>
			<div className='question-items'>
				<dl>
					<dt>1.您对装修知识了解吗？</dt>
					<dd>
						<i></i>
						<span>不了解</span>
					</dd>
					<dd>
						<i></i>
						<span>不了解</span>
					</dd>
					<dd>
						<i></i>
						<span>不了解</span>
					</dd>
					<dd>
						<i></i>
						<span>不了解</span>
					</dd>
				</dl>
				<dl>
					<dt>1.您对装修知识了解吗？</dt>
					<dd>
						<i></i>
						<span>不了解</span>
					</dd>
					<dd>
						<i></i>
						<span>不了解</span>
					</dd>
					<dd>
						<i></i>
						<span>不了解</span>
					</dd>
					<dd>
						<i></i>
						<span>不了解</span>
					</dd>
				</dl>
				<dl>
					<dt>1.您对装修知识了解吗？</dt>
					<dd>
						<input type="text" placeholder='请输入内容'/>
					</dd>
					
				</dl>
				<dl>
					<dt>1.您对装修知识了解吗？</dt>
					<dd>
						<input type="text" placeholder='请输入内容'/>
					</dd>
					
				</dl>
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
export default Main