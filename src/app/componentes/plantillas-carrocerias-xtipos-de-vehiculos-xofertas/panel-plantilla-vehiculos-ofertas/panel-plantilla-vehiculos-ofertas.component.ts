import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PlantillasCarroceriasXTiposDeVehiculosXOfertas , PlantillasCarroceriasXTiposDeVehiculosXOfertasComponent, PlantillasCarroceriasXTiposDeVehiculosXOfertasService } from '../';
import { CarroceriasXTiposDeVehiculos, CarroceriasXTiposDeVehiculosService } from '../../carrocerias-xtipos-de-vehiculos';
import { CarroceriasXTiposDeVehiculosXOfertas, CarroceriasXTiposDeVehiculosXOfertasService } from '../../carrocerias-xtipos-de-vehiculos-xofertas';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TiposDeCarrocerias, TiposDeCarroceriasService } from '../../tipos-de-carrocerias';
import { TiposDeVehiculos, TiposDeVehiculosService } from '../../tipos-de-vehiculos';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, firstValueFrom, isObservable } from 'rxjs';

@Component({
  selector: 'app-panel-plantilla-vehiculos-ofertas',
  templateUrl: './panel-plantilla-vehiculos-ofertas.component.html',
  styleUrls: ['./panel-plantilla-vehiculos-ofertas.component.scss']
})


export class PanelPlantillaVehiculosOfertasComponent implements OnInit {
  
  @Input() tituloDelPanel = "VEHICULOS ACEPTADOS";
  @Input() editaroAgregar = "agregar";
  @Input() indexEditar = 0;
  @Input() idOferta = 0;
  @Input() DatosParaCrearPlantillaVehiculosPorOferta:CarroceriasXTiposDeVehiculosXOfertas[]=[];
  @Output() datosActualizadosVehiculos = new EventEmitter<PlantillasCarroceriasXTiposDeVehiculosXOfertas[]>();
  @Output() datosActualizadosParaBorrarVehiculos = new EventEmitter<PlantillasCarroceriasXTiposDeVehiculosXOfertas[]>();
  panelOpenState = false;
  openorclose =false;
  descripcionPanel:any[] = [];
  descripcionPanelPorComas :  string = "";
  datosGuardados: PlantillasCarroceriasXTiposDeVehiculosXOfertas[] = [];
  datosParaBorrar: PlantillasCarroceriasXTiposDeVehiculosXOfertas[] = [];
  datosTemporales:any[]=[];
  dataSource = new MatTableDataSource<any>(this.datosGuardados);  
  lstPlantillasCarroceriasXTiposDeVehiculosXOfertas:  PlantillasCarroceriasXTiposDeVehiculosXOfertas[] = [];
  lstCarroceriasXTiposDeVehiculos: CarroceriasXTiposDeVehiculos[] = [];
  lstTiposDeVehiculos: TiposDeVehiculos[] = [];
  lstTiposDeCarrocerias: TiposDeCarrocerias[] = [];
  lstTiposDeCarroceriasFiltrado: TiposDeCarrocerias[] = [];
  lstCarroceriasParaElVehiculo: CarroceriasXTiposDeVehiculos[] = [];
  displayedColumns: string[] = [ 'idTipoDeVehiculo','idTipoDeCarroceria', 'tieneTrailer','descripcion','editar', 'borrar'];

  //idOferta: number=0;
 // idCarroceriaXTipoDeVehiculo: number=0; 
  idTipoDeVehiculo: number=0;
  idTipoDeCarroceria: number=0;
  tieneTrailer: boolean=false;
  descripcion: string='';

  
  constructor 
  (
    private formBuilder: FormBuilder,
    private plantillascarroceriasxtiposdevehiculosxofertasService: PlantillasCarroceriasXTiposDeVehiculosXOfertasService,
    private carroceriasxtiposdevehiculosService: CarroceriasXTiposDeVehiculosService,
    private tiposdevehiculosService: TiposDeVehiculosService,
    private tiposdecarroceriasService: TiposDeCarroceriasService
  ) { }
  
