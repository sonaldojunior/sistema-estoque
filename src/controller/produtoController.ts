import {Request, Response} from 'express';
import produto from '../model/produto';
import mongoose from 'mongoose';

export const home = async(req:Request, res:Response)=>{
    res.render('index')
}

export const createProduct = async(req:Request, res:Response)=>{
    res.render('cadastroProduto')
}

export const createProduct1 = async(req:Request, res:Response)=>{
    let material: string = req.body.material.toUpperCase();
    let medida: number= req.body.medida;
    let quantidade: number= req.body.quantidade;
    let productExists = await produto.findOne({material, medida});
  if(!productExists){ // quando é negação ele não entra e retorna um array vazio 
        let newProduct = await produto.create({
            material, medida, quantidade
        });    
        res.status(201)
        res.render('resultado',{newProduct});
        
    }else{
        
        res.render('resultado',{productExists});
        
    }
 }

export const stockList1 = async(req:Request, res:Response)=>{
    res.render('listar')    
}

export const stockList = async(req:Request, res:Response)=>{
    let list = await produto.find({})
    res.render('resultado',{list})  
} 

export const stockItem = async(req:Request, res:Response)=>{
    res.render('listarItem')
}

export const stockItem1 = async(req:Request, res:Response)=>{
        let materialName= req.query.material?.toString().toUpperCase();
        let materialItem= await produto.find({
        material: {$regex: materialName}// o regex serve para buscar qualquer caractere da busca
    }).sort({medida:1});//vai organizar em ordem crescente em medida
    if (materialItem){
        return res.render('resultado',{materialItem})
    }
}

export const stockUpdate = async(req:Request, res:Response)=>{
   res.render('atualizarProduto')
};

export const stockUpdate1 = async(req:Request, res:Response)=>{
    let id= req.body.id;
    let {material, medida, quantidade}= req.body;
    let materialCase= material.toString().toUpperCase()
    let productUpdate= await produto.findById(id)
     if(productUpdate){
        await produto.findByIdAndUpdate(
             req.body.id,{
                 material:materialCase,
                 medida:medida,
                 quantidade:quantidade
        })
        res.render('resultado',{productUpdate});
     }else{
         res.json({id: 'produto não contem no banco de dados, confira o id novamente'})
     }
 };
 export const removeItem = async(req:Request, res:Response)=>{
    res.render('deletar')
}
 export const removeItem1 = async(req:Request, res:Response)=>{
   let id= req.query.id;
    let productDelete = await produto.findById(id)
    if(productDelete){       
        await productDelete.remove();
        res.render('resultado',{productDelete});
    }else{
        res.json ({id: 'ID não existe, no banco de dados.'})
    }
}
