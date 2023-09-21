
 import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TiposDeArchivosAdjuntos } from './tipos-de-archivos-adjuntos.model';
import { TiposDeArchivosAdjuntosService } from './tipos-de-archivos-adjuntos.service';

@Component({
  selector: 'app-tipos-de-archivos-adjuntos',
  templateUrl: './tipos-de-archivos-adjuntos.component.html',
  styleUrls: ['./tipos-de-archivos-adjuntos.component.scss']
})
export class TiposDeArchivosAdjuntosComponent implements OnInit {
  
  onAdd = new EventEmitter(); 
  @Input() idTipoDeArchivoAdjunto = 0;
  editar:boolean=false;
  //lsttiposdearchivosadjuntos:TiposDeArchivosAdjuntos[]=[];
  FGAgregarTiposDeArchivosAdjuntos : FormGroup = this.formBuilder.group({      
    nombretipodearchivoadjunto:new FormControl('',Validators.required),
    idTipoDeArchivoAdjunto:new FormControl('0')
  });

  
  cargarNombresTiposDeArchivosAdjuntos(tiposdearchivosadjuntos:TiposDeArchivosAdjuntos){
    this.FGAgregarTiposDeArchivosAdjuntos.patchValue({
      nombretipodearchivoadjunto:tiposdearchivosadjuntos.nombreTipoDeArchivoAdjunto,
      idTipoDeArchivoAdjunto:tiposdearchivosadjuntos.idTipoDeArchivoAdjunto
    })
  }  
  public asignarid(idTipoDeArchivoAdjunto:number){
    this.idTipoDeArchivoAdjunto=idTipoDeArchivoAdjunto;
    this.editar=true;
  }

  public AbrirInformacion()
  {
    if(this.idTipoDeArchivoAdjunto>0)
    {
      this.tiposdearchivosadjuntosService.Get(this.idTipoDeArchivoAdjunto.toString()).subscribe({
        next : (datatiposdearchivosadjuntos:TiposDeArchivosAdjuntos) => {
          this.cargarNombresTiposDeArchivosAdjuntos(datatiposdearchivosadjuntos);
        }
      });
    }
  }

  ngOnInit() {
    this.AbrirInformacion();
           
  }

  constructor(
    private formBuilder: FormBuilder, 
    private tiposdearchivosadjuntosService: TiposDeArchivosAdjuntosService) { }

    crearTiposDeArchivosAdjuntos(){
      let tiposdearchivosadjuntos : TiposDeArchivosAdjuntos = new TiposDeArchivosAdjuntos;
  
      
      //agregamos los datos del formulario a la tabla personas
      tiposdearchivosadjuntos.nombreTipoDeArchivoAdjunto=this.FGAgregarTiposDeArchivosAdjuntos.value.nombretipodearchivoadjunto;
      
      
     //suscrubimos la guardada de los datos en la tabla tiposdearchivosadjuntos
      this.tiposdearchivosadjuntosService.create(tiposdearchivosadjuntos).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }
  
    editarTiposDeArchivosAdjuntos(idTipoDeArchivoAdjunto:number){
      let tiposdearchivosadjuntos : TiposDeArchivosAdjuntos = new TiposDeArchivosAdjuntos;
  
      tiposdearchivosadjuntos.idTipoDeArchivoAdjunto=idTipoDeArchivoAdjunto;
      //agregamos los datos del formulario a la tabla tiposdearchivosadjuntos
      tiposdearchivosadjuntos.nombreTipoDeArchivoAdjunto=this.FGAgregarTiposDeArchivosAdjuntos.value.nombretipodearchivoadjunto;
            
     //suscrubimos la guardada de los datos en la tabla tiposdearchivosadjuntos
      this.tiposdearchivosadjuntosService.Edit(tiposdearchivosadjuntos).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }

    
  
    enviarDatos() : void{
      let fgTiposDeArchivosAdjuntos=this.FGAgregarTiposDeArchivosAdjuntos.value;
      this.tiposdearchivosadjuntosService.Get(fgTiposDeArchivosAdjuntos.idTipoDeArchivoAdjunto).subscribe({
        next : (datatiposdearchivosadjuntos:TiposDeArchivosAdjuntos) => {
         if(datatiposdearchivosadjuntos.idTipoDeArchivoAdjunto<=0){
          
          this.crearTiposDeArchivosAdjuntos();
         }
         else if(datatiposdearchivosadjuntos.idTipoDeArchivoAdjunto>0){
          
          this.editarTiposDeArchivosAdjuntos(datatiposdearchivosadjuntos.idTipoDeArchivoAdjunto);
         }
         
        }
      }); 
  
      
    }
  

}
