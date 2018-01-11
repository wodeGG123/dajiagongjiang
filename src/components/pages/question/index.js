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
				<QItemCheck />
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
			<div className='question-submit'>
				<Button type="primary"  onClick={this.handleEXIT}>提交</Button>
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
	constructor(props){
		super(props);
		this.state = {
			answers:[
				{
					title:'不了解',
					check:false,
				},
				{
					title:'不是了解',
					check:false,
				},
				{
					title:'了解',
					check:false,
				},
				{
					title:'非常了解',
					check:false,
				},
			],
			answerId:-1,
		}
	}
	handleClick(obj,index){
		let _answers = this.state.answers;
		let _answerId = this.state.answerId;
		if(_answerId != -1){
			_answers[_answerId].check = false
		}
		_answers[index].check = true;
		this.setState({
			answers : _answers,
			answerId: index,
		})
	}
	render(){
		return(<dl>
					<dt>1.您对装修知识了解吗？</dt>
					{
						this.state.answers.map((obj,index)=>{
							return (<dd onClick={()=>{this.handleClick(obj,index)}}>
							<i className={obj.check?'check':''}></i>
							<span>{obj.title}</span>
							</dd>)
						})
					}
				</dl>)
	}
}


export default Main