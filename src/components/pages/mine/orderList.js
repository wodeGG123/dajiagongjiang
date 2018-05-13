import React from 'react'
import PropTypes from 'prop-types'
import { NavBar, Icon, WingBlank, Tabs, ListView} from 'antd-mobile';
import {Link} from 'react-router'
import Order from '../../../request/order';
import './style.scss'
import { userInfo } from 'os';
import moment from 'moment'

var FontAwesome = require('react-fontawesome');

class OrderList extends React.Component{
	constructor(props){
		super(props);
		var userInfo = store.getState().userInfo;
		var ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
		this.state = {
			userInfo,
			data:[],
			dataSource:ds.cloneWithRows([]),
			dataType:1,
			page:1,
		}
	}
	componentWillMount(){
		this.getData({},true)
	}
	getData(param,init){
		Order.list(this.state.userInfo.id,this.state.dataType,this.state.userInfo.token)
		.then((data)=>{
			console.log(data);
			if(data.state){
				//如果不是新加载的数据，则数组连起来
				var ds = this.state.data.concat(data.data.meta);
				if(init){
					ds = data.data.meta;
				}
				this.setState({
					dataSource: this.state.dataSource.cloneWithRows(ds),
					data:ds,
					page:parseInt(data.paging.page) + 1
				})
				
			}
		})
	}
	onEndReached(){

	}
	handleClick(data){
		// store.dispatch({
		// 	type:'SET_TEMP_DATA',
		// 	data
		// })
		window.sessionStorage.setItem('TEMP_DATA',JSON.stringify(data));
		this.context.router.push('home/mine/orderInfo');
	}
	tabChange(index){
		console.log(index)
		this.setState({
			dataType:index+1,
		},()=>{
			this.getData({},true)
		})
	}
	render(){
		const tabs = [
	  { title: '用户订单' },
	  { title: '接活订单' },
	];
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
		return(<div className='order-list'>
			<NavBar icon={<Icon type="left" />} 
			rightContent={<Link to='/home/order/slefMake'>自主下单</Link>} 
			mode="light" onLeftClick={() => {this.context.router.goBack()}}>我的订单</NavBar>
			  <Tabs 
			  tabs={tabs}
			  onChange={(tab,index)=>{this.tabChange(index)}}
			  >
        <div>
          	{/* <div className="order-list-filter">
				<dl onClick={()=>{this.getData({},true)}}>
					<dt><span>全部</span></dt>
					<dd></dd>
				</dl>
				<dl onClick={()=>{this.getData({},true)}}>
					<dt><span>未完成</span></dt>
					<dd></dd>
				</dl>
				<dl onClick={()=>{this.getData({status:2},true)}}>
					<dt><span>已完成</span></dt>
					<dd></dd>
				</dl>
			</div> */}
			<div className='order-list-content'>
				<ListView
					ref={el => this.lv = el}
					initialListSize={5}
					dataSource={this.state.dataSource}
					renderRow={(rowData)=>{ if(typeof(rowData.price_type) == 'string'){rowData.price_type=JSON.parse(rowData.price_type)}; return(<dl onClick={()=>{this.handleClick(rowData)}}>
							<dt><font className={rowData.status==3||rowData.status==4?'':'undone'}>{getStatus(rowData.status)}</font><span>订单号：{rowData.order_id}</span></dt>
							<dd>
								<h3><span>{rowData.created_at}</span>{rowData.artisan_user_name}</h3>
								<h4>价格：<span>{rowData.rate_price}元</span></h4>
								<p>地址：{rowData.construction_address}</p>
								<div>项目：
									{rowData.price_type.project.map((obj,index)=>{
										return (<span key={index}>{obj.name}：{obj.num}{obj.unit}</span>)
									})}
									{/* <span>布线：30米</span> */}
								</div>
							</dd>
					</dl>)}
						}
					style={{
						height: document.documentElement.clientHeight - 170 + 'px',
						overflow: 'auto',
						}}
					pageSize={1}
					onScroll={() => { console.log('scroll'); }}
					scrollEventThrottle={50}
					onEndReached={this.onEndReached}
					onEndReachedThreshold={10}
				/>
			</div>
        </div>
      </Tabs>
		</div>)
	}

}
OrderList.contextTypes = {
  store: PropTypes.object,
  router: PropTypes.object,
};
OrderList.defaultProps = {
  
};
export default OrderList