import React from 'react'
import PropTypes from 'prop-types'

import { NavBar, Icon, SearchBar, ListView } from 'antd-mobile';
import {Link} from 'react-router'
import CheckBox from 'rootsrc/components/common/checkbox/index.js'
import Article from '../../../request/article';

var FontAwesome = require('react-fontawesome');

require('./style.scss');

let _html = '<p style="margin-top: 0px; margin-bottom: 0px; padding: 14px 0px 9px; line-height: 32px; text-indent: 2em; color: rgb(51, 51, 51); font-family: 微软雅黑, Verdana, Arial, Helvetica, sans-serif; white-space: normal;">    爱情最好的归宿就是给她一个温暖<a href="http://www.17house.com/biaoqian/biaoqian_69668/" style="text-decoration-line: none; color: rgb(60, 101, 152);">舒适</a>的家，这是一套103平米的<a href="http://tuku.17house.com/xiaoguotu/16.html" style="text-decoration-line: none; color: rgb(60, 101, 152);">现代</a><a href="http://tuku.17house.com/xiaoguotu/29.html" style="text-decoration-line: none; color: rgb(60, 101, 152);">美式</a><a href="http://www.17house.com/biaoqian/biaoqian_69451/" style="text-decoration-line: none; color: rgb(60, 101, 152);">婚房</a>，它有一个很浪漫的名字，“相悦”，今生修缘，与子相悦，执子之手，与子偕老。愿他们可以幸福到白头，这样的婚房让人对未来的生活也充满期待。</p><p style="margin-top: 0px; margin-bottom: 0px; padding: 14px 0px 9px; line-height: 32px; text-indent: 2em; color: rgb(51, 51, 51); font-family: 微软雅黑, Verdana, Arial, Helvetica, sans-serif; white-space: normal; text-align: center;"><img src="http://static-news.17house.com/web/news/201712/21/201712211732243478.jpg!w630"/></p><p style="margin-top: 0px; margin-bottom: 0px; padding: 14px 0px 9px; line-height: 32px; text-indent: 2em; color: rgb(51, 51, 51); font-family: 微软雅黑, Verdana, Arial, Helvetica, sans-serif; white-space: normal;"><a href="http://tuku.17house.com/xiaoguotu/72.html" style="text-decoration-line: none; color: rgb(60, 101, 152);">红色</a>的沙发<a href="http://tuku.17house.com/xiaoguotu/59.html" style="text-decoration-line: none; color: rgb(60, 101, 152);">背景墙</a>宣染了一种喜庆的气氛，符合中国婚庆的习俗。</p><p style="margin-top: 0px; margin-bottom: 0px; padding: 14px 0px 9px; line-height: 32px; text-indent: 2em; color: rgb(51, 51, 51); font-family: 微软雅黑, Verdana, Arial, Helvetica, sans-serif; white-space: normal; text-align: center;"><img src="http://static-news.17house.com/web/news/201712/21/201712211732285985.jpg!w630"/></p><p style="margin-top: 0px; margin-bottom: 0px; padding: 14px 0px 9px; line-height: 32px; text-indent: 2em; color: rgb(51, 51, 51); font-family: 微软雅黑, Verdana, Arial, Helvetica, sans-serif; white-space: normal;">    暗红色相较红色没那么耀眼，虽然大面积的使用，但并没有感受到俗气，与<a href="http://tuku.17house.com/xiaoguotu/17.html" style="text-decoration-line: none; color: rgb(60, 101, 152);">简约</a>的<a href="http://www.17house.com/biaoqian/biaoqian_70593/" style="text-decoration-line: none; color: rgb(60, 101, 152);">装饰画</a>，及黑色的家具<a href="http://www.17house.com/news/hots-1877/" style="text-decoration-line: none; color: rgb(60, 101, 152);">搭配</a>，反而更显品位与气质。</p><p style="margin-top: 0px; margin-bottom: 0px; padding: 14px 0px 9px; line-height: 32px; text-indent: 2em; color: rgb(51, 51, 51); font-family: 微软雅黑, Verdana, Arial, Helvetica, sans-serif; white-space: normal; text-align: center;"><img src="http://static-news.17house.com/web/news/201712/21/201712211732314660.jpg!w630"/></p><p style="margin-top: 0px; margin-bottom: 0px; padding: 14px 0px 9px; line-height: 32px; text-indent: 2em; color: rgb(51, 51, 51); font-family: 微软雅黑, Verdana, Arial, Helvetica, sans-serif; white-space: normal;">    古铜色的<a href="http://www.17house.com/biaoqian/biaoqian_65037/" style="text-decoration-line: none; color: rgb(60, 101, 152);">落地灯</a>简约且有金属的质感。</p><p style="margin-top: 0px; margin-bottom: 0px; padding: 14px 0px 9px; line-height: 32px; text-indent: 2em; color: rgb(51, 51, 51); font-family: 微软雅黑, Verdana, Arial, Helvetica, sans-serif; white-space: normal; text-align: center;"><img src="http://static-news.17house.com/web/news/201712/21/201712211732389357.jpg!w630"/></p><p style="margin-top: 0px; margin-bottom: 0px; padding: 14px 0px 9px; line-height: 32px; text-indent: 2em; color: rgb(51, 51, 51); font-family: 微软雅黑, Verdana, Arial, Helvetica, sans-serif; white-space: normal;"><a href="http://www.17house.com/biaoqian/biaoqian_54725/" style="text-decoration-line: none; color: rgb(60, 101, 152);">电视墙</a>强纸配铆钉，更有美式的味道。</p><p style="margin-top: 0px; margin-bottom: 0px; padding: 14px 0px 9px; line-height: 32px; text-indent: 2em; color: rgb(51, 51, 51); font-family: 微软雅黑, Verdana, Arial, Helvetica, sans-serif; white-space: normal; text-align: center;"><img src="http://static-news.17house.com/web/news/201712/21/201712211732392451.jpg!w630"/></p><p style="margin-top: 0px; margin-bottom: 0px; padding: 14px 0px 9px; line-height: 32px; text-indent: 2em; color: rgb(51, 51, 51); font-family: 微软雅黑, Verdana, Arial, Helvetica, sans-serif; white-space: normal;">    进门左边就是餐厅，虽然没有<a href="http://www.17house.com/biaoqian/biaoqian_60099/" style="text-decoration-line: none; color: rgb(60, 101, 152);">玄关柜</a>，但靠墙打造的柜子也很<a href="http://www.17house.com/biaoqian/biaoqian_69667/" style="text-decoration-line: none; color: rgb(60, 101, 152);">实用</a>，中间镂空的地方放些小物件，下面放鞋子，也是足够的。</p><p style="margin-top: 0px; margin-bottom: 0px; padding: 14px 0px 9px; line-height: 32px; text-indent: 2em; color: rgb(51, 51, 51); font-family: 微软雅黑, Verdana, Arial, Helvetica, sans-serif; white-space: normal; text-align: center;"><img src="http://static-news.17house.com/web/news/201712/21/201712211732401960.jpg!w630"/></p><p style="margin-top: 0px; margin-bottom: 0px; padding: 14px 0px 9px; line-height: 32px; text-indent: 2em; color: rgb(51, 51, 51); font-family: 微软雅黑, Verdana, Arial, Helvetica, sans-serif; white-space: normal;">    沙发红色背景墙一直延伸到门口，搭配怀旧的斗柜，及一幅很有艺术感的画作，这样的玄关实用又美观。</p><p style="margin-top: 0px; margin-bottom: 0px; padding: 14px 0px 9px; line-height: 32px; text-indent: 2em; color: rgb(51, 51, 51); font-family: 微软雅黑, Verdana, Arial, Helvetica, sans-serif; white-space: normal; text-align: center;"><img src="http://static-news.17house.com/web/news/201712/21/201712211732422382.jpg!w630"/></p><p style="margin-top: 0px; margin-bottom: 0px; padding: 14px 0px 9px; line-height: 32px; text-indent: 2em; color: rgb(51, 51, 51); font-family: 微软雅黑, Verdana, Arial, Helvetica, sans-serif; white-space: normal;"><a href="http://www.17house.com/news/hots-5340/" style="text-decoration-line: none; color: rgb(60, 101, 152);">主卧</a>简单纯美，优雅的灰色床头，纯洁的<a href="http://www.17house.com/biaoqian/biaoqian_64618/" style="text-decoration-line: none; color: rgb(60, 101, 152);">床上用品</a>，精致有质感的<a href="http://tuku.17house.com/xiaoguotu/55.html" style="text-decoration-line: none; color: rgb(60, 101, 152);">灯具</a>，一切都是精心准备的。</p><p style="margin-top: 0px; margin-bottom: 0px; padding: 14px 0px 9px; line-height: 32px; text-indent: 2em; color: rgb(51, 51, 51); font-family: 微软雅黑, Verdana, Arial, Helvetica, sans-serif; white-space: normal; text-align: center;"><img src="http://static-news.17house.com/web/news/201712/21/201712211732438815.jpg!w630"/></p><p style="margin-top: 0px; margin-bottom: 0px; padding: 14px 0px 9px; line-height: 32px; text-indent: 2em; color: rgb(51, 51, 51); font-family: 微软雅黑, Verdana, Arial, Helvetica, sans-serif; white-space: normal;">    次卧是为父母准备的，家具颜色较深沉，搭配清新的床品、灯具、<a href="http://www.17house.com/biaoqian/biaoqian_318/" style="text-decoration-line: none; color: rgb(60, 101, 152);">抱枕</a>、窗帘，自然优雅。</p><p style="margin-top: 0px; margin-bottom: 0px; padding: 14px 0px 9px; line-height: 32px; text-indent: 2em; color: rgb(51, 51, 51); font-family: 微软雅黑, Verdana, Arial, Helvetica, sans-serif; white-space: normal; text-align: center;"><img src="http://static-news.17house.com/web/news/201712/21/201712211732449504.jpg!w630"/></p><p style="margin-top: 0px; margin-bottom: 0px; padding: 14px 0px 9px; line-height: 32px; text-indent: 2em; color: rgb(51, 51, 51); font-family: 微软雅黑, Verdana, Arial, Helvetica, sans-serif; white-space: normal;">    宝<a href="http://tuku.17house.com/xiaoguotu/70.html" style="text-decoration-line: none; color: rgb(60, 101, 152);">蓝色</a>的沙发、孔雀蓝色的抱枕，还有灰蓝色的窗帘，不同层次的蓝色的使用，高贵年的气质，也很有层次感。</p><p style="margin-top: 0px; margin-bottom: 0px; padding: 14px 0px 9px; line-height: 32px; text-indent: 2em; color: rgb(51, 51, 51); font-family: 微软雅黑, Verdana, Arial, Helvetica, sans-serif; white-space: normal; text-align: center;"><img src="http://static-news.17house.com/web/news/201712/21/201712211732468499.jpg!w630"/></p><p style="margin-top: 0px; margin-bottom: 0px; padding: 14px 0px 9px; line-height: 32px; text-indent: 2em; color: rgb(51, 51, 51); font-family: 微软雅黑, Verdana, Arial, Helvetica, sans-serif; white-space: normal;">    灰蓝色的橱柜使厨房颜值倍增，下厨也能拥有好心情。</p><p><br/></p>'

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
		let data = JSON.parse(window.sessionStorage.getItem('TEMP_DATA'));
		if(data){
			this.setState({
				data
			})
		}
	}
	render(){
		return(<div className='article-wrap'>
			<NavBar
		      mode="light"
		      icon={<Icon type="left" />}
		      onLeftClick={() => {console.log(this.context.router);this.context.router.goBack()}}
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
		},true)
	}
	getData(params,init){
		params.menu_id = this.props.params.type;
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
						height: document.documentElement.clientHeight - 229 + 'px',
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
export default ArticleInfo
export {ArticleList}