  ngOnInit() {
    if (this.DatosParaCrearPlantillaVehiculosPorOferta.length>0){
      console.log(this.DatosParaCrearPlantillaVehiculosPorOferta);
      this.lstPlantillasCarroceriasXTiposDeVehiculosXOfertas=this.DatosParaCrearPlantillaVehiculosPorOferta;
      console.log(this.lstPlantillasCarroceriasXTiposDeVehiculosXOfertas);
      this.listarTiposDeVehiculos();
      this.listarTiposDeCarrocerias();
      this.listarCarroceriaXTipoDeVehiculo();
      this.FGAgregarVehiculos.reset();
      this.cargarPlantillasCarroceriasXTiposDeVehiculosXOfertasAdatosGuardados();
      this.datosActualizadosVehiculos.emit(this.datosGuardados);
      this.refrescarResumenPanel();
    }
    else{
      this.FGAgregarVehiculos.reset();
      this.listarCarroceriaXTipoDeVehiculo();
      this.listarTiposDeVehiculos();
      this.listarTiposDeCarrocerias();
      this.listarPlantillasCarroceriasXTiposDeVehiculosXOfertas(this.idOferta);  
    }
      
    //this.descripcionPanel = this.datosGuardados.map(dato => this.encontrarNombreTipoDeVehiculo(dato.idTipoDeVehiculo));
    //this.refrescarResumenPanel();
   // this.descripcionPanelPorComas = this.descripcionPanel.join(', ');

  }

  FGAgregarVehiculos : FormGroup = this.formBuilder.group({      
   
    idCarroceriaXTipoDeVehiculoXOferta:new FormControl('0'),
    idTipoDeVehiculo:new FormControl(0,Validators.required),
    idTipoDeCarroceria:new FormControl('',Validators.required),
    tieneTrailer:new FormControl(false,Validators.required),
    descripcion:new FormControl('',Validators.required),
    //nombrePlantillaCarroceriaXTipoDeVehiculoXOferta:new FormControl(''),
       
  });
  
  async refrescarResumenPanel(){    
    const tiposdevehiculos = await firstValueFrom(this.tiposdevehiculosService.GetAll());
    console.log(this.datosGuardados.length);
    if (this.datosGuardados.length==0){
      this.descripcionPanelPorComas="";
    }
    else{
      tiposdevehiculos.forEach(element => {
           this.datosTemporales.push(this.datosGuardados.filter(x => x.idTipoDeVehiculo == element.idTipoDeVehiculo));
      });
      console.log('1'+this.datosGuardados);
      console.log('2'+this.lstTiposDeVehiculos);
      this.descripcionPanelPorComas = this.datosGuardados.map(x => 
          "* " + this.encontrarNombreTipoDeVehiculo(x.idTipoDeVehiculo) + "(" + this.encontrarNombreTipoDeCarroceria(x.idTipoDeCarroceria) + ")").join(', ');
    }
  }

  panelOpen(){
    this.openorclose = true
  }

  guardarDatos() {
   
    if(this.FGAgregarVehiculos.value.idTipoDeVehiculo == null || this.FGAgregarVehiculos.value.idTipoDeCarroceria == null){
      alert("Debe seleccionar un tipo de vehiculo y un tipo de carroceria");
    }
    else{  
      let PlantillaCarroceriaXTipoDeVehiculoXOferta = new PlantillasCarroceriasXTiposDeVehiculosXOfertas;
      PlantillaCarroceriaXTipoDeVehiculoXOferta.idCarroceriaXTipoDeVehiculoXOferta = 0;
      PlantillaCarroceriaXTipoDeVehiculoXOferta.idTipoDeVehiculo = this.FGAgregarVehiculos.value.idTipoDeVehiculo;
      PlantillaCarroceriaXTipoDeVehiculoXOferta.idTipoDeCarroceria = this.FGAgregarVehiculos.value.idTipoDeCarroceria;
      if (this.FGAgregarVehiculos.value.tieneTrailer == null){
        this.FGAgregarVehiculos.value.tieneTrailer = false;
      }
      PlantillaCarroceriaXTipoDeVehiculoXOferta.tieneTrailer = this.FGAgregarVehiculos.value.tieneTrailer;
      PlantillaCarroceriaXTipoDeVehiculoXOferta.descripcion = this.FGAgregarVehiculos.value.descripcion;
      //PlantillaCarroceriaXTipoDeVehiculoXOferta.nombrePlantillaCarroceriaXTipoDeVehiculoXOferta = this.FGAgregarVehiculos.value.nombrePlantillaCarroceriaXTipoDeVehiculoXOferta;

      this.datosGuardados.push(PlantillaCarroceriaXTipoDeVehiculoXOferta);
      this.dataSource.data = this.datosGuardados;
      this.datosActualizadosVehiculos.emit(this.datosGuardados);
      this.FGAgregarVehiculos.reset();
      //this.descripcionPanel = this.datosGuardados.map(dato => this.encontrarNombreTipoDeVehiculo(dato.idTipoDeVehiculo));
      this.refrescarResumenPanel();
    }
  }

