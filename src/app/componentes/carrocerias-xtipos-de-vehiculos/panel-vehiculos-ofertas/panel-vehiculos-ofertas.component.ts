import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CarroceriasXTiposDeVehiculos , CarroceriasXTiposDeVehiculosComponent, CarroceriasXTiposDeVehiculosService } from '../';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TiposDeCarrocerias, TiposDeCarroceriasService } from '../../tipos-de-carrocerias';
import { TiposDeVehiculos, TiposDeVehiculosService } from '../../tipos-de-vehiculos';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-panel-vehiculos-ofertas',
  templateUrl: './panel-vehiculos-ofertas.component.html',
  styleUrls: ['./panel-vehiculos-ofertas.component.scss']
})
export class PanelVehiculosOfertasComponent implements OnInit {
  
  @Input() tituloDelPanel = "Vehiculos De La Oferta";
  @Input() editaroAgregar = "agregar";
  @Input() indexEditar = 0;
  panelOpenState = false;
  descripcionPanel:any[] = [];
  descripcionPanelPorComas :  string = "";
  datosGuardados: any[] = [];
  datosTemporales:any[]=[];
  dataSource = new MatTableDataSource<any>(this.datosGuardados);  
  lstCarroceriasXTiposDeVehiculos: CarroceriasXTiposDeVehiculos[] = [];
  lstTiposDeVehiculos: TiposDeVehiculos[] = [];
  lstTiposDeCarrocerias: TiposDeCarrocerias[] = [];
  displayedColumns: string[] = [ 'idTipoDeVehiculo','idTipoDeCarroceria', 'tieneTrailer','editar', 'borrar'];

  //idOferta: number=0;
 // idCarroceriaXTipoDeVehiculo: number=0; 
  idTipoDeVehiculo: number=0;
  idTipoDeCarroceria: number=0;
  tieneTrailer: boolean=false;

  

  FGAgregarVehiculos : FormGroup = this.formBuilder.group({      
   // idOferta:new FormControl(0,Validators.required),
    //idCarroceriaXTipoDeVehiculo:new FormControl(0,Validators.required),
    idTipoDeVehiculo:new FormControl(0,Validators.required),
    idTipoDeCarroceria:new FormControl('',Validators.required),
    tieneTrailer:new FormControl(false,Validators.required),
       
  });

  guardarDatos() {
    const datos = {
     // idOferta:this.FGAgregarLugares.value.idCiudad,
     //idEmpresa:0,
     // idCarroceriaXTipoDeVehiculo: this.FGAgregarVehiculos.value.idCarroceriaXTipoDeVehiculo, 
      idTipoDeVehiculo:this.FGAgregarVehiculos.value.idTipoDeVehiculo,
      idTipoDeCarroceria:this.FGAgregarVehiculos.value.idTipoDeCarroceria,
      tieneTrailer:this.FGAgregarVehiculos.value.tieneTrailer,
    };
    this.datosGuardados.push(datos);
    this.dataSource.data = this.datosGuardados;
    this.FGAgregarVehiculos.reset();
    this.descripcionPanel = this.datosGuardados.map(dato => this.encontrarNombreTipoDeVehiculo(dato.idTipoDeVehiculo));
    //this.descripcionPanelPorComas = this.descripcionPanel.join(', ');

  }

  eliminarFila(index: number) { 
    this.datosGuardados.splice(index, 1);
    this.dataSource.data = this.datosGuardados;
    this.descripcionPanel = this.datosGuardados.map(dato => this.encontrarNombreTipoDeVehiculo(dato.idTipoDeVehiculo));
    
  }

  editarFila(index: number) {
    this.datosGuardados[index] = this.FGAgregarVehiculos.value;
    this.dataSource.data = this.datosGuardados;
    this.FGAgregarVehiculos.reset();
    this.descripcionPanel = this.datosGuardados.map(dato => this.encontrarNombreTipoDeVehiculo(dato.idTipoDeVehiculo));
    this.editaroAgregar="agregar";
  }

  cargarDatosParaEditar(index: number) {
    this.editaroAgregar="editar";
    this.indexEditar=index;
    let filaSeleccionada = this.datosGuardados[index];
    
    this.FGAgregarVehiculos.patchValue({
      //idCarroceriaXTipoDeVehiculo: filaSeleccionada.idCarroceriaXTipoDeVehiculo,
      idTipoDeVehiculo:filaSeleccionada.idTipoDeVehiculo,
      idTipoDeCarroceria:filaSeleccionada.idTipoDeCarroceria,
      tieneTrailer:filaSeleccionada.tieneTrailerreccionLugarXOferta
    });
  }

  listarCarroceriasXTiposDeVehiculos(){
    this.carroceriasxtiposdevehiculosService.GetAll().subscribe({
      next: (lstcarroceriasxtiposdevehiculos: CarroceriasXTiposDeVehiculos[]) => {
        this.lstCarroceriasXTiposDeVehiculos = lstcarroceriasxtiposdevehiculos;
        this.cargarCarroceriasXTiposDeVehiculosAdatosGuardados();
      }
    });
  }
    

  

  listarTiposDeVehiculos(){
    this.tiposdevehiculosService.GetAll().subscribe({
      next: (lsttiposdevehiculos: TiposDeVehiculos[]) => {
        this.lstTiposDeVehiculos = lsttiposdevehiculos;
      }
    });
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


  listarTiposDeCarrocerias(){
    this.tiposdecarroceriasService.GetAll().subscribe({
      next: (lsttiposdecarrocerias: TiposDeCarrocerias[]) => {
        this.lstTiposDeCarrocerias = lsttiposdecarrocerias;
      }
    });
  }

  public editooagrego(editaroAgregar:string){
    this.editaroAgregar=editaroAgregar;
  }

  ngOnInit() {
    this.listarCarroceriasXTiposDeVehiculos();
    this.listarTiposDeVehiculos();
    this.listarTiposDeCarrocerias();
        
    this.descripcionPanel = this.datosGuardados.map(dato => this.encontrarNombreTipoDeVehiculo(dato.idTipoDeVehiculo));
   // this.descripcionPanelPorComas = this.descripcionPanel.join(', ');

  }


  cargarCarroceriasXTiposDeVehiculosAdatosGuardados() {
    this.lstCarroceriasXTiposDeVehiculos.forEach(lugar => {
      
      const datos = {
       // idCarroceriaXTipoDeVehiculo: lugar.idCarroceriaXTipoDeVehiculo,
        idTipoDeVehiculo: lugar.idTipoDeVehiculo, 
        idTipoDeCarroceria: lugar.idTipoDeCarroceria,
        tieneTrailer: lugar.tieneTrailer
      };
      this.datosGuardados.push(datos);
      this.dataSource.data = this.datosGuardados;
      this.datosGuardados.map(dato => this.encontrarNombreTipoDeVehiculo(dato.idTipoDeVehiculo));
      
    });
  }


   constructor 
  (
    private formBuilder: FormBuilder,
    private carroceriasxtiposdevehiculosService: CarroceriasXTiposDeVehiculosService,
    private tiposdevehiculosService: TiposDeVehiculosService,
    private tiposdecarroceriasService: TiposDeCarroceriasService
  ) { }
}
