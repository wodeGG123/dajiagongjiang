import React from 'react'
import PropTypes from 'prop-types'
import { NavBar, Icon, Carousel, Button, List, Stepper, Tabs, Modal, Toast } from 'antd-mobile';
import {Link} from 'react-router'
import { createForm } from 'rc-form';
import ImgInit from 'rootsrc/components/common/imgInit/index.js'
import _ from 'lodash'
import OrderRQ from '../../../request/order';
import API from '../../../request/api';
import member from '../../../request/member';

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
		  modal:{visible:false,content:'',title:''},
		  data:{},
	    };
	}
	componentWillMount(){
		let data = JSON.parse(window.sessionStorage.getItem('TEMP_DATA'));
		data.artisan_offer = JSON.parse(data.artisan_offer);
		if(data){
			this.setState({
				data
			})
		}
	}
	onNumChange(offerIndex,projectIndex,num){
		let data = _.cloneDeep(this.state.data)
		data.artisan_offer[offerIndex].project[projectIndex].num = num;
		this.setState({
			data
		},()=>{
			this.getSum(offerIndex)
		})
	}
	//计算总价
	getSum(offerIndex){
		let data = _.cloneDeep(this.state.data);
		let sum = 0;
		data.artisan_offer[offerIndex].project.map((obj,index)=>{
			sum += parseInt(obj.num) * parseFloat(obj.price)
		})
		data.sum = sum;
		this.setState({
			data
		})
	}
	setModal(modal){
		this.setState({
			modal
		})
	}
	render(){
		const worker = this.state.data;
		const offer = worker.artisan_offer;
		const tabs = offer.map((obj,index)=> {return ({title:obj.name})} )
		return(<div className='make-order wrap-box'>
			<NavBar mode="light" icon={<Icon type="left" />} onLeftClick={() => {this.context.router.replace('/home/workerInfo')}}>我要下单</NavBar>	
		    <div className='make-order-top'>
		    		<div  className='make-order-head-img'>
                   		<ImgInit src={API.DOMAIN.substr(0,API.DOMAIN.length-1)+worker.avatar}/>	
		    		</div>
		    		<div className='make-order-text'>
		    			<h3>{worker.real_name}</h3>
		    			{/* <p>(高级木工)</p> */}
		    		</div>
		    </div>
		    <div className="make-order-mid">
		    	<Tabs tabs={tabs}
			      initialPage={0}
			      onChange={(tab, index) => { console.log('onChange', index, tab); }}
			      onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
			    >
					{offer.map((obj,index)=>{
						return (<Order key={index} workerId={this.state.data.id} offer={obj} handleModal={(modal)=>{this.setModal(modal)}} />)
					})}
			    </Tabs>
		    </div>
			
			<Modal
		          visible={this.state.modal.visible}
		          transparent
		          maskClosable={false}
		          onClose={()=>{}}
		          title={this.state.modal.title}
		          footer={[{ text: '确定', onPress: () => {this.setState({modal:{visible:false}}) } }]}
		        >
		          <div style={{ height: 200, overflow: 'scroll' }}>
		           <p>{this.state.modal.content}</p>
		          </div>
		        </Modal>

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
		  modal:{visible:false,content:'',title:''},
		  data:{},
	    };
	}
	componentWillMount(){
		let data = JSON.parse(window.localStorage.getItem('userInfoDetail'));
		console.log(data);
		data.user_info.artisan_offer = JSON.parse(data.user_info.artisan_offer);
		if(data){
			this.setState({
				data:data
			})
		}
	}
	onNumChange(offerIndex,projectIndex,num){
		let data = _.cloneDeep(this.state.data)
		data.artisan_offer[offerIndex].project[projectIndex].num = num;
		this.setState({
			data
		},()=>{
			this.getSum(offerIndex)
		})
	}
	//计算总价
	getSum(offerIndex){
		let data = _.cloneDeep(this.state.data);
		let sum = 0;
		data.artisan_offer[offerIndex].project.map((obj,index)=>{
			sum += parseInt(obj.num) * parseFloat(obj.price)
		})
		data.sum = sum;
		this.setState({
			data
		})
	}
	setModal(modal){
		this.setState({
			modal
		})
	}
	render(){
		const worker = this.state.data;
		const offer = worker.user_info.artisan_offer;
		const tabs = offer.map((obj,index)=> {return ({title:obj.name})} )
		return(<div className='make-order wrap-box'>
			<NavBar mode="light" icon={<Icon type="left" />} onLeftClick={() => {this.context.router.replace('/home/mine/orderList')}}>自主下单</NavBar>	
		    <div className='make-order-top'>
		    		<div  className='make-order-head-img'>
                   		<ImgInit src={API.DOMAIN.substr(0,API.DOMAIN.length-1)+worker.avatar}/>	
		    		</div>
		    		<div className='make-order-text'>
		    			<h3>{worker.user_info.real_name}</h3>
		    			{/* <p>(高级木工)</p> */}
		    		</div>
		    </div>
		    <div className="make-order-mid">
		    	<Tabs tabs={tabs}
			      initialPage={0}
			      onChange={(tab, index) => { console.log('onChange', index, tab); }}
			      onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
			    >
					{offer.map((obj,index)=>{
						return (<OrderSelf key={index} workerId={this.state.data.id} offer={obj} handleModal={(modal)=>{this.setModal(modal)}} />)
					})}
			    </Tabs>
		    </div>
			
			<Modal
		          visible={this.state.modal.visible}
		          transparent
		          maskClosable={false}
		          onClose={()=>{}}
		          title={this.state.modal.title}
		          footer={[{ text: '确定', onPress: () => {this.setState({modal:{visible:false}}) } }]}
		        >
		          <div style={{ height: 200, overflow: 'scroll' }}>
		           <p>{this.state.modal.content}</p>
		          </div>
		        </Modal>

		</div>)
	}

}
MakeSelfOrder.contextTypes = {
  store: PropTypes.object,
  router: PropTypes.object,
};
MakeSelfOrder.defaultProps = {
  
};


