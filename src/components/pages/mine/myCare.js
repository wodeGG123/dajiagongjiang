import React from 'react'
import PropTypes from 'prop-types'
import { NavBar, Icon, WingBlank, Button, Modal, ListView} from 'antd-mobile';
import {Link} from 'react-router'
import Common from 'rootsrc/request/common'
import Worker from 'rootsrc/request/worker'
import {WorkerBlock} from 'rootsrc/components/common/workerList'

import ImgInit from 'rootsrc/components/common/imgInit/index.js'
var FontAwesome = require('react-fontawesome');

class MyCare extends React.Component{
	constructor(props){
		super(props)
	}
	componentWillMount() {
	}
	render(){
		return(<div className='mine-wrap'>
			<NavBar icon={<Icon type="left" />} mode="light"  onLeftClick={() => {this.context.router.goBack()}}>我的关注</NavBar>
			<WorkerList />

		</div>)
	}

}
MyCare.contextTypes = {
  store: PropTypes.object,
  router: PropTypes.object,

};
MyCare.defaultProps = {
  
};



class WorkerList extends React.Component{
	constructor(props){
    super(props);
    let dataSource = new ListView.DataSource({
		  rowHasChanged: (row1, row2) => row1 !== row2,
		});
		this.state = {
			userInfo:store.getState().userInfo,
      		dataSource,
			data:[],
     		param:{
        	  page:1,
      		},
		}
	}
	componentWillMount(){
	Common.careList({
		token:this.state.userInfo.token,
		uid:this.state.userInfo.id,
	}).then((data)=>{
		console.log(data)
	})

    let param = this.state.param;
    this.getData(param,true)
  }

	getData(param,init){
		Worker.list(param)
		.then((data)=>{
			var ds = this.state.data.concat(data.data.meta);
			if(init){
				ds = data.data.meta;
			}
			if(data){
        	param.page = parseInt(data.paging.page) + 1;
				this.setState({
					dataSource: this.state.dataSource.cloneWithRows(ds),
					data:ds,
					param
				})
			}
		})
	}
	onEndReached(){
		this.getData(this.state.param,false)
	}
	render(){
		return(<div className='search wrap-box'>
			<div className='worker-block-listview-wrap'>
         <ListView
					ref={el => this.lv = el}
					initialListSize={10}
					dataSource={this.state.dataSource}
					renderRow={(rowData)=><WorkerBlock data={rowData} />}
					style={{
						height: document.documentElement.clientHeight - 175 + 'px',
						overflow: 'auto',
          }}
					pageSize={1}
					onScroll={() => { console.log('scroll'); }}
					scrollEventThrottle={50}
					onEndReached={this.onEndReached}
					onEndReachedThreshold={10}
				/>

			</div>
		</div>)
	}

}
WorkerList.contextTypes = {
  store: PropTypes.object,
  router: PropTypes.object
};
WorkerList.defaultProps = {
  
};
export default MyCare