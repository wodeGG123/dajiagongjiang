import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import { NavBar, Icon, WingBlank, Button, Modal, List, Stepper, TextareaItem, Slider, Toast } from 'antd-mobile';
import ImgInit from 'rootsrc/components/common/imgInit/index.js'
import Worker from 'rootsrc/request/worker'
import Order from 'rootsrc/request/order'
import API from 'rootsrc/request/api'
import Coin from 'rootsrc/request/coin';



class Main extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		let that = this;
		function getComponent() {
			if (that.props.params.step == 1) {
				return <OrderEstimate />
			} else if (that.props.params.step == 2) {
				return <OrderEstimate2 />
			} else if (that.props.params.step == 3) {
				return <ShowOrderEstimate {...this.props} />
			}

		}

		return (<div>{getComponent.bind(this)()}</div>)
	}

}
Main.contextTypes = {
	store: PropTypes.object,
	router: PropTypes.object
};
Main.defaultProps = {

};

class ShowOrderEstimate extends React.Component {
	constructor(props) {
		super(props)
	}
	componentWillMount() {
		console.log(this.props)
	}
	render() {
		return (<div className='order-estimate order-estimate2'>
			<NavBar icon={<Icon type="left" />} mode="light" onLeftClick={() => { this.context.router.goBack() }}>订单评价</NavBar>
			<div className='order-estimate-content'>

				<div>
					<div className='order-estimate2-img'>
						<ImgInit src={require('./img/redbag.png')} />
					</div>
					<div className='order-estimate2-text'>
						<h4>恭喜您，您得到<span>1积分</span></h4>
						<p>感谢您对{this.props.location.state.worker}做出的真实评价，我们将竭力为您提供更好的工匠资源</p>
						<h5>此次评价得分为：<span>{this.props.location.query.score}分</span></h5>
					</div>

					<div className='order-submit'>
						<Button type='primary' onClick={() => { this.context.router.replace('/home/mine/orderList') }} >完成</Button>
					</div>
				</div>
			</div>
		</div>)
	}

}
ShowOrderEstimate.contextTypes = {
	store: PropTypes.object,
	router: PropTypes.object
};
ShowOrderEstimate.defaultProps = {

};


