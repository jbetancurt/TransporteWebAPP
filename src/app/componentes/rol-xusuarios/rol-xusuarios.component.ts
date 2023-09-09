import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RolXUsuarios, RolXUsuariosService } from './';
import { Roles, RolesService } from '../roles';
import { Usuarios, UsuariosService } from '../usuarios';

@Component({
  selector: 'app-rol-xusuarios',
  templateUrl: './rol-xusuarios.component.html',
  styleUrls: ['./rol-xusuarios.component.css']
})

export class RolXUsuariosComponent implements OnInit {
  onAdd = new EventEmitter(); 
  @Input() idRolXUsuario = 0;
  editar:boolean=false;
  lstRoles:Roles[]=[];
  lstUsuarios:Usuarios[]=[];
  //lstrolxusuarios:RolXUsuarios[]=[];
  FGAgregarRolXUsuarios : FormGroup = this.formBuilder.group({      
    idRolXUsuario:new FormControl('0'),
    idRol:new FormControl('1'),
    idUsuario:new FormControl('1'),
    activo:false
  });

  
  cargarNombresRolXUsuarios(rolxusuarios:RolXUsuarios){
    this.FGAgregarRolXUsuarios.patchValue({
      idRolXUsuario:rolxusuarios.idRolXUsuario,
      idRol : rolxusuarios.idRol,
      idUsuario:rolxusuarios.idUsuario,
      activo:rolxusuarios.activo ?? false
   })
  }  
  public asignarid(idRolXUsuario:number){
    this.idRolXUsuario=idRolXUsuario;
    this.editar=true;
  }

  public AbrirInformacion()
  {
    if(this.idRolXUsuario>0)
    {
      this.rolxusuariosService.Get(this.idRolXUsuario.toString()).subscribe({
        next : (datarolxusuarios:RolXUsuarios) => {
          this.cargarNombresRolXUsuarios(datarolxusuarios);
        }
      });
    }
  }

  ngOnInit() {
    this.AbrirInformacion();
    this.listarRoles();
    this.listarUsuarios();
           
  }

  constructor(
    private rolesService: RolesService,
    private usuariosService: UsuariosService,
    private formBuilder: FormBuilder, 
    private rolxusuariosService: RolXUsuariosService) { }

    crearRolXUsuarios(){
      let rolxusuarios : RolXUsuarios = new RolXUsuarios;
  
      
      //agregamos los datos del formulario a la tabla personas
      rolxusuarios.idRolXUsuario=this.FGAgregarRolXUsuarios.value.idRolXUsuario;
      rolxusuarios.idRol=this.FGAgregarRolXUsuarios.value.idRol;
      rolxusuarios.idUsuario=this.FGAgregarRolXUsuarios.value.idUsuario;
      rolxusuarios.activo=this.FGAgregarRolXUsuarios.value.activo;
      
     //suscrubimos la guardada de los datos en la tabla rolxusuarios
      this.rolxusuariosService.create(rolxusuarios).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }
    listarRoles(){ 
      this.rolesService.GetAll().subscribe({
        next : (lstroles:Roles[]) => { 
          this.lstRoles=lstroles;
        }
      });
    }

    listarUsuarios(){
      this.usuariosService.GetAll().subscribe({
        next : (lstusuarios:Usuarios[]) => {
          this.lstUsuarios=lstusuarios;
        }
      });
    }
  
    editarRolXUsuarios(idRolXUsuario:number){
      let rolxusuarios : RolXUsuarios = new RolXUsuarios;
  
      rolxusuarios.idRolXUsuario=idRolXUsuario;
      rolxusuarios.idRol=this.FGAgregarRolXUsuarios.value.idRol;
      rolxusuarios.idUsuario=this.FGAgregarRolXUsuarios.value.idUsuario;
      rolxusuarios.activo=this.FGAgregarRolXUsuarios.value.activo;
      
      //suscrubimos la guardada de los datos en la tabla rolxusuarios
      this.rolxusuariosService.Edit(rolxusuarios).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }

    
  
    enviarDatos() : void{
      let fgRolXUsuarios=this.FGAgregarRolXUsuarios.value;
      this.rolxusuariosService.Get(fgRolXUsuarios.idRolXUsuario).subscribe({
        next : (datarolxusuarios:RolXUsuarios) => {
         if(datarolxusuarios.idRolXUsuario<=0){
          
          this.crearRolXUsuarios();
         }
         else if(datarolxusuarios.idRolXUsuario>0){
          
          this.editarRolXUsuarios(datarolxusuarios.idRolXUsuario);
         }
         
        }
      }); 
  
      
    }
  

}
