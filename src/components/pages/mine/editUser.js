import React from 'react'
import PropTypes from 'prop-types'
import { NavBar, Icon, WingBlank, Button, Modal, ImagePicker, SegmentedControl, Picker, DatePicker } from 'antd-mobile';
import Common from '../../../request/common';
import Member from '../../../request/member';
import {Link} from 'react-router'
import ImgInit from 'rootsrc/components/common/imgInit/index.js'

const alert = Modal.alert;
const prompt = Modal.prompt;
var moment = require('moment');
var FontAwesome = require('react-fontawesome');

require('./style.scss');

class EiditUser extends React.Component{
	constructor(props){
		super(props);
		this.state={
			userInfo:store.getState().userInfo,
			userInfoDetail:store.getState().userInfoDetail,
			nickName:store.getState().userInfoDetail.name,
			email:store.getState().userInfoDetail.email,
			mobile:store.getState().userInfoDetail.mobile,
		}
	}
	//设置图片
	setImg(imgs){
		Member.setThum({
			avatar:imgs[0],
			token:this.state.userInfo.token,
			uid:this.state.userInfo.id,
			_method:'PUT',
		})
		.then((data)=>{
			this.updateUserInfo()
		})
	}
	setNickName(value){
		Member.setNickName({
			nickname:value,
			token:this.state.userInfo.token,
			uid:this.state.userInfo.id,
			_method:'PUT',
		})
		.then((data)=>{
			this.updateUserInfo()
		})
		this.setState({nickName:value})
	}
	updateUserInfo(){
		Member.info(this.state.userInfo.id,this.state.userInfo.token)
	}
	render(){
		
		return(<div className='user-edit'>

            <NavBar icon={<Icon type="left" />} mode="light"  onLeftClick={() => {this.context.router.goBack()}}>编辑资料</NavBar>
		    	<div className='user-top'>
		    	<div>
		    		<p>设置头像</p>
		    		<ImagePickerExample setImg={(imgs)=>{this.setImg(imgs)}} length={1} />
		    	</div>
		    		
		    </div>
		    <div className='user-mid'>
		    	<dl onClick={() => prompt('', '', [
				      { text: '取消' },
				      { text: '确认', onPress: value => this.setNickName(value)},
				    ], 'default',this.state.nickName)}>
		    		<dt><span>昵称</span></dt>
		    		<dd><font>{this.state.nickName}</font><FontAwesome name='angle-right' /></dd>
		    	</dl>
		    	{/* <dl onClick={() => prompt('', '', [
				      { text: '取消' },
				      { text: '确认', onPress: value => this.setState({email:value}) },
				    ], 'default',this.state.email)}>
		    		<dt><span>邮箱</span></dt>
		    		<dd><font>{this.state.email}</font><FontAwesome name='angle-right' /></dd>
		    	</dl> */}
		    	<dl>
		    		<dt><span>电话</span></dt>
		    		<dd><font>{this.state.mobile}</font></dd>
		    	</dl>
		    	
		    </div>
		</div>)
	}

}
EiditUser.contextTypes = {
  router: PropTypes.object
};

			class ImagePickerExample extends React.Component {
				state = {
					files: [],
				}
				onChange = (files, type, index) => {
					console.log(files, type, index);
				
					if(type == 'add'){
							Common.upload(files[0].file)
							.then((data)=>{
								console.log(data)
								files[files.length-1].img = data.data.src;
								var imgs = files.map((obj,index)=>{
									return obj.img
								})
								this.props.setImg(imgs)
								this.setState({
									files,
								});
							})
					}else if(type == 'remove'){
							var imgs = files.map((obj,index)=>{
								return obj.img
							})
							this.props.setImg(imgs)
							this.setState({
								files,
							});
					}
				
				}
				render() {
					const { files } = this.state;
				 
					return (<ImagePicker
								files={files}
								onChange={this.onChange}
								onImageClick={(index, fs) => console.log(index, fs)}
								selectable={files.length < this.props.length}
								multiple={false}
							/>
					);
				}
			}

export default EiditUser