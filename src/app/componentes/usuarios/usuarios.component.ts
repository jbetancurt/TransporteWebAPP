import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuarios, UsuariosService } from './';
import { Personas, PersonasService } from '../personas';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})


export class UsuariosComponent implements OnInit {
  onAdd = new EventEmitter(); 
  @Input() idUsuario = 0;
  editar:boolean=false;
  lstPersonas:Personas[]=[];
  //lstusuarios:Usuarios[]=[];
  FGAgregarUsuarios : FormGroup = this.formBuilder.group({      
    idUsuario:new FormControl('0'),
    idPersona:new FormControl('1'),
    nombreUsuario:new FormControl('',Validators.required),
    claveUsuario:new FormControl('',Validators.required),
    estadoUsuario:false
    
  });

  
  cargarNombresUsuarios(usuarios:Usuarios){
    this.FGAgregarUsuarios.patchValue({
      idUsuario:usuarios.idUsuario,
      idPersona : usuarios.idPersona,
      nombreUsuario:usuarios.nombreUsuario,
      claveUsuario:usuarios.claveUsuario,
      estadoUsuario:usuarios.estadoUsuario ?? false
    })
  }  
  public asignarid(idUsuario:number){
    this.idUsuario=idUsuario;
    this.editar=true;
  }

  public AbrirInformacion()
  {
    if(this.idUsuario>0)
    {
      this.usuariosService.Get(this.idUsuario.toString()).subscribe({
        next : (datausuarios:Usuarios) => {
          this.cargarNombresUsuarios(datausuarios);
        }
      });
    }
  }

  ngOnInit() {
    this.AbrirInformacion();
    this.listarPersonas();
           
  }

  constructor(
    private personasService: PersonasService,
    private formBuilder: FormBuilder, 
    private usuariosService: UsuariosService) { }

    crearUsuarios(){
      let usuarios : Usuarios = new Usuarios;
  
      
      //agregamos los datos del formulario a la tabla personas
      usuarios.idUsuario=this.FGAgregarUsuarios.value.idUsuario;
      usuarios.idPersona=this.FGAgregarUsuarios.value.idPersona;
      usuarios.nombreUsuario=this.FGAgregarUsuarios.value.nombreUsuario;
      usuarios.claveUsuario=this.FGAgregarUsuarios.value.claveUsuario;
      usuarios.estadoUsuario=this.FGAgregarUsuarios.value.estadoUsuario;
      
      
      
     //suscrubimos la guardada de los datos en la tabla usuarios
      this.usuariosService.create(usuarios).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }
    listarPersonas(){ 
      this.personasService.GetAll().subscribe({
        next : (lstpersonas:Personas[]) => { 
          this.lstPersonas=lstpersonas;
        }
      });
    }
  
    editarUsuarios(idUsuario:number){
      let usuarios : Usuarios = new Usuarios;
  
      usuarios.idUsuario=idUsuario;
      usuarios.idPersona=this.FGAgregarUsuarios.value.idPersona;
      //agregamos los datos del formulario a la tabla usuarios
      usuarios.nombreUsuario=this.FGAgregarUsuarios.value.nombreUsuario;
      usuarios.claveUsuario=this.FGAgregarUsuarios.value.claveUsuario;
      usuarios.estadoUsuario=this.FGAgregarUsuarios.value.estadoUsuario;
  
      //suscrubimos la guardada de los datos en la tabla usuarios
      this.usuariosService.Edit(usuarios).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }

    
  
    enviarDatos() : void{
      let fgUsuarios=this.FGAgregarUsuarios.value;
      this.usuariosService.Get(fgUsuarios.idUsuario).subscribe({
        next : (datausuarios:Usuarios) => {
         if(datausuarios.idUsuario<=0){
          
          this.crearUsuarios();
         }
         else if(datausuarios.idUsuario>0){
          
          this.editarUsuarios(datausuarios.idUsuario);
         }
         
        }
      }); 
  
      
    }
  

}
