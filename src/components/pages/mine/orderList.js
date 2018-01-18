import React from 'react'
import PropTypes from 'prop-types'
import { NavBar, Icon, WingBlank, Tabs} from 'antd-mobile';
import {Link} from 'react-router'
var FontAwesome = require('react-fontawesome');
import './style.scss'
class OrderList extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
	
		return(<div className='order-list'>
			<NavBar icon={<Icon type="left" />} rightContent={<Link to='/home/order/slefMake'>添加订单</Link>} mode="light" onLeftClick={() => {this.context.router.goBack()}}>我的订单</NavBar>
			 <div className="order-list-filter">
				<dl>
					<dt><span>全部</span></dt>
					<dd></dd>
				</dl>
				<dl>
					<dt><span>未完成</span></dt>
					<dd></dd>
				</dl>
				<dl>
					<dt><span>已完成</span></dt>
					<dd></dd>
				</dl>
			</div>
			<div className='order-list-content'>
				<Link to='/home/mine/orderInfo'>
					<dl>
						<dt><font>进行中</font><span>订单号：21345</span></dt>
						<dd>
							<h3><span>2017年12月06日</span>王师傅</h3>
							<h4>价格：<span>20000元</span></h4>
							<p>地址：威远县严陵镇高升花园202</p>
							<div>项目：<span>防水：3平米</span><span>布线：30米</span><span>布线：30米</span><span>布线：30米</span></div>
						</dd>
					</dl>
				</Link>
				<Link to='/home/mine/orderInfo'>
					<dl>
						<dt><font>进行中</font><span>订单号：21345</span></dt>
						<dd>
							<h3><span>2017年12月06日</span>王师傅</h3>
							<h4>价格：<span>20000元</span></h4>
							<p>地址：威远县严陵镇高升花园202</p>
							<div>项目：<span>防水：3平米</span><span>布线：30米</span><span>布线：30米</span><span>布线：30米</span></div>
						</dd>
					</dl>
				</Link>
				<Link to='/home/mine/orderInfo'>
					<dl>
						<dt><font>进行中</font><span>订单号：21345</span></dt>
						<dd>
							<h3><span>2017年12月06日</span>王师傅</h3>
							<h4>价格：<span>20000元</span></h4>
							<p>地址：威远县严陵镇高升花园202</p>
							<div>项目：<span>防水：3平米</span><span>布线：30米</span><span>布线：30米</span><span>布线：30米</span></div>
						</dd>
					</dl>
				</Link>
				<Link to='/home/mine/orderInfo'>
					<dl>
						<dt><font>进行中</font><span>订单号：21345</span></dt>
						<dd>
							<h3><span>2017年12月06日</span>王师傅</h3>
							<h4>价格：<span>20000元</span></h4>
							<p>地址：威远县严陵镇高升花园202</p>
							<div>项目：<span>防水：3平米</span><span>布线：30米</span><span>布线：30米</span><span>布线：30米</span></div>
						</dd>
					</dl>
				</Link>
				<Link to='/home/mine/orderInfo'>
					<dl>
						<dt><font>进行中</font><span>订单号：21345</span></dt>
						<dd>
							<h3><span>2017年12月06日</span>王师傅</h3>
							<h4>价格：<span>20000元</span></h4>
							<p>地址：威远县严陵镇高升花园202</p>
							<div>项目：<span>防水：3平米</span><span>布线：30米</span><span>布线：30米</span><span>布线：30米</span></div>
						</dd>
					</dl>
				</Link>
				<Link to='/home/mine/orderInfo'>
					<dl>
						<dt><font>进行中</font><span>订单号：21345</span></dt>
						<dd>
							<h3><span>2017年12月06日</span>王师傅</h3>
							<h4>价格：<span>20000元</span></h4>
							<p>地址：威远县严陵镇高升花园202</p>
							<div>项目：<span>防水：3平米</span><span>布线：30米</span><span>布线：30米</span><span>布线：30米</span></div>
						</dd>
					</dl>
				</Link>
				<Link to='/home/mine/orderInfo'>
					<dl>
						<dt><font>进行中</font><span>订单号：21345</span></dt>
						<dd>
							<h3><span>2017年12月06日</span>王师傅</h3>
							<h4>价格：<span>20000元</span></h4>
							<p>地址：威远县严陵镇高升花园202</p>
							<div>项目：<span>防水：3平米</span><span>布线：30米</span><span>布线：30米</span><span>布线：30米</span></div>
						</dd>
					</dl>
				</Link>
				<Link to='/home/mine/orderInfo'>
					<dl>
						<dt><font>进行中</font><span>订单号：21345</span></dt>
						<dd>
							<h3><span>2017年12月06日</span>王师傅</h3>
							<h4>价格：<span>20000元</span></h4>
							<p>地址：威远县严陵镇高升花园202</p>
							<div>项目：<span>防水：3平米</span><span>布线：30米</span><span>布线：30米</span><span>布线：30米</span></div>
						</dd>
					</dl>
				</Link>
				<Link to='/home/mine/orderInfo'>
					<dl>
						<dt><font>进行中</font><span>订单号：21345</span></dt>
						<dd>
							<h3><span>2017年12月06日</span>王师傅</h3>
							<h4>价格：<span>20000元</span></h4>
							<p>地址：威远县严陵镇高升花园202</p>
							<div>项目：<span>防水：3平米</span><span>布线：30米</span><span>布线：30米</span><span>布线：30米</span></div>
						</dd>
					</dl>
				</Link>
			</div>

			






			
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