import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Plantillas_Ofertas, Plantillas_OfertasService } from '../plantillas-ofertas';
import { PlantillasCarroceriasXTiposDeVehiculosXOfertas, PlantillasCarroceriasXTiposDeVehiculosXOfertasService } from '../plantillas-carrocerias-xtipos-de-vehiculos-xofertas';  
import { PlantillasCargasXOfertas, PlantillasCargasXOfertasService } from '../plantillas-cargas-xofertas';
import { CargasXOfertas, CargasXOfertasService } from '../cargas-xofertas';
import { Ofertas, OfertasService } from '../ofertas';
import { LugaresXOfertas, LugaresXOfertasService } from '../lugares-xofertas';
import { RequisitosXOfertas, RequisitosXOfertasService } from '../requisitos-xofertas';
import { CarroceriasXTiposDeVehiculosXOfertas, CarroceriasXTiposDeVehiculosXOfertasService } from '../carrocerias-xtipos-de-vehiculos-xofertas';
import { PlantillasLugaresXOfertas, PlantillasLugaresXOfertasService } from '../plantillas-lugares-xofertas';
import { PlantillasRequisitosXOfertas, PlantillasRequisitosXOfertasServices } from '../plantillas-requisitos-xofertas';  
import { TiposDePlantillasOfertas, TiposDePlantillasOfertasService } from '../tipos-de-plantillas-ofertas';
import { LoginService } from 'src/app/paginas/login';
import { TiposOrientacionesDeLaOferta, TiposOrientacionesDeLaOfertaService } from '../tipos-orientaciones-de-la-oferta';
import { Empresas, EmpresasService } from '../empresas';
import { defaultIfEmpty, firstValueFrom, forkJoin, takeUntil } from 'rxjs';
import { take } from 'rxjs-compat/operator/take';
const myDate = new Date();

@Component({
  selector: 'app-plantillas-ofertas',
  templateUrl: './plantillas-ofertas.component.html',
  styleUrls: ['./plantillas-ofertas.component.scss']
})

export class Plantillas_OfertasComponent implements OnInit {
  onAdd = new EventEmitter(); 
  idEmpresaLogueado = 0;
  public idOfertaACargar = 0;
  public tipoPlantillaQueSeCreara: string = "";
  

  
  @Input() idOferta = 0;
  @Input() DatosParaCrearPlantillaCargasPorOferta:CargasXOfertas[]=[];
  @Input() DatosParaCrearPlantillaRequisitosPorOferta:RequisitosXOfertas[]=[];
  @Input() DatosParaCrearPlantillaOrigenPorOferta:LugaresXOfertas[]=[];
  @Input() DatosParaCrearPlantillaDestinoPorOferta:LugaresXOfertas[]=[];
  @Input() DatosParaCrearPlantillaVehiculosPorOferta:CarroceriasXTiposDeVehiculosXOfertas[]=[];
  @Input() enumeradorTipoPlantillaOferta = "";
  
  creacionDePlantillaDesdeUnaOferta:boolean=false;
  editar:boolean=false;
  myTimeString = myDate.toTimeString().slice(0, 5);
  checked = false;
  indeterminate = false;
  labelPosition = 'after';
  disabled = false;
  opcionSeleccionada: string = '';
  textoOpcionSeleccionada: string = '';
 
  

