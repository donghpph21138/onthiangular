import { Component } from '@angular/core';
import { IProduct } from 'src/app/types/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  products!: IProduct[]
  constructor(
    private productService: ProductService
  ){
    this.productService.getAllProducts().subscribe({
      next: (data)=>{
        this.products = data
      },
      error: ()=>{

      }
    })
  }
  removeItem(id: any){
    const confirm = window.confirm('mày có muôn xóa không');
    if(!confirm) return;
    this.productService.removeProducts(id).subscribe({
      next: ()=>{
        console.log('xóa thành công')
      },
      error: (error)=>{
        console.log(error)
      }
    })
  } 
}
