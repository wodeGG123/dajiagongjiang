import React from 'react'
import PropTypes from 'prop-types'
import { NavBar, Icon, Toast, WingBlank, Button, Modal, ImagePicker, SegmentedControl, Picker, DatePicker } from 'antd-mobile';
import { createForm } from 'rc-form';
import Common from '../../../request/common';
import Member from '../../../request/member';
import {Link} from 'react-router'
import address from 'rootstatics/json/sc.js'

const alert = Modal.alert;
const prompt = Modal.prompt;


var moment = require('moment');

import ImgInit from 'rootsrc/components/common/imgInit/index.js'
var FontAwesome = require('react-fontawesome');

require('./style.scss');


class ApplyForIdentityForm extends React.Component{
	static contextTypes = {
		router:React.PropTypes.object
	}
	constructor(props){
		super(props);
		this.state={
			sex:1,
			date:new Date(),
			address:['四川省','内江市','威远县'],
		}
	}
	//设置图片
	setImg(imgs){
		this.props.form.setFieldsValue({
			id_photo:imgs
		})
	}
	handleSubmit(){

		alert('确认提交？', '', [
	      { text: '取消', onPress: () => console.log('cancel') },
	      { text: '确定', onPress: () => {
					//设置获取不到的参数
					this.props.form.setFieldsValue({
						birthday:moment(this.state.date).format('YYYY-MM-DD'),
						sex:this.state.sex,
						address:this.state.address,
					})
					//表单校验
					this.props.form.validateFields((error, value) => {

						if(!error){

							var userInfo = store.getState().userInfo
							Member.realAuth({
								address:value.address.join('-'),
								birthday:value.birthday,
								id_card:value.id_card,
								id_photo:{
									above:value.id_photo[0],
									below:value.id_photo[1]
								},
								real_name:value.real_name,
								sex:value.sex,
								token:userInfo.token,
								uid:userInfo.id,
							})
							.then((data)=>{
								if(data){
									Toast.info('提交成功！')
									this.context.router.replace('/home/mine/index');
								}
							})
						}else{
							Toast.info('请完善所有信息！')
						}
			
					});

					
				
				} },
	    ])
	}
	render(){
		
		var {getFieldProps,getFieldError} = this.props.form

		return(<div className='apply-for-identity'>

        <NavBar icon={<Icon type="left" />} mode="light" onLeftClick={() => {this.context.router.goBack()}}>实名认证</NavBar>
		     <div className='user-top'>
		    	<div>
		    		<p>身份证<span>（需要上传身份证正反面）</span></p>
						<input 
						{...getFieldProps('id_photo',{
							initialValue:[],
							rules:[
								{required:true,type:'array',len:2}
							]							
						})}
						type="hidden"/>
		    		<ImagePickerExample setImg={(imgs)=>{this.setImg(imgs)}} length={2} />
		    	</div>
		    </div>

		    <div className='user-mid'>
		    	<dl>
		    		<dt><span>姓名</span></dt>
						<dd><input type="text"
						 {...getFieldProps('real_name',{
							initialValue:'',
							rules:[{required:true}]							
							})}	
						 placeholder='请输入姓名'
						 /></dd>
		    	</dl>
		    	<dl>
		    		<dt><span>身份证号</span></dt>
						<dd><input
						{...getFieldProps('id_card',{
							initialValue:'',
							rules:[{required:true}]							
							})}	
						 type="text" placeholder='请输入身份证号'/></dd>
		    	</dl>
		    	<DatePicker						
		          mode="date"
		          title="出生日期"
		          extra="Optional"
		          minDate={new Date("1900-01-01")}
		          maxDate={new Date()}
		          value={this.state.date}
		          onChange={date => this.setState({ date })}
		        >						
		          <dl>
		    		<dt>
							<span>出生日期</span>
								<input
								{...getFieldProps('birthday',{
									initialValue:'',
									rules:[{required:true}]							
									})}	
								type="hidden"/>
							</dt>
		    		<dd><font>{moment(this.state.date).format('YYYY年MM月DD日')}</font><FontAwesome name='angle-right' /></dd>
		    	  </dl>
					
		        </DatePicker>
						
						<Picker							
						 value={[this.state.sex]}
						 onChange={value => this.setState({sex:value[0]})} data={[{value:1,label:'男'},{value:2,label:'女'},]} cols={1} className="forss">
								
								<dl>
			    		<dt>
								<span>性别</span>
								<input 
									{...getFieldProps('sex',{
										initialValue:'1',
										rules:[{required:true}]							
										})}	
								type="hidden"/>
								</dt>
			    		<dd><font>{this.state.sex==1?'男':'女'}</font><FontAwesome name='angle-right' /></dd>
		    		</dl>
						
		        </Picker>
						
		         <Picker
		        	  cols={3}
			          data={address}     
			          value={this.state.address}
			          onChange={v => {
									this.setState({
										address:v
									})
								}}
			          onOk={() => {}}
			          onDismiss={() => {}}
			          cascade={true}
			        >
							
		        <dl>
		    		<dt>
							<span>地址</span>
								<input 
							{...getFieldProps('address',{
								initialValue:'',
								rules:[{required:true}]							
							})}	
							type="hidden"/>
							</dt>
		    		<dd><font>{this.state.address.join('-')}</font><FontAwesome name='angle-right' /></dd>
		    	</dl>
				
        	   </Picker>
		    </div>
		    <div className='apply-submit'>
		    	<Button onClick={()=>{this.handleSubmit()}} type='primary'>提交申请</Button>
		    </div>		    
		</div>)
	}

}

class ImagePickerExample extends React.Component {
  state = {
		files: [],
  }
  onChange = (files, type, index) => {

	
		if(type == 'add'){
				Common.upload(files[0].file)
				.then((data)=>{
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

var ApplyForIdentity = createForm()(ApplyForIdentityForm)

export default ApplyForIdentity