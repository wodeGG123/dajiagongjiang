import React from 'react'
import PropTypes from 'prop-types'
import { NavBar, Icon, Carousel, Button,  SearchBar, Picker } from 'antd-mobile';
import {Link} from 'react-router'
import ImgInit from 'rootsrc/components/common/imgInit/index.js'
import CheckBox from 'rootsrc/components/common/checkbox/index.js'
var FontAwesome = require('react-fontawesome');
require('./style.scss')

class Main extends React.Component{
	constructor(props){
		super(props);
		this.state = {
      data:[
          [
            {
              label: '木工',
              value: '1',
            },
            {
              label: '铁匠',
              value: '2',
            },
          ],
          [
            {
              label: '木工1',
              value: '3',
            },
            {
              label: '铁匠1',
              value: '4',
            },
          ],
        ],
        data2:[
        [
            {
              label: '北京',
              value: '1',
            },
            {
              label: '四川',
              value: '2',
            },
          ],
          [
            {
              label: '北京市',
              value: '3',
            },
            {
              label: '内江市',
              value: '4',
            },
          ],
          [
            {
              label: '东城区',
              value: '3',
            },
            {
              label: '威远县',
              value: '4',
            },
          ],
        ]

		}
	}
	
	render(){
		return(<div className='search wrap-box'>
			<NavBar mode="light" icon={<Icon type="left" />} onLeftClick={() => {console.log(this.context.router);this.context.router.goBack()}}>找工匠</NavBar>
			<div>
				<SearchBar placeholder="可输入姓名、工种、工作范围" maxLength={8} />
			</div>
      <div className='search-tools'>
        <div>
          <font>人气</font>&nbsp;
          <FontAwesome name='caret-down' />
        </div>
        <div>
          <font>信誉</font>&nbsp;
          <FontAwesome name='caret-down' />
        </div>
        <div>
          <Picker
            data={this.state.data}
            cols={2}
            title="选择工种"
            cascade={false}
            value={''}
            onChange={v => {return true}}
            onOk={v => {return true}}
          >
            <font>工种</font>
          </Picker>
          
        </div>
        <div>
          <Picker
            data={this.state.data2}
            cols={3}
            title="选择地区"
            cascade={false}
            value={''}
            onChange={v => {return true}}
            onOk={v => {return true}}
          >
            <font>地区</font>
          </Picker>
        </div>
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