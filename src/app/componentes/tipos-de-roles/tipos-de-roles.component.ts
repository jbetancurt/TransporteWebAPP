import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TiposDeRoles } from './tipos-de-roles.model';
import { TiposDeRolesService } from './tipos-de-roles.service';

@Component({
  selector: 'app-tipos-de-roles',
  templateUrl: './tipos-de-roles.component.html',
  styleUrls: ['./tipos-de-roles.component.css']
})
export class TiposDeRolesComponent implements OnInit {
  
  onAdd = new EventEmitter(); 
  @Input() idTipoDeRol = 0;
  editar:boolean=false;
  //lsttiposderoles:TiposDeRoles[]=[];
  FGAgregarTiposDeRoles : FormGroup = this.formBuilder.group({      
    nombretipoderol:new FormControl('',Validators.required),
    idTipoDeRol:new FormControl('0')
  });

  
  cargarNombresTiposDeRoles(tiposderoles:TiposDeRoles){
    this.FGAgregarTiposDeRoles.patchValue({
      nombretipoderol:tiposderoles.nombreTipoDeRol,
      idTipoDeRol:tiposderoles.idTipoDeRol
    })
  }  
  public asignarid(idTipoDeRol:number){
    this.idTipoDeRol=idTipoDeRol;
    this.editar=true;
  }

  public AbrirInformacion()
  {
    if(this.idTipoDeRol>0)
    {
      this.tiposderolesService.Get(this.idTipoDeRol.toString()).subscribe({
        next : (datatiposderoles:TiposDeRoles) => {
          this.cargarNombresTiposDeRoles(datatiposderoles);
        }
      });
    }
  }

  ngOnInit() {
    this.AbrirInformacion();
           
  }

  constructor(
    private formBuilder: FormBuilder, 
    private tiposderolesService: TiposDeRolesService) { }

    crearTiposDeRoles(){
      let tiposderoles : TiposDeRoles = new TiposDeRoles;
  
      
      //agregamos los datos del formulario a la tabla personas
      tiposderoles.nombreTipoDeRol=this.FGAgregarTiposDeRoles.value.nombretipoderol;
      
      
     //suscrubimos la guardada de los datos en la tabla tiposderoles
      this.tiposderolesService.create(tiposderoles).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }
  
    editarTiposDeRoles(idTipoDeRol:number){
      let tiposderoles : TiposDeRoles = new TiposDeRoles;
  
      tiposderoles.idTipoDeRol=idTipoDeRol;
      //agregamos los datos del formulario a la tabla tiposderoles
      tiposderoles.nombreTipoDeRol=this.FGAgregarTiposDeRoles.value.nombretipoderol;
            
     //suscrubimos la guardada de los datos en la tabla tiposderoles
      this.tiposderolesService.Edit(tiposderoles).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }

    
  
    enviarDatos() : void{
      let fgTiposDeRoles=this.FGAgregarTiposDeRoles.value;
      this.tiposderolesService.Get(fgTiposDeRoles.idTipoDeRol).subscribe({
        next : (datatiposderoles:TiposDeRoles) => {
         if(datatiposderoles.idTipoDeRol<=0){
          
          this.crearTiposDeRoles();
         }
         else if(datatiposderoles.idTipoDeRol>0){
          
          this.editarTiposDeRoles(datatiposderoles.idTipoDeRol);
         }
         
        }
      }); 
  
      
    }
  

}

 
 
  