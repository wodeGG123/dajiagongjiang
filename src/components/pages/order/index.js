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
	      priceDetail:false,
	    };
	}
	onChange(val){
    // console.log(val);
    this.setState({ val });
  	}
  	priceDetail(){
  		const _bool = !this.state.priceDetail;
  		this.setState({
  			priceDetail: _bool
  		})
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
					<div className="remarks">
							<p>收方方法：收方方法收方方法收方方法收方方法收方方法</p>
						</div>
					<div className='pre-price'>
						<h5>预估价格：</h5>
						<p><font>6543</font><span>元</span><span>（保质期30天）</span></p>
						<div>
							<span onClick={()=>{this.priceDetail()}}><FontAwesome name={this.state.priceDetail?'angle-double-up':'angle-double-down'} /></span>
						</div>
					</div>
						<div className={this.state.priceDetail?'price-part price-part-show':'price-part'}>
						<table>
							<tr>
								<th>项目</th>
								<th>数量（㎡）</th>
								<th>单价（元）</th>
								<th>小计（元）</th>
							</tr>
							<tr>
								<td>项目1</td>
								<td>5</td>
								<td>10</td>
								<td>50</td>
							</tr>
							<tr>
								<td>项目1</td>
								<td>5</td>
								<td>10</td>
								<td>50</td>
							</tr>
							<tr>
								<td>项目1</td>
								<td>5</td>
								<td>10</td>
								<td>50</td>
							</tr>
						</table>
						<div className='remarks'>
							<p>报价说明：此报价方式说明</p>
						</div>
					</div>
					<div className='user-form'>
						<h5>下单信息：</h5>
						<div className="remarks">
							<p>客户需提供：管子、乳胶漆、石灰、水、电</p>
						</div>
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

class MakeSelfOrder extends React.Component{
	constructor(props){
		super(props);
		this.state = {
	      val: 3,
	      priceDetail:false,
	    };
	}
	onChange(val){
    // console.log(val);
    this.setState({ val });
  	}
  	priceDetail(){
  		const _bool = !this.state.priceDetail;
  		this.setState({
  			priceDetail: _bool
  		})
  	}
	render(){
		const tabs = [
		  { title: '报价方式1'},
		  { title: '报价方式2'},
		  { title: '报价方式3'},
		];
		return(<div className='make-order wrap-box'>
			<NavBar mode="light" icon={<Icon type="left" />} onLeftClick={() => {console.log(this.context.router);this.context.router.replace('/home/workerInfo')}}>自主下单</NavBar>	
		    <div className="make-order-mid">
		    	<div className='user-form'>
						<h5>下单信息：</h5>
						<div className='user-form-box'>
							<div className='user-form-left'><span>订单报价</span></div>
							<div className='user-form-right'><input placeholder='请输入此订单报价' type="text"/></div>
						</div>
						<div className='user-form-box'>
							<div className='user-form-left'><span>客户姓名</span></div>
							<div className='user-form-right'><input placeholder='请输入客户姓名' type="text"/></div>
						</div>
						<div className='user-form-box'>
							<div className='user-form-left'><span>客户手机号</span></div>
							<div className='user-form-right'><input placeholder='请输入客户手机号' type="text"/></div>
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


		</div>)
	}

}
MakeSelfOrder.contextTypes = {
  store: PropTypes.object,
  router: PropTypes.object,
};
MakeSelfOrder.defaultProps = {
  
};

export default Main
export {MakeOrder, MakeSelfOrder}