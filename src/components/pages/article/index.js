import React from 'react'
import PropTypes from 'prop-types'

import { NavBar, Icon } from 'antd-mobile';
import {Link} from 'react-router'

require('./style.scss');

class ArticleInfo extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return(<div className='article-wrap'>
			<NavBar
		      mode="light"
		      icon={<Icon type="left" />}
		      onLeftClick={() => {console.log(this.context.router)}}
		    >文章标题</NavBar>
		    <div className="content-box article-content">
123123
		    </div>
		</div>)
	}

}
ArticleInfo.contextTypes = {
	router:PropTypes.object
}
export default ArticleInfo