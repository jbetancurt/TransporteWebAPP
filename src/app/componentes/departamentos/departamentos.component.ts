import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Departamentos, DepartamentosService } from './';
import { Paises, PaisesService } from '../paises';

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.scss']
})

export class DepartamentosComponent implements OnInit {
  onAdd = new EventEmitter(); 
  @Input() idDepartamento = 0;
  editar:boolean=false;
  lstPaises:Paises[]=[];
  //lstdepartamentos:Departamentos[]=[];
  FGAgregarDepartamentos : FormGroup = this.formBuilder.group({      
    nombredepartamento:new FormControl('',Validators.required),
    codigodepartamento:new FormControl('',Validators.required),
    idDepartamento:new FormControl('0'),
    idPais:new FormControl('1')
  });

  
  cargarNombresDepartamentos(departamentos:Departamentos){
    this.FGAgregarDepartamentos.patchValue({
      nombredepartamento:departamentos.nombreDepartamento,
      idDepartamento:departamentos.idDepartamento,
      idPais : departamentos.idPais,
      codigodepartamento:departamentos.codigoDepartamento
    })
  }  
  public asignarid(idDepartamento:number){
    this.idDepartamento=idDepartamento;
    this.editar=true;
  }

  public AbrirInformacion()
  {
    if(this.idDepartamento>0)
    {
      this.departamentosService.Get(this.idDepartamento.toString()).subscribe({
        next : (datadepartamentos:Departamentos) => {
          this.cargarNombresDepartamentos(datadepartamentos);
        }
      });
    }
  }

  ngOnInit() {
    this.AbrirInformacion();
    this.listarPaises();
           
  }

  constructor(
    private paisesService: PaisesService,
    private formBuilder: FormBuilder, 
    private departamentosService: DepartamentosService) { }

    crearDepartamentos(){
      let departamentos : Departamentos = new Departamentos;
  
      
      //agregamos los datos del formulario a la tabla personas
      departamentos.nombreDepartamento=this.FGAgregarDepartamentos.value.nombredepartamento;
      departamentos.idDepartamento=this.FGAgregarDepartamentos.value.idDepartamento;
      departamentos.idPais=this.FGAgregarDepartamentos.value.idPais;
      departamentos.codigoDepartamento=this.FGAgregarDepartamentos.value.codigodepartamento;
      
     //suscrubimos la guardada de los datos en la tabla departamentos
      this.departamentosService.create(departamentos).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }
    listarPaises(){ 
      this.paisesService.GetAll().subscribe({
        next : (lstpaises:Paises[]) => { 
          this.lstPaises=lstpaises;
        }
      });
    }
  
    editarDepartamentos(idDepartamento:number){
      let departamentos : Departamentos = new Departamentos;
  
      departamentos.idDepartamento=idDepartamento;
      //agregamos los datos del formulario a la tabla departamentos
      departamentos.nombreDepartamento=this.FGAgregarDepartamentos.value.nombredepartamento;
      departamentos.idPais=this.FGAgregarDepartamentos.value.idPais;
      departamentos.codigoDepartamento=this.FGAgregarDepartamentos.value.codigodepartamento;
            
           
    
      //suscrubimos la guardada de los datos en la tabla departamentos
      this.departamentosService.Edit(departamentos).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }

    
  
    enviarDatos() : void{
      let fgDepartamentos=this.FGAgregarDepartamentos.value;
      this.departamentosService.Get(fgDepartamentos.idDepartamento).subscribe({
        next : (datadepartamentos:Departamentos) => {
         if(datadepartamentos.idDepartamento<=0){
          
          this.crearDepartamentos();
         }
         else if(datadepartamentos.idDepartamento>0){
          
          this.editarDepartamentos(datadepartamentos.idDepartamento);
         }
         
        }
      }); 
  
      
    }
  

}
