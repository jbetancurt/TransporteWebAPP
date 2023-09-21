import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RequisitosAdjuntos, RequisitosAdjuntosService } from '../requisitos-adjuntos';
import { Requisitos, RequisitosService } from '../requisitos';
import { Adjuntos, AdjuntosService } from '../adjuntos';


@Component({
  selector: 'app-requisitos-adjuntos',
  templateUrl: './requisitos-adjuntos.component.html',
  styleUrls: ['./requisitos-adjuntos.component.scss']
})



export class RequisitosAdjuntosComponent implements OnInit {
  onAdd = new EventEmitter(); 
  @Input() idRequisitoAdjunto = 0;
  editar:boolean=false;
  
  checked = false;
  indeterminate = false;
  labelPosition = 'after';
  disabled = false;

  lstRequisitos:Requisitos[]=[];
  lstAdjuntos : Adjuntos[]=[];
  //lstrequisitosadjuntos:RequisitosAdjuntos[]=[];
  FGAgregarRequisitosAdjuntos : FormGroup = this.formBuilder.group({      
    idRequisitoAdjunto: new FormControl('0'),
    idRequisito:new FormControl(0,Validators.required),
    idAdjunto:new FormControl(0,Validators.required),
    
  
  });
    
  cargarNombresRequisitosAdjuntos(requisitosadjuntos:RequisitosAdjuntos){
    this.requisitosadjuntosService.Get(requisitosadjuntos.idRequisitoAdjunto.toString()).subscribe({ 
      next : (datarequisitosadjuntos:RequisitosAdjuntos) => {
        if (datarequisitosadjuntos.idRequisitoAdjunto>0){
          this.FGAgregarRequisitosAdjuntos.patchValue({
            idRequisitoAdjunto:requisitosadjuntos.idRequisitoAdjunto,
            idAdjunto:requisitosadjuntos.idAdjunto,
            idRequisito:requisitosadjuntos.idRequisito
            
          });
        }        
      }
    });
    
  }  
  
  
  
  public asignarid(idRequisitoAdjunto:number){
    this.idRequisitoAdjunto=idRequisitoAdjunto;
    this.editar=true;
  }
  
  public AbrirInformacion()
  {
    if(this.idRequisitoAdjunto>0)
    {
      this.requisitosadjuntosService.Get(this.idRequisitoAdjunto.toString()).subscribe({
        next : (datarequisitosadjuntos:RequisitosAdjuntos) => {
          this.cargarNombresRequisitosAdjuntos(datarequisitosadjuntos);
        }
      });
    }
  }

  ngOnInit() {
    
    this.AbrirInformacion();
    this.listarAdjuntos();
    this.listarRequisitos();
  }

  constructor(
    private adjuntosService: AdjuntosService,
    private requisitosService: RequisitosService,
    private formBuilder: FormBuilder, 
    private requisitosadjuntosService: RequisitosAdjuntosService) { }

    
    listarAdjuntos(){ 
      this.adjuntosService.GetAll().subscribe({
        next : (lstadjuntos:Adjuntos[]) => { 
          this.lstAdjuntos=lstadjuntos;
        }
      });
    }

    listarRequisitos(){ 
      this.requisitosService.GetAll().subscribe({
        next : (lstrequisitos:Requisitos[]) => { 
          this.lstRequisitos=lstrequisitos;
        }
      });
    }

    crearRequisitosAdjuntos(){
      let requisitosadjuntos : RequisitosAdjuntos = new RequisitosAdjuntos;
  
      
      //agregamos los datos del formulario a la tabla requisitos
      requisitosadjuntos.idRequisitoAdjunto=this.FGAgregarRequisitosAdjuntos.value.idRequisitoAdjunto;
      requisitosadjuntos.idAdjunto=this.FGAgregarRequisitosAdjuntos.value.idAdjunto;
      requisitosadjuntos.idRequisito=this.FGAgregarRequisitosAdjuntos.value.idRequisito;
      
     //suscrubimos la guardada de los datos en la tabla requisitosadjuntos
      this.requisitosadjuntosService.create(requisitosadjuntos).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }
    
     
    editarRequisitosAdjuntos(idRequisitoAdjunto:number){
      let requisitosadjuntos : RequisitosAdjuntos = new RequisitosAdjuntos;
  //agregamos los datos del formulario a la tabla requisitosadjuntos
      requisitosadjuntos.idRequisitoAdjunto=idRequisitoAdjunto;
      requisitosadjuntos.idAdjunto=this.FGAgregarRequisitosAdjuntos.value.idAdjunto;
      requisitosadjuntos.idRequisito=this.FGAgregarRequisitosAdjuntos.value.idRequisito;
     
      
      //suscrubimos la guardada de los datos en la tabla requisitosadjuntos
      this.requisitosadjuntosService.Edit(requisitosadjuntos).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }

    
  
    enviarDatos() : void{
      let fgRequisitosAdjuntos=this.FGAgregarRequisitosAdjuntos.value;
      this.requisitosadjuntosService.Get(fgRequisitosAdjuntos.idRequisitoAdjunto).subscribe({
        next : (datarequisitosadjuntos:RequisitosAdjuntos) => {
         if(datarequisitosadjuntos.idRequisitoAdjunto<=0){
          
          this.crearRequisitosAdjuntos();
         }
         else if(datarequisitosadjuntos.idRequisitoAdjunto>0){
          
          this.editarRequisitosAdjuntos(datarequisitosadjuntos.idRequisitoAdjunto);
         }
         
        }
      }); 
  
      
    }
  

}