  lstTiposDePlantillasOfertas:TiposDePlantillasOfertas[]=[];
  lstEmpresas:Empresas[]=[];
  lstTiposOrientacionesDeLaOferta : TiposOrientacionesDeLaOferta[]=[];
  lstPlantillas_Ofertas:Plantillas_Ofertas[]=[];

 
  lstPlantillasLugaresXOfertasOrigenes:PlantillasLugaresXOfertas[]=[];
  lstPlantillasLugaresXOfertasDestinos:PlantillasLugaresXOfertas[]=[];
  lstPlantillasLugaresXOfertasOrigenesBorrados:PlantillasLugaresXOfertas[]=[];
  lstPlantillasLugaresXOfertasDestinosBorrados:PlantillasLugaresXOfertas[]=[];
  lstPlantillasCarroceriasXTiposDeVehiculosXOfertas:PlantillasCarroceriasXTiposDeVehiculosXOfertas[]=[];
  lstPlantillasCarroceriasXTiposDeVehiculosXOfertasBorrados:PlantillasCarroceriasXTiposDeVehiculosXOfertas[]=[];
  lstPlantillasCargasXOfertas:PlantillasCargasXOfertas[]=[];
  lstDatosDeCargaParaCrearPlantilla:CargasXOfertas[]=[];
  lstDatosDeOrigenesParaCrearPlantilla:LugaresXOfertas[]=[];
  lstDatosDeDestinosParaCrearPlantilla:LugaresXOfertas[]=[];
  lstDatosDeRequisitosParaCrearPlantilla:RequisitosXOfertas[]=[];
  lstDatosDeVehiculosParaCrearPlantilla:CarroceriasXTiposDeVehiculosXOfertas[]=[];
  lstPlantillasCargasXOfertasBorradas:PlantillasCargasXOfertas[]=[];
  lstPlantillasRequisitosXOfertas:PlantillasRequisitosXOfertas[]=[];
  lstPlantillasRequisitosXOfertasBorrados:PlantillasRequisitosXOfertas[]=[];
  
  mostrarDatosOferta: boolean = false;
  mostrarDatosLugares: boolean = false;
  mostrarDatosVehiculos: boolean = false;
  mostrarDatosRequisitos: boolean = false;
  mostrarDatosCarga: boolean = false;


  validarMostrarDatos(enumeradorTipoPlantillaOferta : string) {
    this.mostrarDatosOferta = false;
    this.mostrarDatosLugares = false;
    this.mostrarDatosVehiculos = false;
    this.mostrarDatosRequisitos = false;
    this.mostrarDatosCarga = false;
    //áca se debe traer el listado de tipos plantilla oferta
  
    if (enumeradorTipoPlantillaOferta == "LUGARES") {
      this.mostrarDatosLugares = true;
    
    }
    
    else if (enumeradorTipoPlantillaOferta == "VEHICULOS") { 
      this.mostrarDatosVehiculos = true;
    }
    else if (enumeradorTipoPlantillaOferta == "REQUISITOS") {
      this.mostrarDatosRequisitos = true;
    }
    else if (enumeradorTipoPlantillaOferta == "CARGAS") {
      this.mostrarDatosCarga = true;
    }
    else if (enumeradorTipoPlantillaOferta == "OFERTA") { 
      this.mostrarDatosOferta = true;
      this.mostrarDatosLugares = true;
      this.mostrarDatosVehiculos = true;
      this.mostrarDatosRequisitos = true;
      this.mostrarDatosCarga = true;
    }
    
  }

  encontrarEnumXIdTipoDePlantillaOferta(idTipoDePlantillaOferta:number){
    let TipoDePlantillaOferta=this.lstTiposDePlantillasOfertas.filter(element => element.idTipoDePlantillaOferta==idTipoDePlantillaOferta);
   
    if(TipoDePlantillaOferta.length>0){
      this.validarMostrarDatos(TipoDePlantillaOferta[0].enumerador);
    }
    else{
      this.validarMostrarDatos(this.tipoPlantillaQueSeCreara);
    }
  }
  

  

  //lstplantillas_ofertas:Plantillas_Ofertas[]=[];
  FGAgregarPlantillas_Ofertas : FormGroup = this.formBuilder.group({      
    idOferta:new FormControl(this.idOferta),
    idEmpresa:this.idEmpresaLogueado,
    idTipoOrientacionDeLaOferta:new FormControl(0,Validators.required),
    idTipoDePlantillaOferta:new FormControl(0,Validators.required),
    nombrePlantillaOferta:new FormControl('',Validators.required),
    tituloOferta:new FormControl('',Validators.required),
    descripcionOferta:new FormControl('',Validators.required),
    valorTotalDeLaOferta:new FormControl(0,Validators.required)
  });
   
