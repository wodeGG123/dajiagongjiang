import React from 'react';
import PropTypes from 'prop-types';
import { NavBar, Icon, Carousel, Button,  SearchBar, Picker, ListView } from 'antd-mobile';
import {Link} from 'react-router';
import ImgInit from 'rootsrc/components/common/imgInit/index.js';
import CheckBox from 'rootsrc/components/common/checkbox/index.js';
import Common from 'rootsrc/request/common';
import {WorkerBlock} from 'rootsrc/components/common/workerList/index.js';
import Worker from '../../../request/worker';
import address from 'rootstatics/json/areas.js';



var FontAwesome = require('react-fontawesome');
require('./style.scss')

class Main extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    let that = this;
    function getComponent(){
      if(that.props.params.type == 1){
        return <SearchPre />
      }else if(that.props.params.type == 2){
        return <Search {...this.props} />
      }
    }

    return(<div>{getComponent.bind(this)()}</div>)
  }

}
Main.contextTypes = { 
  store: PropTypes.object,
  router: PropTypes.object
};
Main.defaultProps = {
  
};



class Search extends React.Component{
	constructor(props){
    super(props);
    let dataSource = new ListView.DataSource({
		  rowHasChanged: (row1, row2) => row1 !== row2,
		});
		this.state = {
      dataSource,
			data:[],
      param:{
        work_type:[],
        order_fans:'desc',
        order_reputation:'desc',
        address:'',
        page:1,
        real_name:'',
      },
      jobList:[],
		}
	}
	componentWillMount(){
    let param = this.state.param;
    if(this.props.location.query.job){
      param.work_type = this.props.location.query.job.split(',');
    }
    //设置工种
		Common.jobList()
		.then((data)=>{
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
          param,
          jobList:jobList,
				})
			}
		})
    //设置工种
    this.getData(param,true)
  }
  transferArea(){

  }
	getData(param,init){
		Worker.list({
      ...param,
      work_type:param.work_type[1]||'',
      address:param.address[2]||'',
    })
		.then((data)=>{
			var ds = this.state.data.concat(data.data.meta);
			if(init){
				ds = data.data.meta;
			}
			if(data){
        param.page = parseInt(data.paging.page) + 1;
				this.setState({
					dataSource: this.state.dataSource.cloneWithRows(ds),
					data:ds,
					param
				})
			}
		})
	}
	onEndReached(){
		this.getData(this.state.param,false)
	}
  onSearch(text){
    let param = this.state.param;
    param.real_name = text;
    param.page = 1;
		this.setState({
      param
		})
		this.getData(param,true)
  }
  onSort(data){
    let param = this.state.param;
    param[data] == 'desc' ? param[data] = 'asc' : param[data] = 'desc';
    param.page = 1;
		this.setState({
      param
		})
		this.getData(param,true)
  }
  onWorkTypeSort(data){
    let param = this.state.param;
    param.work_type = data;
    param.page = 1;
		this.setState({
      param
    })
    this.getData(param,true)
  }
  onAddressSort(data){
    let param = this.state.param;
    param.address = data;
    param.page = 1;
		this.setState({
      param
    })
    this.getData(param,true)
  }
	render(){
		return(<div className='search wrap-box'>
			<NavBar mode="light" icon={<Icon type="left" />} onLeftClick={() => {this.context.router.goBack()}}>找工匠</NavBar>
			<div>
        <SearchBar 
          onSubmit={(text)=>{this.onSearch(text)}} 
          placeholder="输入工匠姓名" 
          maxLength={8} />
			</div>
      <div className='search-tools'>
        <div onClick={()=>{this.onSort('order_fans')}}>
          <font>人气</font>&nbsp;
          <FontAwesome name='caret-down' />
        </div>
        <div onClick={()=>{this.onSort('order_reputation')}}>
          <font>信誉</font>&nbsp;
          <FontAwesome name='caret-down' />
        </div>
        <div>
          <Picker
            data={this.state.jobList}
            cols={2}
            title="选择工种"
            cascade={true}
            value={this.state.param.work_type}
            onChange={v => {}}
            onOk={v => {this.onWorkTypeSort(v)}}
          >
            <font>工种</font>
          </Picker>
          
        </div>
        <div>
          <Picker
            data={address}
            value={this.state.param.address}
            cols={3}
            title="选择地区"
            cascade={true}
            onChange={v => {}}
            onOk={v => {this.onAddressSort(v)}}
          >
            <font>地区</font>
          </Picker>
        </div>
      </div>
      
			<div className='worker-block-listview-wrap'>
        
         <ListView
					ref={el => this.lv = el}
					initialListSize={10}
					dataSource={this.state.dataSource}
					renderRow={(rowData)=><WorkerBlock data={rowData} />}
					style={{
						height: document.documentElement.clientHeight - 175 + 'px',
						overflow: 'auto',
          }}
					pageSize={1}
					onScroll={() => { console.log('scroll'); }}
					scrollEventThrottle={50}
					onEndReached={this.onEndReached.bind(this)}
					onEndReachedThreshold={10}
				/>

			</div>
		</div>)
	}

}
Search.contextTypes = {
  store: PropTypes.object,
  router: PropTypes.object
};
Search.defaultProps = {
  
};

class SearchPre extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      data : []
    }
  }
  componentWillMount(){
    Common.jobList()
    .then((data)=>{
      if(data){
        this.setState({
          data:data.data.meta
        })
      }
    })
  }
  render(){
    let {data} = this.state
    return(<div className='pre-search'>
      <NavBar mode="light" icon={<Icon type="left" />} rightContent={<Link to='/home/search/2'><span>跳过</span></Link>}  onLeftClick={() => {this.context.router.goBack()}}>职位搜索</NavBar>
      <div className='work-list'>
        {/* <dl>
          <dt>推荐职位</dt>          
          <dd>
          <Link to='/home/search/2?job=木工'>木工</Link>
          <Link to='/home/search/2?job=木工'>木工</Link>
          <Link to='/home/search/2?job=木工'>木工</Link>
          <Link to='/home/search/2?job=木工'>木工</Link>
          <Link to='/home/search/2?job=木工'>木工</Link>
          <Link to='/home/search/2?job=木工'>木工</Link>
         
          </dd>
        </dl> */}
        {data.map((obj,index)=>{
              return (<dl key={index}>
                  <dt>{obj.name}</dt>
                  <dd>
                    {obj.children.length>0&&obj.children.map((obj2,index2)=>{
                      return (<Link key={index2} to={'/home/search/2?job='+obj.name+','+obj2.name}>{obj2.name}</Link>)
                    })}
                  </dd>
                </dl>)
            })}
      </div>

    </div>)
  }

}
SearchPre.contextTypes = { 
  store: PropTypes.object,
  router: PropTypes.object
};
SearchPre.defaultProps = {
  
};

export default Main