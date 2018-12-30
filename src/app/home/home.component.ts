import {Component} from '@angular/core';
import { Employee } from '../models/employee.model';
import { clearModulesForTest } from '@angular/core/src/linker/ng_module_factory_loader';
import { FormPoster } from '../services/form-poster.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  languages = [];
  model = new Employee('','',false,'','default');
  hasPrimaryLanguageError = false;
  
  constructor(private formPoster: FormPoster){    
    this.formPoster.getLanguages()
      .subscribe(
        data => this.languages = data.languages,
        err => console.log('get error: ', err)
      );
  }

  firstNameToUpperCase(value:string){
    if(value.length > 0)
    this.model.firstName = value.charAt(0).toUpperCase() + value.slice(1);
    else
    this.model.firstName = value;
  }
  



  submitForm(form: NgForm){
    // validate
    this.validatePrimaryLanguage(this.model.primaryLanguage);
    if (this.hasPrimaryLanguageError)
      return; 

    this.formPoster.postEmployeeForm(this.model)
    .subscribe(
      data => console.log('success: ', data),
      err => console.log('error: ', err)
    );
  }

  validatePrimaryLanguage(value){
    if(value === 'default')
      this.hasPrimaryLanguageError = true;
    else
      this.hasPrimaryLanguageError = false;

  }
}
