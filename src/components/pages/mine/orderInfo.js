import React from 'react'
import PropTypes from 'prop-types'
import { NavBar, Icon, WingBlank, Button, Modal} from 'antd-mobile';
import {Link} from 'react-router'

class OrderInfo extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return(<div className='order-info'>
			<NavBar icon={<Icon type="left" />} mode="light"  onLeftClick={() => {this.context.router.goBack()}}>订单详情</NavBar>
			<div className='order-content'>
				<h3><span>2017年12月07日21:37:09</span>订单号：343873<i>进行中</i></h3>
				<p>价格：<font>10000元</font></p>
				<div>
					<h3>工匠信息</h3>
					<p>姓名：王师傅</p>
					<p>联系电话：13999003421</p>
					<p>工匠备注：</p>
					<p>备注信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息</p>
				</div>
				<div>
					<h3>客户信息</h3>
					<p>姓名：王师傅</p>
					<p>联系电话：13999003421</p>
					<p>施工地址：威远县高升花园5-5-10</p>
					<p>施工项目：</p>
					<p><span>防水：3平米</span><span>布线：30米</span><span>布线：30米</span><span>布线：30米</span></p>
					<p>详细需求：</p>
					<p>备注信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息</p>
				</div>
				<div className='order-control'>
					<Button type='ghost' size='small' inline>拒绝</Button>
					<Button type='primary' size='small' inline>接受</Button>
					<Link to='/home/mine/orderEstimate/1'>评价</Link>
				</div>
			</div>

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