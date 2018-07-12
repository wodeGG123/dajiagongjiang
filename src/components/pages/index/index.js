import React from 'react'
import PropTypes from 'prop-types'

import {Link} from 'react-router'
import { NavBar, Icon, Carousel } from 'antd-mobile';
import ImgInit from 'rootsrc/components/common/imgInit/index.js'
import {WorkerBlock} from 'rootsrc/components/common/workerList/index.js'
import Common from '../../../request/common';
import Worker from '../../../request/worker';
import API from '../../../request/api';
import path from 'path';


var FontAwesome = require('react-fontawesome');
require('./style.scss');

class Index extends React.Component{
  static contextTypes = {
      router:React.PropTypes.object
  }
	constructor(props){
    super(props);
    this.state = {
      notice:false,
      banner:false,
      stars:false,
      workers:false,
    }
	}
  componentDidMount() {

    Common.noticeList()
    .then((data)=>{
      this.setState({
        notice:data.data.meta
      },()=>{
          var notice = new Swiper('.index-notice .swiper-container', {
            direction: 'vertical',
            autoplay:true,
            loop:true
          });
      })
    })

    Common.bannerList()
    .then((data)=>{
      this.setState({
        banner:data.data.meta
      },()=>{
        var banner = new Swiper('.index-banner .swiper-container', {
          pagination: {
            el: '.index-banner .swiper-pagination',
          },
        });
      })
    })

    Worker.list({page:1,id:1,order_reputation:'desc'})
    .then((data)=>{
      if(data.state){
          this.setState({
            stars:data.data.meta,
            workers:data.data.meta
          },()=>{
              var stars = new Swiper('.index-stars .swiper-container', {
                slidesPerView: 4,
                spaceBetween: 0,
                freeMode: true,
                loop:true
              });
          })
      }
      
    })
  }
  handleStar(data){
    // store.dispatch({type:'SET_TEMP_DATA',data});
    window.sessionStorage.setItem('TEMP_DATA',JSON.stringify(data));
    this.context.router.push('/home/workerInfo');
  }
	render(){
		return(<div className='index-wrap'>                      
    <div className='index-guiders'>
      <Link to='/home/articleList/7'><FontAwesome name='book' /><span>装修百科</span></Link>
      <Link to='/home/question'><FontAwesome name='area-chart' /><span>市场数据</span></Link>
      <Link to='/home/search/1'><FontAwesome name='search' /><span>找工匠</span></Link>
      <Link to='/home/articleList/24'><FontAwesome name='cube' /><span>精品</span></Link>
    </div>
    
    
    <div className='index-banner'>
      <div className="swiper-container">
        <div className="swiper-wrapper">
        {
          this.state.banner&&this.state.banner.map((obj,index)=>{
            return (<div key={index} className="swiper-slide">
            <ImgInit src={API.DOMAIN.substr(0,API.DOMAIN.length-1)+obj.logo} />
          </div>)
          })
        }
        </div>
      <div className="swiper-pagination"></div>
    </div>

    </div>
       <div className='index-notice'>
       <div className="swiper-container">
        <div className="swiper-wrapper">
          {
            this.state.notice&&this.state.notice.map((obj,index)=>{
              return (<div key={index} className="swiper-slide">{obj.title}</div>)
            })
          }          
        </div>
      </div>
    </div>
    <div className='index-stars'>
       <div className="swiper-container">
        <div className="swiper-wrapper">
          {
            this.state.stars&&this.state.stars.map((obj,index)=>{
              return (<div key={index} onClick={()=>{this.handleStar(obj)}} className="swiper-slide">
              <ImgInit src={API.DOMAIN.substr(0,API.DOMAIN.length-1)+obj.avatar} />
            </div>)
            })
          }          
        </div>
      </div>
    </div>
 
    <div className="index-content">
      <h5>推荐工匠</h5>
      <div className="worker-lists">
          {
            this.state.workers&&this.state.workers.map((obj,index)=>{
                return (<WorkerBlock key={index} data={obj} />)
            })
          }
      </div>
    </div>
		</div>)
	}

}

export default Index