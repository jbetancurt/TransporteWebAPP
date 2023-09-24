import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PlantillasCargasXOfertas, PlantillasCargasXOfertasService } from './';
import { Plantillas_Ofertas, Plantillas_OfertasService } from '../plantillas-ofertas';

@Component({
  selector: 'app-plantillas-cargas-xofertas',
  templateUrl: './plantillas-cargas-xofertas.component.html',
  styleUrls: ['./plantillas-cargas-xofertas.component.scss']
})

export class PlantillasCargasXOfertasComponent implements OnInit {
  onAdd = new EventEmitter(); 
  @Input() idCargaXOferta = 0;
  editar:boolean=false;
  lstPlantillasOfertas:Plantillas_Ofertas[]=[];
  //lstplantillascargasxofertas:PlantillasCargasXOfertas[]=[];
  FGAgregarPlantillasCargasXOfertas : FormGroup = this.formBuilder.group({      
    idCargaXOferta:new FormControl('0'),
    idOferta:new FormControl('1'),
    nombrePlantillaCargaXOferta:new FormControl('',Validators.required),
    toneladaCargaXOferta:new FormControl(0,Validators.required),
    largoCargaXOferta:new FormControl(0,Validators.required),
    anchoCargaXOferta:new FormControl(0,Validators.required),
    altoCargaXOferta:new FormControl(0,Validators.required),
    tarifaCargaXOferta:new FormControl(0,Validators.required),
    totalCargaXOferta:new FormControl(0,Validators.required),
   
  });

 
  cargarNombresPlantillasCargasXOfertas(plantillascargasxofertas:PlantillasCargasXOfertas){
    this.FGAgregarPlantillasCargasXOfertas.patchValue({
      idCargaXOferta:plantillascargasxofertas.idCargaXOferta,
      idOferta : plantillascargasxofertas.idOferta,
      nombrePlantillaCargaXOferta:plantillascargasxofertas.nombrePlantillaCargaXOferta,
      toneladaCargaXOferta:plantillascargasxofertas.toneladaCargaXOferta,
      largoCargaXOferta:plantillascargasxofertas.largoCargaXOferta,
      anchoCargaXOferta:plantillascargasxofertas.anchoCargaXOferta,
      altoCargaXOferta:plantillascargasxofertas.altoCargaXOferta,
      tarifaCargaXOferta:plantillascargasxofertas.tarifaCargaXOferta,
      totalCargaXOferta:plantillascargasxofertas.totalCargaXOferta,
    })
  }  
  public asignarid(idCargaXOferta:number){
    this.idCargaXOferta=idCargaXOferta;
    this.editar=true;
  }

  public AbrirInformacion()
  {
    if(this.idCargaXOferta>0)
    {
      this.plantillascargasxofertasService.Get(this.idCargaXOferta.toString()).subscribe({
        next : (dataplantillascargasxofertas:PlantillasCargasXOfertas) => {
          this.cargarNombresPlantillasCargasXOfertas(dataplantillascargasxofertas);
        }
      });
    }
  }

  ngOnInit() {
    this.AbrirInformacion();
    this.listarPlantillasOfertas();
    this.listarPlantillasCargasXOfertas();
    
           
  }

  constructor(
    private plantillasofertasService: Plantillas_OfertasService,
    private formBuilder: FormBuilder, 
    private plantillascargasxofertasService: PlantillasCargasXOfertasService) { }

