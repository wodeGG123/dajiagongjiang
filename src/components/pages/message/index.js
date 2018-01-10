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
		return(<div className='message-wrap'>
			<NavBar icon={<Icon type="left" />} onLeftClick={() => {this.context.router.goBack()}} mode="light">消息</NavBar>
		    <div className="content-box">
		    	<dl>
		    		<dt>消息</dt>
		    		<dd>
		    			<h4>标题</h4>
		    			<p>内容内容内容</p>
		    			<span>2017年12月20日22:51:26</span>
		    		</dd>
		    	</dl>
		    	<dl>
		    		<dt>消息</dt>
		    		<dd>
		    			<h4>标题</h4>
		    			<p>内容内容内容</p>
		    			<span>2017年12月20日22:51:26</span>
		    		</dd>
		    	</dl>
		    	<dl>
		    		<dt>消息</dt>
		    		<dd>
		    			<h4>标题</h4>
		    			<p>内容内容内容</p>
		    			<span>2017年12月20日22:51:26</span>
		    		</dd>
		    	</dl>
		    	<dl>
		    		<dt>消息</dt>
		    		<dd>
		    			<h4>标题</h4>
		    			<p>内容内容内容</p>
		    			<span>2017年12月20日22:51:26</span>
		    		</dd>
		    	</dl>
		    	<dl>
		    		<dt>消息</dt>
		    		<dd>
		    			<h4>标题</h4>
		    			<p>内容内容内容</p>
		    			<span>2017年12月20日22:51:26</span>
		    		</dd>
		    	</dl>
		    	<dl>
		    		<dt>消息</dt>
		    		<dd>
		    			<h4>标题</h4>
		    			<p>内容内容内容</p>
		    			<span>2017年12月20日22:51:26</span>
		    		</dd>
		    	</dl>
		    	<dl>
		    		<dt>消息</dt>
		    		<dd>
		    			<h4>标题</h4>
		    			<p>内容内容内容</p>
		    			<span>2017年12月20日22:51:26</span>
		    		</dd>
		    	</dl>
		    	<dl>
		    		<dt>消息</dt>
		    		<dd>
		    			<h4>标题</h4>
		    			<p>内容内容内容</p>
		    			<span>2017年12月20日22:51:26</span>
		    		</dd>
		    	</dl>
		    	<dl>
		    		<dt>消息</dt>
		    		<dd>
		    			<h4>标题</h4>
		    			<p>内容内容内容</p>
		    			<span>2017年12月20日22:51:26</span>
		    		</dd>
		    	</dl>
		    	<dl>
		    		<dt>消息</dt>
		    		<dd>
		    			<h4>标题</h4>
		    			<p>内容内容内容</p>
		    			<span>2017年12月20日22:51:26</span>
		    		</dd>
		    	</dl>
		    	<dl>
		    		<dt>消息</dt>
		    		<dd>
		    			<h4>标题</h4>
		    			<p>内容内容内容</p>
		    			<span>2017年12月20日22:51:26</span>
		    		</dd>
		    	</dl>
		    	<dl>
		    		<dt>消息</dt>
		    		<dd>
		    			<h4>标题</h4>
		    			<p>内容内容内容</p>
		    			<span>2017年12月20日22:51:26</span>
		    		</dd>
		    	</dl>
		    </div>
		</div>)
	}

}
ArticleInfo.contextTypes = {
	router:PropTypes.object
}
export default ArticleInfo