  cargarNombresPlantillas_Ofertas(plantillas_ofertas:Plantillas_Ofertas){
    this.FGAgregarPlantillas_Ofertas.patchValue({
      idOferta:plantillas_ofertas.idOferta,
      idEmpresa:this.idEmpresaLogueado,
      idTipoOrientacionDeLaOferta:plantillas_ofertas.idTipoOrientacionDeLaOferta,
      idTipoDePlantillaOferta:plantillas_ofertas.idTipoDePlantillaOferta,
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

  recibirOutputOrigenes(lugares:PlantillasLugaresXOfertas[]){
    this.lstPlantillasLugaresXOfertasOrigenes=lugares;
  }
  
  recibirOutputBorrarOrigenes(lugaresBorrados:PlantillasLugaresXOfertas[]){
    this.lstPlantillasLugaresXOfertasOrigenesBorrados=lugaresBorrados;
  }

  recibirOutputDestinos(lugares:PlantillasLugaresXOfertas[]){
    this.lstPlantillasLugaresXOfertasDestinos=lugares;
  } 
 
  recibirOutputBorrarDestinos(lugaresBorrados:PlantillasLugaresXOfertas[]){
    this.lstPlantillasLugaresXOfertasDestinosBorrados=lugaresBorrados;
  }

  recibirOutputVehiculos(vehiculos:PlantillasCarroceriasXTiposDeVehiculosXOfertas[]){
    this.lstPlantillasCarroceriasXTiposDeVehiculosXOfertas=vehiculos;
  }

  recibirOutputBorrarVehiculos(vehiculosBorrados:PlantillasCarroceriasXTiposDeVehiculosXOfertas[]){
    this.lstPlantillasCarroceriasXTiposDeVehiculosXOfertasBorrados=vehiculosBorrados;
  }


  recibirOutputCargas(cargas:PlantillasCargasXOfertas[]){
    this.lstPlantillasCargasXOfertas=cargas;
  }

  recibirOutputBorrarCargas(cargasBorradas:PlantillasCargasXOfertas[]){
    this.lstPlantillasCargasXOfertasBorradas=cargasBorradas;
  }
 
  recibirOutputRequisitos(requisitos:PlantillasRequisitosXOfertas[]){
    this.lstPlantillasRequisitosXOfertas=requisitos;
  }

  recibirOutputBorrarRequisitos(requisitosBorrados:PlantillasRequisitosXOfertas[]){
    this.lstPlantillasRequisitosXOfertasBorrados=requisitosBorrados;
  }

  async cargarDatosDeLaOfertaALaPlantilla(){
    if (this.idOfertaACargar>0){
      
        await this.cargarDatosDeOrigenesALaPlantilla(this.idOfertaACargar);
        await this.cargarDatosDeDestinosALaPlantilla(this.idOfertaACargar);
        await this.cargarDatosDeVehiculosALaPlantilla(this.idOfertaACargar);
        await this.cargarDatosDeCargasALaPlantilla(this.idOfertaACargar);
        await this.cargarDatosDeRequisitosALaPlantilla(this.idOfertaACargar);
        await this.cargarDatosDeLaOfertaALaPlantilla2(this.idOfertaACargar); 
        this.creacionDePlantillaDesdeUnaOferta=true;
      
    }
  }

  async cargarDatosDeLaOfertaALaPlantilla2(idOfertaACargar:number){
    if (idOfertaACargar>0){
      let dataofertas = await firstValueFrom(this.ofertasService.Get(idOfertaACargar.toString()));
      this.FGAgregarPlantillas_Ofertas.patchValue({
        idEmpresa:this.idEmpresaLogueado,
        idTipoOrientacionDeLaOferta:dataofertas.idTipoOrientacionDeLaOferta,
        tituloOferta:dataofertas.tituloOferta,
        descripcionOferta:dataofertas.descripcionOferta,
        valorTotalDeLaOferta:dataofertas.valorTotalDeLaOferta
      
      });
    }
  }
    


  async cargarDatosDeOrigenesALaPlantilla(idOfertaACargar:number){
    if (idOfertaACargar>0){
     
      this.lstDatosDeOrigenesParaCrearPlantilla= await firstValueFrom(this.lugaresxofertasService.ConsultarXOferta(idOfertaACargar.toString(),"2"));
      this.DatosParaCrearPlantillaOrigenPorOferta=this.lstDatosDeOrigenesParaCrearPlantilla;
    }
    
  }

  async cargarDatosDeDestinosALaPlantilla(idOfertaACargar:number){
    if (idOfertaACargar>0){
      
      this.lstDatosDeDestinosParaCrearPlantilla= await firstValueFrom(this.lugaresxofertasService.ConsultarXOferta(idOfertaACargar.toString(),"3"));
      this.DatosParaCrearPlantillaDestinoPorOferta=this.lstDatosDeDestinosParaCrearPlantilla;
    }
  }

  async cargarDatosDeVehiculosALaPlantilla(idOfertaACargar:number){
    if (idOfertaACargar>0){
      this.lstDatosDeVehiculosParaCrearPlantilla= await firstValueFrom(this.carroceriasxtiposdevehiculosxofertasService.ConsultarXOferta(idOfertaACargar.toString()));
      this.DatosParaCrearPlantillaVehiculosPorOferta=this.lstDatosDeVehiculosParaCrearPlantilla;
    }
    
  }

  async cargarDatosDeCargasALaPlantilla(idOfertaACargar:number){
    if(idOfertaACargar>0){
      this.lstDatosDeCargaParaCrearPlantilla= await firstValueFrom(this.cargasXOfertasService.ConsultarXOferta(idOfertaACargar.toString()));
      this.DatosParaCrearPlantillaCargasPorOferta=this.lstDatosDeCargaParaCrearPlantilla;
      
    }
  }
    
    
   

  async cargarDatosDeRequisitosALaPlantilla(idOfertaACargar:number){
    if (idOfertaACargar>0){
      this.lstDatosDeRequisitosParaCrearPlantilla= await firstValueFrom(this.requisitosxofertasService.ConsultarXOferta(idOfertaACargar.toString()));
      this.DatosParaCrearPlantillaRequisitosPorOferta=this.lstDatosDeRequisitosParaCrearPlantilla;
      
    }
  }

  async cargarDatosYValidar() {
   
    await this.cargarDatosDeLaOfertaALaPlantilla();
    this.enumeradorTipoPlantillaOferta = this.tipoPlantillaQueSeCreara;
    

    if (this.enumeradorTipoPlantillaOferta == "" || this.enumeradorTipoPlantillaOferta == null) {
      
      this.enumeradorTipoPlantillaOferta = this.tipoPlantillaQueSeCreara;
    }
    this.validarMostrarDatos(this.enumeradorTipoPlantillaOferta);
    this.AbrirInformacion();
    
    this.listarTiposOrientacionesDeLaOferta();
    this.listarTiposDePlantillasOfertas();
    this.listarEmpresas();
    this.listarPlantillas_Ofertas();
    //this.validarMostrarDatos(this.enumeradorTipoPlantillaOferta);
    
  }
  


  async ngOnInit() {
    
    //this.cargarDatosYValidar();
   // this.cargarDatosDeLaOfertaALaPlantilla();   
    await this.cargarDatosYValidar();
    
    
    
    let usr=this.loginservice.getUser();
    if (usr){
        this.idEmpresaLogueado=usr.idEmpresa;
    } 
    else{
      this.idEmpresaLogueado=2;
    }
    
    
  }

  constructor(
    private tiposorientacionesdelaofertaService: TiposOrientacionesDeLaOfertaService,
    private ofertasService: OfertasService,
    private cargasXOfertasService: CargasXOfertasService,
    private lugaresxofertasService: LugaresXOfertasService,
    private requisitosxofertasService: RequisitosXOfertasService,
    private carroceriasxtiposdevehiculosxofertasService: CarroceriasXTiposDeVehiculosXOfertasService,
    private plantillasLugaresxofertasService: PlantillasLugaresXOfertasService,
    private plantillasCargasxofertasService: PlantillasCargasXOfertasService,
    private plantillasrequisitosxofertasService: PlantillasRequisitosXOfertasServices,
    private plantillasCarroceriasxtiposdevehiculosxofertasService: PlantillasCarroceriasXTiposDeVehiculosXOfertasService,
    private tiposdeplantillasofertasService: TiposDePlantillasOfertasService,
    private empresasService: EmpresasService,
    private loginservice: LoginService,
    private formBuilder: FormBuilder, 
    private plantillas_ofertasService: Plantillas_OfertasService) {
    
    }

    
    listarTiposOrientacionesDeLaOferta(){ 
      this.tiposorientacionesdelaofertaService.GetAll().subscribe({
        next : (lsttiposorientacionesdelaoferta:TiposOrientacionesDeLaOferta[]) => { 
          this.lstTiposOrientacionesDeLaOferta=lsttiposorientacionesdelaoferta;
        }
      });
    }

  
    listarTiposDePlantillasOfertas(){ 
      this.tiposdeplantillasofertasService.GetAll().subscribe({
        next : (lsttiposdeplantillasofertas:TiposDePlantillasOfertas[]) => { 
          this.lstTiposDePlantillasOfertas=lsttiposdeplantillasofertas;
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

    async guardarPlantillasLugaresXOfertasOrigenes(idOferta:number){
      let plantillasLugaresXOfertas : PlantillasLugaresXOfertas = new PlantillasLugaresXOfertas;
           
      
      for (let index = 0; index < this.lstPlantillasLugaresXOfertasOrigenes.length; index++) {
        //---------------oojo preguntar a juanpa-------//
        if (this.creacionDePlantillaDesdeUnaOferta==true){
          this.lstPlantillasLugaresXOfertasOrigenes[index].idLugarXOferta=0;
        }
        //----------------------------------------------//

        plantillasLugaresXOfertas.idLugarXOferta= this.lstPlantillasLugaresXOfertasOrigenes[index].idLugarXOferta;
        plantillasLugaresXOfertas.idOferta= idOferta;
        plantillasLugaresXOfertas.idEmpresa=this.idEmpresaLogueado;

        plantillasLugaresXOfertas.idCiudad= this.lstPlantillasLugaresXOfertasOrigenes[index].idCiudad;
        plantillasLugaresXOfertas.idPersona= this.lstPlantillasLugaresXOfertasOrigenes[index].idPersona;
        plantillasLugaresXOfertas.idTipoDeLugarXOferta= this.lstPlantillasLugaresXOfertasOrigenes[index].idTipoDeLugarXOferta;
       // plantillasLugaresXOfertas.nombrePlantillaLugarXOferta= this.lstPlantillasLugaresXOfertasOrigenes[index].nombrePlantillaLugarXOferta;
        plantillasLugaresXOfertas.nombreLugarXOferta= this.lstPlantillasLugaresXOfertasOrigenes[index].nombreLugarXOferta;
        plantillasLugaresXOfertas.observacionLugarXOferta= this.lstPlantillasLugaresXOfertasOrigenes[index].observacionLugarXOferta;
        plantillasLugaresXOfertas.telefonoLugarXOferta= this.lstPlantillasLugaresXOfertasOrigenes[index].telefonoLugarXOferta;
        plantillasLugaresXOfertas.direccionLugarXOferta= this.lstPlantillasLugaresXOfertasOrigenes[index].direccionLugarXOferta;
        
       
        if (this.lstPlantillasLugaresXOfertasOrigenes[index].idLugarXOferta==0){
           await firstValueFrom(this.plantillasLugaresxofertasService.create(plantillasLugaresXOfertas));
        } 
        else{
          await firstValueFrom(this.plantillasLugaresxofertasService.Edit(plantillasLugaresXOfertas));
        } 
      }
     
      if(this.lstPlantillasLugaresXOfertasOrigenesBorrados.length>0){
        for (const element of this.lstPlantillasLugaresXOfertasOrigenesBorrados) {
          await firstValueFrom(this.plantillasLugaresxofertasService.delete(element.idLugarXOferta.toString()));
        }
      }
     
    }

    

    async guardarPlantillasLugaresXOfertasDestinos(idOferta:number){
      let plantillasLugaresXOfertas : PlantillasLugaresXOfertas = new PlantillasLugaresXOfertas;
      for (let index = 0; index < this.lstPlantillasLugaresXOfertasDestinos.length; index++) {
        if (this.creacionDePlantillaDesdeUnaOferta==true){
          this.lstPlantillasLugaresXOfertasDestinos[index].idLugarXOferta=0;
        } 
        plantillasLugaresXOfertas.idLugarXOferta= this.lstPlantillasLugaresXOfertasDestinos[index].idLugarXOferta;
        plantillasLugaresXOfertas.idOferta= idOferta;

        plantillasLugaresXOfertas.idEmpresa=this.idEmpresaLogueado;
        plantillasLugaresXOfertas.idCiudad= this.lstPlantillasLugaresXOfertasDestinos[index].idCiudad;
        plantillasLugaresXOfertas.idPersona= this.lstPlantillasLugaresXOfertasDestinos[index].idPersona;
        plantillasLugaresXOfertas.idTipoDeLugarXOferta= this.lstPlantillasLugaresXOfertasDestinos[index].idTipoDeLugarXOferta;
        //plantillasLugaresXOfertas.nombrePlantillaLugarXOferta= this.lstPlantillasLugaresXOfertasDestinos[index].nombrePlantillaLugarXOferta;
        plantillasLugaresXOfertas.nombreLugarXOferta= this.lstPlantillasLugaresXOfertasDestinos[index].nombreLugarXOferta;
        plantillasLugaresXOfertas.observacionLugarXOferta= this.lstPlantillasLugaresXOfertasDestinos[index].observacionLugarXOferta;
        plantillasLugaresXOfertas.telefonoLugarXOferta= this.lstPlantillasLugaresXOfertasDestinos[index].telefonoLugarXOferta;
        plantillasLugaresXOfertas.direccionLugarXOferta= this.lstPlantillasLugaresXOfertasDestinos[index].direccionLugarXOferta;
        if (this.lstPlantillasLugaresXOfertasDestinos[index].idLugarXOferta==0){  
          await firstValueFrom(this.plantillasLugaresxofertasService.create(plantillasLugaresXOfertas));
         
        }
        else{
          await firstValueFrom(this.plantillasLugaresxofertasService.Edit(plantillasLugaresXOfertas));
        }
      }
      if (this.lstPlantillasLugaresXOfertasDestinosBorrados.length>0){
        for (const element of this.lstPlantillasLugaresXOfertasDestinosBorrados) {
          await firstValueFrom(this.plantillasLugaresxofertasService.delete(element.idLugarXOferta.toString()));
        }
      
      } 
      
    }
    
       
    async guardarPlantillasCarroceriasXTiposDeVehiculosXOfertas(idOferta:number){
      
      let plantillasCarroceriasXTiposDeVehiculosXOfertas : PlantillasCarroceriasXTiposDeVehiculosXOfertas = new PlantillasCarroceriasXTiposDeVehiculosXOfertas;
    
      for (let index = 0; index < this.lstPlantillasCarroceriasXTiposDeVehiculosXOfertas.length; index++) {
        if (this.creacionDePlantillaDesdeUnaOferta==true){
          this.lstPlantillasCarroceriasXTiposDeVehiculosXOfertas[index].idCarroceriaXTipoDeVehiculoXOferta=0;
        } 
        plantillasCarroceriasXTiposDeVehiculosXOfertas.idCarroceriaXTipoDeVehiculoXOferta= this.lstPlantillasCarroceriasXTiposDeVehiculosXOfertas[index].idCarroceriaXTipoDeVehiculoXOferta;
        plantillasCarroceriasXTiposDeVehiculosXOfertas.idOferta= idOferta;
        plantillasCarroceriasXTiposDeVehiculosXOfertas.idTipoDeVehiculo= this.lstPlantillasCarroceriasXTiposDeVehiculosXOfertas[index].idTipoDeVehiculo;
        plantillasCarroceriasXTiposDeVehiculosXOfertas.idTipoDeCarroceria= this.lstPlantillasCarroceriasXTiposDeVehiculosXOfertas[index].idTipoDeCarroceria;
        plantillasCarroceriasXTiposDeVehiculosXOfertas.tieneTrailer= this.lstPlantillasCarroceriasXTiposDeVehiculosXOfertas[index].tieneTrailer;
        plantillasCarroceriasXTiposDeVehiculosXOfertas.descripcion= this.lstPlantillasCarroceriasXTiposDeVehiculosXOfertas[index].descripcion;
       
        if (this.lstPlantillasCarroceriasXTiposDeVehiculosXOfertas[index].idCarroceriaXTipoDeVehiculoXOferta==0){
          await firstValueFrom(this.plantillasCarroceriasxtiposdevehiculosxofertasService.create(plantillasCarroceriasXTiposDeVehiculosXOfertas).pipe(defaultIfEmpty(null)));
                   
        }
        else{
          await firstValueFrom(this.plantillasCarroceriasxtiposdevehiculosxofertasService.Edit(plantillasCarroceriasXTiposDeVehiculosXOfertas));
        }
      }
   
      if (this.lstPlantillasCarroceriasXTiposDeVehiculosXOfertasBorrados.length>0){
        for (const element of this.lstPlantillasCarroceriasXTiposDeVehiculosXOfertasBorrados) {
          await firstValueFrom(this.plantillasCarroceriasxtiposdevehiculosxofertasService.delete(element.idCarroceriaXTipoDeVehiculoXOferta.toString()));
        }
      }
    }

    
    async guardarPlantillasCargasXOfertas(idOferta:number){
      let plantillasCargasXOfertas : PlantillasCargasXOfertas = new PlantillasCargasXOfertas;
      for (let index = 0; index < this.lstPlantillasCargasXOfertas.length; index++) {
        if (this.creacionDePlantillaDesdeUnaOferta==true){
          this.lstPlantillasCargasXOfertas[index].idCargaXOferta=0;
        } 
        plantillasCargasXOfertas.idCargaXOferta= this.lstPlantillasCargasXOfertas[index].idCargaXOferta;
        plantillasCargasXOfertas.idOferta= idOferta;
        plantillasCargasXOfertas.tipoDeProducto= this.lstPlantillasCargasXOfertas[index].tipoDeProducto;
        plantillasCargasXOfertas.unidadDeEmpaque= this.lstPlantillasCargasXOfertas[index].unidadDeEmpaque;
        plantillasCargasXOfertas.altoCargaXOferta= this.lstPlantillasCargasXOfertas[index].altoCargaXOferta;
        plantillasCargasXOfertas.anchoCargaXOferta= this.lstPlantillasCargasXOfertas[index].anchoCargaXOferta;
        plantillasCargasXOfertas.largoCargaXOferta= this.lstPlantillasCargasXOfertas[index].largoCargaXOferta;
        plantillasCargasXOfertas.toneladaCargaXOferta= this.lstPlantillasCargasXOfertas[index].toneladaCargaXOferta;
        plantillasCargasXOfertas.tarifaCargaXOferta= this.lstPlantillasCargasXOfertas[index].tarifaCargaXOferta;
        plantillasCargasXOfertas.totalCargaXOferta= this.lstPlantillasCargasXOfertas[index].totalCargaXOferta;
        if (this.lstPlantillasCargasXOfertas[index].idCargaXOferta==0){
          await firstValueFrom(this.plantillasCargasxofertasService.create(plantillasCargasXOfertas).pipe(defaultIfEmpty(null)));
        }
        else{
          await firstValueFrom(this.plantillasCargasxofertasService.Edit(plantillasCargasXOfertas));
        }  
      }
      if (this.lstPlantillasCargasXOfertasBorradas.length>0){
        for (const element of this.lstPlantillasCargasXOfertasBorradas) {
          await firstValueFrom(this.plantillasCargasxofertasService.delete(element.idCargaXOferta.toString()));
        }
      }  
    }

   

    async guardarPlantillasRequisitosXOfertas(idOferta:number){
      
      let plantillasRequisitosXOfertas : PlantillasRequisitosXOfertas = new PlantillasRequisitosXOfertas;
      for (let index = 0; index < this.lstPlantillasRequisitosXOfertas.length; index++) {
        if (this.creacionDePlantillaDesdeUnaOferta==true){
          this.lstPlantillasRequisitosXOfertas[index].idRequisitoXOferta=0;
        } 
        plantillasRequisitosXOfertas.idRequisitoXOferta= this.lstPlantillasRequisitosXOfertas[index].idRequisitoXOferta;
        plantillasRequisitosXOfertas.idOferta= idOferta;
        plantillasRequisitosXOfertas.idRequisito= this.lstPlantillasRequisitosXOfertas[index].idRequisito;
        plantillasRequisitosXOfertas.observacion= this.lstPlantillasRequisitosXOfertas[index].observacion;
        
        if (this.lstPlantillasRequisitosXOfertas[index].idRequisitoXOferta==0){
          await firstValueFrom(this.plantillasrequisitosxofertasService.create(plantillasRequisitosXOfertas).pipe(defaultIfEmpty(null)));
        }
        else{
          await firstValueFrom(this.plantillasrequisitosxofertasService.Edit(plantillasRequisitosXOfertas));
        }  
      }
      if (this.lstPlantillasRequisitosXOfertasBorrados.length>0){
        for (const element of this.lstPlantillasRequisitosXOfertasBorrados) {
          await firstValueFrom(this.plantillasrequisitosxofertasService.delete(element.idRequisitoXOferta.toString()));
        }  
      }
    }

   


      

    async crearPlantillas_Ofertas(){
      let plantillas_ofertas : Plantillas_Ofertas = new Plantillas_Ofertas;
     // this.pruebaIdentificadorOferta=this.FGAgregarPlantillas_Ofertas.value.idOferta;
      //agregamos los datos del formulario a la tabla estadosdelasofertas
      
    //  plantillas_ofertas.idOferta=this.FGAgregarPlantillas_Ofertas.value.idOferta;
      plantillas_ofertas.idEmpresa=this.idEmpresaLogueado;
      plantillas_ofertas.idTipoOrientacionDeLaOferta=this.FGAgregarPlantillas_Ofertas.value.idTipoOrientacionDeLaOferta;
      plantillas_ofertas.idTipoDePlantillaOferta=this.FGAgregarPlantillas_Ofertas.value.idTipoDePlantillaOferta;
      plantillas_ofertas.nombrePlantillaOferta=this.FGAgregarPlantillas_Ofertas.value.nombrePlantillaOferta;
      plantillas_ofertas.tituloOferta=this.FGAgregarPlantillas_Ofertas.value.tituloOferta;
      plantillas_ofertas.descripcionOferta=this.FGAgregarPlantillas_Ofertas.value.descripcionOferta;
      plantillas_ofertas.valorTotalDeLaOferta=this.FGAgregarPlantillas_Ofertas.value.valorTotalDeLaOferta;
      
          
      //suscrubimos la guardada de los datos en la tabla ofertas
      var data = await firstValueFrom(this.plantillas_ofertasService.create(plantillas_ofertas));
      
        
      await this.guardarPlantillasLugaresXOfertasOrigenes(data);
      await this.guardarPlantillasLugaresXOfertasDestinos(data);
    
      await this.guardarPlantillasCarroceriasXTiposDeVehiculosXOfertas(data);
      await this.guardarPlantillasCargasXOfertas(data);
      await this.guardarPlantillasRequisitosXOfertas(data);
      
      this.creacionDePlantillaDesdeUnaOferta = false;
      this.onAdd.emit();
      
    }
    
     
    editarPlantillas_Ofertas(idOferta:number){
      let plantillas_ofertas : Plantillas_Ofertas = new Plantillas_Ofertas;
      
  //agregamos los datos del formulario a la tabla ofertas
      plantillas_ofertas.idOferta=idOferta;
      plantillas_ofertas.idEmpresa=this.idEmpresaLogueado;
      plantillas_ofertas.idTipoOrientacionDeLaOferta=this.FGAgregarPlantillas_Ofertas.value.idTipoOrientacionDeLaOferta;
      plantillas_ofertas.idTipoDePlantillaOferta=this.FGAgregarPlantillas_Ofertas.value.idTipoDePlantillaOferta;
      plantillas_ofertas.nombrePlantillaOferta=this.FGAgregarPlantillas_Ofertas.value.nombrePlantillaOferta;
      plantillas_ofertas.tituloOferta=this.FGAgregarPlantillas_Ofertas.value.tituloOferta;
      plantillas_ofertas.descripcionOferta=this.FGAgregarPlantillas_Ofertas.value.descripcionOferta;
      plantillas_ofertas.valorTotalDeLaOferta=this.FGAgregarPlantillas_Ofertas.value.valorTotalDeLaOferta;
      
     
      //suscrubimos la guardada de los datos en la tabla ofertas
      this.plantillas_ofertasService.Edit(plantillas_ofertas).subscribe(
        data => {
          this.onAdd.emit();
          this.guardarPlantillasLugaresXOfertasOrigenes(plantillas_ofertas.idOferta);
          this.guardarPlantillasLugaresXOfertasDestinos(plantillas_ofertas.idOferta);
          this.guardarPlantillasCarroceriasXTiposDeVehiculosXOfertas(plantillas_ofertas.idOferta);
          this.guardarPlantillasCargasXOfertas(plantillas_ofertas.idOferta);
          this.guardarPlantillasRequisitosXOfertas(plantillas_ofertas.idOferta);
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
