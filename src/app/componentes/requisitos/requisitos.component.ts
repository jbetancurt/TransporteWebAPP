import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Requisitos, RequisitosService } from './';
import { Empresas, EmpresasService } from '../empresas';

@Component({
  selector: 'app-requisitos',
  templateUrl: './requisitos.component.html',
  styleUrls: ['./requisitos.component.scss']
})

export class RequisitosComponent implements OnInit {
  onAdd = new EventEmitter(); 
  @Input() idRequisito = 0;
  editar:boolean=false;
  lstEmpresas:Empresas[]=[];
  //lstrequisitos:Requisitos[]=[];
  FGAgregarRequisitos : FormGroup = this.formBuilder.group({      
    idRequisito:new FormControl('0'),
    idEmpresa:new FormControl('1'),
    nombrerequisito:new FormControl('',Validators.required),
    requeridoRequisito: false,
    adjuntoRequisito: false,
    validacionUnicaRequisito:false
    
  });
  
  
  cargarNombresRequisitos(requisitos:Requisitos){
    this.FGAgregarRequisitos.patchValue({
      idRequisito:requisitos.idRequisito,
      idEmpresa : requisitos.idEmpresa,
      nombrerequisito:requisitos.nombreRequisito,
      requeridoRequisito:requisitos.requeridoRequisito ?? false,
      adjuntoRequisito:requisitos.adjuntoRequisito ?? false,
      validacionUnicaRequisito:requisitos.validacionUnicaRequisito ?? false
    })
  }  
  public asignarid(idRequisito:number){
    this.idRequisito=idRequisito;
    this.editar=true;
  }

  public AbrirInformacion()
  {
    if(this.idRequisito>0)
    {
      this.requisitosService.Get(this.idRequisito.toString()).subscribe({
        next : (datarequisitos:Requisitos) => {
          this.cargarNombresRequisitos(datarequisitos);
        }
      });
    }
  }

  ngOnInit() {
    this.AbrirInformacion();
    this.listarEmpresas();
           
  }

  constructor(
    private empresasService: EmpresasService,
    private formBuilder: FormBuilder, 
    private requisitosService: RequisitosService) { }

    crearRequisitos(){
      let requisitos : Requisitos = new Requisitos;
  
      
      //agregamos los datos del formulario a la tabla personas
      requisitos.idRequisito=this.FGAgregarRequisitos.value.idRequisito;
      requisitos.idEmpresa=this.FGAgregarRequisitos.value.idEmpresa;
      requisitos.nombreRequisito=this.FGAgregarRequisitos.value.nombrerequisito;
      requisitos.requeridoRequisito=this.FGAgregarRequisitos.value.requeridoRequisito;
      requisitos.adjuntoRequisito=this.FGAgregarRequisitos.value.adjuntoRequisito;
      requisitos.validacionUnicaRequisito=this.FGAgregarRequisitos.value.validacionUnicaRequisito;
      
      
      
     //suscrubimos la guardada de los datos en la tabla requisitos
      this.requisitosService.create(requisitos).subscribe(
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
  
    editarRequisitos(idRequisito:number){
      let requisitos : Requisitos = new Requisitos;
  
      requisitos.idRequisito=idRequisito;
      requisitos.idEmpresa=this.FGAgregarRequisitos.value.idEmpresa;
      requisitos.nombreRequisito=this.FGAgregarRequisitos.value.nombrerequisito;
      requisitos.requeridoRequisito=this.FGAgregarRequisitos.value.requeridoRequisito;
      requisitos.adjuntoRequisito=this.FGAgregarRequisitos.value.adjuntoRequisito;
      requisitos.validacionUnicaRequisito=this.FGAgregarRequisitos.value.validacionUnicaRequisito;
      
      //suscrubimos la guardada de los datos en la tabla requisitos
      this.requisitosService.Edit(requisitos).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }

    
  
    enviarDatos() : void{
      let fgRequisitos=this.FGAgregarRequisitos.value;
      this.requisitosService.Get(fgRequisitos.idRequisito).subscribe({
        next : (datarequisitos:Requisitos) => {
         if(datarequisitos.idRequisito<=0){
          
          this.crearRequisitos();
         }
         else if(datarequisitos.idRequisito>0){
          
          this.editarRequisitos(datarequisitos.idRequisito);
         }
         
        }
      }); 
  
      
    }
  

}
