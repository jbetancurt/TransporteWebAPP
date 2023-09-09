import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Adjuntos, AdjuntosService } from './';
import { TiposDeArchivosAdjuntos, TiposDeArchivosAdjuntosService } from '../tipos-de-archivos-adjuntos';

@Component({
  selector: 'app-adjuntos',
  templateUrl: './adjuntos.component.html',
  styleUrls: ['./adjuntos.component.css']
})


export class AdjuntosComponent implements OnInit {
  onAdd = new EventEmitter(); 
  @Input() idAdjunto = 0;
  editar:boolean=false;
  lstTiposDeArchivosAdjuntos:TiposDeArchivosAdjuntos[]=[];
  //lstadjuntos:Adjuntos[]=[];
  FGAgregarAdjuntos : FormGroup = this.formBuilder.group({      
    nombreadjunto:new FormControl('',Validators.required),
    nombrearchivoadjunto:new FormControl('',Validators.required),
    idAdjunto:new FormControl('0'),
    idTipoDeArchivoAdjunto:new FormControl('1')
  });

  
  cargarNombresAdjuntos(adjuntos:Adjuntos){
    this.FGAgregarAdjuntos.patchValue({
      nombreadjunto:adjuntos.nombreAdjunto,
      idAdjunto:adjuntos.idAdjunto,
      idTipoDeArchivoAdjunto : adjuntos.idTipoDeArchivoAdjunto,
      nombrearchivoadjunto:adjuntos.nombreArchivoAdjunto
    })
  }  
  public asignarid(idAdjunto:number){
    this.idAdjunto=idAdjunto;
    this.editar=true;
  }

  public AbrirInformacion()
  {
    if(this.idAdjunto>0)
    {
      this.adjuntosService.Get(this.idAdjunto.toString()).subscribe({
        next : (dataadjuntos:Adjuntos) => {
          this.cargarNombresAdjuntos(dataadjuntos);
        }
      });
    }
  }

  ngOnInit() {
    this.AbrirInformacion();
    this.listarTiposDeArchivosAdjuntos();
           
  }

  constructor(
    private tiposdearchivosadjuntosService: TiposDeArchivosAdjuntosService,
    private formBuilder: FormBuilder, 
    private adjuntosService: AdjuntosService) { }

    crearAdjuntos(){
      let adjuntos : Adjuntos = new Adjuntos;
  
      
      //agregamos los datos del formulario a la tabla personas
      adjuntos.nombreAdjunto=this.FGAgregarAdjuntos.value.nombreadjunto;
      adjuntos.idAdjunto=this.FGAgregarAdjuntos.value.idAdjunto;
      adjuntos.idTipoDeArchivoAdjunto=this.FGAgregarAdjuntos.value.idTipoDeArchivoAdjunto;
      adjuntos.nombreArchivoAdjunto=this.FGAgregarAdjuntos.value.nombrearchivoadjunto;
      
     //suscrubimos la guardada de los datos en la tabla adjuntos
      this.adjuntosService.create(adjuntos).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }
    listarTiposDeArchivosAdjuntos(){ 
      this.tiposdearchivosadjuntosService.GetAll().subscribe({
        next : (lsttiposdearchivosadjuntos:TiposDeArchivosAdjuntos[]) => { 
          this.lstTiposDeArchivosAdjuntos=lsttiposdearchivosadjuntos;
        }
      });
    }
  
    editarAdjuntos(idAdjunto:number){
      let adjuntos : Adjuntos = new Adjuntos;
  
      adjuntos.idAdjunto=idAdjunto;
      //agregamos los datos del formulario a la tabla adjuntos
      adjuntos.nombreAdjunto=this.FGAgregarAdjuntos.value.nombreadjunto;
      adjuntos.idTipoDeArchivoAdjunto=this.FGAgregarAdjuntos.value.idTipoDeArchivoAdjunto;
      adjuntos.nombreArchivoAdjunto=this.FGAgregarAdjuntos.value.nombrearchivoadjunto;
            
           
    
      //suscrubimos la guardada de los datos en la tabla adjuntos
      this.adjuntosService.Edit(adjuntos).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }

    
  
    enviarDatos() : void{
      let fgAdjuntos=this.FGAgregarAdjuntos.value;
      this.adjuntosService.Get(fgAdjuntos.idAdjunto).subscribe({
        next : (dataadjuntos:Adjuntos) => {
         if(dataadjuntos.idAdjunto<=0){
          
          this.crearAdjuntos();
         }
         else if(dataadjuntos.idAdjunto>0){
          
          this.editarAdjuntos(dataadjuntos.idAdjunto);
         }
         
        }
      }); 
  
      
    }
  

}