class OrderForm extends React.Component {
	static contextTypes = {
		router: PropTypes.object,
	}
	constructor(props){
		super(props);
		this.state = {
			offer:this.props.offer,
			sum:0,
		}
	}
	handleSubmit(){
		let userInfo = store.getState().userInfo;
		if(!store.getState().userInfo){
			Toast.info('您还没登录！');
			this.context.router.push('/user/login');
			return false;
		}
		if(userInfo.id == this.props.workerId){
			Toast.info('自己不能对自己下单！');
			return false;
		}
		this.props.form.setFieldsValue({
			rate_price:this.state.sum,
			price_type:JSON.stringify(this.state.offer),
			selected_price:0
		})
		this.props.form.validateFields((error,value)=>{
			if(!error){
				
				let param = {
					artisan_user_id : this.props.workerId,
					construction_address : value.construction_address,
					is_manually : 0,
					price_type : value.price_type,
					rate_price : value.rate_price,
					selected_price : 0,
					spare_mobile : value.spare_mobile,
					status : 0,
					token : userInfo.token,
					uid : userInfo.id,
					user_id : userInfo.id,
				}
				OrderRQ.make(param)
				.then((data)=>{
					console.log(data)
					if(data){
						Toast.info('提交成功！');
						this.context.router.replace('/home/mine/orderList');
					}
				})

			}else{
				Toast.info('请完善信息！')
				console.log(error)
			}
		})
	}
	onNumChange(projectIndex,num){
		let offer = this.state.offer;
		if(num == ''){
			num = 0;
		}
		offer.project[projectIndex].num = parseInt(num);
		this.setState({
			offer
		},()=>{
			this.getSum()
		})
	}
	//计算总价
	getSum(){
		let offer = _.cloneDeep(this.state.offer);
		let sum = 0;
		offer.project.map((obj,index)=>{
			sum += parseInt(obj.num||0) * parseFloat(obj.price)
		})
		this.setState({
			sum
		})
	}
	render(){
		var {getFieldProps,getFieldError} = this.props.form
		let offer = this.state.offer
		return (<div>
			<div className='pre-price'>
				<h5>预估价格：</h5>
				<p>
					<font>{this.state.sum}</font><span>元</span><span>（保质期{offer.shelf_life}天）</span>
					<input
					{...getFieldProps('rate_price',{
						initialValue:0,
						rules:[{required:true,type:'number'}]
					})}
					type="hidden"/>
				</p>
			</div>
				<div className='price-part'>
				<table>
					<tr>
						<th>项目
						<input
						{...getFieldProps('price_type',{
							initialValue:'',
							rules:[{required:true}]
						})}
						type="hidden"/>
						<input
						{...getFieldProps('selected_price',{
							initialValue:0,
							rules:[{required:true,type:'number'}]
						})}
						type="hidden"/>
						</th>
						<th>数量（㎡）</th>
						<th>单价（元）</th>
						<th>小计（元）</th>
						<th>查看</th>
					</tr>
					{offer.project.map((project,projectIndex)=>{
						return (<tr>
							<td>{project.name}</td>
							<td><input type="text" value={project.num} placeholder={0} onChange={(e)=>{this.onNumChange(projectIndex,e.target.value)}}/></td>
							<td>{project.price}({project.unit})</td>
							<td>{project.price*(project.num||0)}({project.unit})</td>
							<td>
								<p onClick={()=>{this.props.handleModal({visible:true,title:'报价细则',content:project.remark})}}>报价细则</p>
								<p onClick={()=>{this.props.handleModal({visible:true,title:'收方方法',content:project.method})}}>收方方法</p>
							</td>
						</tr>)
					})}
				</table>
			</div>
			<div className='user-form'>
				<h5>下单信息：</h5>
				<div className="remarks">
					<p>客户需提供：{offer.supply||'无'}</p>
					<p>实际价格以用户双方实际结算为准</p>
				</div>
				{/* <div className='user-form-box'>
					<div className='user-form-left'><span>姓名</span></div>
					<div className='user-form-right'><input placeholder='请输入姓名' type="text"/></div>
				</div> */}
				<div className='user-form-box'>
					<div className='user-form-left'><span>备用手机号</span></div>
					<div className='user-form-right'>
					<input 
					{...getFieldProps('spare_mobile',{
						initialValue:'',
						rules:[{required:true}]
					})}
					placeholder='此号码不能是注册号码' type="text"/></div>
				</div>
				<div className='user-form-box'>
					<div className='user-form-left'><span>施工地址</span></div>
					<div className='user-form-right'>
					<input 
					{...getFieldProps('construction_address',{
						initialValue:'',
						rules:[{required:true}]
					})}
					placeholder='请输入施工详细地址' type="text"/></div>
				</div>
			</div>

			{/* <div className="leave-words">
				<div>
					<textarea name="" id="">留言</textarea>
				</div>
			</div> */}
			
			<div className="submit">
				<Button type="primary"  onClick={()=>{this.handleSubmit()}}>立即下单</Button>
			</div>
		  </div>)
	}
}

