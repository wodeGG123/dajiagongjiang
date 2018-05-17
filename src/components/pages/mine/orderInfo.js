import React from 'react'
import PropTypes from 'prop-types'
import { NavBar, Icon, WingBlank, Button, Modal, Toast} from 'antd-mobile';
import {Link} from 'react-router'
import Order from '../../../request/order';
import Worker from '../../../request/worker';
import Coin from '../../../request/coin';

class OrderInfo extends React.Component{
	constructor(props){
		super(props)
		this.state={
			modal:{visible:false,content:'',title:''},
			data:{},
			userInfo:false,
			workerInfo:false,
		}
	}
	componentWillMount(){
		//初始化数据，从sessionStorage中获取
		// let data = store.getState().tempData;
		let data = JSON.parse(window.sessionStorage.getItem('TEMP_DATA'));
		let userInfo = store.getState().userInfo;
		this.setState({data,userInfo});
		Worker.list({
			user_id:data.artisan_user_id
		}).then((data2)=>{
			if(data2.state){
				 this.setState({data,userInfo,workerInfo:data2.data.meta[0]});
			}
		})
	}
	controlOrder(c){
		
		if(c == 1){
			//接单
			console.log(this.state)
			// this.state.userInfo.integral
			let price = parseInt(parseInt(this.state.data.rate_price)*0.01);
			//积分不足提示
			if(parseInt(this.state.userInfo.integral) < price){
				Modal.alert('提示','您的积分不够'+ price +'，请充值！', [
					{ text: '取消', onPress: () => console.log('cancel') },
					{ text: '确认', onPress: () => {} },
				  ])
				  return false;
			}
			//扣除积分接单
			Modal.alert('接单', '扣除'+price+'积分接单？', [
				{ text: '取消', onPress: () => console.log('cancel') },
				{ text: '确认', onPress: () => {
					Order.set(this.state.data.order_id,{
						status:c,
						uid:this.state.userInfo.id,
						token:this.state.userInfo.token,
					}).then((data)=>{
						if(data.state){
							Toast.info('操作成功！');
							//扣除积分
							Coin.set({
								num:-price,
								remark:'下单扣除'+ price +'积分',
								token:this.state.userInfo.token,
								uid:this.state.userInfo.id,
							}).then((data)=>{console.log(data)})
							this.context.router.goBack();
						}
					});
				} },
			  ])
			return false;
		}

		Order.set(this.state.data.order_id,{
			status:c,
			uid:this.state.userInfo.id,
			token:this.state.userInfo.token,
		}).then((data)=>{
			if(data.state){
				Toast.info('操作成功！');
				this.context.router.goBack();
			}
		})
	}
	render(){
		let {data,workerInfo,userInfo} = this.state;
		function getStatus(status){
			let text = ''
			switch (parseInt(status)) {
				case 0 : text = '待接单';break;
				case 1 : text = '进行中';break;
				case 2 : text = '待评价';break;
				case 3 : text = '已拒绝';break;
				case 4 : text = '已完成';break;
				case 5 : text = '售后评价';break;
				default : break;
			}
			return text;
		}
		function setButton(status){
			var o = <div></div>;
			//判断目前是哪个角色在看订单
			if(data.artisan_user_id == userInfo.id){
				switch (parseInt(status)) {
					case 0 : o = <div><Button onClick={()=>{this.controlOrder(3)}} type='ghost' size='small' inline>拒绝</Button>
					<Button onClick={()=>{this.controlOrder(1)}} type='primary' size='small' inline>接单</Button></div>;break;
					case 1 : break;
					case 2 : break;
					case 3 : break;
					case 4 : break;
					case 5 : break;
					default : break;
				}
			}
			if(data.user_id == userInfo.id){
				switch (parseInt(status)) {
					case 0 : break;
					case 1 : o = <div><Button onClick={()=>{this.controlOrder(2)}} type='primary' size='small' inline>结单</Button></div>;break;
					case 2 : o = <div><Button onClick={()=>{this.context.router.push('/home/mine/orderEstimate/1')}} type='primary' size='small' inline>去评价</Button></div>;break;
					case 3 : break;
					case 4 : break;
					case 5 : o = <div><Button onClick={()=>{this.context.router.push('/home/mine/orderEstimate/2')}} type='primary' size='small' inline>售后评价</Button></div>;break;
					default : break;
				}
			}
			return o;
		}
		return(<div className='order-info'>
			<NavBar icon={<Icon type="left" />} mode="light"  onLeftClick={() => {this.context.router.goBack()}}>订单详情</NavBar>
			<div className='order-content'>
				<h3>订单号：{data.order_id}<i>{getStatus(data.status)}</i></h3>
				<p>发起日期：{data.created_at}</p>
				<p>价格：<font>{data.rate_price}元</font></p>
				<div className='price-part'>
						<table>
							<tr>
								<th>项目</th>
								<th>数量（㎡）</th>
								<th>单价（元）</th>
								<th>小计（元）</th>
								<th>查看</th>
							</tr>
							{data.price_type.project.map((obj,index)=>{
								return (<tr key={index}>
									<td>{obj.name}</td>
									<td>{obj.num}</td>
									<td>{obj.price}</td>
									<td>{parseInt(obj.num)*parseFloat(obj.price)}</td>
									<td>
										<p onClick={()=>{this.setState({modal:{visible:true,title:'报价细则',content:obj.remark} })}}>报价细则</p>
										<p onClick={()=>{this.setState({modal:{visible:true,title:'收方方法',content:obj.method} })}}>收方方法</p>
									</td>
								</tr>)
							})}
						</table>
					</div>
				<div>
					<h3>工匠信息</h3>
					<p>姓名：{data.artisan_user_name}</p>
					<p>联系电话：{((data.status == 0 || data.status == 3) && workerInfo)?workerInfo.mobile.substr(0,3)+'***':workerInfo.mobile}</p>
					{/* <p>工匠备注：</p>
					<p>备注信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息</p> */}
				</div>
				<div>
					<h3>客户信息</h3>
					<p>姓名：{data.user_name}</p>
					<p>联系电话：{(data.status == 0 || data.status == 3)?data.user_mobile.substr(0,3)+'***':data.user_mobile}/{(data.status == 0 || data.status == 3)?data.spare_mobile.substr(0,3)+'***':data.spare_mobile}</p>
					<p>施工地址：{data.construction_address}</p>
					{/* <p>施工项目：</p>
					<p>
						<span>防水：3平米</span>
						<span>布线：30米</span>
						<span>布线：30米</span>
						<span>布线：30米</span>
					</p> */}
					<p>详细需求：</p>
					<p>{data.remark}</p>
				</div>
				<div className='order-control'>
					{setButton.bind(this)(data.status)}
				</div>
			</div>
			<Modal
		          visible={this.state.modal.visible}
		          transparent
		          maskClosable={false}
		          onClose={()=>{}}
		          title={this.state.modal.title}
		          footer={[{ text: '确定', onPress: () => { console.log('ok');this.setState({modal:{visible:false}}) } }]}
		        >
		          <div style={{ height: 200, overflow: 'scroll' }}>
		           <p>{this.state.modal.content}</p>		           
		          </div>
		    </Modal>

		</div>)
	}

}
OrderInfo.contextTypes = {
  store: PropTypes.object,
  router: PropTypes.object,

};
OrderInfo.defaultProps = {
  
};
export default OrderInfo