import React from 'react'
import PropTypes from 'prop-types'
import { NavBar, Icon, WingBlank, Button, Modal, ImagePicker, SegmentedControl, Picker, DatePicker } from 'antd-mobile';
const alert = Modal.alert;
const prompt = Modal.prompt;

import {Link} from 'react-router'
var moment = require('moment');

import ImgInit from 'rootsrc/components/common/imgInit/index.js'
var FontAwesome = require('react-fontawesome');

require('./style.scss');



class WorkerManagement extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			busy:0,
			collocation:0
		}
	}
	render(){
		return(<div className='worker-management'>
				<NavBar icon={<Icon type="left" />} mode="light" onLeftClick={() => {this.context.router.goBack()}}>工匠管理</NavBar>	
				 <div className='user-top'>
		    	
		    		<div  className='user-head-img'>
                   		<ImgInit src=''/>	
		    		</div>
		    		<div className='user-text'>
		    			<h3>李师傅</h3>
		    			<p>(高级工匠)</p>
		    		</div>
		    		<div className='user-es'>
		    			<Link to='/home/mine/myLevel'>
		    			<div>
		    				<FontAwesome name='street-view' />
		    				<span>技能等级：高级</span>
		    			</div>
		    			</Link>
		    			<Link to='/home/mine/myCoin'>
			    			<div>
			    				<FontAwesome name='database' />
			    				<span>积分：96</span>
			    			</div>
		    			</Link>
		    		</div>
		    		<div className='user-es'>
		    			<Link to='/home/mine/myEvaluate'>
			    			<div>
			    				<FontAwesome name='hand-peace-o' />
			    				<span>好评率：96%</span>
			    			</div>
		    			</Link>
		    			<Link to='/home/mine/myCredit'>
			    			<div>
			    				<FontAwesome name='tags' />
			    				<span>信誉：650</span>
			    			</div>
			    		</Link>
		    		</div>
		    		
		    </div>


				<div className='user-mid'>
					<div>
				    	<dl>
				    		<dt><span>技能等级</span></dt>
				    		<dd>高级工匠</dd>
				    	</dl>
					</div>
			    	<Picker value={[this.state.busy]} onChange={value => this.setState({busy:value[0]})} data={[{value:1,label:'忙碌'},{value:0,label:'空闲'},]} cols={1} className="forss">
			          	<dl>
				    		<dt><span>是否开启忙碌</span></dt>
				    		<dd><font>{this.state.busy?'忙碌':'空闲'}</font></dd>
			    		</dl>
		        	</Picker>
		        	<Picker value={[this.state.busy]} onChange={value => this.setState({collocation:value[0]})} data={[{value:1,label:'托管'},{value:0,label:'自主'},]} cols={1} className="forss">
			          	<dl>
				    		<dt><span>是否开启托管</span></dt>
				    		<dd><font>{this.state.collocation?'托管':'自主'}</font></dd>
			    		</dl>
		        	</Picker>
		        	<Link to='/home/mine/orderList'>
		    		<dl>
			    		<dt><span>接活订单</span><font>(100)</font></dt>
			    		<dd><FontAwesome name='angle-right' /></dd>
		    		</dl>
		    	</Link>
		        	<a href='https://www.chinalife.com.cn/zhuzhan/index/'>
				    	<dl>
				    		<dt><span>保险</span></dt>
				    		<dd><FontAwesome name='angle-right' /></dd>
				    	</dl>
			    	</a>
		        	<Link to='/home/mine/applyForWorker'>
				    	<dl>
				    		<dt><span>重新申请</span></dt>
				    		<dd><FontAwesome name='angle-right' /></dd>
				    	</dl>
			    	</Link>
			    	<Link to='/home/order/slefMake'>
				    	<dl>
				    		<dt><span>自主下单</span></dt>
				    		<dd><FontAwesome name='angle-right' /></dd>
				    	</dl>
			    	</Link>
			    	<div className="leave-words">
						<div>
							<textarea name="" id="">工匠个人备注</textarea>
						</div>
					</div>
		    	</div>

		</div>)
	}

}

WorkerManagement.contextTypes = {
  router: PropTypes.object
};

