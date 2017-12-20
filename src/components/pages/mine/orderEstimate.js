import React from 'react'
import PropTypes from 'prop-types'
import { NavBar, Icon, WingBlank, Button, Modal, List, Stepper, TextareaItem} from 'antd-mobile';
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
						<List>
					        <List.Item
					          wrap
					          extra={
					            <Stepper
					              style={{ width: '100%', minWidth: '100px' }}
					              showNumber
					              max={10}
					              min={1}
					              value={this.state.val}
					              onChange={this.onChange.bind(this)}
					            />}
					        >
					        评价项目1
					        </List.Item>
					      	 <List.Item
					          wrap
					          extra={
					            <Stepper
					              style={{ width: '100%', minWidth: '100px' }}
					              showNumber
					              max={10}
					              min={1}
					              value={this.state.val}
					              onChange={this.onChange.bind(this)}
					            />}
					        >
					        评价项目2
					        </List.Item>
					        <List.Item
					          wrap
					          extra={
					            <Stepper
					              style={{ width: '100%', minWidth: '100px' }}
					              showNumber
					              max={10}
					              min={1}
					              value={this.state.val}
					              onChange={this.onChange.bind(this)}
					            />}
					        >
					        评价项目2
					        </List.Item>
					        <List.Item
					          wrap
					          extra={
					            <Stepper
					              style={{ width: '100%', minWidth: '100px' }}
					              showNumber
					              max={10}
					              min={1}
					              value={this.state.val}
					              onChange={this.onChange.bind(this)}
					            />}
					        >
					        评价项目2
					        </List.Item>
					        <List.Item
					          wrap
					          extra={
					            <Stepper
					              style={{ width: '100%', minWidth: '100px' }}
					              showNumber
					              max={10}
					              min={1}
					              value={this.state.val}
					              onChange={this.onChange.bind(this)}
					            />}
					        >
					        评价项目2
					        </List.Item>
					      </List>

					      <div className='order-estimate-textarea'>
					      	 <TextareaItem
					      	  	placeholder='输入你的评价'
					            autoHeight
					            labelNumber={5}
					          />
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