var Order = createForm()(OrderForm)


class OrderSelfForm extends React.Component {
	static contextTypes = {
		router: PropTypes.object,
	}
	constructor(props){
		super(props);
		this.state = {
			offer:this.props.offer,
			sum:0,
		}
	}
	handleSubmit(){
		let userInfo = store.getState().userInfo;
		if(!store.getState().userInfo){
			Toast.info('您还没登录！');
			this.context.router.push('/user/login');
			return false;
		}
		
		this.props.form.setFieldsValue({
			rate_price:this.state.sum,
			price_type:JSON.stringify(this.state.offer),
			selected_price:0
		})
		this.props.form.validateFields((error,value)=>{
			if(!error){
				
				let param = {
					artisan_user_id : this.props.workerId,
					construction_address : value.construction_address,
					is_manually : 1,
					price_type : value.price_type,
					rate_price : value.rate_price,
					selected_price : 0,
					spare_mobile : value.spare_mobile,
					status : 0,
					token : userInfo.token,
					uid : userInfo.id,
					user_id : userInfo.id,
				}
				member.isExist(value.spare_mobile)
				.then((data)=>{
					if(data.state){
						param.uid = data.data.uid;
						param.user_id = data.data.uid;

						OrderRQ.make(param)
						.then((data)=>{
							console.log(data)
							if(data){
								Toast.info('提交成功！');
								this.context.router.replace('/home/mine/orderList');
							}
						})
					}else{
						Toast.info('该用户不存在！');
					}
				})

				

			}else{
				Toast.info('请完善信息！')
				console.log(error)
			}
		})
	}
	onNumChange(projectIndex,num){
		let offer = this.state.offer;
		if(num == ''){
			num = 0;
		}
		offer.project[projectIndex].num = parseInt(num);
		this.setState({
			offer
		},()=>{
			this.getSum()
		})
	}
	//计算总价
	getSum(){
		let offer = _.cloneDeep(this.state.offer);
		let sum = 0;
		offer.project.map((obj,index)=>{
			sum += parseInt(obj.num||0) * parseFloat(obj.price)
		})
		this.setState({
			sum
		})
	}
	render(){
		var {getFieldProps,getFieldError} = this.props.form
		let offer = this.state.offer
		
		return (<div>
			<div className='pre-price'>
				<h5>预估价格：</h5>
				<p>
					<font>{this.state.sum}</font><span>元</span><span>（保质期{offer.shelf_life}天）</span>
					<input
					{...getFieldProps('rate_price',{
						initialValue:0,
						rules:[{required:true,type:'number'}]
					})}
					type="hidden"/>
				</p>
			</div>
				<div className='price-part'>
				<table>
					<tr>
						<th>项目
						<input
						{...getFieldProps('price_type',{
							initialValue:'',
							rules:[{required:true}]
						})}
						type="hidden"/>
						<input
						{...getFieldProps('selected_price',{
							initialValue:0,
							rules:[{required:true,type:'number'}]
						})}
						type="hidden"/>
						</th>
						<th>数量（㎡）</th>
						<th>单价（元）</th>
						<th>小计（元）</th>
						<th>查看</th>
					</tr>
					{offer.project.map((project,projectIndex)=>{
						return (<tr>
							<td>{project.name}</td>
							<td><input type="text" value={project.num} placeholder={0} onChange={(e)=>{this.onNumChange(projectIndex,e.target.value)}}/></td>
							<td>{project.price}({project.unit})</td>
							<td>{project.price*(project.num||0)}({project.unit})</td>
							<td>
								<p onClick={()=>{this.props.handleModal({visible:true,title:'报价细则',content:project.remark})}}>报价细则</p>
								<p onClick={()=>{this.props.handleModal({visible:true,title:'收方方法',content:project.method})}}>收方方法</p>
							</td>
						</tr>)
					})}
				</table>
			</div>
			<div className='user-form'>
				<h5>下单信息：</h5>
				<div className="remarks">
					<p>客户需提供：{offer.supply||'无'}</p>
					<p>实际收益以用户双方实际结算为准</p>
				</div>
				{/* <div className='user-form-box'>
					<div className='user-form-left'><span>姓名</span></div>
					<div className='user-form-right'><input placeholder='请输入姓名' type="text"/></div>
				</div> */}
				<div className='user-form-box'>
					<div className='user-form-left'><span>用户手机号</span></div>
					<div className='user-form-right'>
					<input 
					{...getFieldProps('spare_mobile',{
						initialValue:'',
						rules:[{required:true}]
					})}
					placeholder='请填写用户手机号' type="text"/></div>
				</div>
				<div className='user-form-box'>
					<div className='user-form-left'><span>施工地址</span></div>
					<div className='user-form-right'>
					<input 
					{...getFieldProps('construction_address',{
						initialValue:'',
						rules:[{required:true}]
					})}
					placeholder='请输入施工详细地址' type="text"/></div>
				</div>
			</div>

			{/* <div className="leave-words">
				<div>
					<textarea name="" id="">留言</textarea>
				</div>
			</div> */}
			
			<div className="submit">
				<Button type="primary"  onClick={()=>{this.handleSubmit()}}>立即下单</Button>
			</div>
		  </div>)
	}
}

var OrderSelf = createForm()(OrderSelfForm)
export default Main
export {MakeOrder, MakeSelfOrder}