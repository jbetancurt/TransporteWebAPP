import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Ofertas, OfertasService } from '../ofertas';
import { Destinos, DestinosService } from '../destinos';
import { TiposOrientacionesDeLaOferta, TiposOrientacionesDeLaOfertaService } from '../tipos-orientaciones-de-la-oferta';
import { Empresas, EmpresasService } from '../empresas';
const myDate = new Date();

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.css']
})

export class OfertasComponent implements OnInit {
  onAdd = new EventEmitter(); 
  @Input() idOferta = 0;
  editar:boolean=false;
  myTimeString = myDate.toTimeString().slice(0, 5);
  checked = false;
  indeterminate = false;
  labelPosition = 'after';
  disabled = false;

  lstDestinos:Destinos[]=[];
  lstEmpresas:Empresas[]=[];
  lstTiposOrientacionesDeLaOferta : TiposOrientacionesDeLaOferta[]=[];
  lstOfertas:Ofertas[]=[];
  //lstofertas:Ofertas[]=[];
  FGAgregarOfertas : FormGroup = this.formBuilder.group({      
    idOferta: new FormControl('0'),
    idDestinoInicio:new FormControl(0,Validators.required),
    idDestinoFin:new FormControl(0,Validators.required),
    idEmpresa:new FormControl(0,Validators.required),
    idTipoOrientacionDeLaOferta:new FormControl(0,Validators.required),
    tituloOferta:new FormControl('',Validators.required),
    descripcionOferta:new FormControl('',Validators.required),
    altoOferta:new FormControl(0,Validators.required),
    anchoOferta:new FormControl(0,Validators.required),
    largoOferta:new FormControl(0,Validators.required),
    toneladasOferta:new FormControl(0,Validators.required),
    valorXToneladaOferta:new FormControl(0,Validators.required),
    fechaInicialOferta:new FormControl(new Date,Validators.required),
    fechaFinalOferta:new FormControl(new Date,Validators.required),
    horaInicialOferta:new FormControl(this.myTimeString,Validators.required),
    estadoOferta:false
   
  });
   
