import React from 'react'
import PropTypes from 'prop-types'

import { NavBar, Icon, SearchBar, ListView,Modal } from 'antd-mobile';
import {Link} from 'react-router'
import CheckBox from 'rootsrc/components/common/checkbox/index.js'
import Article from '../../../request/article';
import Coin from '../../../request/coin';
var FontAwesome = require('react-fontawesome');
let _html = '<p>暂无内容</p>'
require('./style.scss');


class ArticleInfo extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			data:{
				title:'标题',
				content:'<p>内容</p>',
			}
		}
	}
	componentWillMount(){
		let userInfo = store.getState().userInfo;
		let articleData = JSON.parse(window.sessionStorage.getItem('TEMP_DATA'));
		if(true){
			this.getData(this.props.location.query.id);
		}else{
			if(this.isPaid(articleData.id)){
				this.setState({
					data:articleData
				});
				return
			}
			//判断是否是收费文章
			if(articleData.is_pay){
				Modal.alert('付费阅读', '此文章为付费文章，扣取1积分阅读？', [
					{ text: '取消', onPress: () => console.log('cancel') },
					{
					  text: '确认',
					  onPress: () =>{
						//积分不足提示
						if(parseInt(userInfo.integral) < 1){
							Modal.alert('提示','您的积分不够，请充值！', [
								{ text: '取消', onPress: () => console.log('cancel') },
								{ text: '确认', onPress: () => {
									this.props.history.replace('/home/mine/myCoinControl/recharge')
								} },
							  ])
							  return false;
						}else{
							//扣除积分
							Coin.set({
								num:-1,
								remark:'阅读扣除1积分',
								token:userInfo.token,
								uid:userInfo.id,
							}).then((data)=>{
								if(data.state){
									this.setState({
										data:articleData
									});
									this.savePaidArticle(articleData.id);
								}
							})
						}
					  },
					},
				  ])
			}else{
				this.setState({
					data:articleData
				});
			}
		}
		
	
	}
	getData(id){
		let params = {
			id:id
		}
		Article.info(params)
		.then((data)=>{
			if(data.state){
			let articleData = data.data.meta;
				//

			if(this.isPaid(articleData.id)){
				this.setState({
					data:articleData
				});
				return
			}
			//判断是否是收费文章
			if(articleData.is_pay){
				Modal.alert('付费阅读', '此文章为付费文章，扣取1积分阅读？', [
					{ text: '取消', onPress: () => console.log('cancel') },
					{
					  text: '确认',
					  onPress: () =>{
						//积分不足提示
						if(parseInt(userInfo.integral) < 1){
							Modal.alert('提示','您的积分不够，请充值！', [
								{ text: '取消', onPress: () => console.log('cancel') },
								{ text: '确认', onPress: () => {
									this.props.history.replace('/home/mine/myCoinControl/recharge')
								} },
							  ])
							  return false;
						}else{
							//扣除积分
							Coin.set({
								num:-1,
								remark:'阅读扣除1积分',
								token:userInfo.token,
								uid:userInfo.id,
							}).then((data)=>{
								if(data.state){
									this.setState({
										data:articleData
									});
									this.savePaidArticle(articleData.id);
								}
							})
						}
					  },
					},
				  ])
			}else{
				this.setState({
					data:articleData
				});
			}
				//
			}
		})
	}
	savePaidArticle(articleId){
		let paidArticle = '';
		if(localStorage.getItem('paidArticle')){
			paidArticle = localStorage.getItem('paidArticle');
		}
		paidArticle += articleId + ',';
		localStorage.setItem('paidArticle',paidArticle);
	}
	isPaid(articleId){
		if(localStorage.getItem('paidArticle')){
			let tag = false;
			let	paidIds = localStorage.getItem('paidArticle').split(',');
			paidIds.forEach((v)=>{
				if(v==articleId)tag=true
			})
			return tag;
		}else{
			return false
		}
	}
	render(){
		return(<div className='article-wrap'>
			<NavBar
		      mode="light"
		      icon={<Icon type="left" />}
		      onLeftClick={() => {this.context.router.goBack()}}
		    >{this.state.data.title}</NavBar>
		    <div className="content-box article-content">
		    	<div dangerouslySetInnerHTML={{__html:this.state.data.content}}></div>
		    </div>
		</div>)
	}

}
ArticleInfo.contextTypes = {
	router:PropTypes.object,
}



