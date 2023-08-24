import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TiposDeDocumentos } from './tipos-de-documentos.model';
import { TiposDeDocumentosService } from './tipos-de-documentos.service';

@Component({
  selector: 'app-tipos-de-documentos',
  templateUrl: './tipos-de-documentos.component.html',
  styleUrls: ['./tipos-de-documentos.component.css']
})
export class TiposDeDocumentosComponent implements OnInit {
  
  onAdd = new EventEmitter(); 
  @Input() idTipoDeDocumento = 0;
  editar:boolean=false;
  //lsttiposdedocumentos:TiposDeDocumentos[]=[];
  FGAgregarTipoDocumento : FormGroup = this.formBuilder.group({      
    nombretipodocumento:new FormControl('',Validators.required),
    idTipoDeDocumento:new FormControl('0')
  });

  
  cargarNombresTiposDeDocumentos(tiposdedocumentos:TiposDeDocumentos){
    this.FGAgregarTipoDocumento.patchValue({
      nombretipodocumento:tiposdedocumentos.nombreTipoDeDocumento,
      idTipoDeDocumento:tiposdedocumentos.idTipoDeDocumento
    })
  }  
  public asignarid(idTipoDeDocumento:number){
    this.idTipoDeDocumento=idTipoDeDocumento;
    this.editar=true;
  }

  public AbrirInformacion()
  {
    if(this.idTipoDeDocumento>0)
    {
      this.tiposdedocumentosService.Get(this.idTipoDeDocumento.toString()).subscribe({
        next : (datatiposdedocumentos:TiposDeDocumentos) => {
          this.cargarNombresTiposDeDocumentos(datatiposdedocumentos);
        }
      });
    }
  }

  ngOnInit() {
    this.AbrirInformacion();
           
  }

  constructor(
    private formBuilder: FormBuilder, 
    private tiposdedocumentosService: TiposDeDocumentosService) { }

    crearTipoDeDocumento(){
      let tiposdedocumentos : TiposDeDocumentos = new TiposDeDocumentos;
  
      
      //agregamos los datos del formulario a la tabla personas
      tiposdedocumentos.nombreTipoDeDocumento=this.FGAgregarTipoDocumento.value.nombretipodocumento;
      
      
     //suscrubimos la guardada de los datos en la tabla tiposdedocumentos
      this.tiposdedocumentosService.create(tiposdedocumentos).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }
  
    editarTipoDeDocumento(idtipodedocumento:number){
      let tiposdedocumentos : TiposDeDocumentos = new TiposDeDocumentos;
  
      tiposdedocumentos.idTipoDeDocumento=idtipodedocumento;
      //agregamos los datos del formulario a la tabla tiposdedocumentos
      tiposdedocumentos.nombreTipoDeDocumento=this.FGAgregarTipoDocumento.value.nombretipodocumento;
            
     //suscrubimos la guardada de los datos en la tabla tiposdedocumentos
      this.tiposdedocumentosService.Edit(tiposdedocumentos).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }
  
  
    enviarDatos() : void{
      let fgTipoDeDocumento=this.FGAgregarTipoDocumento.value;
      this.tiposdedocumentosService.Get(fgTipoDeDocumento.idTipoDeDocumento).subscribe({
        next : (datatiposdedocumentos:TiposDeDocumentos) => {
         if(datatiposdedocumentos.idTipoDeDocumento<=0){
          
          this.crearTipoDeDocumento();
         }
         else if(datatiposdedocumentos.idTipoDeDocumento>0){
          
          this.editarTipoDeDocumento(datatiposdedocumentos.idTipoDeDocumento);
         }
         
        }
      }); 
  
      
    }
  

}
