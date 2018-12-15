import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {Link} from 'react-router-dom';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            id:'',
            search:'',
            myPost:true,
            posts:[]
        }
        this.handleSearch = this.handleSearch.bind(this);
    }

    async componentDidMount(){
        let res = await axios.get('/api/posts');
        console.log(res.data);
        this.setState({posts:res.data});
     }
    async handleSearch(){
        const{state} = this.props;
        const {myPost} = this.state;
        console.log("mypost",myPost)
            let res = await axios.get(`/api/posts${state.id}?search=${this.state.search}&isAuthors=${myPost}`)
            console.log(res.data)
     }

    render() {
        let posts = this.state.posts.map((post)=>{
            return(
                <Link key={post.id} to={`/post/${post.id}`}>
                    <div>
                        <h1>{post.title}</h1>
                        <div>
                            <p>by {post.username}</p>
                            <img src={post.profile_pic} alt=""/>
                        </div>
                    </div>
                </Link>

            )
        })
        return (
            <div>
                <div>
                    <input
                    placeholder="Search By Title"
                    onChange={(e)=> this.setState({search:e.target.value})}
                    value={this.state.search}
                    type="text"/>
                    <button
                    onClick={this.handleSearch}
                    >search</button>
                    <button>reset</button>
                    <p>My Posts
                        <input
                        defaultChecked={this.state.myPost}
                        onClick={(e)=>this.setState({myPost:e.target.checked})}
                        type="checkbox"/>
                    </p>
                </div>
                    {posts}
            </div>
        );
    }
}
const mapState = (state)=>{
    return{
        state
    }
}
export default connect(mapState)(Dashboard);