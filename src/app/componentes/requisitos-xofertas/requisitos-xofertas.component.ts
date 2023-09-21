import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RequisitosXOfertas, RequisitosXOfertasService } from '../requisitos-xofertas';
import { Ofertas, OfertasService } from '../ofertas';
import { Requisitos, RequisitosService } from '../requisitos';

@Component({
  selector: 'app-requisitos-xofertas',
  templateUrl: './requisitos-xofertas.component.html',
  styleUrls: ['./requisitos-xofertas.component.scss']
})

export class RequisitosXOfertasComponent implements OnInit {
  onAdd = new EventEmitter(); 
  @Input() idRequisitoXOferta = 0;
  editar:boolean=false;
  
  checked = false;
  indeterminate = false;
  labelPosition = 'after';
  disabled = false;

  lstOfertas:Ofertas[]=[];
  lstRequisitos : Requisitos[]=[];
  //lstrequisitosxofertas:RequisitosXOfertas[]=[];
  FGAgregarRequisitosXOfertas : FormGroup = this.formBuilder.group({      
    idRequisitoXOferta: new FormControl('0'),
    idOferta:new FormControl(0,Validators.required),
    idRequisito:new FormControl(0,Validators.required),
    requeridoRequisitoXOferta:false
  
  });
    
  cargarNombresRequisitosXOfertas(requisitosxofertas:RequisitosXOfertas){
    this.requisitosxofertasService.Get(requisitosxofertas.idRequisitoXOferta.toString()).subscribe({ 
      next : (datarequisitosxofertas:RequisitosXOfertas) => {
        if (datarequisitosxofertas.idRequisitoXOferta>0){
          this.FGAgregarRequisitosXOfertas.patchValue({
            idRequisitoXOferta:requisitosxofertas.idRequisitoXOferta,
            idRequisito:requisitosxofertas.idRequisito,
            idOferta:requisitosxofertas.idOferta,
            requeridoRequisitoXOferta:requisitosxofertas.requeridoRequisitoXOferta          });
        }        
      }
    });
    
  }  
  
  
  
  public asignarid(idRequisitoXOferta:number){
    this.idRequisitoXOferta=idRequisitoXOferta;
    this.editar=true;
  }
  
  public AbrirInformacion()
  {
    if(this.idRequisitoXOferta>0)
    {
      this.requisitosxofertasService.Get(this.idRequisitoXOferta.toString()).subscribe({
        next : (datarequisitosxofertas:RequisitosXOfertas) => {
          this.cargarNombresRequisitosXOfertas(datarequisitosxofertas);
        }
      });
    }
  }

  ngOnInit() {
    this.AbrirInformacion();
    this.listarRequisitos();
    this.listarOfertas();
  }

  constructor(
    private requisitosService: RequisitosService,
    private ofertasService: OfertasService,
    private formBuilder: FormBuilder, 
    private requisitosxofertasService: RequisitosXOfertasService) { }

    
    listarRequisitos(){ 
      this.requisitosService.GetAll().subscribe({
        next : (lstrequisitos:Requisitos[]) => { 
          this.lstRequisitos=lstrequisitos;
        }
      });
    }

    listarOfertas(){ 
      this.ofertasService.GetAll().subscribe({
        next : (lstofertas:Ofertas[]) => { 
          this.lstOfertas=lstofertas;
        }
      });
    }

    crearRequisitosXOfertas(){
      let requisitosxofertas : RequisitosXOfertas = new RequisitosXOfertas;
  
      
      //agregamos los datos del formulario a la tabla ofertas
      requisitosxofertas.idRequisitoXOferta=this.FGAgregarRequisitosXOfertas.value.idRequisitoXOferta;
      requisitosxofertas.idRequisito=this.FGAgregarRequisitosXOfertas.value.idRequisito;
      requisitosxofertas.idOferta=this.FGAgregarRequisitosXOfertas.value.idOferta;
      requisitosxofertas.requeridoRequisitoXOferta=this.FGAgregarRequisitosXOfertas.value.requeridoRequisitoXOferta;
      
            
     //suscrubimos la guardada de los datos en la tabla requisitosxofertas
      this.requisitosxofertasService.create(requisitosxofertas).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }
    
     
    editarRequisitosXOfertas(idRequisitoXOferta:number){
      let requisitosxofertas : RequisitosXOfertas = new RequisitosXOfertas;
  //agregamos los datos del formulario a la tabla requisitosxofertas
      requisitosxofertas.idRequisitoXOferta=idRequisitoXOferta;
      requisitosxofertas.idRequisito=this.FGAgregarRequisitosXOfertas.value.idRequisito;
      requisitosxofertas.idOferta=this.FGAgregarRequisitosXOfertas.value.idOferta;
      requisitosxofertas.requeridoRequisitoXOferta=this.FGAgregarRequisitosXOfertas.value.requeridoRequisitoXOferta;
      
      
      //suscrubimos la guardada de los datos en la tabla requisitosxofertas
      this.requisitosxofertasService.Edit(requisitosxofertas).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }

    
  
    enviarDatos() : void{
      let fgRequisitosXOfertas=this.FGAgregarRequisitosXOfertas.value;
      this.requisitosxofertasService.Get(fgRequisitosXOfertas.idRequisitoXOferta).subscribe({
        next : (datarequisitosxofertas:RequisitosXOfertas) => {
         if(datarequisitosxofertas.idRequisitoXOferta<=0){
          
          this.crearRequisitosXOfertas();
         }
         else if(datarequisitosxofertas.idRequisitoXOferta>0){
          
          this.editarRequisitosXOfertas(datarequisitosxofertas.idRequisitoXOferta);
         }
         
        }
      }); 
  
      
    }
  

}
