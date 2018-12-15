import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
// import {getUser} from '../../ducks/users';

class Nav extends Component {
constructor(props) {
    super(props);
    this.state={
        user:{}
    }
}

   render() {
        let{username,img} = this.props.state;
       let nav = this.props.location.pathname === "/"?
       null
     :
       <div>
           <div>
               <div className='profile-avatar'>
               <img src={img} alt=""/>
               <h6>{username}</h6>
               </div>
               <Link to='/dashboard'>
               <button>dash</button>
               </Link>
               <Link to='/new'>
               <button>post</button>
               </Link>
                <Link to="/">
               <button>auth</button>
               </Link>
           </div>
       </div>;
       return (
           <div>
            {nav}
           </div>
       );
   }
}
const mapStateToProps = (state)=>{
    return{
        state
    }
};

export default withRouter( connect(mapStateToProps)(Nav)) ;