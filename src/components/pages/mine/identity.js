import React from 'react'
import PropTypes from 'prop-types'
import { NavBar, Icon, WingBlank, Button, Modal, ImagePicker, SegmentedControl, Picker, DatePicker } from 'antd-mobile';
const alert = Modal.alert;
const prompt = Modal.prompt;

import {Link} from 'react-router'
var moment = require('moment');

import ImgInit from 'rootsrc/components/common/imgInit/index.js'
var FontAwesome = require('react-fontawesome');

require('./style.scss');


class ApplyForIdentity extends React.Component{
	constructor(props){
		super(props);
		this.state={
			nickName:'李师傅',
			sex:1,
			year:1,
			date:new Date('2017-01-01'),
			email:'123@qq.com',
			mobile:'13990546657',
			job:'',

			makeOffers:false,
		}
	}
	handleConfirm(){
		alert('确认修改？', '', [
	      { text: '取消', onPress: () => console.log('cancel') },
	      { text: '确定', onPress: () => this.context.router.replace('/home/mine') },
	    ])
	}
	dealMakeOffers(action){
		this.setState({
			makeOffers:action
		})
	}
	render(){
		const jobList = [
			{value:0,
			 label:'工种类0',
			 children:[{value:0,label:'石匠0'},{value:1,label:'石匠1'},{value:2,label:'石匠2'}]},
			 {value:1,
			 label:'工种类1',
			 children:[{value:0,label:'木匠0'},{value:1,label:'木匠1'},{value:2,label:'木匠2'}]},
			 {value:2,
			 label:'工种类2',
			 children:[{value:0,label:'铁匠0'},{value:1,label:'铁匠1'},{value:2,label:'铁匠2'}]}

		];
		const location = [
			{value:0,
			 label:'四川',
			 children:[{value:0,label:'成都',children:[{value:0,label:'威远'}]},{value:1,label:'成都',children:[{value:0,label:'威远'}]},{value:2,label:'成都',children:[{value:0,label:'威远'}]}]},
			 {value:0,
			 label:'四川',
			 children:[{value:0,label:'成都',children:[{value:0,label:'威远'}]},{value:1,label:'成都',children:[{value:0,label:'威远'}]},{value:2,label:'成都',children:[{value:0,label:'威远'}]}]},
			 {value:0,
			 label:'四川',
			 children:[{value:0,label:'成都',children:[{value:0,label:'威远'}]},{value:1,label:'成都',children:[{value:0,label:'威远'}]},{value:2,label:'成都',children:[{value:0,label:'威远'}]}]},
			 

		];
		return(<div className='apply-for-identity'>

            <NavBar icon={<Icon type="left" />} mode="light" onLeftClick={() => {this.context.router.goBack()}}>实名认证</NavBar>
		     <div className='user-top'>
		    	<div>
		    		<p>身份证<span>（需要上传身份证正反面）</span></p>
		    		<ImagePickerExample length={2} />
		    	</div>
		    </div>

		    <div className='user-mid'>
		    	<dl>
		    		<dt><span>姓名</span></dt>
		    		<dd><input type="text" placeholder='请输入姓名'/></dd>
		    	</dl>
		    	<dl>
		    		<dt><span>身份证号</span></dt>
		    		<dd><input type="text" placeholder='请输入身份证号'/></dd>
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
		    		<dt><span>出生日期</span></dt>
		    		<dd><font>{moment(this.state.date).format('YYYY年MM月DD日')}</font><FontAwesome name='angle-right' /></dd>
		    	  </dl>
		        </DatePicker>
		    	<Picker value={[this.state.sex]} onChange={value => this.setState({sex:value[0]})} data={[{value:1,label:'男'},{value:0,label:'女'},]} cols={1} className="forss">
		          	<dl>
			    		<dt><span>性别</span></dt>
			    		<dd><font>{this.state.sex?'男':'女'}</font><FontAwesome name='angle-right' /></dd>
		    		</dl>
		        </Picker>
		         <Picker
		        	  cols={3}
			          data={location}     
			          value={this.state.job}
			          onChange={v => {}}
			          onOk={() => {}}
			          onDismiss={() => {}}
			          cascade={true}
			        >
		        <dl>
		    		<dt><span>地址</span></dt>
		    		<dd><font>四川省-内江市-威远县</font><FontAwesome name='angle-right' /></dd>
		    	</dl>
        	   </Picker>
		    </div>
		    <div className='apply-submit'>
		    	<Button type='primary'>提交申请</Button>
		    </div>

		    {this.state.makeOffers?<MakeOffers dealMakeOffers={this.dealMakeOffers.bind(this)} />:null}
		    
		</div>)
	}

}
ApplyForIdentity.contextTypes = {
  router: PropTypes.object
};
 const data = [{
			  url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
			  id: '2121',
			}];

class ImagePickerExample extends React.Component {
  state = {
    files: data,
  }
  onChange = (files, type, index) => {
    console.log(files, type, index);
    this.setState({
      files,
    });
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



export default ApplyForIdentity