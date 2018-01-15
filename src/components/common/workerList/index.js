import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router'
import ImgInit from 'rootsrc/components/common/imgInit/index.js'
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
        return(<div className='worker-item'>
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
export default Main