class ApplyForWorker extends React.Component{
	constructor(props){
		super(props);
		this.state={
			nickName:'李师傅',
			sex:1,
			year:1,
			date:new Date('2017-01-01'),
			email:'123@qq.com',
			mobile:'13990546657',
			job:'',
			makeOffers:false,
		}
	}
	handleConfirm(){
		alert('确认修改？', '', [
	      { text: '取消', onPress: () => console.log('cancel') },
	      { text: '确定', onPress: () => this.context.router.replace('/home/mine') },
	    ])
	}
	dealMakeOffers(action){
		this.setState({
			makeOffers:action
		})
	}
	render(){
		const jobList = [
			{value:0,
			 label:'工种类0',
			 children:[{value:0,label:'石匠0'},{value:1,label:'石匠1'},{value:2,label:'石匠2'}]},
			 {value:1,
			 label:'工种类1',
			 children:[{value:0,label:'木匠0'},{value:1,label:'木匠1'},{value:2,label:'木匠2'}]},
			 {value:2,
			 label:'工种类2',
			 children:[{value:0,label:'铁匠0'},{value:1,label:'铁匠1'},{value:2,label:'铁匠2'}]}

		];
		const location = [
			{value:0,
			 label:'四川',
			 children:[{value:0,label:'成都',children:[{value:0,label:'威远'}]},{value:1,label:'成都',children:[{value:0,label:'威远'}]},{value:2,label:'成都',children:[{value:0,label:'威远'}]}]},
			 {value:0,
			 label:'四川',
			 children:[{value:0,label:'成都',children:[{value:0,label:'威远'}]},{value:1,label:'成都',children:[{value:0,label:'威远'}]},{value:2,label:'成都',children:[{value:0,label:'威远'}]}]},
			 {value:0,
			 label:'四川',
			 children:[{value:0,label:'成都',children:[{value:0,label:'威远'}]},{value:1,label:'成都',children:[{value:0,label:'威远'}]},{value:2,label:'成都',children:[{value:0,label:'威远'}]}]},
			 

		];
		return(<div className='apply-for-worker'>

            <NavBar icon={<Icon type="left" />} mode="light" onLeftClick={() => {this.context.router.goBack()}}>申请工匠</NavBar>
		     <div className='user-top'>
		    	<div>
		    		<p>身份证<span>（需要上传身份证正反面）</span></p>
		    		<ImagePickerExample length={2} />
		    	</div>
		    	<div>
		    		<p>项目展示<span>（您的项目展示）</span></p>
		    		<ImagePickerExample length={8} />
		    	</div>
		    	<div>
		    		<p>资质证书<span>（您的获奖资质证书）</span></p>
		    		<ImagePickerExample length={8} />
		    	</div>
		    </div>

		    <div className='user-mid'>
		    	<dl>
		    		<dt><span>姓名</span></dt>
		    		<dd><input type="text" placeholder='请输入姓名'/></dd>
		    	</dl>
		    	<dl>
		    		<dt><span>身份证号</span></dt>
		    		<dd><input type="text" placeholder='请输入身份证号'/></dd>
		    	</dl>
		    	<DatePicker
		          mode="date"
		          title="出生日期"
		          extra="Optional"
		          minDate={new Date("1900-01-01")}
		          maxDate={new Date()}
		          value={this.state.date}
		          onChange={date => this.setState({ date })}
		        >
		          <dl>
		    		<dt><span>出生日期</span></dt>
		    		<dd><font>{moment(this.state.date).format('YYYY年MM月DD日')}</font><FontAwesome name='angle-right' /></dd>
		    	  </dl>
		        </DatePicker>
		        <Picker
		        	  cols={2}
			          data={jobList}     
			          value={this.state.job.value}
			          onChange={v => {}}
			          onOk={() => {}}
			          onDismiss={() => {}}
			          cascade={true}
			        >
		        <dl>
		    		<dt><span>工种</span></dt>
		    		<dd><font>木工</font><FontAwesome name='angle-right' /></dd>
		    	</dl>
        	   </Picker>

		    	<Picker value={[this.state.sex]} onChange={value => this.setState({sex:value[0]})} data={[{value:1,label:'男'},{value:0,label:'女'},]} cols={1} className="forss">
		          	<dl>
			    		<dt><span>性别</span></dt>
			    		<dd><font>{this.state.sex?'男':'女'}</font><FontAwesome name='angle-right' /></dd>
		    		</dl>
		        </Picker>
		    	<Picker value={[this.state.year]} onChange={value => this.setState({year:value[0]})} data={[{value:1,label:'1年'},{value:2,label:'2年'},]} cols={1} className="forss">
		          	<dl>
			    		<dt><span>工龄</span></dt>
			    		<dd><font>5年</font><FontAwesome name='angle-right' /></dd>
		    		</dl>
		        </Picker>
		         <Picker
		        	  cols={3}
			          data={location}     
			          value={this.state.job}
			          onChange={v => {}}
			          onOk={() => {}}
			          onDismiss={() => {}}
			          cascade={true}
			        >
		        <dl>
		    		<dt><span>施工地址</span></dt>
		    		<dd><font>四川省-内江市-威远县</font><FontAwesome name='angle-right' /></dd>
		    	</dl>
        	   </Picker>
		    	<dl className='first-level-dl' onClick={() => {this.dealMakeOffers(true)}}>
		    		<dt><span>项目报价</span></dt>
		    		<dd><font>添加报价方式</font><FontAwesome name='angle-right' /></dd>
		    	</dl>
		    	<dl className='second-level-dl'>
		    		<dt><span>报价方式1</span></dt>
		    		<dd><font>修改</font><FontAwesome name='angle-right' /></dd>
		    	</dl>
		    </div>
		    <div className='apply-submit'>
		    	<Button type='primary'>提交申请</Button>
		    </div>

		    {this.state.makeOffers?<MakeOffers dealMakeOffers={this.dealMakeOffers.bind(this)} />:null}
		    
		</div>)
	}

}
ApplyForWorker.contextTypes = {
  router: PropTypes.object
};
 const data = [{
			  url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
			  id: '2121',
			}];