class ArticleList extends React.Component{
	static contextTypes = {
		router:React.PropTypes.object
	}
	constructor(props){
		super(props);
	
		let dataSource = new ListView.DataSource({
		  rowHasChanged: (row1, row2) => row1 !== row2,
		});
		dataSource = dataSource.cloneWithRows([]);
		this.state = {
			dataSource,
			data:[],
			page:1,
			tag:'',
			title:'',
		}
	}
	componentWillMount(){
		this.getData({
			page:1,
			perPage:20,
		},true)
	}
	getData(params,init){
		params.menu_id = this.props.params.type;
		Article.list(params)
		.then((data)=>{
			var ds = this.state.data.concat(data.data.meta);
			if(init){
				ds = data.data.meta;
			}
			if(data){
				this.setState({
					dataSource: this.state.dataSource.cloneWithRows(ds),
					data:ds,
					page:parseInt(data.data.paging.page) + 1
				})
			}
		})
	}
	onEndReached(){
		this.getData({
			page:this.state.page,
			title:this.state.title,
			tag:this.state.tag
		},false)
	}
	onSearch(text){
		this.setState({
			title:text,
		})
		this.getData({
			page:1,
			title:text,
		},true)
	}
	handleCheck(text){
		if(text == '全部'){
			this.setState({
				tag:''
			})
			this.getData({
				page:1,
				perPage:20,
				
			},true)
		}else{
			this.setState({
				tag:text
			})
			this.getData({
				page:1,
				tag:text,
			},true)
		}
	}
	handleClick(data){
		window.sessionStorage.setItem('TEMP_DATA',JSON.stringify(data));
		this.context.router.push(`/home/articleInfo?id=${data.id}`);
	}
	render(){
		function getTitle(type){
			let text = '';
			switch(parseInt(type)){
				case 7:text = '装修百科';break;
				case 8:text = '市场数据';break;
				case 24:text = '精品';break;
				case 23:text = '资讯';break;
			}
			return text;

		}
		function getListHeight(){
			let height = 0;
			switch(parseInt(this.props.params.type)){
				case 7:height = document.documentElement.clientHeight - 230 + 'px';break;
				case 8:height = document.documentElement.clientHeight - 198 + 'px';break;
				case 24:height = document.documentElement.clientHeight - 230 + 'px';break;
				case 23:height = document.documentElement.clientHeight - 198 + 'px';break;
			}
			return height;
			
		}
		return(<div className='article-list-wrap'>
			<div id='article-list-top'>
				<NavBar
				mode="light"
				icon={<Icon type="left" />}
				onLeftClick={() => {this.context.router.replace('/home/index')}}
				>{getTitle(this.props.params.type)}</NavBar>
				<div>
					<SearchBar
					onSubmit={(text)=>{this.onSearch(text)}}
					placeholder="输入文章标题"
					maxLength={16} />
				</div>
				<div>
					<CheckBox type={this.props.params.type} handleCheck={(text)=>{this.handleCheck(text)}} />
				</div>
			</div>
			<div className="article-list">
				<ListView
					ref={el => this.lv = el}
					initialListSize={20}
					dataSource={this.state.dataSource}
					renderRow={(rowData)=><dl onClick={()=>{this.handleClick(rowData)}}>
							<dt>{rowData.title}</dt>
							<dd><FontAwesome name='angle-right' /></dd>
						</dl>
						}
					style={{
						height: getListHeight.bind(this)(),
						overflow: 'auto',
						}}
					onScroll={() => { console.log('scroll'); }}
					scrollEventThrottle={50}
					onEndReached={this.onEndReached.bind(this)}
					onEndReachedThreshold={10}
				/>
			</div>

		</div>)
	}

}
ArticleList.contextTypes = {
	router:PropTypes.object
}
export default ArticleInfo
export {ArticleList}
