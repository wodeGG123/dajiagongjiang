import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router'
import { NavBar, Icon, WingBlank, Button, Modal, List, Stepper, TextareaItem, Slider} from 'antd-mobile';
import ImgInit from 'rootsrc/components/common/imgInit/index.js'





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
	      val: 3,
	    };
	}
	onChange(val){
    // console.log(val);
    this.setState({ val });
  	}
	render(){
		return(<div className='order-estimate'>
				<NavBar icon={<Icon type="left" />} mode="light"  onLeftClick={() => {this.context.router.goBack()}}>订单评价</NavBar>
				<div className='order-estimate-content'>
					<h3>订单号：561345</h3>
					<div>
						<div className='order-estimate-user'>
							<div>
								<ImgInit src='' />
							</div>
							<div>
								<h4>王师傅</h4>
								<p>一级工匠</p>
							</div>
						</div>
						<div className='order-estimate-items'>
							<div className="order-estimate-item">
								<h5>评价内容1</h5>
								<Slider
						            style={{ width:'80%',margin:'auto'}}
						            defaultValue={2}
						            marks={{0:'满意1',1:'满意1',2:'满意2',3:'满意3',4:'满意4'}}
						            min={0}
						            max={4}
						            onChange={()=>{}}
						            onAfterChange={()=>{}}
						          />
							</div>
							<div className="order-estimate-item">
								<h5>评价内容2</h5>
								<Slider
						            style={{ width:'80%',margin:'auto'}}
						            defaultValue={2}
						            marks={{0:'满意1',1:'满意1',2:'满意2',3:'满意3',4:'满意4'}}
						            min={0}
						            max={4}
						            onChange={()=>{}}
						            onAfterChange={()=>{}}
						          />
							</div>
							<div className="order-estimate-item">
								<h5>评价内容3</h5>
								<Slider
						            style={{ width:'80%',margin:'auto'}}
						            defaultValue={2}
						            marks={{0:'满意1',1:'满意1',2:'满意2',3:'满意3',4:'满意4'}}
						            min={0}
						            max={4}
						            onChange={()=>{}}
						            onAfterChange={()=>{}}
						          />
							</div>
						</div>
				
					      <div className='order-submit'>
					      	<Button href='/#/home/mine/orderEstimate/2' type='primary'>提交评价</Button>
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