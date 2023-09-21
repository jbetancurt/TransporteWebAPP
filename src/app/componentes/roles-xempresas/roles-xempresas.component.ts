import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RolesXEmpresas, RolesXEmpresasService } from '../roles-xempresas';
import { Roles, RolesService } from '../roles';
import { Empresas, EmpresasService } from '../empresas';

@Component({
  selector: 'app-roles-xempresas',
  templateUrl: './roles-xempresas.component.html',
  styleUrls: ['./roles-xempresas.component.scss']
})

export class RolesXEmpresasComponent implements OnInit {
  onAdd = new EventEmitter(); 
  @Input() idRolXEmpresa = 0;
  editar:boolean=false;
  
  checked = false;
  indeterminate = false;
  labelPosition = 'after';
  disabled = false;

  lstRoles:Roles[]=[];
  lstEmpresas : Empresas[]=[];
  //lstrolesxempresas:RolesXEmpresas[]=[];
  FGAgregarRolesXEmpresas : FormGroup = this.formBuilder.group({      
    idRolXEmpresa: new FormControl('0'),
    idRol:new FormControl(0,Validators.required),
    idEmpresa:new FormControl(0,Validators.required),
    activo:false
  
  });
    
  cargarNombresRolesXEmpresas(rolesxempresas:RolesXEmpresas){
    this.rolesxempresasService.Get(rolesxempresas.idRolXEmpresa.toString()).subscribe({ 
      next : (datarolesxempresas:RolesXEmpresas) => {
        if (datarolesxempresas.idRolXEmpresa>0){
          this.FGAgregarRolesXEmpresas.patchValue({
            idRolXEmpresa:rolesxempresas.idRolXEmpresa,
            idEmpresa:rolesxempresas.idEmpresa,
            idRol:rolesxempresas.idRol,
            activo:rolesxempresas.activo          });
        }        
      }
    });
    
  }  
  
  
  
  public asignarid(idRolXEmpresa:number){
    this.idRolXEmpresa=idRolXEmpresa;
    this.editar=true;
  }
  
  public AbrirInformacion()
  {
    if(this.idRolXEmpresa>0)
    {
      this.rolesxempresasService.Get(this.idRolXEmpresa.toString()).subscribe({
        next : (datarolesxempresas:RolesXEmpresas) => {
          this.cargarNombresRolesXEmpresas(datarolesxempresas);
        }
      });
    }
  }

  ngOnInit() {
    this.AbrirInformacion();
    this.listarEmpresas();
    this.listarRoles();
  }

  constructor(
    private empresasService: EmpresasService,
    private rolesService: RolesService,
    private formBuilder: FormBuilder, 
    private rolesxempresasService: RolesXEmpresasService) { }
    

    
    listarEmpresas(){ 
      this.empresasService.GetAll().subscribe({
        next : (lstempresas:Empresas[]) => { 
          this.lstEmpresas=lstempresas;
        }
      });
    }

    listarRoles(){ 
      this.rolesService.GetAll().subscribe({
        next : (lstroles:Roles[]) => { 
          this.lstRoles=lstroles;
        }
      });
    }

    crearRolesXEmpresas(){
      let rolesxempresas : RolesXEmpresas = new RolesXEmpresas;
  
      
      //agregamos los datos del formulario a la tabla roles
      rolesxempresas.idRolXEmpresa=this.FGAgregarRolesXEmpresas.value.idRolXEmpresa;
      rolesxempresas.idEmpresa=this.FGAgregarRolesXEmpresas.value.idEmpresa;
      rolesxempresas.idRol=this.FGAgregarRolesXEmpresas.value.idRol;
      rolesxempresas.activo=this.FGAgregarRolesXEmpresas.value.activo;
      
            
     //suscrubimos la guardada de los datos en la tabla rolesxempresas
      this.rolesxempresasService.create(rolesxempresas).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }
    
     
    editarRolesXEmpresas(idRolXEmpresa:number){
      let rolesxempresas : RolesXEmpresas = new RolesXEmpresas;
  //agregamos los datos del formulario a la tabla rolesxempresas
      rolesxempresas.idRolXEmpresa=idRolXEmpresa;
      rolesxempresas.idEmpresa=this.FGAgregarRolesXEmpresas.value.idEmpresa;
      rolesxempresas.idRol=this.FGAgregarRolesXEmpresas.value.idRol;
      rolesxempresas.activo=this.FGAgregarRolesXEmpresas.value.activo;
      
      
      //suscrubimos la guardada de los datos en la tabla rolesxempresas
      this.rolesxempresasService.Edit(rolesxempresas).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }

    
  
    enviarDatos() : void{
      let fgRolesXEmpresas=this.FGAgregarRolesXEmpresas.value;
      this.rolesxempresasService.Get(fgRolesXEmpresas.idRolXEmpresa).subscribe({
        next : (datarolesxempresas:RolesXEmpresas) => {
         if(datarolesxempresas.idRolXEmpresa<=0){
          
          this.crearRolesXEmpresas();
         }
         else if(datarolesxempresas.idRolXEmpresa>0){
          
          this.editarRolesXEmpresas(datarolesxempresas.idRolXEmpresa);
         }
         
        }
      }); 
  
      
    }
  

}
