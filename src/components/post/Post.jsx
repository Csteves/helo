import React, { Component } from 'react';
import axios from 'axios'

class Post extends Component {
    constructor(props) {
        super(props);
        this.state ={
            title:'',
            img:'',
            content:'',
            username:'',
            profileImg:'',
        }
    }
     async componentDidMount(){
        const{postid} = this.props.match.params;
        let res = await axios.get(`/api/post${postid}`);
        console.log(res.data);
        let {username,content,img,profile_pic,title,} = res.data;
        this.setState({
            title:title,
            img:img,
            content:content,
            username:username,
            profileImg:profile_pic,
        });
    }

    render() {
        let {username,content,img,profileImg,title,} = this.state;
        return (
            <div>
                <h1>{title}</h1>
                <div>
                    <p>by {username}</p>
                    <img src={profileImg} alt=""/>
                </div>
                <div>
                    <img src={img} alt=""/>
                    <p>{content}</p>
                </div>
            </div>
        );
    }
}

export default Post;