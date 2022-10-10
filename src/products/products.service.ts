import { Injectable } from '@nestjs/common';
import { CreateProductsDto } from "./dto/create-products.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Product, ProductDocument } from "./schema/product.schema";
import { Model } from 'mongoose'
import { UpdateProductsDto } from "./dto/update-products.dto";

@Injectable()
export class ProductsService {

  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>){}



  async getAll ():Promise<Product[]>{
    return this.productModel.find().exec()
  }

  async getByid(id: string):Promise<Product>{
   return this.productModel.findById(id)
  }

  async create(productDto: CreateProductsDto): Promise<Product>{
    const newProduct = new this.productModel(productDto)
    return newProduct.save()
  }

  async remove(id:string):Promise<Product> {
    return this.productModel.findByIdAndRemove(id)
  }

  async update(id:string,productDto:UpdateProductsDto):Promise<Product> {
    return this.productModel.findByIdAndUpdate(id,productDto,{new: true})
  }

}
