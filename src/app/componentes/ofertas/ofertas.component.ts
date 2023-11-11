import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Ofertas, OfertasService } from '../ofertas';
import { EstadosDeLasOfertas, EstadosDeLasOfertasService } from '../estados-de-las-ofertas';
import { TiposOrientacionesDeLaOferta, TiposOrientacionesDeLaOfertaService } from '../tipos-orientaciones-de-la-oferta';
import { TiposDePlantillasOfertas, TiposDePlantillasOfertasService } from '../tipos-de-plantillas-ofertas';
import { Empresas, EmpresasService } from '../empresas';
import { Lugares, LugaresService } from '../lugares';
import { LugaresXOfertas, LugaresXOfertasService } from '../lugares-xofertas';
import { LoginService } from 'src/app/paginas/login';
import { CarroceriasXTiposDeVehiculosXOfertas, CarroceriasXTiposDeVehiculosXOfertasService } from '../carrocerias-xtipos-de-vehiculos-xofertas';
import { CargasXOfertas, CargasXOfertasService } from '../cargas-xofertas';
import { RequisitosXOfertas, RequisitosXOfertasService } from '../requisitos-xofertas';
import { Plantillas_Ofertas, Plantillas_OfertasService } from '../plantillas-ofertas';
import { PlantillasLugaresXOfertas, PlantillasLugaresXOfertasService } from '../plantillas-lugares-xofertas';
import { PlantillasRequisitosXOfertas, PlantillasRequisitosXOfertasServices } from '../plantillas-requisitos-xofertas';
import { PlantillasCarroceriasXTiposDeVehiculosXOfertas, PlantillasCarroceriasXTiposDeVehiculosXOfertasService } from '../plantillas-carrocerias-xtipos-de-vehiculos-xofertas';
import { PlantillasCargasXOfertas, PlantillasCargasXOfertasService } from '../plantillas-cargas-xofertas';
import { defaultIfEmpty, firstValueFrom, forkJoin, takeUntil } from 'rxjs';
const myDate = new Date();

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.scss']
})

export class OfertasComponent implements OnInit {
  @Output() onAdd = new EventEmitter(); 

 // @Output() datosActualizados = new EventEmitter<LugaresXOfertas[]>();
  idEmpresaLogueado = 0;
  idParaFiltrarTipoDePlantillaOferta = 0;
  @Output() idOferta = 0;
  @Input() pruebaIdentificadorOferta = 0;
 
  @Input() lugaresParaGuardarEnLaOferta: any[] = [];
  
  editar:boolean=false;
  myTimeString = myDate.toTimeString().slice(0, 5);
  checked = false;
  indeterminate = false;
  labelPosition = 'after';
  disabled = false;

  mostrarSelectPlantillaOferta:boolean=false;
  mostrarSelectPlantillaLugar:boolean=false;
  mostrarSelectPlantillaRequisito:boolean=false;
  mostrarSelectPlantillaVehiculo:boolean=false;
  mostrarSelectPlantillaCarga:boolean=false;


 
  async cambiarValorSelectPlantilla(e:any){
    await this.encontrarIdTipoDePlantillaOfertaXEnum("OFERTA");
    await this.listarPlantillasDeTipoOferta();
    this.mostrarSelectPlantillaOferta=e.target.checked;
  }

  async cambiarValorSelectPlantillaLugar(e:any){
    await this.encontrarIdTipoDePlantillaOfertaXEnum("LUGARES");
    await this.listarPlantillasDeTipoOferta();
    this.mostrarSelectPlantillaLugar=e.target.checked;
  }
  
  async cambiarValorSelectPlantillaRequisito(e:any){
    await this.encontrarIdTipoDePlantillaOfertaXEnum("REQUISITOS");
    await this.listarPlantillasDeTipoOferta();
    this.mostrarSelectPlantillaRequisito=e.target.checked;
  }

