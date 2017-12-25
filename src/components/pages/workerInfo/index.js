import React from 'react'
import PropTypes from 'prop-types'
import { NavBar, Icon, Carousel, Button, Toast, Modal } from 'antd-mobile';
import {Link} from 'react-router'
import ImgInit from 'rootsrc/components/common/imgInit/index.js'
var FontAwesome = require('react-fontawesome');
require('./style.scss')

class Main extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			modal1 : false,
			modal2 : false,
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
	render(){
		return(<div className='workerinfo wrap-box'>
			<NavBar mode="light" icon={<Icon type="left" />} rightContent={<Link to='/home/order/make'>下单</Link>} onLeftClick={() => {console.log(this.context.router);this.context.router.goBack()}}>李师傅</NavBar>
			<div className='workerinfo-top'>
				<div className='workerinfo-top-img'><ImgInit src='/statics/img/temp/timg10.jpg' /><i></i></div>
				<div className='workerinfo-top-left-block'>
					<p><FontAwesome name='map-marker' />&nbsp;<span>威远</span></p>
					<p><span>高级木工</span></p>
					<h5><span>信誉值80</span><span>&nbsp;|&nbsp;</span><span>好评率90%</span></h5>
				</div>
				<div className="workerinfo-top-right-block">
					<Button type='primary' onClick={()=>{Toast.info('关注成功', 1);}}>+&nbsp;关注</Button>
				</div>
			</div>	
			 <div className='workerinfo-guiders'>
		      <Link to=''>工伤保险&nbsp;<FontAwesome name='check' /></Link>
		      <a onClick={this.showItems.bind(this)}>项目展示</a>
		      <a onClick={this.showItems2.bind(this)}>资质证书</a>
		    </div>	
		    <div className="workerinfo-mid">
		    	<h5>工匠资料</h5>
		    	<div>
		    		<dl>
		    			<dt><span>工匠等级</span></dt>
		    			<dd><span>高级木工</span></dd>
		    		</dl>
		    		<dl>
		    			<dt><span>性别</span></dt>
		    			<dd><span>男</span></dd>
		    		</dl>
		    		<dl>
		    			<dt><span>关注</span></dt>
		    			<dd><span>40</span></dd>
		    		</dl>
		    		<dl>
		    			<dt><span>信誉度</span></dt>
		    			<dd><span>90</span></dd>
		    		</dl>
		    		<dl>
		    			<dt><span>好评率</span></dt>
		    			<dd><span>80%</span></dd>
		    		</dl>
		    		<dl>
		    			<dt><span>工龄</span></dt>
		    			<dd><span>5年</span></dd>
		    		</dl>
		    		<dl>
		    			<dt><span>总单量</span></dt>
		    			<dd><span>180</span></dd>
		    		</dl>
		    		<dl>
		    			<dt><span>工作范围</span></dt>
		    			<dd><span>威远</span></dd>
		    		</dl>
		    	</div>
		    </div>
		    <div className="submit">
		    	<Link to='/home/order/make'><Button type="primary"  onClick={()=>{}}>找他下单</Button></Link>
		    </div>

		    <Modal
          visible={this.state.modal1}
          transparent
          maskClosable={false}
          onClose={()=>{}}
          title="项目展示"
          footer={[{ text: 'Ok', onPress: () => { console.log('ok');this.setState({modal1:false}) } }]}
          wrapProps={{ onTouchStart: ()=>{} }}
        >
         <div className='show-worker-items'>
         	 <div className="swiper-container">
		        <div className="swiper-wrapper">
		          <div className="swiper-slide">
		            <ImgInit src='/statics/img/temp/sj1.jpg' />
		          </div>
		          <div className="swiper-slide">
		            <ImgInit src='/statics/img/temp/sj2.jpg' />
		          </div>
		          <div className="swiper-slide">
		            <ImgInit src='/statics/img/temp/sj3.jpg' />
		          </div>
		          <div className="swiper-slide">
		            <ImgInit src='/statics/img/temp/sj4.jpg' />
		          </div>
		          <div className="swiper-slide">
		            <ImgInit src='/statics/img/temp/sj5.jpg' />
		          </div>
		          <div className="swiper-slide">
		            <ImgInit src='/statics/img/temp/sj6.jpg' />
		          </div>
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
		          <div className="swiper-slide">
		            <ImgInit src='/statics/img/temp/zs1.jpg' />
		          </div>
		          <div className="swiper-slide">
		            <ImgInit src='/statics/img/temp/zs2.jpg' />
		          </div>
		          <div className="swiper-slide">
		            <ImgInit src='/statics/img/temp/zs3.jpg' />
		          </div>
		         
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