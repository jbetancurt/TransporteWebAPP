import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TiposDeCarrocerias } from './tipos-de-carrocerias.model';
import { TiposDeCarroceriasService } from './tipos-de-carrocerias.service';

@Component({
  selector: 'app-tipos-de-carrocerias',
  templateUrl: './tipos-de-carrocerias.component.html',
  styleUrls: ['./tipos-de-carrocerias.component.css']
})
export class TiposDeCarroceriasComponent implements OnInit {
  
  onAdd = new EventEmitter(); 
  @Input() idTipoDeCarroceria = 0;
  editar:boolean=false;
  //lsttiposdecarrocerias:TiposDeCarrocerias[]=[];
  FGAgregarTiposDeCarrocerias : FormGroup = this.formBuilder.group({      
    nombretipodecarroceria:new FormControl('',Validators.required),
    idTipoDeCarroceria:new FormControl('0')
  });

  
  cargarNombresTiposDeCarrocerias(tiposdecarrocerias:TiposDeCarrocerias){
    this.FGAgregarTiposDeCarrocerias.patchValue({
      nombretipodecarroceria:tiposdecarrocerias.nombreTipoDeCarroceria,
      idTipoDeCarroceria:tiposdecarrocerias.idTipoDeCarroceria
    })
  }  
  public asignarid(idTipoDeCarroceria:number){
    this.idTipoDeCarroceria=idTipoDeCarroceria;
    this.editar=true;
  }

  public AbrirInformacion()
  {
    if(this.idTipoDeCarroceria>0)
    {
      this.tiposdecarroceriasService.Get(this.idTipoDeCarroceria.toString()).subscribe({
        next : (datatiposdecarrocerias:TiposDeCarrocerias) => {
          this.cargarNombresTiposDeCarrocerias(datatiposdecarrocerias);
        }
      });
    }
  }

  ngOnInit() {
    this.AbrirInformacion();
           
  }

  constructor(
    private formBuilder: FormBuilder, 
    private tiposdecarroceriasService: TiposDeCarroceriasService) { }

    crearTiposDeCarrocerias(){
      let tiposdecarrocerias : TiposDeCarrocerias = new TiposDeCarrocerias;
  
      
      //agregamos los datos del formulario a la tabla personas
      tiposdecarrocerias.nombreTipoDeCarroceria=this.FGAgregarTiposDeCarrocerias.value.nombretipodecarroceria;
      
      
     //suscrubimos la guardada de los datos en la tabla tiposdecarrocerias
      this.tiposdecarroceriasService.create(tiposdecarrocerias).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }
  
    editarTiposDeCarrocerias(idTipoDeCarroceria:number){
      let tiposdecarrocerias : TiposDeCarrocerias = new TiposDeCarrocerias;
  
      tiposdecarrocerias.idTipoDeCarroceria=idTipoDeCarroceria;
      //agregamos los datos del formulario a la tabla tiposdecarrocerias
      tiposdecarrocerias.nombreTipoDeCarroceria=this.FGAgregarTiposDeCarrocerias.value.nombretipodecarroceria;
            
     //suscrubimos la guardada de los datos en la tabla tiposdecarrocerias
      this.tiposdecarroceriasService.Edit(tiposdecarrocerias).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }

    
  
    enviarDatos() : void{
      let fgTiposDeCarrocerias=this.FGAgregarTiposDeCarrocerias.value;
      this.tiposdecarroceriasService.Get(fgTiposDeCarrocerias.idTipoDeCarroceria).subscribe({
        next : (datatiposdecarrocerias:TiposDeCarrocerias) => {
         if(datatiposdecarrocerias.idTipoDeCarroceria<=0){
          
          this.crearTiposDeCarrocerias();
         }
         else if(datatiposdecarrocerias.idTipoDeCarroceria>0){
          
          this.editarTiposDeCarrocerias(datatiposdecarrocerias.idTipoDeCarroceria);
         }
         
        }
      }); 
  
      
    }
  

}
