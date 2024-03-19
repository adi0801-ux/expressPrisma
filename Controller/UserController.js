import prisma from "../DB/db.config.js";

export const createUser= async(req, res)=>{
    const { name , email, password } = req.body;
    console.log(req.body)
    const findUser = await prisma.user.findUnique({
        where: {
            email:email,
        }
    });
    console.log(findUser);
    if (findUser){
        return res.json({
            status:400,
            message:"Email already taken, please attach another email",
        })
    }
    const newUser = await prisma.user.create({
        data:{
            name:name,
            email:email,
            password:password,
        }
    })
    return res.json(newUser);
};
export const getAllUser = async(req, res)=>{
    var users = await prisma.user.findMany({
        select:{
            _count:{
                select:{
                    post:true,
                    comment:true,
                }
            }
        }
    });
    return res.json({status: 200, datas: users});
}
export const getUser = async(req, res)=>{
    const userId = req.params.id;
    var user = await prisma.user.findUnique({
        where:{
            id:Number(userId)
        },
    });
    if(!user)return res.status(404).json({ status: 404, message: "User not found." });

    return res.json({ status:200, data:user})
}
export const deleteUser = async(req, res)=>{
    const userId = req.params.id;
    try{
        await prisma.user.delete({
        where:{
            id:Number(userId)
        }
    })
    return res.json({ status:200, msg:"user was deleted"});
    }
    catch(error){
        return res.json({status:404, msg:"user doesnt exist"});
    }
}
export const updateUser = async(req, res)=>{
    const userId = req.params.id;
    
    const {name, email, password} = req.body
    var newUser;
    try{
            newUser = await prisma.user.update({
            where:{
                id:Number(userId)
            },
            
            data:{
                name:name,
                email:email,
                password:password,
        
            }
        });
        return res.json({ status: 200, data: newUser, msg:"create."});

    }catch (error) {
        return res.json({status:500, msg:"emailId already exists"})
    }
};

export default "OP";