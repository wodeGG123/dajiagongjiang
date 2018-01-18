import React from 'react'
import PropTypes from 'prop-types'
import { NavBar, Icon, Carousel, Button,  SearchBar, Picker, Tabs } from 'antd-mobile';
import {Link} from 'react-router'
import CheckBox from 'rootsrc/components/common/checkbox/index.js'
var FontAwesome = require('react-fontawesome');
require('./style.scss')

class Main extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return(<div className='question-wrap'>
			<NavBar mode="light" icon={<Icon type="left" />} onLeftClick={() => {console.log(this.context.router);this.context.router.goBack()}}>市场数据</NavBar>
			
			 <Tabs tabs={[
				{title:'问卷调查'},
				{title:'市场数据'},
			 	]}
		      initialPage={0}
		      onChange={(tab, index) => { console.log('onChange', index, tab); }}
		      onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
		    >
		      <div>
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
		      </div>
		      <div>
		         <div>
				<SearchBar placeholder="输入文章标题" maxLength={8} />
			</div>
		    <div>
		    	<CheckBox />
		    </div>
		    
		    <div className="article-list">
		    	<Link to="/home/articleInfo">
			    	<dl>
			    		<dt>飘窗知识介绍</dt>
			    		<dd><FontAwesome name='angle-right' /></dd>
			    	</dl>
		    	</Link>
		    	<Link to="/home/articleInfo">
			    	<dl>
			    		<dt>飘窗知识介绍</dt>
			    		<dd><FontAwesome name='angle-right' /></dd>
			    	</dl>
		    	</Link>
		    	<Link to="/home/articleInfo">
			    	<dl>
			    		<dt>飘窗知识介绍</dt>
			    		<dd><FontAwesome name='angle-right' /></dd>
			    	</dl>
		    	</Link>
		    </div>
		      </div>
		    </Tabs>

			
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