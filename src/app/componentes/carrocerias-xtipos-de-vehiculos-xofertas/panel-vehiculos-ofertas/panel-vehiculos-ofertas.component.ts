import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { CarroceriasXTiposDeVehiculosXOfertas , CarroceriasXTiposDeVehiculosXOfertasComponent, CarroceriasXTiposDeVehiculosXOfertasService } from '../';
import { CarroceriasXTiposDeVehiculos, CarroceriasXTiposDeVehiculosService } from '../../carrocerias-xtipos-de-vehiculos';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TiposDeCarrocerias, TiposDeCarroceriasService } from '../../tipos-de-carrocerias';
import { TiposDeVehiculos, TiposDeVehiculosService } from '../../tipos-de-vehiculos';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PlantillasCarroceriasXTiposDeVehiculosXOfertas, PlantillasCarroceriasXTiposDeVehiculosXOfertasService } from '../../plantillas-carrocerias-xtipos-de-vehiculos-xofertas';

@Component({
  selector: 'app-panel-vehiculos-ofertas',
  templateUrl: './panel-vehiculos-ofertas.component.html',
  styleUrls: ['./panel-vehiculos-ofertas.component.scss']
})

export class PanelVehiculosOfertasComponent implements OnInit {
  
  @Input() tituloDelPanel = "VEHICULOS ACEPTADOS";
  @Input() editaroAgregar = "agregar";
  @Input() indexEditar = 0;
  @Input() idOferta = 0;
  @Input() DatosParaCargarDeLaPlantilla:PlantillasCarroceriasXTiposDeVehiculosXOfertas[] = [];
  @Output() datosActualizadosVehiculos = new EventEmitter<CarroceriasXTiposDeVehiculosXOfertas[]>();
  @Output() datosActualizadosParaBorrarVehiculos = new EventEmitter<CarroceriasXTiposDeVehiculosXOfertas[]>();
  panelOpenState = false;
  openorclose =false;
  descripcionPanel:any[] = [];
  descripcionPanelPorComas :  string = "";
  datosGuardados: CarroceriasXTiposDeVehiculosXOfertas[] = [];
  datosQueLleganDePlantillaVehiculosGuardados : PlantillasCarroceriasXTiposDeVehiculosXOfertas[] = [];
  datosParaBorrar: CarroceriasXTiposDeVehiculosXOfertas[] = [];
  datosTemporales:any[]=[];
  dataSource = new MatTableDataSource<any>(this.datosGuardados);  
  lstCarroceriasXTiposDeVehiculosXOfertas:  CarroceriasXTiposDeVehiculosXOfertas[] = [];
  lstCarroceriasXTiposDeVehiculos: CarroceriasXTiposDeVehiculos[] = [];
  lstTiposDeVehiculos: TiposDeVehiculos[] = [];
  lstTiposDeCarrocerias: TiposDeCarrocerias[] = [];
  lstTiposDeCarroceriasFiltrado: TiposDeCarrocerias[] = [];
  lstCarroceriasParaElVehiculo: CarroceriasXTiposDeVehiculos[] = [];
  displayedColumns: string[] = [ 'idTipoDeVehiculo','idTipoDeCarroceria', 'tieneTrailer','descripcion','editar', 'borrar'];


  idTipoDeVehiculo: number=0;
  idTipoDeCarroceria: number=0;
  tieneTrailer: boolean=false;
  descripcion: string='';

  
  constructor 
  (
    private formBuilder: FormBuilder,
    private carroceriasxtiposdevehiculosxofertasService: CarroceriasXTiposDeVehiculosXOfertasService,
    private carroceriasxtiposdevehiculosService: CarroceriasXTiposDeVehiculosService,
    private plantillascarroceriasxtiposdevehiculosxofertasService: PlantillasCarroceriasXTiposDeVehiculosXOfertasService,
    private tiposdevehiculosService: TiposDeVehiculosService,
    private tiposdecarroceriasService: TiposDeCarroceriasService
  ) { }
  
