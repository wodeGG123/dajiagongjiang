import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router'
import ImgInit from 'rootsrc/components/common/imgInit/index.js'
import API from 'rootsrc/request/api'

var FontAwesome = require('react-fontawesome');
require('./style.scss')

class Main extends React.Component{
	constructor(props){
		super(props);
    this.state = {
      data:[
      {place:'威远',
       img:'/statics/img/temp/timg.jpg',
       name:'李师傅',
       goodE:'99%',
       level:'高级木工'
      },
      {place:'威远',
       img:'/statics/img/temp/timg.jpg',
       name:'李师傅',
       goodE:'99%',
       level:'高级木工'
      },
      {place:'威远',
       img:'/statics/img/temp/timg.jpg',
       name:'李师傅',
       goodE:'99%',
       level:'高级木工'
      },
      {place:'威远',
       img:'/statics/img/temp/timg.jpg',
       name:'李师傅',
       goodE:'99%',
       level:'高级木工'
      },
      {place:'威远',
       img:'/statics/img/temp/timg.jpg',
       name:'李师傅',
       goodE:'99%',
       level:'高级木工'
      },
      {place:'威远',
       img:'/statics/img/temp/timg.jpg',
       name:'李师傅',
       goodE:'99%',
       level:'高级木工'
      },
      ]
    }
	}
	render(){
		return(<div className='worker-lists'>
    {
      this.state.data.map((obj,index)=>{
        return(<div key={index} className='worker-item'>
          <Link to='/home/workerInfo'>
          <dl>
            <dt><ImgInit src={obj.img} /><i>{obj.place}</i></dt>
            <dd><h4>{obj.name}</h4><span><FontAwesome name='thumbs-o-up' />{obj.goodE}</span></dd>
            <dd><p>{obj.level}</p></dd>
          </dl>
          </Link> 
        </div>)
      })
    }        
      </div>
)
	}
}
Main.contextTypes = {	
  store: PropTypes.object,
  router: PropTypes.object
};
Main.defaultProps = {
  
};


class WorkerBlock extends React.Component{
   static contextTypes = {
     router : React.PropTypes.object
   }
   constructor(props){
       super(props);       
   }
   handleClick(data){
    window.sessionStorage.setItem('TEMP_DATA',JSON.stringify(data));
    this.context.router.push('/home/workerInfo');
   }
   render(){
     let {data} = this.props;
     console.log(data)
     return (<div onClick={()=>{this.handleClick(data)}} className='worker-item'>
     <dl>
       <dt><ImgInit src={API.DOMAIN.substr(0,API.DOMAIN.length-1)+data.avatar} /><i>{data.address.split('-')[2]}</i></dt>
       <dd><h4>{data.name}</h4><span><FontAwesome name='thumbs-o-up' />{data.praise_level}</span></dd>
       <dd><p>{data.artisan_level}</p></dd>
     </dl>
   </div>)
   }
}
export default Main
export {WorkerBlock}