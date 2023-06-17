import { Component } from '@angular/core';
import { IProduct } from 'src/app/types/Product';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {
  product!: IProduct;
  form = this.fb.group({
    name: [''],
    price: [0],
    quantity: [0],
    description: [''],
  });
  constructor(
    private router: Router,
    private productService: ProductService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute
  ){
    this.activatedRoute.paramMap.subscribe(params=>{
      const id = params.get('id');
      this.productService.getOneProducts(id).subscribe({
        next: (product)=>{
          this.product = product;
          this.form.patchValue(product)
        },
        error: ()=>{

        }
      });
    })
  }
  onHandleSubmit(){
    console.log(this.form.value);
    if(this.form.invalid) return;
    this.productService.updateProducts({
      id: this.product.id,
      name: this.product.name,
      price: this.product.price,
      quantity: this.product.quantity,
      description: this.product.description,
      ...this.form.value
    }).subscribe({
      next: (product)=>{
        console.log('product',product);
        alert('sau 1s trang sẽ chuyển hướng')
        setTimeout(()=>{
          this.router.navigate(['product']);
        },1000)
      },
      error: (errors)=>{
        console.log(errors);
      }
    })
  }
}
