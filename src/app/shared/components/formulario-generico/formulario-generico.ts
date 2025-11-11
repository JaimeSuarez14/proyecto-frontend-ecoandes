import { CommonModule } from '@angular/common';
import { Component, EventEmitter, input, Input, Output, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormField } from '@models/formulario.model';
import { noSpacesValidator } from '@shared/validators/noSpacesValidator';
import { HasRold } from "app/core/directives/has-rold";

@Component({
  selector: 'app-formulario-generico',
  imports: [CommonModule, ReactiveFormsModule, HasRold],
  templateUrl: './formulario-generico.html',
  styleUrl: './formulario-generico.css'
})
export class FormularioGenerico {
  @Input() fields: FormField[] = [];
  @Input() submitButtonText: string = 'Enviar';
  @Output() formSubmit = new EventEmitter<any>();
  @Input() machValue!:any;
  title = ""

  form!: FormGroup;
  showPassword: Record<string, boolean> = {};

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    const group: any = {};
    this.fields.forEach(field => {
      const validators = [];
      if (field.required) validators.push(Validators.required);
      if (field.type === 'email') validators.push(Validators.email);
      if (field.type === 'text'){
       validators.push(Validators.minLength(3));
      validators.push(noSpacesValidator);
      }
      if (field.type === 'tel'){
        validators.push(Validators.pattern(/^[0-9]{7,15}$/)); // opcional
        validators.push(Validators.maxLength(9))
      }

      group[field.name] = [field.type === 'checkbox' ? false : '', validators];

      if (field.type === 'password') {
        this.showPassword[field.name] = false;
      }
    });
    this.form = this.fb.group(group);
    this.machForm()
  }

  togglePassword(field: string) {
    this.showPassword[field] = !this.showPassword[field];
  }

  onSubmit() {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }

  private machForm(){
    if(this.machValue) this.form.patchValue(this.machValue);
  }
}