class ImagePickerExample extends React.Component {
  state = {
    files: data,
  }
  onChange = (files, type, index) => {
    console.log(files, type, index);
    this.setState({
      files,
    });
  }
  render() {
    const { files } = this.state;
   
    return (<ImagePicker
          files={files}
          onChange={this.onChange}
          onImageClick={(index, fs) => console.log(index, fs)}
          selectable={files.length < this.props.length}
          multiple={false}
        />
    );
  }
}

class MakeOffers extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			items:[{}]
		}
	}
	addItem(){

		let _items = this.state.items;
		_items.push({});

		this.setState({
			items:_items
		})
	}
	render(){
		return(<div className='make-offers'>
			<NavBar icon={<Icon type="left" />} mode="light" onLeftClick={() => {this.props.dealMakeOffers(false)}} rightContent={<FontAwesome onClick={this.addItem.bind(this)} name='plus' />} >项目报价</NavBar>
			<div className='user-mid'>
				<div className='make-offers-title'>
			    	<dl>
			    		<dt><span>报价方式名称</span></dt>
			    		<dd><input type="text" placeholder='请输报价方式名称'/></dd>
			    	</dl>
				</div>
				<div className='make-offers-items'>
					{this.state.items.map((obj,index)=>{
						return(<div className='make-offers-item'>
				    		<dl>
					    		<dt><span>项目名称</span></dt>
					    		<dd><input type="text" placeholder='请输入项目名称'/></dd>
					    	</dl>
					    	<dl>
					    		<dt><span>项目单价</span></dt>
					    		<dd><input type="text" placeholder='请输入项目单价'/></dd>
					    	</dl>
					    	<dl>
					    		<dt><span>项目单位</span></dt>
					    		<dd><input type="text" placeholder='请输入项目单位'/></dd>
					    	</dl>
					    	<dl>
					    		<dt><span>项目保质期</span></dt>
					    		<dd><input type="text" placeholder='保质期单位（天）'/></dd>
					    	</dl>
				    	</div>)
					})}
					<div>
						<div className="leave-words">
								<h5>报价说明：</h5>
								<div>
									<textarea name="" id="">报价说明报价说明报价说明报价说明</textarea>
								</div>
							</div>
							<div className="leave-words">
								<h5>收方方法：</h5>
								<div>
									<textarea name="" id="">收方方法收方方法</textarea>
								</div>
							</div>
							<div className="leave-words">
								<h5>客户需提供：</h5>
								<div>
									<textarea name="" id="">客户需提供：管子、乳胶漆、石灰、水、电</textarea>
								</div>
							</div>
					</div>
				</div>
		    	
		    </div>
		    <div className='apply-submit'>
		    	<Button type='primary'>确定</Button>
		    </div>

		</div>)
	}
}


export default WorkerManagement
export {ApplyForWorker}