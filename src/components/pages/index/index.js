import React from 'react'
import PropTypes from 'prop-types'

import {Link} from 'react-router'
import { NavBar, Icon, Carousel } from 'antd-mobile';
import ImgInit from 'rootsrc/components/common/imgInit/index.js'

var FontAwesome = require('react-fontawesome');
require('./style.scss');

class Index extends React.Component{
	constructor(props){
		super(props);
	}
  componentDidMount() {
    var banner = new Swiper('.index-banner .swiper-container', {
      pagination: {
        el: '.index-banner .swiper-pagination',
      },
    });

    var stars = new Swiper('.index-stars .swiper-container', {
      slidesPerView: 4,
      spaceBetween: 0,
      freeMode: true,
      loop:true
    });
  }
	render(){
		return(<div className='index-wrap'>
			<NavBar
      mode="light"
      rightContent={
        <Link to='/home/search'><Icon key="0" type="search" /></Link>
      }
    >首页</NavBar>
    <div className='index-guiders'>
      <Link to='/home/articleList'>装修百科</Link>
      <Link to='/home/articleList'>市场数据</Link>
      <Link to='/home/search'>找工匠</Link>
      <Link to='/home/articleList'>精品</Link>
    </div>
    <div className='index-banner'>
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
    <div className='index-stars'>
       <div className="swiper-container">
        <div className="swiper-wrapper">
          <div className="swiper-slide">
            <Link to='/home/workerInfo'><ImgInit src='/statics/img/temp/timg.jpg' /></Link>
          </div>
          <div className="swiper-slide">
            <Link to='/home/workerInfo'><ImgInit src='/statics/img/temp/timg1.jpg' /></Link>
          </div>
          <div className="swiper-slide">
            <Link to='/home/workerInfo'><ImgInit src='/statics/img/temp/timg2.jpg' /></Link>
          </div>
          <div className="swiper-slide">
            <Link to='/home/workerInfo'><ImgInit src='/statics/img/temp/timg3.jpg' /></Link>
          </div>
          <div className="swiper-slide">
            <Link to='/home/workerInfo'><ImgInit src='/statics/img/temp/timg4.jpg' /></Link>
          </div>
          <div className="swiper-slide">
            <Link to='/home/workerInfo'><ImgInit src='/statics/img/temp/timg5.jpg' /></Link>
          </div>
          <div className="swiper-slide">
            <Link to='/home/workerInfo'><ImgInit src='/statics/img/temp/timg6.jpg' /></Link>
          </div>
          <div className="swiper-slide">
            <Link to='/home/workerInfo'><ImgInit src='/statics/img/temp/timg7.jpg' /></Link>
          </div>
          <div className="swiper-slide">
            <Link to='/home/workerInfo'><ImgInit src='/statics/img/temp/timg8.jpg' /></Link>
          </div>
          <div className="swiper-slide">
            <Link to='/home/workerInfo'><ImgInit src='/statics/img/temp/timg9.jpg' /></Link>
          </div>
          <div className="swiper-slide">
            <Link to='/home/workerInfo'><ImgInit src='/statics/img/temp/timg10.jpg' /></Link>
          </div>
        </div>
      </div>
    </div>

    <div className="index-content">
      <h5>推荐工匠</h5>
      <div className='worker-lists'>
        <div className='worker-item'>
          <Link to='/home/workerInfo'>
          <dl>
            <dt><ImgInit src='/statics/img/temp/timg7.jpg' /><i>威远</i></dt>
            <dd><h4>李师傅</h4><span>5&nbsp;<FontAwesome name='star' /></span></dd>
            <dd><p>木工</p></dd>
          </dl>
          </Link> 
        </div>
        <div className='worker-item'>
          <Link to='/home/workerInfo'>
          <dl>
            <dt><ImgInit src='/statics/img/temp/timg4.jpg' /><i>威远</i></dt>
            <dd><h4>李师傅</h4><span>5&nbsp;<FontAwesome name='star' /></span></dd>
            <dd><p>木工</p></dd>
          </dl>
          </Link> 
        </div>
        <div className='worker-item'>
          <Link to='/home/workerInfo'>
          <dl>
            <dt><ImgInit src='/statics/img/temp/timg8.jpg' /><i>威远</i></dt>
            <dd><h4>李师傅</h4><span>5&nbsp;<FontAwesome name='star' /></span></dd>
            <dd><p>木工</p></dd>
          </dl>
          </Link> 
        </div>
        <div className='worker-item'>
          <Link to='/home/workerInfo'>
          <dl>
            <dt><ImgInit src='/statics/img/temp/timg9.jpg' /><i>威远</i></dt>
            <dd><h4>李师傅</h4><span>5&nbsp;<FontAwesome name='star' /></span></dd>
            <dd><p>木工</p></dd>
          </dl>
          </Link> 
        </div>
        <div className='worker-item'>
          <Link to='/home/workerInfo'>
          <dl>
            <dt><ImgInit src='/statics/img/temp/timg3.jpg' /><i>威远</i></dt>
            <dd><h4>李师傅</h4><span>5&nbsp;<FontAwesome name='star' /></span></dd>
            <dd><p>木工</p></dd>
          </dl>
          </Link> 
        </div>
        <div className='worker-item'>
          <Link to='/home/workerInfo'>
          <dl>
            <dt><ImgInit src='/statics/img/temp/timg2.jpg' /><i>威远</i></dt>
            <dd><h4>李师傅</h4><span>5&nbsp;<FontAwesome name='star' /></span></dd>
            <dd><p>木工</p></dd>
          </dl>
          </Link> 
        </div>
        <div className='worker-item'>
          <Link to='/home/workerInfo'>
          <dl>
            <dt><ImgInit src='/statics/img/temp/timg5.jpg' /><i>威远</i></dt>
            <dd><h4>李师傅</h4><span>5&nbsp;<FontAwesome name='star' /></span></dd>
            <dd><p>木工</p></dd>
          </dl>
          </Link> 
        </div>
        <div className='worker-item'>
          <Link to='/home/workerInfo'>
          <dl>
            <dt><ImgInit src='/statics/img/temp/timg10.jpg' /><i>威远</i></dt>
            <dd><h4>李师傅</h4><span>5&nbsp;<FontAwesome name='star' /></span></dd>
            <dd><p>木工</p></dd>
          </dl>
          </Link> 
        </div>
      </div>

    </div>
		</div>)
	}

}

export default Index