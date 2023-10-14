import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Plantillas_Ofertas, Plantillas_OfertasService } from '../plantillas-ofertas';
import { EstadosDeLasOfertas, EstadosDeLasOfertasService } from '../estados-de-las-ofertas';
import { TiposOrientacionesDeLaOferta, TiposOrientacionesDeLaOfertaService } from '../tipos-orientaciones-de-la-oferta';
import { Empresas, EmpresasService } from '../empresas';
const myDate = new Date();

@Component({
  selector: 'app-plantillas-ofertas',
  templateUrl: './plantillas-ofertas.component.html',
  styleUrls: ['./plantillas-ofertas.component.scss']
})

export class Plantillas_OfertasComponent implements OnInit {
  onAdd = new EventEmitter(); 
  idEmpresaLogueado = 0;
  @Output() idOferta = 1;
  @Input() pruebaIdentificadorOferta = 0;
 
  editar:boolean=false;
  myTimeString = myDate.toTimeString().slice(0, 5);
  checked = false;
  indeterminate = false;
  labelPosition = 'after';
  disabled = false;

 
  

  lstEstadosDeLasOfertas:EstadosDeLasOfertas[]=[];
  lstEmpresas:Empresas[]=[];
  lstTiposOrientacionesDeLaOferta : TiposOrientacionesDeLaOferta[]=[];
  lstPlantillas_Ofertas:Plantillas_Ofertas[]=[];
  //lstplantillas_ofertas:Plantillas_Ofertas[]=[];
  FGAgregarPlantillas_Ofertas : FormGroup = this.formBuilder.group({      
    idOferta: new FormControl('0'),
    idEmpresa:new FormControl(0,Validators.required),
    idTipoOrientacionDeLaOferta:new FormControl(0,Validators.required),
    idEstadoDeLaOferta:new FormControl(0,Validators.required),
    nombrePlantillaOferta:new FormControl('',Validators.required),
    tituloOferta:new FormControl('',Validators.required),
    descripcionOferta:new FormControl('',Validators.required),
    valorTotalDeLaOferta:new FormControl(0,Validators.required)
  });
   
  cargarNombresPlantillas_Ofertas(plantillas_ofertas:Plantillas_Ofertas){
    this.FGAgregarPlantillas_Ofertas.patchValue({
      idOferta:plantillas_ofertas.idOferta,
      idEmpresa:plantillas_ofertas.idEmpresa,
      idTipoOrientacionDeLaOferta:plantillas_ofertas.idTipoOrientacionDeLaOferta,
      idEstadoDeLaOferta:plantillas_ofertas.idEstadoDeLaOferta,
      nombrePlantillaOferta:plantillas_ofertas.nombrePlantillaOferta,
      tituloOferta:plantillas_ofertas.tituloOferta,
      descripcionOferta:plantillas_ofertas.descripcionOferta,
      valorTotalDeLaOferta:plantillas_ofertas.valorTotalDeLaOferta
    
    });
  }  
  

  
  public asignarid(idOferta:number){
    this.idOferta=idOferta;
    this.editar=true;
  }
  
  public AbrirInformacion()
  {
    if(this.idOferta>0)
    {
      this.plantillas_ofertasService.Get(this.idOferta.toString()).subscribe({
        next : (dataofertas:Plantillas_Ofertas) => {
          this.cargarNombresPlantillas_Ofertas(dataofertas);
        }
      });
    }
  }

  ngOnInit() {
    this.AbrirInformacion();
    this.listarTiposOrientacionesDeLaOferta();
    this.listarEstadosDeLasOfertas();
    this.listarEmpresas();
    this.listarPlantillas_Ofertas();
  }

  constructor(
    private tiposorientacionesdelaofertaService: TiposOrientacionesDeLaOfertaService,
    private estadosdelasofertasService: EstadosDeLasOfertasService,
    private empresasService: EmpresasService,
    private formBuilder: FormBuilder, 
    private plantillas_ofertasService: Plantillas_OfertasService) { }

    
    listarTiposOrientacionesDeLaOferta(){ 
      this.tiposorientacionesdelaofertaService.GetAll().subscribe({
        next : (lsttiposorientacionesdelaoferta:TiposOrientacionesDeLaOferta[]) => { 
          this.lstTiposOrientacionesDeLaOferta=lsttiposorientacionesdelaoferta;
        }
      });
    }

  
    listarEstadosDeLasOfertas(){ 
      this.estadosdelasofertasService.GetAll().subscribe({
        next : (lstestadosdelasofertas:EstadosDeLasOfertas[]) => { 
          this.lstEstadosDeLasOfertas=lstestadosdelasofertas;
        }
      });
    }