  async cambiarValorSelectPlantillaVehiculo(e:any){
    await this.encontrarIdTipoDePlantillaOfertaXEnum("VEHICULOS");
    await this.listarPlantillasDeTipoOferta();
    this.mostrarSelectPlantillaVehiculo=e.target.checked;
  }

  async cambiarValorSelectPlantillaCarga(e:any){
    await this.encontrarIdTipoDePlantillaOfertaXEnum("CARGAS");
    await this.listarPlantillasDeTipoOferta();
    this.mostrarSelectPlantillaCarga=e.target.checked;
  }
  

  lstEstadosDeLasOfertas:EstadosDeLasOfertas[]=[];
  lstEmpresas:Empresas[]=[];
  lstTiposOrientacionesDeLaOferta : TiposOrientacionesDeLaOferta[]=[];
  lstOfertas:Ofertas[]=[];
  lstLugaresXOfertasTemporales:LugaresXOfertas[]=[];
  lstLugaresXOfertasOrigenes:LugaresXOfertas[]=[];
  lstLugaresXOfertasDestinos:LugaresXOfertas[]=[];
  lstLugaresXOfertasOrigenesBorrados:LugaresXOfertas[]=[];
  lstLugaresXOfertasDestinosBorrados:LugaresXOfertas[]=[];
  lstCarroceriasXTiposDeVehiculosXOfertas:CarroceriasXTiposDeVehiculosXOfertas[]=[];
  lstCarroceriasXTiposDeVehiculosXOfertasBorrados:CarroceriasXTiposDeVehiculosXOfertas[]=[];
  lstCargasXOfertas:CargasXOfertas[]=[];
  lstCargasXOfertasBorradas:CargasXOfertas[]=[];
  lstRequisitosXOfertas:RequisitosXOfertas[]=[];
  lstRequisitosXOfertasBorrados:RequisitosXOfertas[]=[];

  lstPlantillasDeTipoOferta:Plantillas_Ofertas[]=[];
  lstPlantillasLugares:PlantillasLugaresXOfertas[]=[];
  lstPlantillasOrigenesXOfertas:PlantillasLugaresXOfertas[]=[];
  lstPlantillasDestinosXOfertas:PlantillasLugaresXOfertas[]=[];
  DatosParaCargarDeLaPlantillaOrigenes:PlantillasLugaresXOfertas[]=[];
  DatosParaCargarDeLaPlantillaDestinos:PlantillasLugaresXOfertas[]=[];
  DatosParaCargarDeLaPlantillaVehiculos:PlantillasCarroceriasXTiposDeVehiculosXOfertas[]=[];
  DatosParaCargarDeLaPlantillaCargas:PlantillasCargasXOfertas[]=[];
  DatosParaCargarDeLaPlantillaRequisitos:PlantillasRequisitosXOfertas[]=[];
  lstPlantillasVehiculosXOfertas:PlantillasCarroceriasXTiposDeVehiculosXOfertas[]=[];
  lstPlantillasCargas:PlantillasCargasXOfertas[]=[];
  lstPlantillasRequisitos:PlantillasRequisitosXOfertas[]=[];
  
  FGAgregarOfertas : FormGroup = this.formBuilder.group({      
    idOferta: new FormControl(this.idOferta),
    idEmpresa:this.idEmpresaLogueado,
    idTipoOrientacionDeLaOferta:new FormControl(0,Validators.required),
    idEstadoDeLaOferta:new FormControl(0,Validators.required),
    tituloOferta:new FormControl('',Validators.required),
    descripcionOferta:new FormControl(''),
    valorTotalDeLaOferta:new FormControl(0,Validators.required),
    fechaInicialOferta:new FormControl(new Date,Validators.required),
    fechaFinalOferta:new FormControl(new Date,Validators.required),
  });
  
 
  
  recibirOutputOrigenes(lugares:LugaresXOfertas[]){
    this.lstLugaresXOfertasOrigenes=lugares;
  }
  
  recibirOutputBorrarOrigenes(lugaresBorrados:LugaresXOfertas[]){
    this.lstLugaresXOfertasOrigenesBorrados=lugaresBorrados;
  }

