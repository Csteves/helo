module.exports = {
    login: async(req, res)=>{
        const {username, password} = req.body;
        const db = req.app.get('db');
        let result = await db.get_user([username]);
        let user = result[0];
        if(!user){
            return res.status(200).send({loggedIn:false, message:'Username not found'});
        }else{
            req.session.user = {username:user.username, id: user.id,img:user.profile_pic};
            return res.status(200).send({loggedIn:true, message: 'Login Successful',user:req.session.user});
        }
    },
    register: async(req,res)=>{
        let {username, password,avatar} = req.body;
        console.log(req.body,"register")
        let db = req.app.get('db');
        let result = await db.get_user([username]);
        let existingUser = result[0];
        if(existingUser){
            return res.status(200).send({loggedIn:false, message:'Username already in use'})
        }else{
            let createdCustomer = await db.create_user([username,password,avatar]);
            req.session.user = {username:createdCustomer[0].username, id: createdCustomer[0].id,img:createdCustomer[0].profile_pic};
            console.log(req.session.user)
            res.status(200).send({loggedIn:true, message:'Successful',user:req.session.user})
        }
    },
    getAllPosts: async (req,res)=>{
        let db = req.app.get('db');
        let results = await db.get_all_posts();
        return res.status(200).send(results);

    },
    getFilterdPost: async (req,res)=>{
       let {search, isAuthors} = req.query;
       let {id} = req.params;
       let db = req.app.get('db');

            let result = await db.get_all_filtered_post([search]);
            console.log(result[0]);

    },
    getPost: async (req,res)=>{
        console.log('hello from get post')
        const {id} = req.params;
        let db = req.app.get('db');
        let results = await db.get_post([id]);
        return res.status(200).send(results[0]);
    }
}