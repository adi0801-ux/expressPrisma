import prisma from "../DB/db.config.js";
export const createComment= async(req, res)=>{
    const { user_id , post_id, comment } = req.body;
        //INCREASE COMMENT COUNTER
    await prisma.post.update({
        where:{
            id:Number(post_id),
        },
        data:{
            comment_count:{
                increment:1,
            },
        },
    });
    const newComment = await prisma.comment.create({
        data:{
            user_id:Number(user_id),
            post_id: Number(post_id),
            comment:comment
        }
    })
    return res.json(newComment);
};
export const getAllComment = async(req, res)=>{
    var comments = await prisma.comment.findMany({});
    return res.json({status: 200, datas: comments});
}
export const getComment = async(req, res)=>{
    const commentId = req.params.id;
    var comment = await prisma.comment.findUnique({
        where:{
            id:Number(commentId)
        },
    });
    if(!comment)return res.status(404).json({ status: 404, message: "Post Not found" });

    return res.json({ status:200, data:comment})
}
export const deleteComment = async(req, res)=>{
    const commentId = req.params.id;
    try{
        await prisma.comment.delete({
        where:{
            id:Number(commentId)
        }
    })
    return res.json({ status:200, msg:"comment was deleted"});
    }
    catch(error){
        return res.json({status:404, msg:"comment doesnt exist"});
    }
}
export const updateComment = async(req, res)=>{
    const commentId = req.params.id;
    const {title, description} = req.body
    var newComment;
    try{
            newComment = await prisma.comment.update({
            where:{
                id:Number(commentId)
            },
            
            data:{
                title:title,
                desc:description,        
            }
        });
        return res.json({ status: 200, data: newComment, msg:"created."});

    }catch (error) {
        return res.json({status:500, msg:"some error while updating comment"})
    }
};

