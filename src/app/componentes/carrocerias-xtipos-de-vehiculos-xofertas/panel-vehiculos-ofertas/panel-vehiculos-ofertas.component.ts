import { Component, Input, OnInit, ViewChild } from '@angular/core';
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
  panelOpenState = false;
  openorclose =false;
  descripcionPanel:any[] = [];
  descripcionPanelPorComas :  string = "";
  datosGuardados: any[] = [];
  datosTemporales:any[]=[];
  dataSource = new MatTableDataSource<any>(this.datosGuardados);  
  lstCarroceriasXTiposDeVehiculosXOfertas:  CarroceriasXTiposDeVehiculosXOfertas[] = [];
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
    private carroceriasxtiposdevehiculosxofertasService: CarroceriasXTiposDeVehiculosXOfertasService,
    private carroceriasxtiposdevehiculosService: CarroceriasXTiposDeVehiculosService,
    private tiposdevehiculosService: TiposDeVehiculosService,
    private tiposdecarroceriasService: TiposDeCarroceriasService
  ) { }
  
  ngOnInit() {
    this.FGAgregarVehiculos.reset();
    this.listarCarroceriaXTipoDeVehiculo();
    this.listarTiposDeVehiculos();
    this.listarTiposDeCarrocerias();
    this.listarCarroceriasXTiposDeVehiculosXOfertas();    
    //this.descripcionPanel = this.datosGuardados.map(dato => this.encontrarNombreTipoDeVehiculo(dato.idTipoDeVehiculo));
    //this.refrescarResumenPanel();
   // this.descripcionPanelPorComas = this.descripcionPanel.join(', ');

  }

  FGAgregarVehiculos : FormGroup = this.formBuilder.group({      
   // idOferta:new FormControl(0,Validators.required),
    //idCarroceriaXTipoDeVehiculo:new FormControl(0,Validators.required),
    idTipoDeVehiculo:new FormControl(0,Validators.required),
    idTipoDeCarroceria:new FormControl('',Validators.required),
    tieneTrailer:new FormControl(false,Validators.required),
    descripcion:new FormControl('',Validators.required)
       
  });
  
  refrescarResumenPanel(){    
    console.log(this.datosGuardados.length);
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

  guardarDatos() {
    
   // console.log(this.FGAgregarVehiculos.value.idTipoDeVehiculo);
   // console.log(this.FGAgregarVehiculos.value.idTipoDeCarroceria);
    if(this.FGAgregarVehiculos.value.idTipoDeVehiculo == null || this.FGAgregarVehiculos.value.idTipoDeCarroceria == null){
      alert("Debe seleccionar un tipo de vehiculo y un tipo de carroceria");
    }
    else{  
      const datos = {
      // idOferta:this.FGAgregarLugares.value.idCiudad,
      //idEmpresa:0,
      // idCarroceriaXTipoDeVehiculo: this.FGAgregarVehiculos.value.idCarroceriaXTipoDeVehiculo, 
        idTipoDeVehiculo:this.FGAgregarVehiculos.value.idTipoDeVehiculo,
        idTipoDeCarroceria:this.FGAgregarVehiculos.value.idTipoDeCarroceria,
        tieneTrailer:this.FGAgregarVehiculos.value.tieneTrailer,
        descripcion:this.FGAgregarVehiculos.value.descripcion
      };
      this.datosGuardados.push(datos);
      this.dataSource.data = this.datosGuardados;
      this.FGAgregarVehiculos.reset();
      this.descripcionPanel = this.datosGuardados.map(dato => this.encontrarNombreTipoDeVehiculo(dato.idTipoDeVehiculo));
      //this.descripcionPanelPorComas = this.descripcionPanel.join(', ');
      this.refrescarResumenPanel();
    }
  }

  eliminarFila(index: number) { 
    this.datosGuardados.splice(index, 1);
    this.dataSource.data = this.datosGuardados;
    this.descripcionPanel = this.datosGuardados.map(dato => this.encontrarNombreTipoDeVehiculo(dato.idTipoDeVehiculo));
    this.refrescarResumenPanel();
    this.FGAgregarVehiculos.reset();
    
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
    console.log(filaSeleccionada);
    this.FGAgregarVehiculos.patchValue({
      //idCarroceriaXTipoDeVehiculo: filaSeleccionada.idCarroceriaXTipoDeVehiculo,
      idTipoDeVehiculo:filaSeleccionada.idTipoDeVehiculo,
      idTipoDeCarroceria:filaSeleccionada.idTipoDeCarroceria,
     
      tieneTrailer:filaSeleccionada.tieneTrailer,
      descripcion:filaSeleccionada.descripcion

    });
  }

  listarCarroceriasXTiposDeVehiculosXOfertas(){
    this.carroceriasxtiposdevehiculosxofertasService.ConsultarXOferta(this.idOferta.toString()).subscribe({
      next: (lstcarroceriasxtiposdevehiculosxofertas: CarroceriasXTiposDeVehiculosXOfertas[]) => {
        this.lstCarroceriasXTiposDeVehiculosXOfertas = lstcarroceriasxtiposdevehiculosxofertas;
        //console.log(this.lstCarroceriasXTiposDeVehiculosXOfertas);
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



  cargarCarroceriasXTiposDeVehiculosXOfertasAdatosGuardados() {
    
    this.lstCarroceriasXTiposDeVehiculosXOfertas.forEach(vehiculo => {
      //console.log(vehiculo);
      const datos = {
       // idCarroceriaXTipoDeVehiculo: lugar.idCarroceriaXTipoDeVehiculo,
        idOferta: vehiculo.idOferta, 
        idTipoDeVehiculo: vehiculo.idTipoDeVehiculo,
        idTipoDeCarroceria: vehiculo.idTipoDeCarroceria,
        tieneTrailer: vehiculo.tieneTrailer,
        descripcion: vehiculo.descripcion
        
      };
      //console.log(datos);
      this.datosGuardados.push(datos);
      this.dataSource.data = this.datosGuardados;
      this.datosGuardados.map(dato => this.encontrarNombreTipoDeVehiculo(dato.idTipoDeVehiculo));
      
    });
    this.refrescarResumenPanel();
  }

}

