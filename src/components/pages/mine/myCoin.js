import React from 'react'
import PropTypes from 'prop-types'
import { NavBar, Icon, WingBlank, Button, Modal, ListView } from 'antd-mobile';
import { Link } from 'react-router'
import ImgInit from 'rootsrc/components/common/imgInit/index.js'
import API from 'rootsrc/request/api'
import Coin from 'rootsrc/request/coin'

class MyCoin extends React.Component {

	static contextTypes = {
		router:React.PropTypes.object,
		store:React.PropTypes.object,
	}
	constructor(props) {
		super(props);
		let dataSource = new ListView.DataSource({
			rowHasChanged: (row1, row2) => row1 !== row2,
		});
		dataSource = dataSource.cloneWithRows([]);
		this.state = {
			userInfo: store.getState().userInfo,
			userInfoDetail: store.getState().userInfoDetail,
			dataSource,
			data: [],
			page: 1,
		}
	}
	componentWillMount() {
		this.getData({
			page: 1,
			uid: this.state.userInfo.id,
			token: this.state.userInfo.token,
		}, true)

		this.context.store.subscribe(()=>{
			this.setState({
				userInfoDetail:this.context.store.getState().userInfoDetail
			})
			
		})
	}
	getData(params, init) {
		Coin.list(params)
			.then((data) => {
				var ds = this.state.data.concat(data.data.meta);
				if (init) {
					ds = data.data.meta;
				}
				if (data) {
					this.setState({
						dataSource: this.state.dataSource.cloneWithRows(ds),
						data: ds,
						page: parseInt(data.data.paging.current_page) + 1
					})
				}
			})
	}
	onEndReached() {
		this.getData({
			page: this.state.page,
		}, false)
	}
	render() {
		let { userInfo,userInfoDetail } = this.state;
		return (<div className='my-coin'>
			<NavBar icon={<Icon type="left" />} mode="light" onLeftClick={() => { this.context.router.goBack() }}>我的积分</NavBar>
			<div className='my-coin-content'>
				<div className="my-coin-top">
					<div className='my-coin-top-img'>
						<ImgInit src={API.DOMAIN.substr(0, API.DOMAIN.length - 1) + userInfoDetail.avatar} />
					</div>
					<div className='my-coin-top-text'>
						<p>剩余积分</p>
						<h3>{userInfoDetail.integral}</h3>
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
						<span>说明</span>
					</div>
					<ul>
						<ListView
							ref={el => this.lv = el}
							initialListSize={20}
							dataSource={this.state.dataSource}
							renderRow={(rowData) => <li>
								<span>{rowData.created_at}</span>
								<span>{rowData.type}</span>
								<span className='my-coin-record-minus'>{rowData.num}</span>
								<span>{rowData.remark}</span>
							</li>
							}
							style={{
								height: document.documentElement.clientHeight - 309 + 'px',
								overflow: 'auto',
							}}
							pageSize={1}
							onScroll={() => { console.log('scroll'); }}
							scrollEventThrottle={50}
							onEndReached={this.onEndReached.bind(this)}
							onEndReachedThreshold={10}
						/>
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