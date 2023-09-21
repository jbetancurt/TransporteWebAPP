import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TiposDeEmpresas } from './tipos-de-empresas.model';
import { TiposDeEmpresasService } from './tipos-de-empresas.service';

@Component({
  selector: 'app-tipos-de-empresas',
  templateUrl: './tipos-de-empresas.component.html',
  styleUrls: ['./tipos-de-empresas.component.scss']
})
export class TiposDeEmpresasComponent implements OnInit {
  
onAdd = new EventEmitter(); 
@Input() idTipoDeEmpresa = 0;
editar:boolean=false;
//lsttiposdeempresas:TiposDeEmpresas[]=[];
FGAgregarTiposDeEmpresas : FormGroup = this.formBuilder.group({      
  nombretipodeempresa:new FormControl('',Validators.required),
  idTipoDeEmpresa:new FormControl('0')
});


cargarNombresTiposDeEmpresas(tiposdeempresas:TiposDeEmpresas){
  this.FGAgregarTiposDeEmpresas.patchValue({
    nombretipodeempresa:tiposdeempresas.nombreTipoDeEmpresa,
    idTipoDeEmpresa:tiposdeempresas.idTipoDeEmpresa
  })
}  
public asignarid(idTipoDeEmpresa:number){
  this.idTipoDeEmpresa=idTipoDeEmpresa;
  this.editar=true;
}

public AbrirInformacion()
{
  if(this.idTipoDeEmpresa>0)
  {
    this.tiposdeempresasService.Get(this.idTipoDeEmpresa.toString()).subscribe({
      next : (datatiposdeempresas:TiposDeEmpresas) => {
        this.cargarNombresTiposDeEmpresas(datatiposdeempresas);
      }
    });
  }
}

ngOnInit() {
  this.AbrirInformacion();
          
}

constructor(
  private formBuilder: FormBuilder, 
  private tiposdeempresasService: TiposDeEmpresasService) { }

  crearTiposDeEmpresas(){
    let tiposdeempresas : TiposDeEmpresas = new TiposDeEmpresas;

    
    //agregamos los datos del formulario a la tabla personas
    tiposdeempresas.nombreTipoDeEmpresa=this.FGAgregarTiposDeEmpresas.value.nombretipodeempresa;
    
    
    //suscrubimos la guardada de los datos en la tabla tiposdeempresas
    this.tiposdeempresasService.create(tiposdeempresas).subscribe(
      data => {
        this.onAdd.emit();
      }
    ); 
    
  }

  editarTiposDeEmpresas(idTipoDeEmpresa:number){
    let tiposdeempresas : TiposDeEmpresas = new TiposDeEmpresas;

    tiposdeempresas.idTipoDeEmpresa=idTipoDeEmpresa;
    //agregamos los datos del formulario a la tabla tiposdeempresas
    tiposdeempresas.nombreTipoDeEmpresa=this.FGAgregarTiposDeEmpresas.value.nombretipodeempresa;
          
    //suscrubimos la guardada de los datos en la tabla tiposdeempresas
    this.tiposdeempresasService.Edit(tiposdeempresas).subscribe(
      data => {
        this.onAdd.emit();
      }
    ); 
    
  }

  

  enviarDatos() : void{
    let fgTiposDeEmpresas=this.FGAgregarTiposDeEmpresas.value;
    this.tiposdeempresasService.Get(fgTiposDeEmpresas.idTipoDeEmpresa).subscribe({
      next : (datatiposdeempresas:TiposDeEmpresas) => {
        if(datatiposdeempresas.idTipoDeEmpresa<=0){
        
        this.crearTiposDeEmpresas();
        }
        else if(datatiposdeempresas.idTipoDeEmpresa>0){
        
        this.editarTiposDeEmpresas(datatiposdeempresas.idTipoDeEmpresa);
        }
        
      }
    }); 

    
  }

  
}