    crearPlantillasCargasXOfertas(){
      let plantillascargasxofertas : PlantillasCargasXOfertas = new PlantillasCargasXOfertas;
  
      
      //agregamos los datos del formulario a la tabla personas
      plantillascargasxofertas.idCargaXOferta=this.FGAgregarPlantillasCargasXOfertas.value.idCargaXOferta;
      plantillascargasxofertas.idOferta=this.FGAgregarPlantillasCargasXOfertas.value.idOferta;
      plantillascargasxofertas.nombrePlantillaCargaXOferta=this.FGAgregarPlantillasCargasXOfertas.value.nombrePlantillaCargaXOferta;
      plantillascargasxofertas.toneladaCargaXOferta=this.FGAgregarPlantillasCargasXOfertas.value.toneladaCargaXOferta;
      plantillascargasxofertas.largoCargaXOferta=this.FGAgregarPlantillasCargasXOfertas.value.largoCargaXOferta;
      plantillascargasxofertas.anchoCargaXOferta=this.FGAgregarPlantillasCargasXOfertas.value.anchoCargaXOferta;
      plantillascargasxofertas.altoCargaXOferta=this.FGAgregarPlantillasCargasXOfertas.value.altoCargaXOferta;
      plantillascargasxofertas.tarifaCargaXOferta=this.FGAgregarPlantillasCargasXOfertas.value.tarifaCargaXOferta;
      plantillascargasxofertas.totalCargaXOferta=this.FGAgregarPlantillasCargasXOfertas.value.totalCargaXOferta;
     
      
      
     //suscrubimos la guardada de los datos en la tabla plantillascargasxofertas
      this.plantillascargasxofertasService.create(plantillascargasxofertas).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }
    listarPlantillasOfertas(){ 
      this.plantillasofertasService.GetAll().subscribe({
        next : (lstplantillasofertas:Plantillas_Ofertas[]) => { 
          this.lstPlantillasOfertas=lstplantillasofertas;
        }
      });
    }

    listarPlantillasCargasXOfertas(){
      this.plantillascargasxofertasService.GetAll().subscribe({
        next : (lstplantillascargasxofertas:PlantillasCargasXOfertas[]) => {
          //this.lstplantillascargasxofertas = lstplantillascargasxofertas;
        }
      });
    }
  
    editarPlantillasCargasXOfertas(idCargaXOferta:number){
      let plantillascargasxofertas : PlantillasCargasXOfertas = new PlantillasCargasXOfertas;
  
      plantillascargasxofertas.idCargaXOferta=idCargaXOferta;
      plantillascargasxofertas.idOferta=this.FGAgregarPlantillasCargasXOfertas.value.idOferta;
      //agregamos los datos del formulario a la tabla plantillascargasxofertas
      plantillascargasxofertas.nombrePlantillaCargaXOferta=this.FGAgregarPlantillasCargasXOfertas.value.nombrePlantillaCargaXOferta;
      plantillascargasxofertas.toneladaCargaXOferta=this.FGAgregarPlantillasCargasXOfertas.value.toneladaCargaXOferta;
      plantillascargasxofertas.largoCargaXOferta=this.FGAgregarPlantillasCargasXOfertas.value.largoCargaXOferta;
      plantillascargasxofertas.anchoCargaXOferta=this.FGAgregarPlantillasCargasXOfertas.value.anchoCargaXOferta;
      plantillascargasxofertas.altoCargaXOferta=this.FGAgregarPlantillasCargasXOfertas.value.altoCargaXOferta;
      plantillascargasxofertas.tarifaCargaXOferta=this.FGAgregarPlantillasCargasXOfertas.value.tarifaCargaXOferta;
      plantillascargasxofertas.totalCargaXOferta=this.FGAgregarPlantillasCargasXOfertas.value.totalCargaXOferta;
            
      //suscrubimos la guardada de los datos en la tabla plantillascargasxofertas
      this.plantillascargasxofertasService.Edit(plantillascargasxofertas).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }

    
  
    enviarDatos() : void{
      let fgPlantillasCargasXOfertas=this.FGAgregarPlantillasCargasXOfertas.value;
      this.plantillascargasxofertasService.Get(fgPlantillasCargasXOfertas.idCargaXOferta).subscribe({
        next : (dataplantillascargasxofertas:PlantillasCargasXOfertas) => {
         if(dataplantillascargasxofertas.idCargaXOferta<=0){
          
          this.crearPlantillasCargasXOfertas();
         }
         else if(dataplantillascargasxofertas.idCargaXOferta>0){
          
          this.editarPlantillasCargasXOfertas(dataplantillascargasxofertas.idCargaXOferta);
         }
         
        }
      }); 
  
      
    }
  

}