class OrderEstimate extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {},
			userInfo: false,
			workerInfo: false,
			estimate: [
				{ name: '技术过硬', score: 1 },
				{ name: '时间高效', score: 1 },
				{ name: '安全施工', score: 1 },
				{ name: '态度随和', score: 1 },
				{ name: '爱护现场', score: 1 },
				{ name: '上下衔接', score: 1 },
				{ name: '认真负责', score: 1 },
				{ name: '全力保障', score: 1 },
				{ name: '货真价实', score: 1 },
				{ name: '值得信赖', score: 1 },
			]
		};
	}
	componentWillMount() {
		let data = JSON.parse(window.sessionStorage.getItem('TEMP_DATA'));
		let userInfo = store.getState().userInfo;

		Worker.list({
			user_id: data.artisan_user_id
		}).then((data2) => {
			if (data2.state) {
				this.setState({ data, userInfo, workerInfo: data2.data.meta[0] });
			}
		})

	}
	onChange(o, index) {
		let estimate = this.state.estimate;
		estimate[index].score = o;
		this.setState({
			estimate
		})
	}
	handleSubmit() {
		let score = 0,
			content = {},
			hasSec = false;

		parseInt(this.state.data.price_type.shelf_life) > 0 ? hasSec = true : null;
		content = {
			"type": 1,
			"content": {
				"a": {
					"name": "技术过硬",
					"score": this.state.estimate[0].score * 5
				},
				"b": {
					"name": "时间高效",
					"score": this.state.estimate[1].score * 5
				},
				"c": {
					"name": "安全施工",
					"score": this.state.estimate[2].score * 5
				},
				"d": {
					"name": "态度随和",
					"score": this.state.estimate[3].score * 5
				},
				"e": {
					"name": "爱护现场",
					"score": this.state.estimate[4].score * 5
				},
				"f": {
					"name": "上下衔接",
					"score": this.state.estimate[5].score * 5
				},
				"g": {
					"name": "认真负责",
					"score": this.state.estimate[6].score * 5
				},
				"h": {
					"name": "全力保障",
					"score": this.state.estimate[7].score * 5
				},
				"i": {
					"name": "货真价实",
					"score": this.state.estimate[8].score * 5
				},
				"j": {
					"name": "值得信赖",
					"score": this.state.estimate[9].score * 5
				}
			}
		}
		content = JSON.stringify(content)

		this.state.estimate.map((obj, index) => {			
			score += (parseInt(obj.score)*5);
		})


		Order.estimate(this.state.data.order_id, {
			artisan_user_id: this.state.workerInfo.id,
			content,
			score,
			token: this.state.userInfo.token,
			uid: this.state.userInfo.id,
			user_id: this.state.userInfo.id,
		}).then((data) => {
			//4代表完成
			let status = '4';
			if (data) {
				//判断是否二次评价
				if (hasSec) {
					//5代表还可以进行二次评价
					status = '5'
				}
				Order.set(this.state.data.order_id, {
					status,
					uid: this.state.userInfo.id,
					token: this.state.userInfo.token,
				}).then((data) => {
					if (data.state) {
						Toast.info('评价成功！');

						//添加积分
						Coin.set({
							num: 1,
							remark: '评价增加1积分',
							token: this.state.userInfo.token,
							uid: this.state.userInfo.id,
						}).then((data) => {
							this.context.router.replace({
								pathname: '/home/mine/orderEstimate/3',
								query: { score: parseInt(score * 5) },
								state: { worker: this.state.workerInfo.real_name }
							});
						})



					}
				})




			}
		})
	}
	render() {
		console.log(this.state)
		let { data, workerInfo, estimate } = this.state
		return (<div className='order-estimate'>
			<NavBar icon={<Icon type="left" />} mode="light" onLeftClick={() => { this.context.router.goBack() }}>订单评价</NavBar>
			<div className='order-estimate-content'>
				<h3>订单号：{data.order_id}</h3>
				<div>
					<div className='order-estimate-user'>
						<div>
							<ImgInit src={API.DOMAIN.substr(0, API.DOMAIN.length - 1) + workerInfo.avatar} />
						</div>
						<div>
							<h4>{workerInfo.name}</h4>
							<p>{workerInfo.artisan_level}</p>
						</div>
					</div>
					<div className='order-estimate-items'>
						{estimate.map((obj, index) => {
							return (<div key={index} className="order-estimate-item">
								<h5>{obj.name}</h5>
								<Slider
									style={{ width: '80%', margin: 'auto' }}
									defaultValue={1}
									marks={{ 0: '不满意', 1: '一般', 2: '满意' }}
									min={0}
									max={2}
									onChange={() => { }}
									onAfterChange={(o) => { this.onChange(o, index) }}
								/>
							</div>)
						})}
					</div>

					<div className='order-submit'>
						<Button onClick={() => { this.handleSubmit.bind(this)() }} type='primary'>提交评价</Button>
					</div>
				</div>
			</div>
		</div>)
	}

}
OrderEstimate.contextTypes = {
	store: PropTypes.object,
	router: PropTypes.object,
};
OrderEstimate.defaultProps = {

};

