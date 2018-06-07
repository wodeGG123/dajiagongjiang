import React from 'react'
import PropTypes from 'prop-types'
import { NavBar, Icon, Carousel, Button, Toast, Modal } from 'antd-mobile';
import {Link} from 'react-router'
import ImgInit from 'rootsrc/components/common/imgInit/index.js'
import Common from '../../../request/common';
import API from '../../../request/api';

var FontAwesome = require('react-fontawesome');
require('./style.scss')

class Main extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			modal1 : false,
			modal2 : false,
			data:{},
			userInfo:store.getState().userInfo,
		}
	}
	showItems(){
		this.setState({modal1:true});

		setTimeout(function(){
			var showItems = new Swiper('.show-worker-items .swiper-container', {
							pagination: {
								el: '.show-worker-items .swiper-pagination',
							},
			});
		},1000)
		
	}
	showItems2(){
		this.setState({modal2:true});

		setTimeout(function(){
		var showItems2 = new Swiper('.show-worker-zs .swiper-container', {
			      pagination: {
			        el: '.show-worker-zs .swiper-pagination',
			      },
		});

		},1000)
		
	}
	handleCare(){
		Common.addCare({
			atten_id:this.state.data.id,
			token:this.state.userInfo.token,
			uid:this.state.userInfo.id,
		})
		.then((data)=>{
			if(data){
				Toast.info('关注成功', 1);
			}
		})
	}
	componentWillMount(){
		let data = JSON.parse(window.sessionStorage.getItem('TEMP_DATA'));
		if(data){
			this.setState({
				data
			})
		}
	}
	render(){
		const worker = this.state.data;	
		return(<div className='workerinfo wrap-box'>
			<NavBar mode="light" icon={<Icon type="left" />} rightContent={<Link to='/home/order/make'>预算一下</Link>} onLeftClick={() => {this.context.router.goBack()}}>{worker.real_name}</NavBar>
			<div className='workerinfo-top'>
				<div className='workerinfo-top-img'><ImgInit src={API.DOMAIN.substr(0,API.DOMAIN.length-1)+worker.avatar} /><i></i></div>
				<div className='workerinfo-top-left-block'>
					<p><FontAwesome name='map-marker' />&nbsp;<span>{worker.artisan_address}</span></p>
					<p><span>{worker.artisan_level}</span></p>
					<h5><span>{worker.is_busy==0?'空闲':'忙碌'}</span></h5>
				</div>
				<div className="workerinfo-top-right-block">
					<Button type='primary' onClick={()=>{this.handleCare()}}>+&nbsp;关注</Button>
				</div>
			</div>	
			 <div className='workerinfo-guiders'>
		      <a onClick={this.showItems.bind(this)}>项目展示</a>
		      <a onClick={this.showItems2.bind(this)}>资质证书</a>
		    </div>	
		    <div className="workerinfo-mid">
		    	<h5>工匠资料</h5>
		    	<div>
						<dl>
		    			<dt><span>工种</span></dt>
		    			<dd><span>{worker.artisan_work_type}</span></dd>
		    		</dl>
		    		<dl>
		    			<dt><span>关注</span></dt>
		    			<dd><span>被{worker.fans}人关注</span></dd>
		    		</dl>
		    		<dl>
		    			<dt><span>工匠等级</span></dt>
		    			<dd><span>{worker.artisan_level}</span></dd>
		    		</dl>
		    		<dl>
		    			<dt><span>性别</span></dt>
		    			<dd><span>{worker.sex==1?'男':'女'}</span></dd>
		    		</dl>
		    		<dl>
		    			<dt><span>年龄</span></dt>
		    			<dd><span>{(new Date().getFullYear())-worker.birthday.split('-')[0]}</span></dd>
		    		</dl>

		    		<dl>
		    			<dt><span>信誉度</span></dt>
		    			<dd><span>{worker.reputation_level}</span></dd>
		    		</dl>


		    		<dl onClick={()=>{this.context.router.push({pathname:'/home/mine/myEvaluate?type=1',state:{data:worker}})}}>
		    			<dt><span>好评率</span></dt>
		    			<dd><span>{worker.praise_level}</span></dd>
		    		</dl>

		    		<dl>
		    			<dt><span>工龄</span></dt>
		    			<dd><span>{worker.artisan_work_year}年</span></dd>
		    		</dl>
		    		<dl>
		    			<dt><span>总单量</span></dt>
		    			<dd><span>180</span></dd>
		    		</dl>
		    		<dl>
		    			<dt><span>工作范围</span></dt>
		    			<dd><span>{worker.artisan_address}</span></dd>
		    		</dl>
		    	</div>
		    </div>
		    <div className="submit">
		    	<Button type="primary"  onClick={()=>{this.context.router.push('/home/order/make')}}>预算一下</Button>
		    </div>

		    <Modal
          visible={this.state.modal1}
          transparent
          maskClosable={false}
          onClose={()=>{}}
          title="项目展示"
          footer={[{ text: 'Ok', onPress: () => {this.setState({modal1:false}) } }]}
          wrapProps={{ onTouchStart: ()=>{} }}
        >
         <div className='show-worker-items'>
         	 <div className="swiper-container">
		        <div className="swiper-wrapper">
							{worker.artisan_project.split(',').length>0&&worker.artisan_project.split(',').map((obj,index)=>{
								return (<div key={index} className="swiper-slide">
		            <ImgInit src={API.DOMAIN.substr(0,API.DOMAIN.length-1)+obj} />
		          </div>)
							})}		          
		        </div>
		      <div className="swiper-pagination"></div>
		    </div>
         </div>
        </Modal>
         <Modal
          visible={this.state.modal2}
          transparent
          maskClosable={false}
          onClose={()=>{}}
          title="资质证书"
          footer={[{ text: 'Ok', onPress: () => { console.log('ok');this.setState({modal2:false}) } }]}
          wrapProps={{ onTouchStart: ()=>{} }}
        >
         <div className='show-worker-zs'>
         	 <div className="swiper-container">
		        <div className="swiper-wrapper">
							{worker.artisan_certificate.split(',').length>0&&worker.artisan_certificate.split(',').map((obj,index)=>{
									return (<div key={index} className="swiper-slide">
									<ImgInit src={API.DOMAIN.substr(0,API.DOMAIN.length-1)+obj} />
								</div>)
								})}		         
		        </div>
		      <div className="swiper-pagination"></div>
		    </div>
         </div>
        </Modal>
		</div>)
	}

}
Main.contextTypes = {
  store: PropTypes.object,
  router: PropTypes.object
};
Main.defaultProps = {
  
};
export default Main