  recibirOutputDestinos(lugares:LugaresXOfertas[]){
    this.lstLugaresXOfertasDestinos=lugares;
  } 
 
  recibirOutputBorrarDestinos(lugaresBorrados:LugaresXOfertas[]){
    this.lstLugaresXOfertasDestinosBorrados=lugaresBorrados;
  }

  recibirOutputVehiculos(vehiculos:CarroceriasXTiposDeVehiculosXOfertas[]){
    this.lstCarroceriasXTiposDeVehiculosXOfertas=vehiculos;
  }

  recibirOutputBorrarVehiculos(vehiculosBorrados:CarroceriasXTiposDeVehiculosXOfertas[]){
    this.lstCarroceriasXTiposDeVehiculosXOfertasBorrados=vehiculosBorrados;
  }


  recibirOutputCargas(cargas:CargasXOfertas[]){
    this.lstCargasXOfertas=cargas;
  }

  recibirOutputBorrarCargas(cargasBorradas:CargasXOfertas[]){
    this.lstCargasXOfertasBorradas=cargasBorradas;
  }
 
  recibirOutputRequisitos(requisitos:RequisitosXOfertas[]){
    this.lstRequisitosXOfertas=requisitos;
  }

  recibirOutputBorrarRequisitos(requisitosBorrados:RequisitosXOfertas[]){
    this.lstRequisitosXOfertasBorrados=requisitosBorrados;
  }