class OrderEstimate2 extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {},
			userInfo: false,
			workerInfo: false,
			estimate: [
				{ name: '全力保障', score: 1 },
				{ name: '货真价实', score: 1 },
				{ name: '值得信赖', score: 1 },
			]
		};
	}
	componentWillMount() {
		let data = JSON.parse(window.sessionStorage.getItem('TEMP_DATA'));
		let userInfo = store.getState().userInfo;

		Worker.list({
			user_id: data.artisan_user_id
		}).then((data2) => {
			if (data2.state) {
				this.setState({ data, userInfo, workerInfo: data2.data.meta[0] });
			}
		})

	}
	onChange(o, index) {

		let estimate = this.state.estimate;
		estimate[index].score = o;

		this.setState({
			estimate
		})


	}
	handleSubmit() {
		let score = 70,
			content = {},
			hasSec = false;

		parseInt(this.state.data.price_type.shelf_life) > 0 ? hasSec = true : null;
		content = {
			"type": 2,
			"content": {
				"a": {
					"name": "技术过硬",
					"score": 10
				},
				"b": {
					"name": "时间高效",
					"score": 10
				},
				"c": {
					"name": "安全施工",
					"score": 10
				},
				"d": {
					"name": "态度随和",
					"score": 10
				},
				"e": {
					"name": "爱护现场",
					"score": 10
				},
				"f": {
					"name": "上下衔接",
					"score": 10
				},
				"g": {
					"name": "认真负责",
					"score": 10
				},
				"h": {
					"name": "全力保障",
					"score": this.state.estimate[0].score * 5
				},
				"i": {
					"name": "货真价实",
					"score": this.state.estimate[1].score * 5
				},
				"j": {
					"name": "值得信赖",
					"score": this.state.estimate[2].score * 5
				}
			}
		}

		content = JSON.stringify(content)


		this.state.estimate.map((obj, index) => {
			score += (parseInt(obj.score)*5)
		})



		Order.estimate(this.state.data.order_id, {
			artisan_user_id: this.state.workerInfo.id,
			content,
			score,
			token: this.state.userInfo.token,
			uid: this.state.userInfo.id,
			user_id: this.state.userInfo.id,
		}).then((data) => {
			//4代表完成
			let status = '4';
			if (data) {
				Order.set(this.state.data.order_id, {
					status,
					uid: this.state.userInfo.id,
					token: this.state.userInfo.token,
				}).then((data) => {
					if (data.state) {
						Toast.info('评价成功！');

						//添加积分
						Coin.set({
							num: 1,
							remark: '评价增加1积分',
							token: this.state.userInfo.token,
							uid: this.state.userInfo.id,
						}).then((data) => {
							this.context.router.replace({
								pathname: '/home/mine/orderEstimate/3',
								query: { score: parseInt(score * 5) },
								state: { worker: this.state.workerInfo.real_name }
							});
						})

					}
				})
			}
		})
	}
	render() {
		let { data, workerInfo, estimate } = this.state
		return (<div className='order-estimate'>
			<NavBar icon={<Icon type="left" />} mode="light" onLeftClick={() => { this.context.router.goBack() }}>订单评价</NavBar>
			<div className='order-estimate-content'>
				<h3>订单号：{data.order_id}</h3>
				<div>
					<div className='order-estimate-user'>
						<div>
							<ImgInit src={API.DOMAIN.substr(0, API.DOMAIN.length - 1) + workerInfo.avatar} />
						</div>
						<div>
							<h4>{workerInfo.name}</h4>
							<p>{workerInfo.artisan_level}</p>
						</div>
					</div>
					<div className='order-estimate-items'>
						{estimate.map((obj, index) => {
							return (<div key={index} className="order-estimate-item">
								<h5>{obj.name}</h5>
								<Slider
									style={{ width: '80%', margin: 'auto' }}
									defaultValue={1}
									marks={{ 0: '不满意', 1: '一般', 2: '满意' }}
									min={0}
									max={2}
									onChange={() => { }}
									onAfterChange={(o) => { this.onChange(o, index) }}
								/>
							</div>)
						})}
					</div>

					<div className='order-submit'>
						<Button onClick={() => { this.handleSubmit.bind(this)() }} type='primary'>提交评价</Button>
					</div>
				</div>
			</div>
		</div>)
	}

}
OrderEstimate2.contextTypes = {
	store: PropTypes.object,
	router: PropTypes.object,
};
OrderEstimate2.defaultProps = {

};
export default Main