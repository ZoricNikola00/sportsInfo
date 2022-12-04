import jwt from 'jsonwebtoken'
import {Request,Response, NextFunction} from 'express'
interface JwtPayload {
    id: Record<string,any>
  }
const auth=async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const token=req.headers.authorization?.split(' ')[1]
        const isCustomAuth=(token?.length || ''.length) < 500
        let decodedData;
        if(token && isCustomAuth){
            decodedData=jwt.verify(token, process.env.SECRET_TOKEN || 'test') as JwtPayload

            req.userId = decodedData.id 
        } else{
            decodedData=jwt.decode(token || '')
            req.userId=decodedData?.sub;
        }
        next()
    }catch(err){console.log(err);
    }
}