import React from 'react'
import PropTypes from 'prop-types'

import {Link} from 'react-router'

var FontAwesome = require('react-fontawesome');
import { TabBar } from 'antd-mobile';
import e from 'rootstatics/json/areas1.js';
require('./style.scss');

class Home extends React.Component{
	constructor(props){
		super(props);
	    this.state = {
	      selectedTab: 'Tab3',
	      hidden: false,
	    };
	}
  componentWillMount() {
  }
	render(){
		return(<div className='home-wrap'>
			<div>
      <div className='home-content'>
          {this.props.children}
      </div>
      
      <TabBar
          unselectedTintColor="#949494"
          tintColor="#33A3F4"
          barTintColor="white"
          hidden={this.state.hidden}
          id='bottom'
        >
         <TabBar.Item
            icon={<FontAwesome name='medkit' />}
            selectedIcon={<FontAwesome name='medkit' />}
            title="保险"
            key="key1"
            selected={this.state.selectedTab === 'Tab1'}
            onPress={() => {
              window.location.href = "/";
              this.setState({
                selectedTab: 'Tab1',
              });
            }}
            data-seed="logId1"
          >
           
          </TabBar.Item>
          <TabBar.Item
            title="客服"
            key="key2"
            icon={<FontAwesome name='users'/>}
            selectedIcon={<FontAwesome name='users'/>}
            selected={this.state.selectedTab === 'Tab2'}
            onPress={() => {
              this.context.router.replace('/home/contactUs')
              this.setState({
                selectedTab: 'Tab2',
              });
            }}
            data-seed="logId"
          >
           
          </TabBar.Item>
         
          <TabBar.Item
            icon={<FontAwesome name='home'/>}
            selectedIcon={<FontAwesome name='home'/>}
            title="首页"
            key="key3"
            selected={this.state.selectedTab === 'Tab3'}
            onPress={() => {
              this.context.router.replace('/home/index')	
              this.setState({
                selectedTab: 'Tab3',
              });
            }}
          >
           
          </TabBar.Item>
          <TabBar.Item
            icon={<FontAwesome name='newspaper-o' />}
            selectedIcon={<FontAwesome name='newspaper-o' />}
            title="资讯"
            key="key4"
            selected={this.state.selectedTab === 'Tab4'}
            onPress={() => {
            	this.context.router.replace('/home/articleList/23')
              this.setState({
                selectedTab: 'Tab4',
              });
            }}
          >
           
          </TabBar.Item>
          <TabBar.Item
            icon={<FontAwesome name='user-circle-o' />}
            selectedIcon={<FontAwesome name='user-circle-o' />}
            title="我的"
            key="key5"
            selected={this.state.selectedTab === 'Tab5'}
            onPress={() => {
            	this.context.router.replace('/home/mine/index')
              this.setState({
                selectedTab: 'Tab5',
              });
            }}
          >
           
          </TabBar.Item>
        </TabBar>

        

      </div>
		</div>)
	}

}
Home.contextTypes = {
	router:PropTypes.object
}
export default Home