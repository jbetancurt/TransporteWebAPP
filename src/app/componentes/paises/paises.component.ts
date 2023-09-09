import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Paises, PaisesService } from './';


@Component({
  selector: 'app-paises',
  templateUrl: './paises.component.html',
  styleUrls: ['./paises.component.css']
})

export class PaisesComponent implements OnInit {
  
onAdd = new EventEmitter(); 
@Input() idPais = 0;
editar:boolean=false;
//lstpaises:Paises[]=[];
FGAgregarPaises : FormGroup = this.formBuilder.group({      
  nombrepais:new FormControl('',Validators.required),
  idPais:new FormControl('0'),
  codigopais:new FormControl('',Validators.required)
});


cargarNombresPaises(paises:Paises){
  this.FGAgregarPaises.patchValue({
    nombrepais:paises.nombrePais,
    idPais:paises.idPais,
    codigopais:paises.codigoPais
  })
}  
public asignarid(idPais:number){
  this.idPais=idPais;
  this.editar=true;
}

public AbrirInformacion()
{
  if(this.idPais>0)
  {
    this.paisesService.Get(this.idPais.toString()).subscribe({
      next : (datapaises:Paises) => {
        this.cargarNombresPaises(datapaises);
      }
    });
  }
}

ngOnInit() {
  this.AbrirInformacion();
          
}

constructor(
  private formBuilder: FormBuilder, 
  private paisesService: PaisesService) { }

  crearPaises(){
    let paises : Paises = new Paises;

    
    //agregamos los datos del formulario a la tabla personas
    paises.nombrePais=this.FGAgregarPaises.value.nombrepais;
    paises.codigoPais=this.FGAgregarPaises.value.codigopais;
    
    //suscrubimos la guardada de los datos en la tabla paises
    this.paisesService.create(paises).subscribe(
      data => {
        this.onAdd.emit();
      }
    ); 
    
  }

  editarPaises(idPais:number){
    let paises : Paises = new Paises;

    paises.idPais=idPais;
    //agregamos los datos del formulario a la tabla paises
    paises.nombrePais=this.FGAgregarPaises.value.nombrepais;
    paises.codigoPais=this.FGAgregarPaises.value.codigopais;
          
    //suscrubimos la guardada de los datos en la tabla paises
    this.paisesService.Edit(paises).subscribe(
      data => {
        this.onAdd.emit();
      }
    ); 
    
  }

  

  enviarDatos() : void{
    let fgPaises=this.FGAgregarPaises.value;
    this.paisesService.Get(fgPaises.idPais).subscribe({
      next : (datapaises:Paises) => {
        if(datapaises.idPais<=0){
        
        this.crearPaises();
        }
        else if(datapaises.idPais>0){
        
        this.editarPaises(datapaises.idPais);
        }
        
      }
    }); 

    
  }

  
}