  cargarNombresOfertas(ofertas:Ofertas){
    this.FGAgregarOfertas.patchValue({
      idOferta:ofertas.idOferta,
      idDestinoInicio:ofertas.idDestinoInicio,
      idDestinoFin:ofertas.idDestinoFin,
      idEmpresa:ofertas.idEmpresa,
      idTipoOrientacionDeLaOferta:ofertas.idTipoOrientacionDeLaOferta,
      tituloOferta:ofertas.tituloOferta,
      descripcionOferta:ofertas.descripcionOferta,
      altoOferta:ofertas.altoOferta,
      anchoOferta:ofertas.anchoOferta,
      largoOferta:ofertas.largoOferta,
      toneladasOferta:ofertas.toneladasOferta,
      valorXToneladaOferta:ofertas.valorXToneladaOferta,
      fechaInicialOferta:ofertas.fechaInicialOferta,
      fechaFinalOferta:ofertas.fechaFinalOferta,
      horaInicialOferta:ofertas.horaInicialOferta,
      estadoOferta:ofertas.estadoOferta
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
      this.ofertasService.Get(this.idOferta.toString()).subscribe({
        next : (dataofertas:Ofertas) => {
          this.cargarNombresOfertas(dataofertas);
        }
      });
    }
  }

  ngOnInit() {
    this.AbrirInformacion();
    this.listarTiposOrientacionesDeLaOferta();
    this.listarDestinos();
    this.listarEmpresas();
    this.listarOfertas();
  }

  constructor(
    private tiposorientacionesdelaofertaService: TiposOrientacionesDeLaOfertaService,
    private destinosService: DestinosService,
    private empresasService: EmpresasService,
    private formBuilder: FormBuilder, 
    private ofertasService: OfertasService) { }

    
    listarTiposOrientacionesDeLaOferta(){ 
      this.tiposorientacionesdelaofertaService.GetAll().subscribe({
        next : (lsttiposorientacionesdelaoferta:TiposOrientacionesDeLaOferta[]) => { 
          this.lstTiposOrientacionesDeLaOferta=lsttiposorientacionesdelaoferta;
        }
      });
    }

  
    listarDestinos(){ 
      this.destinosService.GetAll().subscribe({
        next : (lstdestinos:Destinos[]) => { 
          this.lstDestinos=lstdestinos;
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

    listarOfertas(){
      this.ofertasService.GetAll().subscribe({
        next : (lstofertas:Ofertas[]) => {
          this.lstOfertas=lstofertas;
        }
      });
    }

    

      public ConvertirAFormato24Horas(tiempo12Horas:string)
      {
          // Dividir el tiempo en horas, minutos y AM/PM
          let partesTiempo = tiempo12Horas.split(':');
          let horas = parseInt(partesTiempo[0]);
          let minutos = parseInt(partesTiempo[1].substring(0, 2)); // Ignorar el AM/PM
          let periodo = partesTiempo[1].substring(2).toUpperCase();
          let horafinal:string;

          if (periodo == "PM" && horas != 12)
          {
              horas += 12;
          }
          else if (periodo == "AM" && horas == 12)  
          {
              horas = 0;
          }
          return horafinal=horas.toString()+":"+minutos.toString();
      }


    crearOfertas(){
      let ofertas : Ofertas = new Ofertas;
      let hora24horas = this.FGAgregarOfertas.value.horaInicialOferta;
      //agregamos los datos del formulario a la tabla destinos
      
      this.ConvertirAFormato24Horas(hora24horas);
      ofertas.idOferta=this.FGAgregarOfertas.value.idOferta;
      ofertas.idDestinoInicio=this.FGAgregarOfertas.value.idDestinoInicio;
      ofertas.idDestinoFin=this.FGAgregarOfertas.value.idDestinoFin;
      ofertas.idEmpresa=this.FGAgregarOfertas.value.idEmpresa;
      ofertas.idTipoOrientacionDeLaOferta=this.FGAgregarOfertas.value.idTipoOrientacionDeLaOferta;
      ofertas.tituloOferta=this.FGAgregarOfertas.value.tituloOferta;
      ofertas.descripcionOferta=this.FGAgregarOfertas.value.descripcionOferta;
      ofertas.altoOferta=this.FGAgregarOfertas.value.altoOferta;
      ofertas.anchoOferta=this.FGAgregarOfertas.value.anchoOferta;
      ofertas.largoOferta=this.FGAgregarOfertas.value.largoOferta;
      ofertas.toneladasOferta=this.FGAgregarOfertas.value.toneladasOferta;
      ofertas.valorXToneladaOferta=this.FGAgregarOfertas.value.valorXToneladaOferta;
      ofertas.fechaInicialOferta=this.FGAgregarOfertas.value.fechaInicialOferta;
      ofertas.fechaFinalOferta=this.FGAgregarOfertas.value.fechaFinalOferta;
      ofertas.horaInicialOferta=this.FGAgregarOfertas.value.horaInicialOferta;
      ofertas.estadoOferta=this.FGAgregarOfertas.value.estadoOferta;
      
      console.log(ofertas);      
     //suscrubimos la guardada de los datos en la tabla ofertas
      this.ofertasService.create(ofertas).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }
    
     
    editarOfertas(idOferta:number){
      let ofertas : Ofertas = new Ofertas;
      let hora24horas = this.FGAgregarOfertas.value.horaInicialOferta;
  //agregamos los datos del formulario a la tabla ofertas
      ofertas.idOferta=idOferta;
      this.ConvertirAFormato24Horas(hora24horas);
      ofertas.idDestinoInicio=this.FGAgregarOfertas.value.idDestinoInicio;
      ofertas.idDestinoFin=this.FGAgregarOfertas.value.idDestinoFin;
      ofertas.idEmpresa=this.FGAgregarOfertas.value.idEmpresa;
      ofertas.idTipoOrientacionDeLaOferta=this.FGAgregarOfertas.value.idTipoOrientacionDeLaOferta;
      ofertas.tituloOferta=this.FGAgregarOfertas.value.tituloOferta;
      ofertas.descripcionOferta=this.FGAgregarOfertas.value.descripcionOferta;
      ofertas.altoOferta=this.FGAgregarOfertas.value.altoOferta;
      ofertas.anchoOferta=this.FGAgregarOfertas.value.anchoOferta;
      ofertas.largoOferta=this.FGAgregarOfertas.value.largoOferta;
      ofertas.toneladasOferta=this.FGAgregarOfertas.value.toneladasOferta;
      ofertas.valorXToneladaOferta=this.FGAgregarOfertas.value.valorXToneladaOferta;
      ofertas.fechaInicialOferta=this.FGAgregarOfertas.value.fechaInicialOferta;
      ofertas.fechaFinalOferta=this.FGAgregarOfertas.value.fechaFinalOferta;
      ofertas.horaInicialOferta=this.FGAgregarOfertas.value.horaInicialOferta;
      ofertas.estadoOferta=this.FGAgregarOfertas.value.estadoOferta;
     
      //suscrubimos la guardada de los datos en la tabla ofertas
      this.ofertasService.Edit(ofertas).subscribe(
        data => {
          this.onAdd.emit();
        }
      ); 
      
    }

    
  
    enviarDatos() : void{
      let fgOfertas=this.FGAgregarOfertas.value;
      this.ofertasService.Get(fgOfertas.idOferta).subscribe({
        next : (dataofertas:Ofertas) => {
         if(dataofertas.idOferta<=0){
          
          this.crearOfertas();
         }
         else if(dataofertas.idOferta>0){
          
          this.editarOfertas(dataofertas.idOferta);
         }
         
        }
      }); 

    }
 
}
