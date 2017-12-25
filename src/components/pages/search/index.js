import React from 'react'
import PropTypes from 'prop-types'
import { NavBar, Icon, Carousel, Button,  SearchBar } from 'antd-mobile';
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
	
	render(){
		return(<div className='search wrap-box'>
			<NavBar mode="light" icon={<Icon type="left" />} onLeftClick={() => {console.log(this.context.router);this.context.router.goBack()}}>搜索</NavBar>
			<div>
				<SearchBar placeholder="可输入姓名、工种、工作范围" maxLength={8} />
			</div>
			<div>
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
Main.contextTypes = {
  store: PropTypes.object,
  router: PropTypes.object
};
Main.defaultProps = {
  
};
export default Main