import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PlantillasRequisitosXOfertas, PlantillasRequisitosXOfertasServices } from '../plantillas-requisitos-xofertas';
import { Plantillas_Ofertas, Plantillas_OfertasService } from '../plantillas-ofertas';
import { Requisitos, RequisitosService } from '../requisitos';


@Component({
  selector: 'app-plantillas-requisitos-xofertas',
  templateUrl: './plantillas-requisitos-xofertas.component.html',
  styleUrls: ['./plantillas-requisitos-xofertas.component.css']
})


export class PlantillasRequisitosXOfertasComponent implements OnInit {
  onAdd = new EventEmitter(); 
  @Input() idRequisitoXOferta = 0;
  editar:boolean=false;
  
  checked = false;
  indeterminate = false;
  labelPosition = 'after';
  disabled = false;

  lstPlantillas_Ofertas:Plantillas_Ofertas[]=[];
  lstRequisitos : Requisitos[]=[];
  //lstplantillasrequisitosxofertas:PlantillasRequisitosXOfertas[]=[];
  FGAgregarPlantillasRequisitosXOfertas : FormGroup = this.formBuilder.group({      
    idRequisitoXOferta: new FormControl('0'),
    idOferta:new FormControl(0,Validators.required),
    idRequisito:new FormControl(0,Validators.required),
    requeridoRequisitoXOferta:false
  
  });
    
  cargarNombresPlantillasRequisitosXOfertas(plantillasrequisitosxofertas:PlantillasRequisitosXOfertas){
    this.plantillasrequisitosxofertasService.Get(plantillasrequisitosxofertas.idRequisitoXOferta.toString()).subscribe({ 
      next : (dataplantillasrequisitosxofertas:PlantillasRequisitosXOfertas) => {
        if (dataplantillasrequisitosxofertas.idRequisitoXOferta>0){
          this.FGAgregarPlantillasRequisitosXOfertas.patchValue({
            idRequisitoXOferta:plantillasrequisitosxofertas.idRequisitoXOferta,
            idRequisito:plantillasrequisitosxofertas.idRequisito,
            idOferta:plantillasrequisitosxofertas.idOferta,
            requeridoRequisitoXOferta:plantillasrequisitosxofertas.requeridoRequisitoXOferta          });
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
      this.plantillasrequisitosxofertasService.Get(this.idRequisitoXOferta.toString()).subscribe({
        next : (dataplantillasrequisitosxofertas:PlantillasRequisitosXOfertas) => {
          this.cargarNombresPlantillasRequisitosXOfertas(dataplantillasrequisitosxofertas);
        }
      });
    }
  }

  ngOnInit() {
    this.AbrirInformacion();
    this.listarRequisitos();
    this.listarPlantillas_Ofertas();
  }

  constructor(
    private requisitosService: RequisitosService,
    private plantillas_ofertasService: Plantillas_OfertasService,
    private formBuilder: FormBuilder, 
    private plantillasrequisitosxofertasService: PlantillasRequisitosXOfertasServices) { }

    
    listarRequisitos(){ 
      this.requisitosService.GetAll().subscribe({
        next : (lstrequisitos:Requisitos[]) => { 
          this.lstRequisitos=lstrequisitos;
        }
      });
    }

    listarPlantillas_Ofertas(){ 
      this.plantillas_ofertasService.GetAll().subscribe({
        next : (lstplantillas_ofertas:Plantillas_Ofertas[]) => { 
          this.lstPlantillas_Ofertas=lstplantillas_ofertas;
        }
      });
    }

    crearPlantillasRequisitosXOfertas(){
      let plantillasrequisitosxofertas : PlantillasRequisitosXOfertas = new PlantillasRequisitosXOfertas;
  
      
      //agregamos los datos del formulario a la tabla plantillas_ofertas
      plantillasrequisitosxofertas.idRequisitoXOferta=this.FGAgregarPlantillasRequisitosXOfertas.value.idRequisitoXOferta;
      plantillasrequisitosxofertas.idRequisito=this.FGAgregarPlantillasRequisitosXOfertas.value.idRequisito;
      plantillasrequisitosxofertas.idOferta=this.FGAgregarPlantillasRequisitosXOfertas.value.idOferta;
      plantillasrequisitosxofertas.requeridoRequisitoXOferta=this.FGAgregarPlantillasRequisitosXOfertas.value.requeridoRequisitoXOferta;
      
            
     //suscrubimos la guardada de los datos en la tabla plantillasrequisitosxofertas
      this.plantillasrequisitosxofertasService.create(plantillasrequisitosxofertas).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }
    
     
    editarPlantillasRequisitosXOfertas(idRequisitoXOferta:number){
      let plantillasrequisitosxofertas : PlantillasRequisitosXOfertas = new PlantillasRequisitosXOfertas;
  //agregamos los datos del formulario a la tabla plantillasrequisitosxofertas
      plantillasrequisitosxofertas.idRequisitoXOferta=idRequisitoXOferta;
      plantillasrequisitosxofertas.idRequisito=this.FGAgregarPlantillasRequisitosXOfertas.value.idRequisito;
      plantillasrequisitosxofertas.idOferta=this.FGAgregarPlantillasRequisitosXOfertas.value.idOferta;
      plantillasrequisitosxofertas.requeridoRequisitoXOferta=this.FGAgregarPlantillasRequisitosXOfertas.value.requeridoRequisitoXOferta;
      
      
      //suscrubimos la guardada de los datos en la tabla plantillasrequisitosxofertas
      this.plantillasrequisitosxofertasService.Edit(plantillasrequisitosxofertas).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }

    
  
    enviarDatos() : void{
      let fgPlantillasRequisitosXOfertas=this.FGAgregarPlantillasRequisitosXOfertas.value;
      this.plantillasrequisitosxofertasService.Get(fgPlantillasRequisitosXOfertas.idRequisitoXOferta).subscribe({
        next : (dataplantillasrequisitosxofertas:PlantillasRequisitosXOfertas) => {
         if(dataplantillasrequisitosxofertas.idRequisitoXOferta<=0){
          
          this.crearPlantillasRequisitosXOfertas();
         }
         else if(dataplantillasrequisitosxofertas.idRequisitoXOferta>0){
          
          this.editarPlantillasRequisitosXOfertas(dataplantillasrequisitosxofertas.idRequisitoXOferta);
         }
         
        }
      }); 
  
      
    }
  

}
