import React from 'react'
import PropTypes from 'prop-types'
import { NavBar, Icon, WingBlank, Button, Modal, List, Stepper, TextareaItem, Slider} from 'antd-mobile';
import ImgInit from 'rootsrc/components/common/imgInit/index.js'
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
					      	<Button type='primary'>提交评价</Button>
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
export default OrderEstimate