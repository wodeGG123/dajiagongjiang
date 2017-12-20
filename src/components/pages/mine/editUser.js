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

class EiditUser extends React.Component{
	constructor(props){
		super(props);
		this.state={
			nickName:'李师傅',
			sex:1,
			date:new Date('2017-01-01'),
			email:'123@qq.com',
			mobile:'13990546657',
		}
	}
	handleConfirm(){
		alert('确认修改？', '', [
	      { text: '取消', onPress: () => console.log('cancel') },
	      { text: '确定', onPress: () => this.context.router.replace('/home/mine') },
	    ])
	}
	render(){
		
		return(<div className='user-edit'>

            <NavBar icon={<Icon type="left" />} mode="light" rightContent={<FontAwesome name='check' onClick={()=>{this.handleConfirm()}} />} onLeftClick={() => {this.context.router.goBack()}}>编辑资料</NavBar>
		    <div className='user-top'>
		    	<div>
		    		<p>设置头像</p>
		    		<ImagePickerExample length={1} />
		    	</div>
		    	<div>
		    		<p>展示图片<span>（最多可设置8张）</span></p>
		    		<ImagePickerExample length={8} />
		    	</div>
		    		
		    </div>
		    <div className='user-mid'>
		    	<dl onClick={() => prompt('', '', [
				      { text: '取消' },
				      { text: '确认', onPress: value => this.setState({nickName:value}) },
				    ], 'default',this.state.nickName)}>
		    		<dt><span>昵称</span></dt>
		    		<dd><font>{this.state.nickName}</font><FontAwesome name='angle-right' /></dd>
		    	</dl>
		    	<Picker value={[this.state.sex]} onChange={value => this.setState({sex:value[0]})} data={[{value:1,label:'男'},{value:0,label:'女'},]} cols={1} className="forss">
		          	<dl>
			    		<dt><span>性别</span></dt>
			    		<dd><font>{this.state.sex?'男':'女'}</font><FontAwesome name='angle-right' /></dd>
		    		</dl>
		        </Picker>
		    	
		    	<DatePicker
		          mode="date"
		          title="生日"
		          extra="Optional"
		          minDate={new Date("1900-01-01")}
		          maxDate={new Date()}
		          value={this.state.date}
		          onChange={date => this.setState({ date })}
		        >
		          <dl>
		    		<dt><span>生日</span></dt>
		    		<dd><font>{moment(this.state.date).format('YYYY年MM月DD日')}</font><FontAwesome name='angle-right' /></dd>
		    	  </dl>
		        </DatePicker>
		    	
		    	<dl onClick={() => prompt('', '', [
				      { text: '取消' },
				      { text: '确认', onPress: value => this.setState({email:value}) },
				    ], 'default',this.state.email)}>
		    		<dt><span>邮箱</span></dt>
		    		<dd><font>{this.state.email}</font><FontAwesome name='angle-right' /></dd>
		    	</dl>
		    	<dl onClick={() => prompt('', '', [
				      { text: '取消' },
				      { text: '确认', onPress: value => this.setState({mobile:value}) },
				    ], 'default',this.state.mobile)}>
		    		<dt><span>电话</span></dt>
		    		<dd><font>{this.state.mobile}</font><FontAwesome name='angle-right' /></dd>
		    	</dl>
		    	
		    </div>
		</div>)
	}

}
EiditUser.contextTypes = {
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

export default EiditUser