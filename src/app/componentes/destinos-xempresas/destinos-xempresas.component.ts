import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DestinosXEmpresas, DestinosXEmpresasService } from './';
import { Empresas, EmpresasService } from '../empresas';
import { Destinos, DestinosService } from '../destinos';


@Component({
  selector: 'app-destinos-xempresas',
  templateUrl: './destinos-xempresas.component.html',
  styleUrls: ['./destinos-xempresas.component.css']
})

export class DestinosXEmpresasComponent implements OnInit {
  onAdd = new EventEmitter(); 
  @Input() idDestinoXEmpresa = 0;
  editar:boolean=false;
  lstEmpresas:Empresas[]=[];
  lstDestinos:Destinos[]=[];
  
  //lstdestinosxempresas:DestinosXEmpresas[]=[];
  FGAgregarDestinosXEmpresas : FormGroup = this.formBuilder.group({      
    idDestinoXEmpresa:new FormControl('0'),
    idEmpresa:new FormControl('0'),
    idDestino:new FormControl('0'),
    idEmpresaSecundaria:new FormControl('0')
  });

  
  cargarNombresDestinosXEmpresas(destinosxempresas:DestinosXEmpresas){
    this.FGAgregarDestinosXEmpresas.patchValue({
      idDestinoXEmpresa:destinosxempresas.idDestinoXEmpresa,
      idEmpresa : destinosxempresas.idEmpresa,
      idDestino:destinosxempresas.idDestino,
      idEmpresaSecundaria:destinosxempresas.idEmpresaSecundaria
      
   })
  }  
  public asignarid(idDestinoXEmpresa:number){
    this.idDestinoXEmpresa=idDestinoXEmpresa;
    this.editar=true;
  }

  public AbrirInformacion()
  {
    if(this.idDestinoXEmpresa>0)
    {
      this.destinosxempresasService.Get(this.idDestinoXEmpresa.toString()).subscribe({
        next : (datadestinosxempresas:DestinosXEmpresas) => {
          this.cargarNombresDestinosXEmpresas(datadestinosxempresas);
        }
      });
    }
  }

  ngOnInit() {
    this.AbrirInformacion();
    this.listarEmpresas();
    this.listarDestinos();
   
           
  }

  constructor(
    private empresasService: EmpresasService,
    private destinosService: DestinosService,
    private formBuilder: FormBuilder, 
    private destinosxempresasService: DestinosXEmpresasService) { }

    crearDestinosXEmpresas(){
      let destinosxempresas : DestinosXEmpresas = new DestinosXEmpresas;
  
      
      //agregamos los datos del formulario a la tabla destinos
      destinosxempresas.idDestinoXEmpresa=this.FGAgregarDestinosXEmpresas.value.idDestinoXEmpresa;
      destinosxempresas.idEmpresa=this.FGAgregarDestinosXEmpresas.value.idEmpresa;
      destinosxempresas.idDestino=this.FGAgregarDestinosXEmpresas.value.idDestino;
      destinosxempresas.idEmpresaSecundaria=this.FGAgregarDestinosXEmpresas.value.idEmpresaSecundaria;
      
     //suscrubimos la guardada de los datos en la tabla destinosxempresas
      this.destinosxempresasService.create(destinosxempresas).subscribe(
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

    listarDestinos(){
      this.destinosService.GetAll().subscribe({
        next : (lstdestinos:Destinos[]) => {
          this.lstDestinos=lstdestinos;
        }
      });
    }

      
    editarDestinosXEmpresas(idDestinoXEmpresa:number){
      let destinosxempresas : DestinosXEmpresas = new DestinosXEmpresas;
  
      destinosxempresas.idDestinoXEmpresa=idDestinoXEmpresa;
      destinosxempresas.idEmpresa=this.FGAgregarDestinosXEmpresas.value.idEmpresa;
      destinosxempresas.idDestino=this.FGAgregarDestinosXEmpresas.value.idDestino;
      destinosxempresas.idEmpresaSecundaria=this.FGAgregarDestinosXEmpresas.value.idEmpresaSecundaria;  
      
      //suscribimos la guardada de los datos en la tabla destinosxempresas
      this.destinosxempresasService.Edit(destinosxempresas).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }

    
  
    enviarDatos() : void{
      let fgDestinosXEmpresas=this.FGAgregarDestinosXEmpresas.value;
      this.destinosxempresasService.Get(fgDestinosXEmpresas.idDestinoXEmpresa).subscribe({
        next : (datadestinosxempresas:DestinosXEmpresas) => {
         if(datadestinosxempresas.idDestinoXEmpresa<=0){
          
          this.crearDestinosXEmpresas();
         }
         else if(datadestinosxempresas.idDestinoXEmpresa>0){
          
          this.editarDestinosXEmpresas(datadestinosxempresas.idDestinoXEmpresa);
         }
         
        }
      }); 
  
      
    }
  

}