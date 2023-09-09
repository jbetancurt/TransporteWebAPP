import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EstadosPorRutas } from './estados-por-rutas.model';
import { EstadosPorRutasService } from './estados-por-rutas.service';

@Component({
  selector: 'app-estados-por-rutas',
  templateUrl: './estados-por-rutas.component.html',
  styleUrls: ['./estados-por-rutas.component.css']
})

export class EstadosPorRutasComponent implements OnInit {
  
onAdd = new EventEmitter(); 
@Input() idEstadoPorRuta = 0;
editar:boolean=false;
//lstestadosporrutas:EstadosPorRutas[]=[];
FGAgregarEstadosPorRutas : FormGroup = this.formBuilder.group({      
  nombreestadoporruta:new FormControl('',Validators.required),
  idEstadoPorRuta:new FormControl('0')
});


cargarNombresEstadosPorRutas(estadosporrutas:EstadosPorRutas){
  this.FGAgregarEstadosPorRutas.patchValue({
    nombreestadoporruta:estadosporrutas.nombreEstadoPorRuta,
    idEstadoPorRuta:estadosporrutas.idEstadoPorRuta
  })
}  
public asignarid(idEstadoPorRuta:number){
  this.idEstadoPorRuta=idEstadoPorRuta;
  this.editar=true;
}

public AbrirInformacion()
{
  if(this.idEstadoPorRuta>0)
  {
    this.estadosporrutasService.Get(this.idEstadoPorRuta.toString()).subscribe({
      next : (dataestadosporrutas:EstadosPorRutas) => {
        this.cargarNombresEstadosPorRutas(dataestadosporrutas);
      }
    });
  }
}

ngOnInit() {
  this.AbrirInformacion();
          
}

constructor(
  private formBuilder: FormBuilder, 
  private estadosporrutasService: EstadosPorRutasService) { }

  crearEstadosPorRutas(){
    let estadosporrutas : EstadosPorRutas = new EstadosPorRutas;

    
    //agregamos los datos del formulario a la tabla personas
    estadosporrutas.nombreEstadoPorRuta=this.FGAgregarEstadosPorRutas.value.nombreestadoporruta;
    
    
    //suscrubimos la guardada de los datos en la tabla estadosporrutas
    this.estadosporrutasService.create(estadosporrutas).subscribe(
      data => {
        this.onAdd.emit();
      }
    ); 
    
  }

  editarEstadosPorRutas(idEstadoPorRuta:number){
    let estadosporrutas : EstadosPorRutas = new EstadosPorRutas;

    estadosporrutas.idEstadoPorRuta=idEstadoPorRuta;
    //agregamos los datos del formulario a la tabla estadosporrutas
    estadosporrutas.nombreEstadoPorRuta=this.FGAgregarEstadosPorRutas.value.nombreestadoporruta;
          
    //suscrubimos la guardada de los datos en la tabla estadosporrutas
    this.estadosporrutasService.Edit(estadosporrutas).subscribe(
      data => {
        this.onAdd.emit();
      }
    ); 
    
  }

  

  enviarDatos() : void{
    let fgEstadosPorRutas=this.FGAgregarEstadosPorRutas.value;
    this.estadosporrutasService.Get(fgEstadosPorRutas.idEstadoPorRuta).subscribe({
      next : (dataestadosporrutas:EstadosPorRutas) => {
        if(dataestadosporrutas.idEstadoPorRuta<=0){
        console.log("crear");
        this.crearEstadosPorRutas();
        }
        else if(dataestadosporrutas.idEstadoPorRuta>0){
        
        this.editarEstadosPorRutas(dataestadosporrutas.idEstadoPorRuta);
        }
        
      }
    }); 

    
  }

  
}