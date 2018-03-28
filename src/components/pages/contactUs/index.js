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
		return(<div className='contact-us wrap-box'>
			<NavBar mode="light" icon={<Icon type="left" />} onLeftClick={() => {console.log(this.context.router);this.context.router.goBack()}}>客服</NavBar>
			<div>
				<div className='contact-us-img'>
					<ImgInit src={require("./img/kfmm.jpg")} />
				</div>
				<div className='contact-us-text'>
					<dl>
	            		<dt>客服热线</dt>
	            		<dd><a href="tel:0832-82336541">15908259701</a></dd>
            		</dl>	
            		<dl>
	            		<dt>邮箱</dt>
	            		<dd>752681223@qq.com</dd>
            		</dl>
            		<dl>
	            		<dt>微信</dt>
	            		<dd>15908259701</dd>
            		</dl>
            		<dl>
	            		<dt>QQ</dt>
	            		<dd>752681223</dd>
            		</dl>
            		<dl>
	            		<dt>QQ群</dt>
	            		<dd>123345</dd>
            		</dl>
            		<div className='contact-us-qr'>
            			<p>扫码关注公众号</p>
            			<ImgInit src={require('./img/qrcode.jpg')} />
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