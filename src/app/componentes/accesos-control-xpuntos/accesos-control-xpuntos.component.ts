import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AccesosControlXPuntos, AccesosControlXPuntosService } from './';
import { Empresas, EmpresasService } from '../empresas';
import { ControlesXPuntos, ControlesXPuntosService } from '../controles-xpuntos';
import { Roles, RolesService } from '../roles';


@Component({
  selector: 'app-accesos-control-xpuntos',
  templateUrl: './accesos-control-xpuntos.component.html',
  styleUrls: ['./accesos-control-xpuntos.component.css']
})

export class AccesosControlXPuntosComponent implements OnInit {
  onAdd = new EventEmitter(); 
  @Input() idAccesoControlXPunto = 0;
  editar:boolean=false;
  lstEmpresas:Empresas[]=[];
  lstControlesXPuntos:ControlesXPuntos[]=[];
  lstRoles:Roles[]=[];
  //lstaccesoscontrolxpuntos:AccesosControlXPuntos[]=[];
  FGAgregarAccesosControlXPuntos : FormGroup = this.formBuilder.group({      
    idAccesoControlXPunto:new FormControl('0'),
    idEmpresa:new FormControl('0'),
    idControlXPunto:new FormControl('0'),
    idRol:new FormControl('0')
    
  });

  
  cargarNombresAccesosControlXPuntos(accesoscontrolxpuntos:AccesosControlXPuntos){
    this.FGAgregarAccesosControlXPuntos.patchValue({
      idAccesoControlXPunto:accesoscontrolxpuntos.idAccesoControlXPunto,
      idEmpresa : accesoscontrolxpuntos.idEmpresa,
      idControlXPunto:accesoscontrolxpuntos.idControlXPunto,
      idRol:accesoscontrolxpuntos.idRol
      
      
   })
  }  
  public asignarid(idAccesoControlXPunto:number){
    this.idAccesoControlXPunto=idAccesoControlXPunto;
    this.editar=true;
  }

  public AbrirInformacion()
  {
    if(this.idAccesoControlXPunto>0)
    {
      this.accesoscontrolxpuntosService.Get(this.idAccesoControlXPunto.toString()).subscribe({
        next : (dataaccesoscontrolxpuntos:AccesosControlXPuntos) => {
          this.cargarNombresAccesosControlXPuntos(dataaccesoscontrolxpuntos);
        }
      });
    }
  }

  ngOnInit() {
    this.AbrirInformacion();
    this.listarEmpresas();
    this.listarControlesXPuntos();
    this.listarRoles();
           
  }

  constructor(
    private empresasService: EmpresasService,
    private controlesxpuntosService: ControlesXPuntosService,
    private rolesService: RolesService,
    private formBuilder: FormBuilder, 
    private accesoscontrolxpuntosService: AccesosControlXPuntosService) { }

    crearAccesosControlXPuntos(){
      let accesoscontrolxpuntos : AccesosControlXPuntos = new AccesosControlXPuntos;
  
      
      //agregamos los datos del formulario a la tabla controlesxpuntos
      accesoscontrolxpuntos.idAccesoControlXPunto=this.FGAgregarAccesosControlXPuntos.value.idAccesoControlXPunto;
      accesoscontrolxpuntos.idEmpresa=this.FGAgregarAccesosControlXPuntos.value.idEmpresa;
      accesoscontrolxpuntos.idControlXPunto=this.FGAgregarAccesosControlXPuntos.value.idControlXPunto;
      accesoscontrolxpuntos.idRol=this.FGAgregarAccesosControlXPuntos.value.idRol;
      
     //suscrubimos la guardada de los datos en la tabla accesoscontrolxpuntos
      this.accesoscontrolxpuntosService.create(accesoscontrolxpuntos).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }
    listarEmpresas(){ 
      this.empresasService.GetAll().subscribe({
        next : (lstempresas:Empresas[]) => { 
          this.lstEmpresas=lstempresas;
        }
      });
    }

    listarControlesXPuntos(){
      this.controlesxpuntosService.GetAll().subscribe({
        next : (lstcontrolesxpuntos:ControlesXPuntos[]) => {
          this.lstControlesXPuntos=lstcontrolesxpuntos;
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
  
    editarAccesosControlXPuntos(idAccesoControlXPunto:number){
      let accesoscontrolxpuntos : AccesosControlXPuntos = new AccesosControlXPuntos;
  
      accesoscontrolxpuntos.idAccesoControlXPunto=idAccesoControlXPunto;
      accesoscontrolxpuntos.idEmpresa=this.FGAgregarAccesosControlXPuntos.value.idEmpresa;
      accesoscontrolxpuntos.idControlXPunto=this.FGAgregarAccesosControlXPuntos.value.idControlXPunto;
      accesoscontrolxpuntos.idRol=this.FGAgregarAccesosControlXPuntos.value.idRol;  
      
      //suscribimos la guardada de los datos en la tabla accesoscontrolxpuntos
      this.accesoscontrolxpuntosService.Edit(accesoscontrolxpuntos).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }

    
  
    enviarDatos() : void{
      let fgAccesosControlXPuntos=this.FGAgregarAccesosControlXPuntos.value;
      this.accesoscontrolxpuntosService.Get(fgAccesosControlXPuntos.idAccesoControlXPunto).subscribe({
        next : (dataaccesoscontrolxpuntos:AccesosControlXPuntos) => {
         if(dataaccesoscontrolxpuntos.idAccesoControlXPunto<=0){
          
          this.crearAccesosControlXPuntos();
         }
         else if(dataaccesoscontrolxpuntos.idAccesoControlXPunto>0){
          
          this.editarAccesosControlXPuntos(dataaccesoscontrolxpuntos.idAccesoControlXPunto);
         }
         
        }
      }); 
  
      
    }
  

}