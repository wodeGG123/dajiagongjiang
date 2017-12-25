import React from 'react'
import PropTypes from 'prop-types'
import { NavBar, Icon, Carousel, Button, List, Stepper, Tabs } from 'antd-mobile';
import {Link} from 'react-router'
import ImgInit from 'rootsrc/components/common/imgInit/index.js'
var FontAwesome = require('react-fontawesome');
require('./style.scss')

class Main extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return(<div>
			{this.props.children}
		</div>)
	}

}
Main.contextTypes = {
  store: PropTypes.object
};
Main.defaultProps = {
  
};

class MakeOrder extends React.Component{
	constructor(props){
		super(props);
		this.state = {
	      val: 3,
	    };
	}
	onChange(val){
    // console.log(val);
    this.setState({ val });
  	}
	render(){
		const tabs = [
		  { title: '报价方式1'},
		  { title: '报价方式2'},
		  { title: '报价方式3'},
		];
		return(<div className='make-order wrap-box'>
			<NavBar mode="light" icon={<Icon type="left" />} onLeftClick={() => {console.log(this.context.router);this.context.router.replace('/home/workerInfo')}}>我要下单</NavBar>	
		    <div className='make-order-top'>
		    		<div  className='make-order-head-img'>
                   		<ImgInit src='/statics/img/temp/timg10.jpg'/>	
		    		</div>
		    		<div className='make-order-text'>
		    			<h3>李师傅</h3>
		    			<p>(高级木工)</p>
		    		</div>
		    </div>
		    <div className="make-order-mid">
		    	<Tabs tabs={tabs}
			      initialPage={0}
			      onChange={(tab, index) => { console.log('onChange', index, tab); }}
			      onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
			    >
			      <div>
			       <List>
				        <List.Item
				          wrap
				          extra={
				            <Stepper
				              style={{ width: '100%', minWidth: '100px' }}
				              showNumber
				              max={3000}
				              min={1}
				              value={this.state.val}
				              onChange={this.onChange.bind(this)}
				            />}
				        >
				        项目1
				        <span>（㎡）</span>
				        </List.Item>
				        <List.Item
				          wrap
				          extra={
				            <Stepper
				              style={{ width: '100%', minWidth: '100px' }}
				              showNumber
				              max={3000}
				              min={1}
				              value={this.state.val}
				              onChange={this.onChange.bind(this)}
				            />}
				        >
				        项目1
				        <span>（㎡）</span>
				        </List.Item>
				        <List.Item
				          wrap
				          extra={
				            <Stepper
				              style={{ width: '100%', minWidth: '100px' }}
				              showNumber
				              max={3000}
				              min={1}
				              value={this.state.val}
				              onChange={this.onChange.bind(this)}
				            />}
				        >
				        项目1
				        <span>（㎡）</span>
				        </List.Item>
					</List>

					<div className='pre-price'>
						<h5>预估价格：</h5>
						<p><font>6543</font><span>元</span></p>
					</div>
					<div className="remarks">
						<p>工匠备注：备注备注备注备注备注备注备注备注备注备注备注备注备注备注</p>
					</div>
						<div className='user-form'>
							<h5>下单信息：</h5>
							<div className='user-form-box'>
								<div className='user-form-left'><span>姓名</span></div>
								<div className='user-form-right'><input placeholder='请输入姓名' type="text"/></div>
							</div>
							<div className='user-form-box'>
								<div className='user-form-left'><span>备用手机号</span></div>
								<div className='user-form-right'><input placeholder='此号码不能是注册号码' type="text"/></div>
							</div>
						</div>

					<div className="leave-words">
						<div>
							<textarea name="" id="">留言</textarea>
						</div>
					</div>
					
					<div className="submit">
						<Button type="primary"  onClick={()=>{}}>立即下单</Button>
					</div>
			      </div>
			       <div>
			       <List>
				        <List.Item
				          wrap
				          extra={
				            <Stepper
				              style={{ width: '100%', minWidth: '100px' }}
				              showNumber
				              max={3000}
				              min={1}
				              value={this.state.val}
				              onChange={this.onChange.bind(this)}
				            />}
				        >
				        项目2
				        <span>（㎡）</span>
				        </List.Item>
				        <List.Item
				          wrap
				          extra={
				            <Stepper
				              style={{ width: '100%', minWidth: '100px' }}
				              showNumber
				              max={3000}
				              min={1}
				              value={this.state.val}
				              onChange={this.onChange.bind(this)}
				            />}
				        >
				        项目2
				        <span>（㎡）</span>
				        </List.Item>
				        <List.Item
				          wrap
				          extra={
				            <Stepper
				              style={{ width: '100%', minWidth: '100px' }}
				              showNumber
				              max={3000}
				              min={1}
				              value={this.state.val}
				              onChange={this.onChange.bind(this)}
				            />}
				        >
				        项目2
				        <span>（㎡）</span>
				        </List.Item>
					</List>

					<div className='pre-price'>
						<h5>预估价格：</h5>
						<p><font>6543</font><span>元</span></p>
					</div>
					<div className="remarks">
						<p>工匠备注：备注备注备注备注备注备注备注备注备注备注备注备注备注备注</p>
					</div>
						<div className='user-form'>
							<h5>下单信息：</h5>
							<div className='user-form-box'>
								<div className='user-form-left'><span>姓名</span></div>
								<div className='user-form-right'><input placeholder='请输入姓名' type="text"/></div>
							</div>
							<div className='user-form-box'>
								<div className='user-form-left'><span>备用手机号</span></div>
								<div className='user-form-right'><input placeholder='此号码不能是注册号码' type="text"/></div>
							</div>
						</div>

					<div className="leave-words">
						<div>
							<textarea name="" id="">留言</textarea>
						</div>
					</div>
					
					<div className="submit">
						<Button type="primary"  onClick={()=>{}}>立即下单</Button>
					</div>
			      </div>
			       <div>
			       <List>
				        <List.Item
				          wrap
				          extra={
				            <Stepper
				              style={{ width: '100%', minWidth: '100px' }}
				              showNumber
				              max={3000}
				              min={1}
				              value={this.state.val}
				              onChange={this.onChange.bind(this)}
				            />}
				        >
				        项目3
				        <span>（㎡）</span>
				        </List.Item>
				        <List.Item
				          wrap
				          extra={
				            <Stepper
				              style={{ width: '100%', minWidth: '100px' }}
				              showNumber
				              max={3000}
				              min={1}
				              value={this.state.val}
				              onChange={this.onChange.bind(this)}
				            />}
				        >
				        项目3
				        <span>（㎡）</span>
				        </List.Item>
				        <List.Item
				          wrap
				          extra={
				            <Stepper
				              style={{ width: '100%', minWidth: '100px' }}
				              showNumber
				              max={3000}
				              min={1}
				              value={this.state.val}
				              onChange={this.onChange.bind(this)}
				            />}
				        >
				        项目3
				        <span>（㎡）</span>
				        </List.Item>
					</List>

					<div className='pre-price'>
						<h5>预估价格：</h5>
						<p><font>6543</font><span>元</span></p>
					</div>
					<div className="remarks">
						<p>工匠备注：备注备注备注备注备注备注备注备注备注备注备注备注备注备注</p>
					</div>
						<div className='user-form'>
							<h5>下单信息：</h5>
							<div className='user-form-box'>
								<div className='user-form-left'><span>姓名</span></div>
								<div className='user-form-right'><input placeholder='请输入姓名' type="text"/></div>
							</div>
							<div className='user-form-box'>
								<div className='user-form-left'><span>备用手机号</span></div>
								<div className='user-form-right'><input placeholder='此号码不能是注册号码' type="text"/></div>
							</div>
						</div>

					<div className="leave-words">
						<div>
							<textarea name="" id="">留言</textarea>
						</div>
					</div>
					
					<div className="submit">
						<Button type="primary"  onClick={()=>{}}>立即下单</Button>
					</div>
			      </div>
			     
			    </Tabs>
		    </div>


		</div>)
	}

}
MakeOrder.contextTypes = {
  store: PropTypes.object,
  router: PropTypes.object,
};
MakeOrder.defaultProps = {
  
};
export default Main
export {MakeOrder}