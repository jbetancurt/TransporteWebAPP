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
  FGAgregarTiposDeDocumentos : FormGroup = this.formBuilder.group({      
    nombretipodedocumento:new FormControl('',Validators.required),
    idTipoDeDocumento:new FormControl('0')
  });

  
  cargarNombresTiposDeDocumentos(tiposdedocumentos:TiposDeDocumentos){
    this.FGAgregarTiposDeDocumentos.patchValue({
      nombretipodedocumento:tiposdedocumentos.nombreTipoDeDocumento,
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

    crearTiposDeDocumentos(){
      let tiposdedocumentos : TiposDeDocumentos = new TiposDeDocumentos;
  
      
      //agregamos los datos del formulario a la tabla personas
      tiposdedocumentos.nombreTipoDeDocumento=this.FGAgregarTiposDeDocumentos.value.nombretipodedocumento;
      
      
     //suscrubimos la guardada de los datos en la tabla tiposdedocumentos
      this.tiposdedocumentosService.create(tiposdedocumentos).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }
  
    editarTiposDeDocumentos(idTipoDeDocumento:number){
      let tiposdedocumentos : TiposDeDocumentos = new TiposDeDocumentos;
  
      tiposdedocumentos.idTipoDeDocumento=idTipoDeDocumento;
      //agregamos los datos del formulario a la tabla tiposdedocumentos
      tiposdedocumentos.nombreTipoDeDocumento=this.FGAgregarTiposDeDocumentos.value.nombretipodedocumento;
            
     //suscrubimos la guardada de los datos en la tabla tiposdedocumentos
      this.tiposdedocumentosService.Edit(tiposdedocumentos).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }

    
  
    enviarDatos() : void{
      let fgTiposDeDocumentos=this.FGAgregarTiposDeDocumentos.value;
      this.tiposdedocumentosService.Get(fgTiposDeDocumentos.idTipoDeDocumento).subscribe({
        next : (datatiposdedocumentos:TiposDeDocumentos) => {
         if(datatiposdedocumentos.idTipoDeDocumento<=0){
          
          this.crearTiposDeDocumentos();
         }
         else if(datatiposdedocumentos.idTipoDeDocumento>0){
          
          this.editarTiposDeDocumentos(datatiposdedocumentos.idTipoDeDocumento);
         }
         
        }
      }); 
  
      
    }
  

}
