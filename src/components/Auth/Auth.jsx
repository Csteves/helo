import React, { Component } from 'react';
// import Logo from '../../helo-logo.png';
import Nav from '../Nav/Nav'
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux'
import {updateUser} from '../../ducks/users'
class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            password:'',
            loggedIn:false
        }
        this.login = this.login.bind(this)
        this.register = this.register.bind(this)
    }
    async login(){
        const {username,password} = this.state;
        let res = await axios.post('/auth/login',{username,password});
        console.log(res.data)
        console.log(this.props,"propsss")
        let {img,id} = res.data.user;
        this.props.updateUser(username,id,img);
        this.setState({username:'',password:'',loggedIn:res.data.loggedIn})
    }

    async register(){
        const {username,password} = this.state;
        let dog = await axios.post(`https://dog.ceo/api/breeds/image/random`);
        let avatar = dog.data.message
        let res = await axios.post('/auth/register',{username,password,avatar});
        console.log(res.data)
        let id = res.data.user.id
        this.props.updateUser(username,id,avatar)
        this.setState({username:'',password:'',loggedIn:res.data.loggedIn})
    }

    render() {
        if(this.state.loggedIn){
            return <Redirect to='/dashboard'/>
        }
        return (
            <div className="auth-wrapper">

                <h1>Helo</h1>
                <div>
                     <p>Username</p>
                    <input
                    value={this.state.username}
                    onChange={(e)=>this.setState({username:e.target.value})}
                    type="text"/>
                </div>
                <div>
                    <p>Password</p>
                    <input
                    value={this.state.password}
                     onChange={(e)=>this.setState({password:e.target.value})}
                    type="text"/>
                </div>
                <div>
                    <button
                    onClick={this.login}
                    >Login
                    </button>
                    <button
                    onClick={this.register}
                    >Register</button>
                </div>
            </div>
        );
    }
}
const mapState = (state) => state;
export default connect(mapState,{updateUser})(Auth);