import { Component } from '@angular/core';
import { IProduct } from 'src/app/types/Product';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {
  constructor(
    private router: Router,
    private productService: ProductService
  ){}
  onHandleSubmit(form: NgForm){
    console.log(form.value);
    if(form.invalid) return;
    this.productService.addProducts(form.value).subscribe({
      next: (product)=>{
        console.log(product);
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
