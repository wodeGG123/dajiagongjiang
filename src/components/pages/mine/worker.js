// ApplyForWorker组件使用了三层组件嵌套:第一层(ApplyForWorker)、第二层(MakeOffers)、第三层(Project)



import React from 'react'
import PropTypes from 'prop-types'
import { NavBar, Icon, WingBlank, Button, Modal, ImagePicker, SegmentedControl, Picker, DatePicker, Toast } from 'antd-mobile';
import {Link} from 'react-router'
import ImgInit from 'rootsrc/components/common/imgInit/index.js'
import { createForm } from 'rc-form';
import Common from '../../../request/common';
import address from 'rootstatics/json/areas.js'
import Member from '../../../request/member';
import Worker from '../../../request/worker';
import API from '../../../request/api';
import _ from 'lodash'

const alert = Modal.alert;
const prompt = Modal.prompt;
var moment = require('moment');
var FontAwesome = require('react-fontawesome');

require('./style.scss');

class WorkerManagement extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			userInfo:store.getState().userInfo,
			userInfoDetail:store.getState().userInfoDetail,
			busy:0,
			collocation:0
		}
	}
	componentWillMount(){
		let userInfoDetail = this.state.userInfoDetail;
		this.setState({
			busy:userInfoDetail.is_busy,
			collocation:userInfoDetail.is_hosting,
		})
	}
	onBusyChange(value){
		Worker.busy({
			is_busy:value,
			token:this.state.userInfo.token,
			uid:this.state.userInfo.id,
		}).then((data)=>{
			console.log(data)
		})
		this.setState({busy:value[0]})
	}
	onCollocationChange(value){
		Worker.collocation({
			is_hosting:value,
			token:this.state.userInfo.token,
			uid:this.state.userInfo.id,
		}).then((data)=>{
			console.log(data)
		})
		this.setState({collocation:value[0]})
	}
	render(){
		return(<div className='worker-management'>
				<NavBar icon={<Icon type="left" />} mode="light" onLeftClick={() => {this.context.router.goBack()}}>工匠管理</NavBar>	
				 <div className='user-top'>
		    	
		    		<div  className='user-head-img'>
					<ImgInit src={this.state.userInfoDetail?API.DOMAIN.substr(0,API.DOMAIN.length-1)+this.state.userInfoDetail.avatar:''}/>	
		    		</div>
		    		<div className='user-text'>
		    			<h3>{this.state.userInfoDetail.user_info.real_name}</h3>
		    			{/* <p>{this.state.userInfoDetail.artisan_level}</p> */}
		    		</div>
		    </div>


				<div className='user-mid'>
					<div>
				    	<dl>
				    		<dt><span>技能等级</span></dt>
				    		<dd>{this.state.userInfoDetail.artisan_level}</dd>
				    	</dl>
					</div>
			    	<Picker value={[this.state.busy]} onChange={value => {this.onBusyChange(value)}} data={[{value:1,label:'忙碌'},{value:0,label:'空闲'},]} cols={1} className="forss">
			          	<dl>
				    		<dt><span>是否开启忙碌</span></dt>
				    		<dd><font>{this.state.busy?'忙碌':'空闲'}</font></dd>
			    		</dl>
		        	</Picker>
		        	<Picker value={[this.state.busy]} onChange={value => {this.onCollocationChange(value)}} data={[{value:1,label:'托管'},{value:0,label:'自主'},]} cols={1} className="forss">
			          	<dl>
				    		<dt><span>是否开启托管</span></dt>
				    		<dd><font>{this.state.collocation?'托管':'自主'}</font></dd>
			    		</dl>
		        	</Picker>
		        	<a href='https://www.chinalife.com.cn/zhuzhan/index/'>
				    	<dl>
				    		<dt><span>保险</span></dt>
				    		<dd><FontAwesome name='angle-right' /></dd>
				    	</dl>
			    	</a>
		        	<Link to='/home/mine/applyForWorker'>
				    	<dl>
				    		<dt><span>重新申请</span></dt>
				    		<dd><FontAwesome name='angle-right' /></dd>
				    	</dl>
			    	</Link>
		        
			    	{/* <Link to='/home/order/slefMake'>
				    	<dl>
				    		<dt><span>自主下单</span></dt>
				    		<dd><FontAwesome name='angle-right' /></dd>
				    	</dl>
			    	</Link> */}
		    	</div>

		</div>)
	}

}
WorkerManagement.contextTypes = {
  router: PropTypes.object
};

