import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Roles, RolesService } from './';
import { TiposDeRoles, TiposDeRolesService } from '../tipos-de-roles';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})


export class RolesComponent implements OnInit {
  onAdd = new EventEmitter(); 
  @Input() idRol = 0;
  editar:boolean=false;
  lstTipoRoles:TiposDeRoles[]=[];
  //lstroles:Roles[]=[];
  FGAgregarRoles : FormGroup = this.formBuilder.group({      
    nombrerol:new FormControl('',Validators.required),
    idTipoDeRol:new FormControl('0'),
    idRol:new FormControl('0')
  });

  
  cargarNombresRoles(roles:Roles){
    this.FGAgregarRoles.patchValue({
      nombrerol:roles.nombreRol,
      idRol:roles.idRol,
      idTipoDeRol : roles.idTipoDeRol
    })
  }  
  public asignarid(idRol:number){
    this.idRol=idRol;
    this.editar=true;
  }

  public AbrirInformacion()
  {
    if(this.idRol>0)
    {
      this.rolesService.Get(this.idRol.toString()).subscribe({
        next : (dataroles:Roles) => {
          this.cargarNombresRoles(dataroles);
        }
      });
    }
  }

  ngOnInit() {
    this.AbrirInformacion();
    this.listarTiposDeRoles();
           
  }

  constructor(
    private tiposDeRolesService: TiposDeRolesService,
    private formBuilder: FormBuilder, 
    private rolesService: RolesService) { }

    crearRoles(){
      let roles : Roles = new Roles;
  
      
      //agregamos los datos del formulario a la tabla personas
      roles.nombreRol=this.FGAgregarRoles.value.nombrerol;
      roles.idTipoDeRol=this.FGAgregarRoles.value.idTipoDeRol;
      
      
     //suscrubimos la guardada de los datos en la tabla roles
      this.rolesService.create(roles).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }
    listarTiposDeRoles(){ 
      this.tiposDeRolesService.GetAll().subscribe({
        next : (lsttiposDeRoles:TiposDeRoles[]) => { 
          this.lstTipoRoles=lsttiposDeRoles;
        }
      });
    }
  
    editarRoles(idRol:number){
      let roles : Roles = new Roles;
  
      roles.idRol=idRol;
      //agregamos los datos del formulario a la tabla roles
      roles.nombreRol=this.FGAgregarRoles.value.nombrerol;
      roles.idTipoDeRol=this.FGAgregarRoles.value.idTipoDeRol;
            
           
    
      //suscrubimos la guardada de los datos en la tabla roles
      this.rolesService.Edit(roles).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }

    
  
    enviarDatos() : void{
      let fgRoles=this.FGAgregarRoles.value;
      this.rolesService.Get(fgRoles.idRol).subscribe({
        next : (dataroles:Roles) => {
         if(dataroles.idRol<=0){
          
          this.crearRoles();
         }
         else if(dataroles.idRol>0){
          
          this.editarRoles(dataroles.idRol);
         }
         
        }
      }); 
  
      
    }
  

}

 