    listarEmpresas(){
      this.empresasService.GetAll().subscribe({
        next : (lstempresas:Empresas[]) => {
          this.lstEmpresas=lstempresas;
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


      

    crearPlantillas_Ofertas(){
      let plantillas_ofertas : Plantillas_Ofertas = new Plantillas_Ofertas;
      
      //agregamos los datos del formulario a la tabla estadosdelasofertas
      
      plantillas_ofertas.idOferta=this.FGAgregarPlantillas_Ofertas.value.idOferta;
      plantillas_ofertas.idEmpresa=this.FGAgregarPlantillas_Ofertas.value.idEmpresa;
      plantillas_ofertas.idTipoOrientacionDeLaOferta=this.FGAgregarPlantillas_Ofertas.value.idTipoOrientacionDeLaOferta;
      plantillas_ofertas.idEstadoDeLaOferta=this.FGAgregarPlantillas_Ofertas.value.idEstadoDeLaOferta;
      plantillas_ofertas.nombrePlantillaOferta=this.FGAgregarPlantillas_Ofertas.value.nombrePlantillaOferta;
      plantillas_ofertas.tituloOferta=this.FGAgregarPlantillas_Ofertas.value.tituloOferta;
      plantillas_ofertas.descripcionOferta=this.FGAgregarPlantillas_Ofertas.value.descripcionOferta;
      plantillas_ofertas.valorTotalDeLaOferta=this.FGAgregarPlantillas_Ofertas.value.valorTotalDeLaOferta;
      
          
     //suscrubimos la guardada de los datos en la tabla ofertas
      this.plantillas_ofertasService.create(plantillas_ofertas).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }
    
     
    editarPlantillas_Ofertas(idOferta:number){
      let plantillas_ofertas : Plantillas_Ofertas = new Plantillas_Ofertas;
      
  //agregamos los datos del formulario a la tabla ofertas
      plantillas_ofertas.idOferta=idOferta;
      plantillas_ofertas.idEmpresa=this.FGAgregarPlantillas_Ofertas.value.idEmpresa;
      plantillas_ofertas.idTipoOrientacionDeLaOferta=this.FGAgregarPlantillas_Ofertas.value.idTipoOrientacionDeLaOferta;
      plantillas_ofertas.idEstadoDeLaOferta=this.FGAgregarPlantillas_Ofertas.value.idEstadoDeLaOferta;
      plantillas_ofertas.nombrePlantillaOferta=this.FGAgregarPlantillas_Ofertas.value.nombrePlantillaOferta;
      plantillas_ofertas.tituloOferta=this.FGAgregarPlantillas_Ofertas.value.tituloOferta;
      plantillas_ofertas.descripcionOferta=this.FGAgregarPlantillas_Ofertas.value.descripcionOferta;
      plantillas_ofertas.valorTotalDeLaOferta=this.FGAgregarPlantillas_Ofertas.value.valorTotalDeLaOferta;
      
     
      //suscrubimos la guardada de los datos en la tabla ofertas
      this.plantillas_ofertasService.Edit(plantillas_ofertas).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }

    
  
    enviarDatos() : void{
      let fgPlantillas_Ofertas=this.FGAgregarPlantillas_Ofertas.value;
      this.plantillas_ofertasService.Get(fgPlantillas_Ofertas.idOferta).subscribe({
        next : (dataplantillas_ofertas:Plantillas_Ofertas) => {
         if(dataplantillas_ofertas.idOferta<=0){
          
          this.crearPlantillas_Ofertas();
         }
         else if(dataplantillas_ofertas.idOferta>0){
          
          this.editarPlantillas_Ofertas(dataplantillas_ofertas.idOferta);
         }
         
        }
      }); 

    }
 
}