class ApplyForWorkerForm extends React.Component{
	static contextTypes = {
		router:React.PropTypes.object
	}
	constructor(props){
		super(props);
		this.state={
			jobList:[],
			address:['四川省','内江市','威远县'],
			workAddress:['四川省','内江市','威远县'],
			sex:1,
			year:1,
			date:new Date('2017-01-01'),
			job:[],
			makeOffers:false,
			offers:[],
			oldData:false,
		}
	}
	handleConfirm(){
		let userInfo = store.getState().userInfo;
		alert('确认提交？', '', [
	      { text: '取消', onPress: () => console.log('cancel') },
	      { text: '确定', onPress: () => {
			  //设置获取不到的参数
			  this.props.form.setFieldsValue({
				birthday:moment(this.state.date).format('YYYY-MM-DD'),
				artisan_work_type:this.state.job.join('-'),
				sex:this.state.sex,
				artisan_work_year:this.state.year,
				address:this.state.address.join('-'),
				artisan_address:this.state.workAddress.join('-'),
				artisan_offer:this.state.offers,
			  })
			  //让资质证书和项目展示为选填
			  let a = this.props.form.getFieldsValue(['artisan_certificate','artisan_project']);
			  if(a.artisan_certificate.length == 0){
				this.props.form.setFieldsValue({
					artisan_certificate:['false']
				})
			 }
			 if(a.artisan_project.length == 0){
				this.props.form.setFieldsValue({
					artisan_project:['false']
				})
			 }
			  //确定提交
			  this.props.form.validateFields((error, value)=>{
				 
				 if(!error){
					Member.realWorker({
						...value,
						artisan_offer:JSON.stringify(value.artisan_offer),
						artisan_offer_type:'dd',
						uid:userInfo.id,
						token:userInfo.token,
					})
					.then((data)=>{
						console.log(data)
						if(data.state){
							Toast.info('提交成功！');
							this.context.router.replace('/home/mine/index');
						}
					})
				 }else{
					console.log(error)
					Toast.info('请完善所有信息！');
				 }

			  })	

		  } },
	    ])
	}
	dealMakeOffers(action){
		this.setState({
			makeOffers:action
		})
	}
	componentWillMount(){
		//设置工种
		Common.jobList()
		.then((data)=>{
			console.log(data);
			var jobList = data.data.meta.map((obj,index)=>{
				let job = {};
				job.value = obj.name
				job.label = obj.name
				if(obj.children.length>0){
					job.children = obj.children.map((obj2,index2)=>{
						let job = {};
						job.value = obj2.name
						job.label = obj2.name
						return (job)
					})
				}
				return (job)
			})
			if(data){
				this.setState({
					jobList:jobList
				})
			}
		})
		//设置工种

		let userInfoDetail = store.getState().userInfoDetail;
		console.log(userInfoDetail);
		if(userInfoDetail.user_info.artisan_status == 3){
			console.log(1)
			this.setState({
				oldData:userInfoDetail.user_info,
				date:new Date(userInfoDetail.user_info.birthday),
				address:userInfoDetail.user_info.address.split('-'),
				workAddress:userInfoDetail.user_info.artisan_address.split('-'),
				sex:userInfoDetail.user_info.sex,
				year:userInfoDetail.user_info.artisan_work_year,
				job:userInfoDetail.user_info.artisan_work_type.split('-'),
				offers:JSON.parse(userInfoDetail.user_info.artisan_offer),

			},()=>{console.log(this.state)})
		}
	}
	handleAddOffers(data){
		var offers = this.state.offers
		offers.push(data)
		this.setState({
			offers
		})
	}
	handleDeleteOffers(index){
		console.log(this.state.offers[index])
		let offers = [];
		this.state.offers.map((obj,index2)=>{
			if(index != index2){
				offers.push(obj)
			}
		});
		this.setState({
			offers
		})

	}
	render(){		
		var {getFieldProps,getFieldError} = this.props.form
		//设置工作年限
		var workYear = [];
		for(let i = 1;i <= 50;i++){			
			workYear.push({
				value : i,
				label : i+'年'
			})
		}
		return(<div className='apply-for-worker'>

            <NavBar icon={<Icon type="left" />} mode="light" onLeftClick={() => {this.context.router.goBack()}}>申请工匠</NavBar>
		     <div className='user-top'>
		    	<div>
		    		<p>身份证<span>（需要上传身份证正反面）</span></p>
		    		<input 
						{...getFieldProps('id_photo',{
							initialValue:this.state.oldData?this.state.oldData.id_photo.split(',')||[]:[],
							rules:[
								{required:true,type:'array',len:2}
							]							
						})}
						type="hidden"/>
					<ImagePickerExample 
					data={this.state.oldData?
						this.state.oldData.id_photo.split(',').map((obj,index)=>{
							return ({
								img:API.DOMAIN.substr(0,API.DOMAIN.length-1)+obj,
								url:API.DOMAIN.substr(0,API.DOMAIN.length-1)+obj,
							})
						}):[]}
					setImg={(imgs)=>{this.props.form.setFieldsValue({id_photo:imgs})}} 
					length={2} />
		    	</div>
		    	<div>
		    		<p>项目展示<span>（您的项目展示）</span></p>
					<input 
						{...getFieldProps('artisan_project',{
							initialValue:this.state.oldData?this.state.oldData.artisan_project.split(',')||[]:[],
							rules:[
								{required:true,type:'array'}
							]							
						})}
						type="hidden"/>
					<ImagePickerExample 
					data={this.state.oldData?
						this.state.oldData.artisan_project.split(',').map((obj,index)=>{
							return ({
								img:API.DOMAIN.substr(0,API.DOMAIN.length-1)+obj,
								url:API.DOMAIN.substr(0,API.DOMAIN.length-1)+obj,
							})
						}):[]}
					setImg={(imgs)=>{this.props.form.setFieldsValue({artisan_project:imgs})}} 
					length={8} />
		    	</div>
		    	<div>
		    		<p>资质证书<span>（您的获奖资质证书）</span></p>
					<input 
						{...getFieldProps('artisan_certificate',{
							initialValue:this.state.oldData?this.state.oldData.artisan_certificate.split(',')||[]:[],
							rules:[
								{required:true,type:'array'}
							]							
						})}
						type="hidden"/>
					<ImagePickerExample 
					data={this.state.oldData?
						this.state.oldData.artisan_certificate.split(',').map((obj,index)=>{
							return ({
								img:API.DOMAIN.substr(0,API.DOMAIN.length-1)+obj,
								url:API.DOMAIN.substr(0,API.DOMAIN.length-1)+obj,
							})
						}):[]}
					setImg={(imgs)=>{this.props.form.setFieldsValue({artisan_certificate:imgs})}} 
					length={8} />
		    	</div>
		    </div>

		    <div className='user-mid'>
		    	<dl>
		    		<dt><span>姓名</span></dt>
					<dd><input 
					 {...getFieldProps('real_name',{
						initialValue:this.state.oldData?this.state.oldData.real_name||'':'',
						rules:[{required:true}]							
						})}	
					type="text" placeholder='请输入姓名'/></dd>
		    	</dl>
		    	<dl>
		    		<dt><span>身份证号</span></dt>
					<dd><input 
					{...getFieldProps('id_card',{
						initialValue:this.state.oldData?this.state.oldData.id_card||'':'',
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
		    		<dt><span>出生日期</span>
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
		        	  cols={2}
			          data={this.state.jobList}     
			          value={this.state.job}
			          onChange={v => {
							this.setState({
								job:v
							})
					  }}
			          onOk={(v) => {console.log(v)}}
			          onDismiss={() => {}}
			          cascade={true}
			        >
		        <dl>
		    		<dt><span>工种</span>
					<input 
									{...getFieldProps('artisan_work_type',{
										initialValue:'1',
										rules:[{required:true}]							
										})}	
								type="hidden"/>
					</dt>
		    		<dd><font>{this.state.job.join('-')}</font><FontAwesome name='angle-right' /></dd>
		    	</dl>
        	   </Picker>

				<Picker 
					value={[this.state.sex]} 
					onChange={value => {console.log(value);this.setState({sex:value[0]})}} 
					data={[{value:1,label:'男'},{value:2,label:'女'},]} 
					cols={1} 
					className="forss">
		          	<dl>
			    		<dt><span>性别</span>
						<input 
							{...getFieldProps('sex',{
							initialValue:'1',
							rules:[{required:true}]							
							})}	
							type="hidden"/>
						</dt>
			    		<dd><font>{this.state.sex=='1'?'男':'女'}</font><FontAwesome name='angle-right' /></dd>
		    		</dl>
		        </Picker>
				<Picker 
					value={[this.state.year]} 
					onChange={value => this.setState({year:value[0]})} 
					data={workYear} 
					cols={1} 
					className="forss">
		          	<dl>
			    		<dt><span>工龄</span>
						<input 
									{...getFieldProps('artisan_work_year',{
										initialValue:'1',
										rules:[{required:true}]							
										})}	
								type="hidden"/>
						</dt>
			    		<dd><font>{this.state.year}年</font><FontAwesome name='angle-right' /></dd>
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
							<span>个人地址</span>
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
		         <Picker
		        	  cols={3}
			          data={address}     
			          value={this.state.workAddress}
			          onChange={v => {}}
			          onOk={() => {}}
			          onDismiss={() => {}}
			          cascade={true}
			        >
		        <dl>
		    		<dt><span>施工地址</span>
					<input 
							{...getFieldProps('artisan_address',{
								initialValue:'',
								rules:[{required:true}]							
							})}	
							type="hidden"/>
					</dt>
		    		<dd><font>{this.state.workAddress.join('-')}</font><FontAwesome name='angle-right' /></dd>
		    	</dl>
        	   </Picker>
		    	<dl className='first-level-dl' onClick={() => {this.dealMakeOffers(true)}}>
		    		<dt><span>项目报价</span>
					<input 
							{...getFieldProps('artisan_offer',{
								initialValue:[],
								rules:[{required:true,type:'array',min:1,max:3}]							
							})}	
							type="hidden"/>
					</dt>
		    		<dd><font>添加报价方式</font><FontAwesome name='angle-right' /></dd>
		    	</dl>
				{
					this.state.offers[0]&&this.state.offers.map((obj,index)=>{
						return (<dl className='second-level-dl'>
						<dt><span>·{obj.name}</span></dt>
						<dd><font onClick={()=>{this.handleDeleteOffers(index)}} className='font-button'>删除</font></dd>
					</dl>)
					})
				}
		    	
		    </div>
		    <div className='apply-submit'>
		    	<Button onClick={()=>{this.handleConfirm()}} type='primary'>提交申请</Button>
		    </div>

		    {this.state.makeOffers&&<MakeOffers handleAdd={(data)=>{this.handleAddOffers(data)}}  dealMakeOffers={this.dealMakeOffers.bind(this)} />}
		    
		</div>)
	}

}

class ImagePickerExample extends React.Component {
	state = {
		  files: this.props.data||[],
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
  

class MakeOffersForm extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			project:[{}]
		}
		this.formRef = []
	}
	addItem(){

		let project = _.cloneDeep(this.state.project);
		if(project.length < 5){
			project.push({});
			this.setState({
				project
			})
		}else{
			Toast.info('项目最多5个!')
		}
		
	}
	handleSubmit(){
		let projects = [];
		this.formRef.map((obj,index)=>{
			let project = obj.getProject()
			if(project){
				projects.push(project);
			}else{
				return false;
			}
		})
		console.log(projects);
		this.props.form.setFieldsValue({
			project:projects
		})

		
		this.props.form.validateFields((error,value)=>{
			if(!error){
				console.log(value)
				
				//判断新增项目数量是否一致，因为新增后不填信息的情况project返回值为false，不会添加进projects
				if(projects.length == this.state.project.length){
					this.props.handleAdd(value);
					this.props.dealMakeOffers(false);
				}

			}else{
				console.log(error)
			}
		})
		
		// console.log(this.refs.project0.refs.wrappedComponent.getProject);
		// this.props.dealMakeOffers(false);
		// this.props.handleAdd({});
	}
	render(){
		var {getFieldProps,getFieldError} = this.props.form
		return(<div className='make-offers'>
			<NavBar icon={<Icon type="left" />} mode="light" onLeftClick={() => {this.props.dealMakeOffers(false)}} rightContent={<FontAwesome onClick={this.addItem.bind(this)} name='plus' />} >项目报价</NavBar>
			<div className='user-mid'>
				<div className='make-offers-title'>
			    	<dl>
			    		<dt><span>报价方式名称</span></dt>
			    		<dd>
							<input
							{...getFieldProps('name',{
								initialValue:'',
								rules:[
									{required:true}
								]
							})}
							type="text" placeholder='请输报价方式名称'/>
						</dd>
			    	</dl>
					<dl>
			    		<dt><span>客户需提供</span></dt>
			    		<dd>
							<input
							{...getFieldProps('supply',{
								initialValue:'',
								rules:[]
							})}
							type="text" placeholder='请输客户需提供的东西'/>
						</dd>
			    	</dl>
					<dl>
						<dt><span>项目保质期</span></dt>
						<dd><input
						{...getFieldProps('shelf_life',{
							initialValue:0,
							rules:[
								{required:true}
							]
						})}
						onClick={(e)=>{e.target.select()}}
						type="text" placeholder='保质期单位（月）'/></dd>
					</dl>
				</div>
				<div className='make-offers-items'>
						<input
							{...getFieldProps('project',{
								rules:[
									{required:true,type:'array',max:5,min:1}
								]
							})}
							type="hidden"/>		
						{this.state.project.length>0&&this.state.project.map((obj,index)=>{
							return (<Project key={index} ref={'project'+index} wrappedComponentRef={(inst) => {this.formRef[index] = inst} }/>)
						})}						
					{/* <div>
							<div className="leave-words">
								<h5>客户需提供：</h5>
								<div>
									<textarea name="" id="">客户需提供：管子、乳胶漆、石灰、水、电</textarea>
								</div>
							</div>
					</div> */}
				</div>
		    	
		    </div>
		    <div className='apply-submit'>
		    	<Button onClick={()=>{this.handleSubmit()}} type='primary'>确定</Button>
		    </div>

		</div>)
	}
}
class ProjectForm extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			
		}
	}
	componentWillMount(){

	}
	getProject(){
		
		let project = {}
		this.props.form.validateFields((error,value)=>{
			if(!error){
				project.name = value.name;
				project.price = value.price;
				project.unit = value.unit;
				project.num = value.num;
				// project.shelf_life = value.shelf_life;
				project.remark = value.remark;
				project.method = value.method;
			}else{
				console.log(error)
				project = false;
				Toast.info('请正确完善所有信息！')
			}
		})
		return project;

	}
	render(){
		var {getFieldProps} = this.props.form
		return (<div className='make-offers-item'>
		<dl>
			<dt><span>项目名称</span></dt>
			<dd><input
			{...getFieldProps('name',{
				initialValue:'',
				rules:[
					{required:true}
				]
			})}
			type="text" placeholder='请输入项目名称'/></dd>
		</dl>
		<dl>
			<dt><span>项目单价</span></dt>
			<dd><input 
			{...getFieldProps('price',{
				initialValue:1,
				rules:[
					{required:true}
				]
			})}
			onClick={(e)=>{e.target.select()}}
			type="text" placeholder='请输入项目单价'/></dd>
		</dl>
		<dl>
			<dt><span>项目单位</span></dt>
			<dd><input
			{...getFieldProps('unit',{
				initialValue:'',
				rules:[
					{required:true}
				]
			})}
			type="text" placeholder='请输入项目单位'/></dd>
		</dl>
		{/* <dl>
			<dt><span>项目保质期</span></dt>
			<dd><input
			{...getFieldProps('shelf_life',{
				initialValue:'',
				rules:[
					{required:true}
				]
			})}
			type="text" placeholder='保质期单位（天）'/></dd>
		</dl> */}
		<div className="leave-words">
			<h5>报价说明：</h5>
			<div>
				<textarea
				{...getFieldProps('remark',{
					initialValue:'',
					rules:[
						{required:true}
					]
				})}
				name="" id="" placeholder='报价说明'></textarea>
			</div>
		</div>
		<div className="leave-words">
			<h5>收方方法：</h5>
			<div>
				<textarea
				{...getFieldProps('method',{
					initialValue:'',
					rules:[
						{required:true}
					]
				})}
				name="" id="" placeholder='收方方法'></textarea>
			</div>
		</div>
	</div>)
	}
}

var ApplyForWorker = createForm()(ApplyForWorkerForm)
var MakeOffers = createForm()(MakeOffersForm)
var Project = createForm()(ProjectForm)

export default WorkerManagement
export {ApplyForWorker}