  cargarNombresOfertas(ofertas:Ofertas){
    this.FGAgregarOfertas.patchValue({
      idOferta:ofertas.idOferta,
      idEmpresa:this.idEmpresaLogueado,
      idTipoOrientacionDeLaOferta:ofertas.idTipoOrientacionDeLaOferta,
      idEstadoDeLaOferta:ofertas.idEstadoDeLaOferta,
      tituloOferta:ofertas.tituloOferta,
      descripcionOferta:ofertas.descripcionOferta,
      valorTotalDeLaOferta:ofertas.valorTotalDeLaOferta,
      fechaInicialOferta:ofertas.fechaInicialOferta,
      fechaFinalOferta:ofertas.fechaFinalOferta
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
    this.listarEstadosDeLasOfertas();
    this.listarEmpresas();
    this.listarOfertas();
    let usr=this.loginservice.getUser();
    if (usr){
    this.idEmpresaLogueado=usr.idEmpresa;

    } 
    else{
      this.idEmpresaLogueado=2;
    }
    this.listarPlantillasDeTipoOferta();
    
  }

  constructor(
    private tiposorientacionesdelaofertaService: TiposOrientacionesDeLaOfertaService,
    private tiposdeplantillasofertasService: TiposDePlantillasOfertasService,
    private estadosdelasofertasService: EstadosDeLasOfertasService,
    private carroceriasxtiposdevehiculosxofertasService: CarroceriasXTiposDeVehiculosXOfertasService,
    private requisitosxofertasService: RequisitosXOfertasService,
    private empresasService: EmpresasService,
    private lugaresxofertasService: LugaresXOfertasService,
    private cargasxofertasService: CargasXOfertasService,
    private lugaresService: LugaresService,
    private formBuilder: FormBuilder, 
    private loginservice: LoginService,
    private plantillas_ofertasService: Plantillas_OfertasService,
    private plantillaslugaresxofertasService: PlantillasLugaresXOfertasService,
    private plantillasrequisitosxofertasService: PlantillasRequisitosXOfertasServices,
    private plantillascarroceriasxtiposdevehiculosxofertasService: PlantillasCarroceriasXTiposDeVehiculosXOfertasService,
    private plantillascargasxofertasService: PlantillasCargasXOfertasService,

    private ofertasService: OfertasService) { }
    
    async listarPlantillasDeTipoOferta(){
      let lstplantillasofertas:Plantillas_Ofertas[]=[];
      lstplantillasofertas= await firstValueFrom(this.plantillas_ofertasService.ConsultarXIdEmpresaXIdTipoPlantilla(this.idEmpresaLogueado.toString(), this.idParaFiltrarTipoDePlantillaOferta.toString()))
      this.lstPlantillasDeTipoOferta=lstplantillasofertas;
      console.log(this.lstPlantillasDeTipoOferta);
    }

    async encontrarIdTipoDePlantillaOfertaXEnum(enumTipoDePlantillaOferta:string){
      let tipodeplantillaoferta:TiposDePlantillasOfertas = new TiposDePlantillasOfertas;
      tipodeplantillaoferta= await firstValueFrom(this.tiposdeplantillasofertasService.ConsultarPorEnum(enumTipoDePlantillaOferta));
      this.idParaFiltrarTipoDePlantillaOferta=tipodeplantillaoferta.idTipoDePlantillaOferta;     
      console.log(this.idParaFiltrarTipoDePlantillaOferta); 
    }

       
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

    listarOfertas(){
      this.ofertasService.ConsultarXIdEmpresa(this.idEmpresaLogueado.toString()).subscribe({
        next : (lstofertas:Ofertas[]) => {
          this.lstOfertas=lstofertas;
        }
      });
    }
    
    
    CargarPlantillaDeTipoLugar(idPlantillaOferta:number){
      forkJoin([
        this.plantillaslugaresxofertasService.ConsultarXOferta(idPlantillaOferta.toString(),'2'),
        this.plantillaslugaresxofertasService.ConsultarXOferta(idPlantillaOferta.toString(),'3')
      ]).subscribe(([lstplantillaslugaresxofertasorigenes,lstplantillaslugaresxofertasdestinos]) => {
        this.lstPlantillasOrigenesXOfertas=lstplantillaslugaresxofertasorigenes;
        this.lstPlantillasDestinosXOfertas=lstplantillaslugaresxofertasdestinos;
        this.DatosParaCargarDeLaPlantillaDestinos=lstplantillaslugaresxofertasdestinos;
        this.DatosParaCargarDeLaPlantillaOrigenes=lstplantillaslugaresxofertasorigenes;
      });
    }

    CargarPlantillaDeTipoVehiculo(idPlantillaOferta:number){
      forkJoin([
        this.plantillascarroceriasxtiposdevehiculosxofertasService.ConsultarXOferta(idPlantillaOferta.toString())        
      ]).subscribe(([lstplantillascarroceriasxtiposdevehiculosxofertas]) => {
        this.lstPlantillasVehiculosXOfertas=lstplantillascarroceriasxtiposdevehiculosxofertas;
        this.DatosParaCargarDeLaPlantillaVehiculos=lstplantillascarroceriasxtiposdevehiculosxofertas;
      });
    }

    CargarPlantillaDeTipoCarga(idPlantillaOferta:number){
      forkJoin([
        this.plantillascargasxofertasService.ConsultarXOferta(idPlantillaOferta.toString())        
      ]).subscribe(([lstplantillascargasxofertas]) => {
        this.lstPlantillasCargas=lstplantillascargasxofertas;
        this.DatosParaCargarDeLaPlantillaCargas=lstplantillascargasxofertas;
      });
    }

    CargarPlantillaDeTipoRequisito(idPlantillaOferta:number){
      forkJoin([
        this.plantillasrequisitosxofertasService.ConsultarXOferta(idPlantillaOferta.toString())        
      ]).subscribe(([lstplantillasrequisitosxofertas]) => {
        this.lstPlantillasRequisitos=lstplantillasrequisitosxofertas;
        this.DatosParaCargarDeLaPlantillaRequisitos=lstplantillasrequisitosxofertas;
      });
    }
    
    CargarPlantillaDeTipoOferta(idPlantillaOferta:number){
      this.plantillas_ofertasService.Get(idPlantillaOferta.toString()).subscribe({
        next : (plantillaoferta:Plantillas_Ofertas) => {
          this.FGAgregarOfertas.patchValue({
           
            idEmpresa:this.idEmpresaLogueado,
            idTipoOrientacionDeLaOferta:plantillaoferta.idTipoOrientacionDeLaOferta,
            tituloOferta:plantillaoferta.tituloOferta,
            descripcionOferta:plantillaoferta.descripcionOferta,
            valorTotalDeLaOferta:plantillaoferta.valorTotalDeLaOferta

          });
          forkJoin([
            this.plantillaslugaresxofertasService.ConsultarXOferta(idPlantillaOferta.toString(),'2'),
            this.plantillaslugaresxofertasService.ConsultarXOferta(idPlantillaOferta.toString(),'3'),
            this.plantillasrequisitosxofertasService.ConsultarXOferta(idPlantillaOferta.toString()),
            this.plantillascarroceriasxtiposdevehiculosxofertasService.ConsultarXOferta(idPlantillaOferta.toString()),
            this.plantillascargasxofertasService.ConsultarXOferta(idPlantillaOferta.toString())
          ]).subscribe(([lstplantillaslugaresxofertasorigenes,lstplantillaslugaresxofertasdestinos,lstplantillasrequisitosxofertas,lstplantillascarroceriasxtiposdevehiculosxofertas,lstplantillascargasxofertas]) => {
            this.lstPlantillasOrigenesXOfertas=lstplantillaslugaresxofertasorigenes;
            this.lstPlantillasDestinosXOfertas=lstplantillaslugaresxofertasdestinos;
            this.lstPlantillasVehiculosXOfertas=lstplantillascarroceriasxtiposdevehiculosxofertas;
            this.lstPlantillasCargas=lstplantillascargasxofertas;
            this.lstPlantillasRequisitos=lstplantillasrequisitosxofertas;
            this.DatosParaCargarDeLaPlantillaDestinos=lstplantillaslugaresxofertasdestinos;
            this.DatosParaCargarDeLaPlantillaOrigenes=lstplantillaslugaresxofertasorigenes;
            this.DatosParaCargarDeLaPlantillaVehiculos=lstplantillascarroceriasxtiposdevehiculosxofertas;
            this.DatosParaCargarDeLaPlantillaCargas=lstplantillascargasxofertas;
            this.DatosParaCargarDeLaPlantillaRequisitos=lstplantillasrequisitosxofertas;
          });
        }
      });
    }
    
    
      

    guardarLugaresXOfertasOrigenes(idOferta:number){
      let lugaresXOfertas : LugaresXOfertas = new LugaresXOfertas;
           
      for (let index = 0; index < this.lstLugaresXOfertasOrigenes.length; index++) {
        lugaresXOfertas.idLugarXOferta= this.lstLugaresXOfertasOrigenes[index].idLugarXOferta;
        lugaresXOfertas.idOferta= idOferta;
        lugaresXOfertas.idEmpresa=this.idEmpresaLogueado;

        lugaresXOfertas.idCiudad= this.lstLugaresXOfertasOrigenes[index].idCiudad;
        lugaresXOfertas.idPersona= this.lstLugaresXOfertasOrigenes[index].idPersona;
        lugaresXOfertas.idTipoDeLugarXOferta= this.lstLugaresXOfertasOrigenes[index].idTipoDeLugarXOferta;
        lugaresXOfertas.nombreLugarXOferta= this.lstLugaresXOfertasOrigenes[index].nombreLugarXOferta;
        lugaresXOfertas.observacionLugarXOferta= this.lstLugaresXOfertasOrigenes[index].observacionLugarXOferta;
        lugaresXOfertas.telefonoLugarXOferta= this.lstLugaresXOfertasOrigenes[index].telefonoLugarXOferta;
        lugaresXOfertas.direccionLugarXOferta= this.lstLugaresXOfertasOrigenes[index].direccionLugarXOferta;
        
      
        if (this.lstLugaresXOfertasOrigenes[index].idLugarXOferta==0){
          this.lugaresxofertasService.create(lugaresXOfertas).subscribe(
            data => {
              this.onAdd.emit();
            }
          );
        } 
        else{
          this.lugaresxofertasService.Edit(lugaresXOfertas).subscribe(
            data => {
              this.onAdd.emit();
            }
          );
        } 
      }
     
      if(this.lstLugaresXOfertasOrigenesBorrados.length>0){
        this.lstLugaresXOfertasOrigenesBorrados.forEach(element => {
          this.lugaresxofertasService.delete(element.idLugarXOferta.toString()).subscribe(
            data => {
              this.onAdd.emit();
            }
          );
        });
      }
    }

    

    guardarLugaresXOfertasDestinos(idOferta:number){
      let lugaresXOfertas : LugaresXOfertas = new LugaresXOfertas;
      for (let index = 0; index < this.lstLugaresXOfertasDestinos.length; index++) {
        lugaresXOfertas.idLugarXOferta= this.lstLugaresXOfertasDestinos[index].idLugarXOferta;
        lugaresXOfertas.idOferta= idOferta;

        lugaresXOfertas.idEmpresa=this.idEmpresaLogueado;
        lugaresXOfertas.idCiudad= this.lstLugaresXOfertasDestinos[index].idCiudad;
        lugaresXOfertas.idPersona= this.lstLugaresXOfertasDestinos[index].idPersona;
        lugaresXOfertas.idTipoDeLugarXOferta= this.lstLugaresXOfertasDestinos[index].idTipoDeLugarXOferta;
        lugaresXOfertas.nombreLugarXOferta= this.lstLugaresXOfertasDestinos[index].nombreLugarXOferta;
        lugaresXOfertas.observacionLugarXOferta= this.lstLugaresXOfertasDestinos[index].observacionLugarXOferta;
        lugaresXOfertas.telefonoLugarXOferta= this.lstLugaresXOfertasDestinos[index].telefonoLugarXOferta;
        lugaresXOfertas.direccionLugarXOferta= this.lstLugaresXOfertasDestinos[index].direccionLugarXOferta;
        if (this.lstLugaresXOfertasDestinos[index].idLugarXOferta==0){  
          this.lugaresxofertasService.create(lugaresXOfertas).subscribe(
            data => {
              this.onAdd.emit();
            }
          );
        }
        else{
          this.lugaresxofertasService.Edit(lugaresXOfertas).subscribe(
            data => {
              this.onAdd.emit();
            }
          );
        }
      }
      if (this.lstLugaresXOfertasDestinosBorrados.length>0){
        this.lstLugaresXOfertasDestinosBorrados.forEach(element => {
          this.lugaresxofertasService.delete(element.idLugarXOferta.toString()).subscribe(
            data => {
              this.onAdd.emit();
            }
          );
        });
      } 
    }
    
       
    guardarCarroceriasXTiposDeVehiculosXOfertas(idOferta:number){
      
      let carroceriasXTiposDeVehiculosXOfertas : CarroceriasXTiposDeVehiculosXOfertas = new CarroceriasXTiposDeVehiculosXOfertas;
      
      for (let index = 0; index < this.lstCarroceriasXTiposDeVehiculosXOfertas.length; index++) {
        carroceriasXTiposDeVehiculosXOfertas.idCarroceriaXTipoDeVehiculoXOferta= this.lstCarroceriasXTiposDeVehiculosXOfertas[index].idCarroceriaXTipoDeVehiculoXOferta;
        carroceriasXTiposDeVehiculosXOfertas.idOferta= idOferta;
        carroceriasXTiposDeVehiculosXOfertas.idTipoDeVehiculo= this.lstCarroceriasXTiposDeVehiculosXOfertas[index].idTipoDeVehiculo;
        carroceriasXTiposDeVehiculosXOfertas.idTipoDeCarroceria= this.lstCarroceriasXTiposDeVehiculosXOfertas[index].idTipoDeCarroceria;
        carroceriasXTiposDeVehiculosXOfertas.tieneTrailer= this.lstCarroceriasXTiposDeVehiculosXOfertas[index].tieneTrailer;
        carroceriasXTiposDeVehiculosXOfertas.descripcion= this.lstCarroceriasXTiposDeVehiculosXOfertas[index].descripcion;
        if (this.lstCarroceriasXTiposDeVehiculosXOfertas[index].idCarroceriaXTipoDeVehiculoXOferta==0){
          this.carroceriasxtiposdevehiculosxofertasService.create(carroceriasXTiposDeVehiculosXOfertas).subscribe(
            data => {
              
              this.onAdd.emit();
            }
          );
        }
        else{
          this.carroceriasxtiposdevehiculosxofertasService.Edit(carroceriasXTiposDeVehiculosXOfertas).subscribe(
            data => {
             
              this.onAdd.emit();
            }
          );
        }
      }
     
      if (this.lstCarroceriasXTiposDeVehiculosXOfertasBorrados.length>0){
        this.lstCarroceriasXTiposDeVehiculosXOfertasBorrados.forEach(element => {
          this.carroceriasxtiposdevehiculosxofertasService.delete(element.idCarroceriaXTipoDeVehiculoXOferta.toString()).subscribe(
            data => {
              this.onAdd.emit();
            }
          );
        });
      }
    }

    
    guardarCargasXOfertas(idOferta:number){
      let cargasXOfertas : CargasXOfertas = new CargasXOfertas;
      for (let index = 0; index < this.lstCargasXOfertas.length; index++) {
        cargasXOfertas.idCargaXOferta= this.lstCargasXOfertas[index].idCargaXOferta;
        cargasXOfertas.idOferta= idOferta;
        cargasXOfertas.tipoDeProducto= this.lstCargasXOfertas[index].tipoDeProducto;
        cargasXOfertas.unidadDeEmpaque= this.lstCargasXOfertas[index].unidadDeEmpaque;
        cargasXOfertas.altoCargaXOferta= this.lstCargasXOfertas[index].altoCargaXOferta;
        cargasXOfertas.anchoCargaXOferta= this.lstCargasXOfertas[index].anchoCargaXOferta;
        cargasXOfertas.largoCargaXOferta= this.lstCargasXOfertas[index].largoCargaXOferta;
        cargasXOfertas.toneladaCargaXOferta= this.lstCargasXOfertas[index].toneladaCargaXOferta;
        cargasXOfertas.tarifaCargaXOferta= this.lstCargasXOfertas[index].tarifaCargaXOferta;
        cargasXOfertas.totalCargaXOferta= this.lstCargasXOfertas[index].totalCargaXOferta;
        if (this.lstCargasXOfertas[index].idCargaXOferta==0){
          this.cargasxofertasService.create(cargasXOfertas).subscribe(
            data => {
              this.onAdd.emit();
            }
          );
        }
        else{
          this.cargasxofertasService.Edit(cargasXOfertas).subscribe(
            data => {
              this.onAdd.emit();
            }
          );
        }  
      }
      if (this.lstCargasXOfertasBorradas.length>0){
        this.lstCargasXOfertasBorradas.forEach(element => {
          this.cargasxofertasService.delete(element.idCargaXOferta.toString()).subscribe(
            data => {
              this.onAdd.emit();
            }
          );
        });
      }
    }

   

    guardarRequisitosXOfertas(idOferta:number){
      
      let requisitosXOfertas : RequisitosXOfertas = new RequisitosXOfertas;
      for (let index = 0; index < this.lstRequisitosXOfertas.length; index++) {
        requisitosXOfertas.idRequisitoXOferta= this.lstRequisitosXOfertas[index].idRequisitoXOferta;
        requisitosXOfertas.idOferta= idOferta;
        requisitosXOfertas.idRequisito= this.lstRequisitosXOfertas[index].idRequisito;
        requisitosXOfertas.observacion= this.lstRequisitosXOfertas[index].observacion;
        
        if (this.lstRequisitosXOfertas[index].idRequisitoXOferta==0){
          this.requisitosxofertasService.create(requisitosXOfertas).subscribe(
            data => {
              this.onAdd.emit();
            }
          );
        }
        else{
          this.requisitosxofertasService.Edit(requisitosXOfertas).subscribe(
            data => {
              this.onAdd.emit();
            }
          );
        }  
      }
      if (this.lstRequisitosXOfertasBorrados.length>0){
        this.lstRequisitosXOfertasBorrados.forEach(element => {
          this.requisitosxofertasService.delete(element.idRequisitoXOferta.toString()).subscribe(
            data => {
              this.onAdd.emit();
            }
          );
        });
      }
    }

   
   
    crearOfertas(){
      let ofertas : Ofertas = new Ofertas;
      this.pruebaIdentificadorOferta=this.FGAgregarOfertas.value.idOferta;
     // ofertas.idOferta=this.FGAgregarOfertas.value.idOferta;
      ofertas.idEmpresa=this.idEmpresaLogueado;
      ofertas.idTipoOrientacionDeLaOferta=this.FGAgregarOfertas.value.idTipoOrientacionDeLaOferta;
      ofertas.idEstadoDeLaOferta=this.FGAgregarOfertas.value.idEstadoDeLaOferta;
      ofertas.tituloOferta=this.FGAgregarOfertas.value.tituloOferta;
      ofertas.descripcionOferta=this.FGAgregarOfertas.value.descripcionOferta;
      ofertas.valorTotalDeLaOferta=this.FGAgregarOfertas.value.valorTotalDeLaOferta;
      ofertas.fechaInicialOferta=this.FGAgregarOfertas.value.fechaInicialOferta;
      ofertas.fechaFinalOferta=this.FGAgregarOfertas.value.fechaFinalOferta;
     
      this.ofertasService.create(ofertas).subscribe(
        data =>{
          this.onAdd.emit();
          //guardan datos obteniendo el id de la oferta y debe quedar dentro de la suscripción
          this.guardarLugaresXOfertasOrigenes(data);
          this.guardarLugaresXOfertasDestinos(data);
          this.guardarCarroceriasXTiposDeVehiculosXOfertas(data);
          this.guardarCargasXOfertas(data);
          this.guardarRequisitosXOfertas(data);
        }
      );

      
      
     //suscrubimos la guardada de los datos en la tabla ofertas
      
    }
    
     
    editarOfertas(idOferta:number){
      let ofertas : Ofertas = new Ofertas;
      
  //agregamos los datos del formulario a la tabla ofertas
      ofertas.idOferta=idOferta;
      ofertas.idEmpresa=this.idEmpresaLogueado;
      ofertas.idTipoOrientacionDeLaOferta=this.FGAgregarOfertas.value.idTipoOrientacionDeLaOferta;
      ofertas.idEstadoDeLaOferta=this.FGAgregarOfertas.value.idEstadoDeLaOferta;
      ofertas.tituloOferta=this.FGAgregarOfertas.value.tituloOferta;
      ofertas.descripcionOferta=this.FGAgregarOfertas.value.descripcionOferta;
      ofertas.valorTotalDeLaOferta=this.FGAgregarOfertas.value.valorTotalDeLaOferta;
      ofertas.fechaInicialOferta=this.FGAgregarOfertas.value.fechaInicialOferta;
      ofertas.fechaFinalOferta=this.FGAgregarOfertas.value.fechaFinalOferta;
           
  //suscrubimos la guardada de los datos en la tabla ofertas
      this.ofertasService.Edit(ofertas).subscribe(
        data => {
          this.onAdd.emit();
          this.guardarLugaresXOfertasOrigenes(ofertas.idOferta);
          this.guardarLugaresXOfertasDestinos(ofertas.idOferta);
          this.guardarCarroceriasXTiposDeVehiculosXOfertas(ofertas.idOferta);
          this.guardarCargasXOfertas(ofertas.idOferta);
          this.guardarRequisitosXOfertas(ofertas.idOferta);
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
