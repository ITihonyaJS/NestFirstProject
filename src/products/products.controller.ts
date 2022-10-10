import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CreateProductsDto } from './dto/create-products.dto';
import { UpdateProductsDto } from "./dto/update-products.dto";
import { ProductsService } from "./products.service";
import { Product } from "./schema/product.schema";

@Controller('products')
export class ProductsController {

  constructor(private readonly productsServise:ProductsService) {
  }

  @Get()
  getAll(): Promise<Product[]> {
    return this.productsServise.getAll();
  }
  @Get(':id')
  getOne(@Param('id') id: string): Promise<Product>{
    return this.productsServise.getByid(id);
  }
  @Post()
  create(@Body() createProductsDto: CreateProductsDto): Promise<Product>{
    return this.productsServise.create(createProductsDto)
  }

  @Delete(':id')
  remove(@Param('id') id:string): Promise<Product>{
    return this.productsServise.remove(id)
  }
  @Put(':id')
  update(@Body() updateProductsDto: UpdateProductsDto,@Param('id') id:string): Promise<Product>{
    return this.productsServise.update(id,updateProductsDto)
  }
}
