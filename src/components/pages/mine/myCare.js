import React from 'react'
import PropTypes from 'prop-types'
import { NavBar, Icon, WingBlank, Button, Modal} from 'antd-mobile';
import {Link} from 'react-router'

import ImgInit from 'rootsrc/components/common/imgInit/index.js'
var FontAwesome = require('react-fontawesome');

class MyCare extends React.Component{
	constructor(props){
		super(props)
	}
	componentWillMount() {
	}
	render(){
		return(<div className='mine-wrap'>
			<NavBar icon={<Icon type="left" />} mode="light"  onLeftClick={() => {this.context.router.goBack()}}>我的关注</NavBar>
			<div className='mine-content worker-lists'>
				<div className='worker-item'>
					<dl>
						<dt><ImgInit src='' /><i>威远</i></dt>
						<dd><h4>李师傅</h4><span>5&nbsp;<FontAwesome name='star' /></span></dd>
						<dd><p>木工</p></dd>
					</dl>	
				</div>
				<div className='worker-item'>
					<dl>
						<dt><ImgInit src='' /><i>威远</i></dt>
						<dd><h4>李师傅</h4><span>5&nbsp;<FontAwesome name='star' /></span></dd>
						<dd><p>木工</p></dd>
					</dl>	
				</div>
				<div className='worker-item'>
					<dl>
						<dt><ImgInit src='' /><i>威远</i></dt>
						<dd><h4>李师傅</h4><span>5&nbsp;<FontAwesome name='star' /></span></dd>
						<dd><p>木工</p></dd>
					</dl>	
				</div>
				<div className='worker-item'>
					<dl>
						<dt><ImgInit src='' /><i>威远</i></dt>
						<dd><h4>李师傅</h4><span>5&nbsp;<FontAwesome name='star' /></span></dd>
						<dd><p>木工</p></dd>
					</dl>	
				</div>
				<div className='worker-item'>
					<dl>
						<dt><ImgInit src='' /><i>威远</i></dt>
						<dd><h4>李师傅</h4><span>5&nbsp;<FontAwesome name='star' /></span></dd>
						<dd><p>木工</p></dd>
					</dl>	
				</div>
				<div className='worker-item'>
					<dl>
						<dt><ImgInit src='' /><i>威远</i></dt>
						<dd><h4>李师傅</h4><span>5&nbsp;<FontAwesome name='star' /></span></dd>
						<dd><p>木工</p></dd>
					</dl>	
				</div>
				<div className='worker-item'>
					<dl>
						<dt><ImgInit src='' /><i>威远</i></dt>
						<dd><h4>李师傅</h4><span>5&nbsp;<FontAwesome name='star' /></span></dd>
						<dd><p>木工</p></dd>
					</dl>	
				</div>
				<div className='worker-item'>
					<dl>
						<dt><ImgInit src='' /><i>威远</i></dt>
						<dd><h4>李师傅</h4><span>5&nbsp;<FontAwesome name='star' /></span></dd>
						<dd><p>木工</p></dd>
					</dl>	
				</div>
			</div>

		</div>)
	}

}
MyCare.contextTypes = {
  store: PropTypes.object,
  router: PropTypes.object,

};
MyCare.defaultProps = {
  
};
export default MyCare