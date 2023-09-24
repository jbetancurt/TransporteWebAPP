import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EstadosDeLasOfertas, } from './estados-de-las-ofertas.model';
import { EstadosDeLasOfertasService } from './estados-de-las-ofertas.service';

@Component({
  selector: 'app-estados-de-las-ofertas',
  templateUrl: './estados-de-las-ofertas.component.html',
  styleUrls: ['./estados-de-las-ofertas.component.scss']
})



export class EstadosDeLasOfertasComponent implements OnInit {
  
onAdd = new EventEmitter(); 
@Input() idEstadoDeLaOferta = 0;
editar:boolean=false;
//lstestadosdelasofertas:EstadosDeLasOfertas[]=[];
FGAgregarEstadosDeLasOfertas : FormGroup = this.formBuilder.group({      
  nombreEstadoDeLaOferta:new FormControl('',Validators.required),
  idEstadoDeLaOferta:new FormControl('0')
});


cargarNombresEstadosDeLasOfertas(estadosdelasofertas:EstadosDeLasOfertas){
  this.FGAgregarEstadosDeLasOfertas.patchValue({
    nombreEstadoDeLaOferta:estadosdelasofertas.nombreEstadoDeLaOferta,
    idEstadoDeLaOferta:estadosdelasofertas.idEstadoDeLaOferta
  })
}  
public asignarid(idEstadoDeLaOferta:number){
  this.idEstadoDeLaOferta=idEstadoDeLaOferta;
  this.editar=true;
}

public AbrirInformacion()
{
  if(this.idEstadoDeLaOferta>0)
  {
    this.estadosdelasofertasService.Get(this.idEstadoDeLaOferta.toString()).subscribe({
      next : (dataestadosdelasofertas:EstadosDeLasOfertas) => {
        this.cargarNombresEstadosDeLasOfertas(dataestadosdelasofertas);
      }
    });
  }
}

ngOnInit() {
  this.AbrirInformacion();
          
}

constructor(
  private formBuilder: FormBuilder, 
  private estadosdelasofertasService: EstadosDeLasOfertasService) { }

  crearEstadosDeLasOfertas(){
    let estadosdelasofertas : EstadosDeLasOfertas = new EstadosDeLasOfertas;

    
    //agregamos los datos del formulario a la tabla personas
    estadosdelasofertas.nombreEstadoDeLaOferta=this.FGAgregarEstadosDeLasOfertas.value.nombreEstadoDeLaOferta;
    
    
    //suscrubimos la guardada de los datos en la tabla estadosdelasofertas
    this.estadosdelasofertasService.create(estadosdelasofertas).subscribe(
      data => {
        this.onAdd.emit();
      }
    ); 
    
  }

  editarEstadosDeLasOfertas(idEstadoDeLaOferta:number){
    let estadosdelasofertas : EstadosDeLasOfertas = new EstadosDeLasOfertas;

    estadosdelasofertas.idEstadoDeLaOferta=idEstadoDeLaOferta;
    //agregamos los datos del formulario a la tabla estadosdelasofertas
    estadosdelasofertas.nombreEstadoDeLaOferta=this.FGAgregarEstadosDeLasOfertas.value.nombreEstadoDeLaOferta;
          
    //suscrubimos la guardada de los datos en la tabla estadosdelasofertas
    this.estadosdelasofertasService.Edit(estadosdelasofertas).subscribe(
      data => {
        this.onAdd.emit();
      }
    ); 
    
  }

  

  enviarDatos() : void{
    let fgEstadosDeLasOfertas=this.FGAgregarEstadosDeLasOfertas.value;
    this.estadosdelasofertasService.Get(fgEstadosDeLasOfertas.idEstadoDeLaOferta).subscribe({
      next : (dataestadosdelasofertas:EstadosDeLasOfertas) => {
        if(dataestadosdelasofertas.idEstadoDeLaOferta<=0){
        
        this.crearEstadosDeLasOfertas();
        }
        else if(dataestadosdelasofertas.idEstadoDeLaOferta>0){
        
        this.editarEstadosDeLasOfertas(dataestadosdelasofertas.idEstadoDeLaOferta);
        }
        
      }
    }); 

    
  }

  
}