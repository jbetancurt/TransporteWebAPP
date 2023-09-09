import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Ciudades, CiudadesService } from '../ciudades';
import { Departamentos, DepartamentosService } from '../departamentos';
import { Paises, PaisesService } from '../paises';

@Component({
  selector: 'app-ciudades',
  templateUrl: './ciudades.component.html',
  styleUrls: ['./ciudades.component.css']
})

export class CiudadesComponent implements OnInit {
  onAdd = new EventEmitter(); 
  @Input() idCiudad = 0;
  editar:boolean=false;
  lstDepartamentos:Departamentos[]=[];
  lstPaises : Paises[]=[];
  //lstciudades:Ciudades[]=[];
  FGAgregarCiudades : FormGroup = this.formBuilder.group({      
    idCiudad: new FormControl('0'),
    nombreciudad:new FormControl('',Validators.required),
    codigociudad:new FormControl('',Validators.required),
    idDepartamento:new FormControl(0,Validators.required),
    idPais:new FormControl(1,Validators.required),
  });
    
  cargarNombresCiudades(ciudades:Ciudades){
    this.departamentosService.Get(ciudades.idDepartamento.toString()).subscribe({ 
      next : (datadepartamentos:Departamentos) => {
        if (datadepartamentos.idDepartamento>0){
          this.FGAgregarCiudades.patchValue({
            nombreciudad:ciudades.nombreCiudad,
            idCiudad:ciudades.idCiudad,
            idPais:datadepartamentos.idPais,
            idDepartamento:ciudades.idDepartamento,
            codigociudad:ciudades.codigoCiudad
          });
        }        
      }
    });
    
  }  
  
  
  
  public asignarid(idCiudad:number){
    this.idCiudad=idCiudad;
    this.editar=true;
  }
  
  public AbrirInformacion()
  {
    if(this.idCiudad>0)
    {
      this.ciudadesService.Get(this.idCiudad.toString()).subscribe({
        next : (dataciudades:Ciudades) => {
          this.cargarNombresCiudades(dataciudades);
        }
      });
    }
  }

  ngOnInit() {
    this.AbrirInformacion();
    this.listarPaises();
    this.listarDepartamentos(1);
  }

  constructor(
    private paisesService: PaisesService,
    private departamentosService: DepartamentosService,
    private formBuilder: FormBuilder, 
    private ciudadesService: CiudadesService) { }

    
    listarPaises(){ 
      this.paisesService.GetAll().subscribe({
        next : (lstpaises:Paises[]) => { 
          this.lstPaises=lstpaises;
        }
      });
    }

    crearCiudades(){
      let ciudades : Ciudades = new Ciudades;
  
      
      //agregamos los datos del formulario a la tabla personas
      ciudades.nombreCiudad=this.FGAgregarCiudades.value.nombreciudad;
      ciudades.idCiudad=this.FGAgregarCiudades.value.idCiudad;
      ciudades.codigoCiudad=this.FGAgregarCiudades.value.codigociudad;
      ciudades.idDepartamento=this.FGAgregarCiudades.value.idDepartamento;
      
     //suscrubimos la guardada de los datos en la tabla ciudades
      this.ciudadesService.create(ciudades).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }
    listarDepartamentos(idDepartamento:number){ 
      this.departamentosService.GetByIdPais(idDepartamento).subscribe({
        next : (lstdepartamentos:Departamentos[]) => { 
          this.lstDepartamentos=lstdepartamentos;
        }
      });
    }
  
    editarCiudades(idCiudad:number){
      let ciudades : Ciudades = new Ciudades;
  
      ciudades.idCiudad=idCiudad;
      //agregamos los datos del formulario a la tabla ciudades
      ciudades.nombreCiudad=this.FGAgregarCiudades.value.nombreciudad;
      ciudades.idDepartamento=this.FGAgregarCiudades.value.idDepartamento;
      ciudades.codigoCiudad=this.FGAgregarCiudades.value.codigociudad;
            
           
    
      //suscrubimos la guardada de los datos en la tabla ciudades
      this.ciudadesService.Edit(ciudades).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }

    
  
    enviarDatos() : void{
      let fgCiudades=this.FGAgregarCiudades.value;
      this.ciudadesService.Get(fgCiudades.idCiudad).subscribe({
        next : (dataciudades:Ciudades) => {
         if(dataciudades.idCiudad<=0){
          
          this.crearCiudades();
         }
         else if(dataciudades.idCiudad>0){
          
          this.editarCiudades(dataciudades.idCiudad);
         }
         
        }
      }); 
  
      
    }
  

}
