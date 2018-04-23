import React from 'react'
import PropTypes from 'prop-types'

import { NavBar, Icon } from 'antd-mobile';
import {Link} from 'react-router'
import Common from '../../../request/common';

require('./style.scss');

class Main extends React.Component{
	static contextTypes = {
		store:React.PropTypes.object
	}
	constructor(props){
		super(props);
		this.state = {
			page:1,
			data:false,
			userInfo:store.getState().userInfo,
			userInfoDetail:store.getState().userInfoDetail
		}
	}
	componentWillMount(){
		this.getData()
	}
	getData(){
		Common.myMessage({
			page:this.state.page,
			token:this.state.userInfo.token,
			uid:this.state.userInfo.id,
		})
		.then((data)=>{
			this.setState({
				page:data.data.paging.page+1
			})
		})
	}
	render(){
		return(<div className='message-wrap'>
			<NavBar icon={<Icon type="left" />} onLeftClick={() => {this.context.router.goBack()}} mode="light">消息</NavBar>
		    <div className="content-box">
				{
					this.state.data&&this.state.data.map((obj,index)=>{
						return (<dl>
							<dt>消息</dt>
							<dd>
								<h4>{obj.title}</h4>
								<p>{obj.content}</p>
								<span>{obj.created_at}</span>
							</dd>
						</dl>)
					})
				}		    	
		    </div>
		</div>)
	}

}
Main.contextTypes = {
	router:PropTypes.object
}
export default Main