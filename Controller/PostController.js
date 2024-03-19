import prisma from "../DB/db.config.js";
export const createPost= async(req, res)=>{
    const { user_id , title, description } = req.body;
    //console.log(req.body)
    const newPost = await prisma.post.create({
        data:{
            user_id:Number(user_id),
            title:title,
            description:description,
        }
    })
    return res.json(newPost);
};
export const getAllPosts = async(req, res)=>{
    var posts = await prisma.post.findMany({
        include:{
            comment:{
                include:{
                    user:{
                        select:{
                            name:true,
                        }
                    },
                },
            },
        },
        orderBy:{
            id:"desc",
        },
        where:{
            title:{
                startsWith:"a",
            },
            comment_count:{
                lt:1,
            }
        }
    });
    
    return res.json({status: 200, datas: posts});
}
export const getPost = async(req, res)=>{
    const postId = req.params.id;
    var post = await prisma.post.findUnique({
        where:{
            id:Number(postId)
        },
    });
    if(!post)return res.status(404).json({ status: 404, message: "Post Not found" });

    return res.json({ status:200, data:post})
}
export const deletePost = async(req, res)=>{
    const postId = req.params.id;
    try{
        await prisma.post.delete({
        where:{
            id:Number(postId)
        }
    })
    return res.json({ status:200, msg:"post was deleted"});
    }
    catch(error){
        return res.json({status:404, msg:"post doesnt exist"});
    }
}
export const updatePost = async(req, res)=>{
    const postId = req.params.id;
    const {title, description} = req.body
    var newPost;
    try{
            newPost = await prisma.post.update({
            where:{
                id:Number(postId)
            },
            
            data:{
                title:title,
                desc:description,        
            }
        });
        return res.json({ status: 200, data: newPost, msg:"created."});

    }catch (error) {
        return res.json({status:500, msg:"some error while updating post"})
    }
};

