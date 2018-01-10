import React from 'react'
import PropTypes from 'prop-types'
import { NavBar, Icon, WingBlank, Button, Modal} from 'antd-mobile';
import {Link} from 'react-router'

import ImgInit from 'rootsrc/components/common/imgInit/index.js'

var FontAwesome = require('react-fontawesome');

class MyCredit extends React.Component{
	constructor(props){
		super(props)
	}
	componentWillMount() {
	}
	render(){
		return(<div className='my-credit'>
			<NavBar icon={<Icon type="left" />} mode="light"  onLeftClick={() => {this.context.router.goBack()}}>我的信誉</NavBar>
			<div className='my-credit-content'>
				<div className='my-credit-value'>
					<div className='my-credit-value-item'>
						<div>
							<p><FontAwesome name='hand-o-left' /><span>650</span></p>
						</div>
					</div>
					<div className='my-credit-value-text'>
						<p>信誉良好</p>
					</div>
				</div>
			</div>

		</div>)
	}

}
MyCredit.contextTypes = {
  store: PropTypes.object,
  router: PropTypes.object,

};
MyCredit.defaultProps = {
  
};


class MyEvaluate extends React.Component{
	constructor(props){
		super(props)
	}
	componentWillMount() {
	}
	render(){
		return(<div className='my-evaluate'>
			<NavBar icon={<Icon type="left" />} mode="light"  onLeftClick={() => {this.context.router.goBack()}}>我的评价</NavBar>
			<div className='my-evaluate-content'>
				<dl>
		    		<dt><span>评价选项1</span></dt>
		    		<dd>98%</dd>
				</dl>
				<dl>
		    		<dt><span>评价选项2</span></dt>
		    		<dd>98%</dd>
				</dl>
				<dl>
		    		<dt><span>评价选项3</span></dt>
		    		<dd>98%</dd>
				</dl>
				<dl>
		    		<dt><span>评价选项3</span></dt>
		    		<dd>98%</dd>
				</dl>
				<div>
					<h3>98%</h3>					
				</div>
			</div>

		</div>)
	}

}
MyEvaluate.contextTypes = {
  store: PropTypes.object,
  router: PropTypes.object,

};
MyEvaluate.defaultProps = {
  
};

class MyLevel extends React.Component{
	constructor(props){
		super(props)
	}
	componentWillMount() {
	}
	render(){
		return(<div className='my-level'>
			<NavBar icon={<Icon type="left" />} mode="light"  onLeftClick={() => {this.context.router.goBack()}}>我的等级</NavBar>
			<div className='my-level-content'>
				
				<div className='my-level-item'>
				    <div>
				    	<span>693</span>
				    </div>		
				    <span>2000</span>		
				</div>
				<p>平台等级：3</p>
			</div>

		</div>)
	}

}
MyLevel.contextTypes = {
  store: PropTypes.object,
  router: PropTypes.object,

};
MyLevel.defaultProps = {
  
};
// export default MyCredit
export {MyCredit,MyEvaluate,MyLevel}