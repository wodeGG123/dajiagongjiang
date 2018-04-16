import React from 'react'
import PropTypes from 'prop-types'
import { NavBar, Icon, Carousel, Button,  SearchBar, Picker, Tabs, Toast, ListView } from 'antd-mobile';
import {Link} from 'react-router'
import CheckBox from 'rootsrc/components/common/checkbox/index.js'
import questionData from './questionData'
import Article from 'rootsrc/request/article'
import Common from 'rootsrc/request/common'

var FontAwesome = require('react-fontawesome');
require('./style.scss')

class Main extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			data: questionData
		}
	}
	componentWillMount(){
	}
	onDataChange(data){
		let datas = this.state.data;
		datas[data.index] = data;
		this.setState({
			data:datas
		},()=>{

		})
	}
	handleSubmit(){

		if(isEmpty(this.state.data)){
			Toast.info('请全部做完后提交，之后有惊喜！')	
		}else{
			Common.questionAdd({option:JSON.stringify(this.state.data)})
			.then((data)=>{
				if(data){
					Toast.info('提交成功，谢谢您的支持！');
					this.context.router.replace('/home/answer');
				}
			})
			
		}

		//判断是否有没填的选项
		function isEmpty(list){
			let empty = false;
			list.forEach((obj,index)=>{
				let _items = JSON.stringify(obj.items);
				if(_items.indexOf('true') == -1){
					empty = true;
				}
			})
			return empty;
		}

	}
	render(){
		let {data} = this.state;
		return(<div className='question-wrap'>
			<NavBar mode="light" icon={<Icon type="left" />} onLeftClick={() => {this.context.router.goBack()}}>市场数据</NavBar>
			
			 <Tabs tabs={[
				{title:'问卷调查'},
				{title:'市场数据'},
			 	]}
		      initialPage={0}
		      onChange={(tab, index) => { console.log('onChange', index, tab); }}
		      onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
		    >
		      <div>
		        <div className='question-items'>
				{data.map((obj,index)=>{
					if(obj.type == 1){
						return (<QItemCheck key={index} getVal={(data)=>{this.onDataChange(data)}} data={{...obj,index}} />)
					}else{
						return (<QItemCheckM key={index} getVal={(data)=>{this.onDataChange(data)}} data={{...obj,index}} />)
					}
				})}
				</div>
				<div className='question-submit'>
					<Button type="primary"  onClick={()=>{this.handleSubmit()}}>提交</Button>
				</div>
		      </div>
			  
		      <div>
			  <ArticleList {...this.props} />
		      </div>
		    </Tabs>

			
		</div>)
	}

}
Main.contextTypes = {	
  store: PropTypes.object,
  router: PropTypes.object
};
Main.defaultProps = {
  
};


class QItemCheck extends React.Component{
	static defaultProps = {
		data:{
			title:'您的性别',
			type:1,
			items:[{
				title:'男',
				check:false,
			},
			{
				title:'女',
				check:false,
			},
			]
		}
	}
	constructor(props){
		super(props);
		this.state = {
			data:this.props.data,
			itemId:-1,
		}
	}
	handleClick(index){
		let data = this.state.data,
		_itemId = this.state.itemId;

		if(_itemId != -1){
			data.items[_itemId].check = false
		}
		data.items[index].check = true;
		this.setState({
			data,
			itemId: index,
		},()=>{
			this.props.getVal(this.state.data);
		})
	}
	render(){
		return(<dl>
					<dt>{this.state.data.index+1}. {this.state.data.title}</dt>
					{
						this.state.data.items.map((obj,index)=>{
							return (<dd key={index} onClick={()=>{this.handleClick(index)}}>
							<i className={obj.check?'check':''}></i>
							<span>{obj.title}</span>
							</dd>)
						})
					}
				</dl>)
	}
}


class QItemCheckM extends React.Component{
	static defaultProps = {
		data:{
			title:'您的性别',
			type:1,
			items:[{
				title:'男',
				check:false,
			},
			{
				title:'女',
				check:false,
			},]
		}
	}
	constructor(props){
		super(props);
		this.state = {
			data:this.props.data,
		}
	}
	handleClick(index){
		let data = this.state.data;
		data.items[index].check = !data.items[index].check;
		this.setState({
			data,
		},()=>{
			this.props.getVal(this.state.data);
		})
	}
	render(){
		return(<dl>
					<dt>{this.state.data.index+1}. {this.state.data.title}【多选】</dt>
					{
						this.state.data.items.map((obj,index)=>{
							return (<dd key={index} onClick={()=>{this.handleClick(index)}}>
							<i className={obj.check?'check':''}></i>
							<span>{obj.title}</span>
							</dd>)
						})
					}
				</dl>)
	}
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
		},true)
	}
	getData(params,init){
		params.menu_id = 8;
		Article.list(params)
		.then((data)=>{
			console.log(data);
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
		console.log('reachend')
		this.getData({
			page:this.state.page,
			title:this.state.title,
			tag:this.state.tag
		},false)
	}
	onSearch(text){
		console.log(text)
		this.setState({
			title:text,
		})
		this.getData({
			page:1,
			title:text,
		},true)
	}
	handleCheck(text){
		console.log(text)
		if(text == '全部'){
			this.setState({
				tag:''
			})
			this.getData({
				page:1,
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
		this.context.router.push('/home/articleInfo');
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
		return(<div className='article-list-wrap'>
		    <div>
				<SearchBar
				onSubmit={(text)=>{this.onSearch(text)}}
				placeholder="输入文章标题"
				maxLength={16} />
			</div>
		    <div>
		    	<CheckBox handleCheck={(text)=>{this.handleCheck(text)}} />
		    </div>
			<div className="article-list">
				<ListView
					ref={el => this.lv = el}
					initialListSize={10}
					dataSource={this.state.dataSource}
					renderRow={(rowData)=><dl onClick={()=>{this.handleClick(rowData)}}>
							<dt>{rowData.title}</dt>
							<dd><FontAwesome name='angle-right' /></dd>
						</dl>
						}
					style={{
						height: document.documentElement.clientHeight - 271 + 'px',
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
ArticleList.contextTypes = {
	router:PropTypes.object
}
export default Main