  eliminarFila(index: number) { 
    this.datosParaBorrar.push(this.datosGuardados[index]);
    this.datosGuardados.splice(index, 1);
    this.dataSource.data = this.datosGuardados;
    this.datosActualizadosParaBorrarVehiculos.emit(this.datosParaBorrar);
    this.FGAgregarVehiculos.reset();
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
    //this.descripcionPanel = this.datosGuardados.map(dato => this.encontrarNombreTipoDeVehiculo(dato.idTipoDeVehiculo));
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
      descripcion:filaSeleccionada.descripcion,
      //nombrePlantillaCarroceriaXTipoDeVehiculoXOferta:filaSeleccionada.nombrePlantillaCarroceriaXTipoDeVehiculoXOferta

    });
  }

  listarPlantillasCarroceriasXTiposDeVehiculosXOfertas(idOferta:number){
    this.plantillascarroceriasxtiposdevehiculosxofertasService.ConsultarXOferta(idOferta.toString()).subscribe({
      next: (lstplatillascarroceriasxtiposdevehiculosxofertas: PlantillasCarroceriasXTiposDeVehiculosXOfertas[]) => {
        this.lstPlantillasCarroceriasXTiposDeVehiculosXOfertas = lstplatillascarroceriasxtiposdevehiculosxofertas;
        this.cargarPlantillasCarroceriasXTiposDeVehiculosXOfertasAdatosGuardados();
      }
    });
    console.log(idOferta);
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
     //this.tiposdevehiculosService.GetAllPromesa().then(x => this.lstTiposDeVehiculos = x);
      this.tiposdevehiculosService.GetAll().subscribe({
       next: (lsttiposdevehiculos:  TiposDeVehiculos[]) => {
         this.lstTiposDeVehiculos =  lsttiposdevehiculos;
         console.log('3'+this.lstTiposDeVehiculos);
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
    console.log(lst);
    
    this.lstTiposDeCarroceriasFiltrado= this.lstTiposDeCarrocerias.filter(x => lst.filter(y => y.idTipoDeCarroceria === x.idTipoDeCarroceria).length >  0);
    
  }

  

  listarCarroceriaXTipoDeVehiculo(){
    this.carroceriasxtiposdevehiculosService.GetAll().subscribe({
      next: (lstcarroceriasxtiposdevehiculos: CarroceriasXTiposDeVehiculos[]) => {
        this.lstCarroceriasXTiposDeVehiculos = lstcarroceriasxtiposdevehiculos;
      }
    });
    
  }


  public editooagrego(editaroAgregar:string){
    this.editaroAgregar=editaroAgregar;
  }



  cargarPlantillasCarroceriasXTiposDeVehiculosXOfertasAdatosGuardados() {
    console.log(this.lstPlantillasCarroceriasXTiposDeVehiculosXOfertas);
    this.lstPlantillasCarroceriasXTiposDeVehiculosXOfertas.forEach(vehiculo => {
      console.log(vehiculo);
      let PlantillaCarroceriaXTipoDeVehiculoXOferta = new PlantillasCarroceriasXTiposDeVehiculosXOfertas;
      PlantillaCarroceriaXTipoDeVehiculoXOferta.idCarroceriaXTipoDeVehiculoXOferta = vehiculo.idCarroceriaXTipoDeVehiculoXOferta;
      PlantillaCarroceriaXTipoDeVehiculoXOferta.idOferta = vehiculo.idOferta;
      PlantillaCarroceriaXTipoDeVehiculoXOferta.idTipoDeVehiculo = vehiculo.idTipoDeVehiculo;
      PlantillaCarroceriaXTipoDeVehiculoXOferta.idTipoDeCarroceria = vehiculo.idTipoDeCarroceria;
      PlantillaCarroceriaXTipoDeVehiculoXOferta.tieneTrailer = vehiculo.tieneTrailer;
      PlantillaCarroceriaXTipoDeVehiculoXOferta.descripcion = vehiculo.descripcion;
      //PlantillaCarroceriaXTipoDeVehiculoXOferta.nombrePlantillaCarroceriaXTipoDeVehiculoXOferta = vehiculo.nombrePlantillaCarroceriaXTipoDeVehiculoXOferta;
      console.log(PlantillaCarroceriaXTipoDeVehiculoXOferta);
      this.datosGuardados.push(PlantillaCarroceriaXTipoDeVehiculoXOferta);
      this.dataSource.data = this.datosGuardados;
      //this.datosGuardados.map(dato => this.encontrarNombreTipoDeVehiculo(dato.idTipoDeVehiculo));
    });
    this.refrescarResumenPanel();
  }

}
