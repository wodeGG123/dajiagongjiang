import React from 'react'
import PropTypes from 'prop-types'
import { NavBar, Icon, WingBlank, Button, Modal} from 'antd-mobile';
import {Link} from 'react-router'
import ImgInit from 'rootsrc/components/common/imgInit/index.js'
import API from 'rootsrc/request/api'
import Coin from 'rootsrc/request/coin'

class MyCoin extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			userInfo:store.getState().userInfo,
			data:false,
		}
	}
	componentWillMount() {
		console.log(this.state)
		this.getCoinList()
	}
	getCoinList(){
		Coin.list({page:1})
		.then((data)=>{
			console.log(data)
		})
	}
	render(){
		let {userInfo} = this.state;
		return(<div className='my-coin'>
			<NavBar icon={<Icon type="left" />} mode="light"  onLeftClick={() => {this.context.router.goBack()}}>我的积分</NavBar>
			<div className='my-coin-content'>
				<div className="my-coin-top">
					<div className='my-coin-top-img'>
						<ImgInit src={API.DOMAIN.substr(0,API.DOMAIN.length-1)+userInfo.avatar} />	
					</div>					
					<div className='my-coin-top-text'>
						<p>剩余积分</p>
						<h3>{userInfo.integral}</h3>
					</div>
				</div>
				<div className='my-coin-top-buttons'>
					<Link to='/home/mine/myCoinControl/recharge'>充值</Link>
					<Link to='/home/mine/myCoinControl/wd'>提现</Link>
					<Link to='/home/mine/myCoinControl/give'>转赠</Link>
				</div>

				<div className="my-coin-record">
					<h3>交易记录</h3>
					<div className='my-coin-record-title'>
						<span>日期</span>
						<span>交易方式</span>
						<span>数量</span>
					</div>
					<ul>
						<li>
							<span>2017年12月09日</span>
							<span>转赠</span>
							<span className='my-coin-record-minus'>-800</span>
						</li>
						<li>
							<span>2017年12月09日</span>
							<span>提现</span>
							<span className='my-coin-record-minus'>-800</span>
						</li>
						<li>
							<span>2017年12月09日</span>
							<span>系统扣除</span>
							<span className='my-coin-record-minus'>-800</span>
						</li>
						<li>
							<span>2017年12月09日</span>
							<span>充值</span>
							<span className='my-coin-record-plus'>+800</span>
						</li>
						<li>
							<span>2017年12月09日</span>
							<span>充值</span>
							<span className='my-coin-record-plus'>+800</span>
						</li>
					</ul>
				</div>
			</div>

		</div>)
	}

}
MyCoin.contextTypes = {
  store: PropTypes.object,
  router: PropTypes.object,

};
MyCoin.defaultProps = {
  
};
export default MyCoin