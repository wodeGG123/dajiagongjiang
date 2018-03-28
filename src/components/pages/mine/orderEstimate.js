import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router'
import { NavBar, Icon, WingBlank, Button, Modal, List, Stepper, TextareaItem, Slider} from 'antd-mobile';
import ImgInit from 'rootsrc/components/common/imgInit/index.js'
import Worker from 'rootsrc/request/worker'
import Order from 'rootsrc/request/order'
import API from 'rootsrc/request/api'




class Main extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    let that = this;
    function getComponent(){
      if(that.props.params.step == 1){
        return <OrderEstimate />
      }else if(that.props.params.step == 2){
        return <ShowOrderEstimate />
      }
    }

    return(<div>{getComponent()}</div>)
  }

}
Main.contextTypes = { 
  store: PropTypes.object,
  router: PropTypes.object
};
Main.defaultProps = {
  
};

class ShowOrderEstimate extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return(<div className='order-estimate order-estimate2'>
    	<NavBar icon={<Icon type="left" />} mode="light"  onLeftClick={() => {this.context.router.goBack()}}>订单评价</NavBar>
		<div className='order-estimate-content'>
			
					<div>
						<div className='order-estimate2-img'>
							<ImgInit src={require('./img/redbag.png')} />
						</div>
						<div className='order-estimate2-text'>
							<h4>恭喜您，您得到<span>2积分</span></h4>
							<p>感谢您对李师傅做出的真实评价，我们将竭力为您提供更好的工匠资源</p>
							<h5>此次评价得分为：<span>9分</span></h5>
						</div>
						
					      <div className='order-submit'>
					      	<Button type='primary' onClick={() => {this.context.router.goBack()}} >返回</Button>
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


class OrderEstimate extends React.Component{
	constructor(props){
		super(props);
		this.state = {
				data:{},
				userInfo:false,
				workerInfo:false,
				estimate:[
					{name:'技术过硬',score:6},
					{name:'时间高效',score:6},
					{name:'安全施工',score:6},
					{name:'态度随和',score:6},
					{name:'爱护现场',score:6},
					{name:'上下衔接',score:6},
					{name:'认真负责',score:6},
					{name:'值得信赖',score:6},
				]
	    };
	}
	componentWillMount(){
		let data = JSON.parse(window.sessionStorage.getItem('TEMP_DATA'));
		let userInfo = store.getState().userInfo;

		Worker.list({
			user_id:data.artisan_user_id
		}).then((data2)=>{
			if(data2.state){
				 this.setState({data,userInfo,workerInfo:data2.data.meta[0]});
			}
		})
	
	}
	onChange(o,index){
			let estimate = this.state.estimate;
			estimate[index].score = o;

			this.setState({
				estimate
			})
		

	}
	handleSubmit(){
		let score = 0;
		this.state.estimate.map((obj,index)=>{
			score += parseInt(obj.score)
		})
		Order.estimate(this.state.data.order_id,{
			artisan_user_id:this.state.workerInfo.id,
			content:this.state.estimate,
			score,
			token:this.state.userInfo.token,
			uid:this.state.userInfo.id,
			user_id:this.state.userInfo.id,
		}).then((data)=>{
			console.log(data);
		})
		// this.context.router.push('/home/mine/orderEstimate/2');
	}
	render(){
		console.log(this.state)
		let {data,workerInfo,estimate} = this.state
		return(<div className='order-estimate'>
				<NavBar icon={<Icon type="left" />} mode="light"  onLeftClick={() => {this.context.router.goBack()}}>订单评价</NavBar>
				<div className='order-estimate-content'>
					<h3>订单号：{data.order_id}</h3>
					<div>
						<div className='order-estimate-user'>
							<div>
								<ImgInit src={API.DOMAIN.substr(0,API.DOMAIN.length-1)+workerInfo.avatar} />
							</div>
							<div>
								<h4>{workerInfo.name}</h4>
								<p>{workerInfo.artisan_level}</p>
							</div>
						</div>
						<div className='order-estimate-items'>
							{estimate.map((obj,index)=>{
								return (<div className="order-estimate-item">
								<h5>{obj.name}</h5>
								<Slider
						            style={{ width:'80%',margin:'auto'}}
						            defaultValue={3}
						            marks={{1:'2分满意',2:'4分满意',3:'6分满意',4:'8分满意',5:'10分满意'}}
						            min={1}
						            max={5}
						            onChange={()=>{}}
						            onAfterChange={(o)=>{this.onChange(o,index)}}
						          />
							</div>)
							})}
						</div>
				
					      <div className='order-submit'>
					      	<Button onClick={()=>{this.handleSubmit.bind(this)()}} type='primary'>提交评价</Button>
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
export default Main