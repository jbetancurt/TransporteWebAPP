import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TiposDeRequisitos } from './tipos-de-requisitos.model';
import { TiposDeRequisitosService } from './tipos-de-requisitos.service';

@Component({
  selector: 'app-tipos-de-requisitos',
  templateUrl: './tipos-de-requisitos.component.html',
  styleUrls: ['./tipos-de-requisitos.component.scss']
})
export class TiposDeRequisitosComponent implements OnInit {
  
  onAdd = new EventEmitter(); 
  @Input() idTipoDeRequisito = 0;
  editar:boolean=false;
  //lsttiposderequisitos:TiposDeRequisitos[]=[];
  FGAgregarTiposDeRequisitos : FormGroup = this.formBuilder.group({      
    nombretipoderequisito:new FormControl('',Validators.required),
    idTipoDeRequisito:new FormControl('0')
  });

  
  cargarNombresTiposDeRequisitos(tiposderequisitos:TiposDeRequisitos){
    this.FGAgregarTiposDeRequisitos.patchValue({
      nombretipoderequisito:tiposderequisitos.nombreTipoDeRequisito,
      idTipoDeRequisito:tiposderequisitos.idTipoDeRequisito
    })
  }  
  public asignarid(idTipoDeRequisito:number){
    this.idTipoDeRequisito=idTipoDeRequisito;
    this.editar=true;
  }

  public AbrirInformacion()
  {
    if(this.idTipoDeRequisito>0)
    {
      this.tiposderequisitosService.Get(this.idTipoDeRequisito.toString()).subscribe({
        next : (datatiposderequisitos:TiposDeRequisitos) => {
          this.cargarNombresTiposDeRequisitos(datatiposderequisitos);
        }
      });
    }
  }

  ngOnInit() {
    this.AbrirInformacion();
           
  }

  constructor(
    private formBuilder: FormBuilder, 
    private tiposderequisitosService: TiposDeRequisitosService) { }

    crearTiposDeRequisitos(){
      let tiposderequisitos : TiposDeRequisitos = new TiposDeRequisitos;
  
      
      //agregamos los datos del formulario a la tabla personas
      tiposderequisitos.nombreTipoDeRequisito=this.FGAgregarTiposDeRequisitos.value.nombretipoderequisito;
      
      
     //suscrubimos la guardada de los datos en la tabla tiposderequisitos
      this.tiposderequisitosService.create(tiposderequisitos).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }
  
    editarTiposDeRequisitos(idTipoDeRequisito:number){
      let tiposderequisitos : TiposDeRequisitos = new TiposDeRequisitos;
  
      tiposderequisitos.idTipoDeRequisito=idTipoDeRequisito;
      //agregamos los datos del formulario a la tabla tiposderequisitos
      tiposderequisitos.nombreTipoDeRequisito=this.FGAgregarTiposDeRequisitos.value.nombretipoderequisito;
            
     //suscrubimos la guardada de los datos en la tabla tiposderequisitos
      this.tiposderequisitosService.Edit(tiposderequisitos).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }

    
  
    enviarDatos() : void{
      let fgTiposDeRequisitos=this.FGAgregarTiposDeRequisitos.value;
      this.tiposderequisitosService.Get(fgTiposDeRequisitos.idTipoDeRequisito).subscribe({
        next : (datatiposderequisitos:TiposDeRequisitos) => {
         if(datatiposderequisitos.idTipoDeRequisito<=0){
          
          this.crearTiposDeRequisitos();
         }
         else if(datatiposderequisitos.idTipoDeRequisito>0){
          
          this.editarTiposDeRequisitos(datatiposderequisitos.idTipoDeRequisito);
         }
         
        }
      }); 
  
      
    }
  

}

 
 
  