  ngOnInit() {
    this.FGAgregarVehiculos.reset();
    this.listarCarroceriaXTipoDeVehiculo();
    this.listarTiposDeVehiculos();
    this.listarTiposDeCarrocerias();
    this.listarCarroceriasXTiposDeVehiculosXOfertas(this.idOferta);    
  }

  FGAgregarVehiculos : FormGroup = this.formBuilder.group({      
   
    idCarroceriaXTipoDeVehiculoXOferta:new FormControl('0'),
    idTipoDeVehiculo:new FormControl(0,Validators.required),
    idTipoDeCarroceria:new FormControl('',Validators.required),
    tieneTrailer:new FormControl(false),
    descripcion:new FormControl('')
       
  });
  
  refrescarResumenPanel(){    
    
    if (this.datosGuardados.length==0){
      this.descripcionPanelPorComas="";
    }
    else{
      this.descripcionPanelPorComas = this.datosGuardados.map(x => 
          "* " + this.encontrarNombreTipoDeVehiculo(x.idTipoDeVehiculo) + "(" + this.encontrarNombreTipoDeCarroceria(x.idTipoDeCarroceria) + ")").join(', ');
    }
  }

  panelOpen(){
    this.openorclose = true
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['DatosParaCargarDeLaPlantilla']) {
      if (this.DatosParaCargarDeLaPlantilla.length > 0){
        this.datosGuardados = [];
        this.datosQueLleganDePlantillaVehiculosGuardados = [];
        console.log(this.DatosParaCargarDeLaPlantilla);
        this.listarCarroceriaXTipoDeVehiculo();
        this.listarTiposDeVehiculos();
        this.listarTiposDeCarrocerias();
        console.log(this.DatosParaCargarDeLaPlantilla[0].idOferta);
        this.listarPlantillasCarroceriasXTiposDeVehiculosXOfertas(this.DatosParaCargarDeLaPlantilla[0].idOferta);   
      }
      
    }
  }


  guardarDatos() {
   
    if(this.FGAgregarVehiculos.value.idTipoDeVehiculo == null || this.FGAgregarVehiculos.value.idTipoDeCarroceria == null){
      alert("Debe seleccionar un tipo de vehiculo y un tipo de carroceria");
    }
    else{  
      let CarroceriaXTipoDeVehiculoXOferta = new CarroceriasXTiposDeVehiculosXOfertas;
      CarroceriaXTipoDeVehiculoXOferta.idCarroceriaXTipoDeVehiculoXOferta = 0;
      CarroceriaXTipoDeVehiculoXOferta.idTipoDeVehiculo = this.FGAgregarVehiculos.value.idTipoDeVehiculo;
      CarroceriaXTipoDeVehiculoXOferta.idTipoDeCarroceria = this.FGAgregarVehiculos.value.idTipoDeCarroceria;
      if (this.FGAgregarVehiculos.value.tieneTrailer==null){
        this.FGAgregarVehiculos.value.tieneTrailer = false;
      }
      CarroceriaXTipoDeVehiculoXOferta.tieneTrailer = this.FGAgregarVehiculos.value.tieneTrailer;
      CarroceriaXTipoDeVehiculoXOferta.descripcion = this.FGAgregarVehiculos.value.descripcion;
      
      this.datosGuardados.push(CarroceriaXTipoDeVehiculoXOferta);
      this.dataSource.data = this.datosGuardados;
      this.datosActualizadosVehiculos.emit(this.datosGuardados);
      this.FGAgregarVehiculos.reset();
      this.descripcionPanel = this.datosGuardados.map(dato => this.encontrarNombreTipoDeVehiculo(dato.idTipoDeVehiculo));
      this.refrescarResumenPanel();
    }
  }

  eliminarFila(index: number) { 
    this.datosParaBorrar.push(this.datosGuardados[index]);
    this.datosGuardados.splice(index, 1);
    this.dataSource.data = this.datosGuardados;
    this.datosActualizadosParaBorrarVehiculos.emit(this.datosParaBorrar);
    this.FGAgregarVehiculos.reset();
    //this.descripcionPanel = this.datosGuardados.map(dato => this.encontrarNombreTipoDeVehiculo(dato.idTipoDeVehiculo));
    this.refrescarResumenPanel();
        
  }

 
  cancelarEdicion(){
    if (this.editaroAgregar="agregar"){
      this.FGAgregarVehiculos.reset();
      this.openorclose = !this.openorclose;
    }
    else{
      this.FGAgregarVehiculos.reset(); 
      this.editaroAgregar="agregar";
    }
    
    
  }

  editarFila(index: number) {
    this.datosGuardados[index] = this.FGAgregarVehiculos.value;
    this.dataSource.data = this.datosGuardados;
    this.datosActualizadosVehiculos.emit(this.datosGuardados);
    this.FGAgregarVehiculos.reset();
    this.descripcionPanel = this.datosGuardados.map(dato => this.encontrarNombreTipoDeVehiculo(dato.idTipoDeVehiculo));
    this.editaroAgregar="agregar";
    this.refrescarResumenPanel();

  }

  cargarDatosParaEditar(index: number) {
    this.editaroAgregar="editar";
    this.indexEditar=index;
    let filaSeleccionada = this.datosGuardados[index];
    
    this.listarCarroceriasParaElVehiculo(filaSeleccionada.idTipoDeVehiculo)
    
    this.FGAgregarVehiculos.patchValue({
      
      idCarroceriaXTipoDeVehiculoXOferta:filaSeleccionada.idCarroceriaXTipoDeVehiculoXOferta,
      idTipoDeVehiculo:filaSeleccionada.idTipoDeVehiculo,
      idTipoDeCarroceria:filaSeleccionada.idTipoDeCarroceria,
     
      tieneTrailer:filaSeleccionada.tieneTrailer,
      descripcion:filaSeleccionada.descripcion

    });
  }

  listarCarroceriasXTiposDeVehiculosXOfertas(idOferta:number){
    this.carroceriasxtiposdevehiculosxofertasService.ConsultarXOferta(idOferta.toString()).subscribe({
      next: (lstcarroceriasxtiposdevehiculosxofertas: CarroceriasXTiposDeVehiculosXOfertas[]) => {
        this.lstCarroceriasXTiposDeVehiculosXOfertas = lstcarroceriasxtiposdevehiculosxofertas;
       
        this.cargarCarroceriasXTiposDeVehiculosXOfertasAdatosGuardados();
      //  this.refrescarResumenPanel();
      }
    });
    this.refrescarResumenPanel();
    
  }

  
  
  encontrarNombreTipoDeVehiculo(idTipoDeVehiculo: number): string {
    let nombreTipoDeVehiculo = "";
    this.lstTiposDeVehiculos.forEach(element => {
      if (element.idTipoDeVehiculo == idTipoDeVehiculo) {
        nombreTipoDeVehiculo = element.nombreTipoDeVehiculo;
      }
    });
    return nombreTipoDeVehiculo;
  }

  encontrarNombreTipoDeCarroceria(idTipoDeCarroceria: number): string {
    let nombreTipoDeCarroceria = "";
    this.lstTiposDeCarrocerias.forEach(element => {
      if (element.idTipoDeCarroceria == idTipoDeCarroceria) {
        nombreTipoDeCarroceria = element.nombreTipoDeCarroceria;
      }
    });
    return nombreTipoDeCarroceria;
  }


  listarTiposDeVehiculos(){
    this.tiposdevehiculosService.GetAll().subscribe({
      next: (lsttiposdevehiculos: TiposDeVehiculos[]) => {
        this.lstTiposDeVehiculos = lsttiposdevehiculos;
      }
    });
  }

  listarTiposDeCarrocerias(){
    this.tiposdecarroceriasService.GetAll().subscribe({
      next: (lsttiposdecarrocerias: TiposDeCarrocerias[]) => {
        this.lstTiposDeCarrocerias = lsttiposdecarrocerias;
      }
    });
  }


  listarCarroceriasParaElVehiculo(idTipoDeVehiculo:number){
       
    let lst = this.lstCarroceriasXTiposDeVehiculos.filter(element => element.idTipoDeVehiculo == idTipoDeVehiculo); 
   
    this.lstTiposDeCarroceriasFiltrado= this.lstTiposDeCarrocerias.filter(x => lst.filter(y => y.idTipoDeCarroceria === x.idTipoDeCarroceria).length >  0);
    
  }

  

  listarCarroceriaXTipoDeVehiculo(){
    this.carroceriasxtiposdevehiculosService.GetAll().subscribe({
      next: (lstcarroceriasxtiposdevehiculos: CarroceriasXTiposDeVehiculos[]) => {
        this.lstCarroceriasXTiposDeVehiculos = lstcarroceriasxtiposdevehiculos;
      }
    });
    
  }

  listarPlantillasCarroceriasXTiposDeVehiculosXOfertas(idOfertaPlantillaCarroceria:number){
    this.plantillascarroceriasxtiposdevehiculosxofertasService.ConsultarXOferta(idOfertaPlantillaCarroceria.toString()).subscribe({
      next: (lstplantillascarroceriasxtiposdevehiculosxofertas: PlantillasCarroceriasXTiposDeVehiculosXOfertas[]) => {
        this.datosQueLleganDePlantillaVehiculosGuardados = lstplantillascarroceriasxtiposdevehiculosxofertas;  
        for (let index = 0; index < this.datosQueLleganDePlantillaVehiculosGuardados.length; index++) {
           let CarroceriaXTipoDeVehiculoXOferta = new CarroceriasXTiposDeVehiculosXOfertas;
           CarroceriaXTipoDeVehiculoXOferta.idTipoDeVehiculo = this.datosQueLleganDePlantillaVehiculosGuardados[index].idTipoDeVehiculo;
           CarroceriaXTipoDeVehiculoXOferta.idTipoDeCarroceria = this.datosQueLleganDePlantillaVehiculosGuardados[index].idTipoDeCarroceria;
           CarroceriaXTipoDeVehiculoXOferta.tieneTrailer = this.datosQueLleganDePlantillaVehiculosGuardados[index].tieneTrailer
           CarroceriaXTipoDeVehiculoXOferta.descripcion = this.datosQueLleganDePlantillaVehiculosGuardados[index].descripcion;
           this.datosGuardados.push(CarroceriaXTipoDeVehiculoXOferta);
        }
        this.dataSource.data = this.datosGuardados;
        this.refrescarResumenPanel();
      }
    });
  }


  public editooagrego(editaroAgregar:string){
    this.editaroAgregar=editaroAgregar;
  }



  cargarCarroceriasXTiposDeVehiculosXOfertasAdatosGuardados() {
    
    this.lstCarroceriasXTiposDeVehiculosXOfertas.forEach(vehiculo => {
      let CarroceriaXTipoDeVehiculoXOferta = new CarroceriasXTiposDeVehiculosXOfertas;
      
      CarroceriaXTipoDeVehiculoXOferta.idCarroceriaXTipoDeVehiculoXOferta = vehiculo.idCarroceriaXTipoDeVehiculoXOferta;
      CarroceriaXTipoDeVehiculoXOferta.idOferta = vehiculo.idOferta;
      CarroceriaXTipoDeVehiculoXOferta.idTipoDeVehiculo = vehiculo.idTipoDeVehiculo;
      CarroceriaXTipoDeVehiculoXOferta.idTipoDeCarroceria = vehiculo.idTipoDeCarroceria;
      CarroceriaXTipoDeVehiculoXOferta.tieneTrailer = vehiculo.tieneTrailer;
      CarroceriaXTipoDeVehiculoXOferta.descripcion = vehiculo.descripcion;
     
      this.datosGuardados.push(CarroceriaXTipoDeVehiculoXOferta);
      this.dataSource.data = this.datosGuardados;
      this.datosGuardados.map(dato => this.encontrarNombreTipoDeVehiculo(dato.idTipoDeVehiculo));
      
    });
    this.refrescarResumenPanel();
  }

}

