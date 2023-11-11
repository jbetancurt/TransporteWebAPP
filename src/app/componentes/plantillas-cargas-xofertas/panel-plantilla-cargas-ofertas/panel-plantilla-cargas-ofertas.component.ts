import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PlantillasCargasXOfertas , PlantillasCargasXOfertasComponent, PlantillasCargasXOfertasService } from '../';
import { CargasXOfertas } from '../../cargas-xofertas';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-panel-plantilla-cargas-ofertas',
  templateUrl: './panel-plantilla-cargas-ofertas.component.html',
  styleUrls: ['./panel-plantilla-cargas-ofertas.component.scss']
})


export class PanelPlantillaCargasOfertasComponent implements OnInit {
  @Input() tituloDelPanel = "CARGA";
  @Input() editaroAgregar = "agregar";
  @Input() indexEditar = 0;
  @Input() idOferta = 0;
  @Input() DatosParaCrearPlantillaCargasPorOferta:CargasXOfertas[]=[];
  @Output() datosActualizadosCargas = new EventEmitter<PlantillasCargasXOfertas[]>();
  @Output() datosActualizadosParaBorrarCargas = new EventEmitter<PlantillasCargasXOfertas[]>();
  panelOpenState = false;
  openorclose = false;
  descripcionPanel:any[] = [];
  descripcionPanelPorComas :  string = "";
  datosGuardados: PlantillasCargasXOfertas[] = [];
  datosParaBorrar:PlantillasCargasXOfertas[] = [];
  datosTemporales:any[]=[];
  dataSource = new MatTableDataSource<any>(this.datosGuardados);  
  lstPlantillasCargasXOfertas:  PlantillasCargasXOfertas[] = [];
  
  displayedColumns: string[] = ['tipoDeProducto','unidadDeEmpaque', 'altoCargaXOferta','anchoCargaXOferta', 'largoCargaXOferta','toneladaCargaXOferta','tarifaCargaXOferta', 'totalCargaXOferta','editar', 'borrar'];

  
  tipoDeProducto: string="";
  unidadDeEmpaque: string="";
  //nombrePlantillaCargaXOferta: string="";
  altoCargaXOferta: number=0;
  anchoCargaXOferta: number=0;
  largoCargaXOferta: number=0;
  toneladaCargaXOferta: number=0;
  tarifaCargaXOferta: number=0;
  totalCargaXOferta: number=0;


  constructor 
  (
    private formBuilder: FormBuilder,
    private plantillascargasxofertasService: PlantillasCargasXOfertasService
    
  ) { }
  
  ngOnInit() {
    
    if (this.DatosParaCrearPlantillaCargasPorOferta.length>0){
      this.lstPlantillasCargasXOfertas=this.DatosParaCrearPlantillaCargasPorOferta;
      this.cargarPlantillasCargasXOfertasAdatosGuardados();
      this.datosActualizadosCargas.emit(this.datosGuardados);
    }
    else{
      this.listarPlantillasCargasXOfertas(this.idOferta);
    }
  }

  FGAgregarCargas : FormGroup = this.formBuilder.group({  
    idCargaXOferta: new FormControl(0),
   // nombrePlantillaCargaXOferta: new FormControl('',Validators.required),
    tipoDeProducto: new FormControl('',Validators.required),
    unidadDeEmpaque: new FormControl('',Validators.required), 
    altoCargaXOferta: new FormControl(0,Validators.required),
    anchoCargaXOferta: new FormControl(0,Validators.required),
    largoCargaXOferta: new FormControl(0,Validators.required),
    toneladaCargaXOferta: new FormControl(0,Validators.required),
    tarifaCargaXOferta: new FormControl(0,Validators.required),
    totalCargaXOferta: new FormControl(0,Validators.required)
  });
  
  refrescarResumenPanel(){    
    console.log(this.datosGuardados.length);
    if (this.datosGuardados.length==0){
      this.descripcionPanelPorComas="";
    }
    else{
      this.descripcionPanelPorComas = this.datosGuardados.map(x => 
          "* " + x.unidadDeEmpaque + "(" + x.tipoDeProducto + ")").join(', ');
    }
  }

  panelOpen(){
    this.openorclose = true
  }

  cancelarEdicion(){
    if (this.editaroAgregar="agregar"){
      this.FGAgregarCargas.reset();
      this.openorclose = !this.openorclose;
    }
    else{
      this.FGAgregarCargas.reset(); 
      this.editaroAgregar="agregar";
    }
  }

  guardarDatos() {
    if(this.FGAgregarCargas.value.altoCargaXOferta == null || this.FGAgregarCargas.value.anchoCargaXOferta == null){
      alert("Debe seleccionar Alto Carga y Ancho Carga");
    }
    else{ 
      let PlantillaCargaXOferta = new PlantillasCargasXOfertas;
     // PlantillaCargaXOferta.nombrePlantillaCargaXOferta = this.FGAgregarCargas.value.nombrePlantillaCargaXOferta;
      PlantillaCargaXOferta.tipoDeProducto=this.FGAgregarCargas.value.tipoDeProducto;
      PlantillaCargaXOferta.unidadDeEmpaque=this.FGAgregarCargas.value.unidadDeEmpaque;
      PlantillaCargaXOferta.altoCargaXOferta=this.FGAgregarCargas.value.altoCargaXOferta;
      PlantillaCargaXOferta.anchoCargaXOferta=this.FGAgregarCargas.value.anchoCargaXOferta;
      PlantillaCargaXOferta.largoCargaXOferta=this.FGAgregarCargas.value.largoCargaXOferta;
      PlantillaCargaXOferta.toneladaCargaXOferta=this.FGAgregarCargas.value.toneladaCargaXOferta;
      PlantillaCargaXOferta.tarifaCargaXOferta=this.FGAgregarCargas.value.tarifaCargaXOferta;
      PlantillaCargaXOferta.totalCargaXOferta=this.FGAgregarCargas.value.totalCargaXOferta;

      this.datosGuardados.push(PlantillaCargaXOferta);
      this.dataSource.data = this.datosGuardados;
      this.datosActualizadosCargas.emit(this.datosGuardados);
      this.FGAgregarCargas.reset();
      
      this.refrescarResumenPanel();
    }
  }

  eliminarFila(index: number) { 
    this.datosParaBorrar.push(this.datosGuardados[index]);
    this.datosGuardados.splice(index, 1);
    this.dataSource.data = this.datosGuardados;
    this.datosActualizadosParaBorrarCargas.emit(this.datosParaBorrar);
    this.refrescarResumenPanel();
    this.FGAgregarCargas.reset();
  }

  editarFila(index: number) {
    
    this.datosGuardados[index] = this.FGAgregarCargas.value;
    this.dataSource.data = this.datosGuardados;
    this.datosActualizadosParaBorrarCargas.emit(this.datosParaBorrar);
    this.FGAgregarCargas.reset();
    this.editaroAgregar="agregar";
    this.refrescarResumenPanel();
  }

  cargarDatosParaEditar(index: number) {
    this.editaroAgregar="editar";
    this.indexEditar=index;
    let filaSeleccionada = this.datosGuardados[index];
    this.FGAgregarCargas.patchValue({
      idCargaXOferta:filaSeleccionada.idCargaXOferta,
     // nombrePlantillaCargaXOferta:filaSeleccionada.nombrePlantillaCargaXOferta,
      tipoDeProducto:filaSeleccionada.tipoDeProducto,
      unidadDeEmpaque:filaSeleccionada.unidadDeEmpaque,
      altoCargaXOferta:filaSeleccionada.altoCargaXOferta,
      anchoCargaXOferta:filaSeleccionada.anchoCargaXOferta, 
      largoCargaXOferta:filaSeleccionada.largoCargaXOferta,
      toneladaCargaXOferta:filaSeleccionada.toneladaCargaXOferta,
      tarifaCargaXOferta:filaSeleccionada.tarifaCargaXOferta,
      totalCargaXOferta:filaSeleccionada.totalCargaXOferta
    });
  }

  listarPlantillasCargasXOfertas(idOferta:number){
    this.plantillascargasxofertasService.ConsultarXOferta(idOferta.toString()).subscribe({
      next: (lstplantillascargasxofertas: PlantillasCargasXOfertas[]) => {
        this.lstPlantillasCargasXOfertas = lstplantillascargasxofertas;
        this.cargarPlantillasCargasXOfertasAdatosGuardados();
        console.log(this.lstPlantillasCargasXOfertas);
        console.log(this.idOferta)
      }
    });
  }
    
  public editooagrego(editaroAgregar:string){
    this.editaroAgregar=editaroAgregar;
  }


  cargarPlantillasCargasXOfertasAdatosGuardados() {
    this.lstPlantillasCargasXOfertas.forEach(carga => {
      let PlantillaCargaXOferta = new PlantillasCargasXOfertas;
      PlantillaCargaXOferta.idCargaXOferta = carga.idCargaXOferta;
      PlantillaCargaXOferta.idOferta = carga.idOferta;
     // PlantillaCargaXOferta.nombrePlantillaCargaXOferta = carga.nombrePlantillaCargaXOferta;
      PlantillaCargaXOferta.tipoDeProducto=carga.tipoDeProducto;
      PlantillaCargaXOferta.unidadDeEmpaque=carga.unidadDeEmpaque;
      PlantillaCargaXOferta.altoCargaXOferta=carga.altoCargaXOferta;
      PlantillaCargaXOferta.anchoCargaXOferta=carga.anchoCargaXOferta;
      PlantillaCargaXOferta.largoCargaXOferta=carga.largoCargaXOferta;
      PlantillaCargaXOferta.toneladaCargaXOferta=carga.toneladaCargaXOferta;
      PlantillaCargaXOferta.tarifaCargaXOferta=carga.tarifaCargaXOferta;
      PlantillaCargaXOferta.totalCargaXOferta=carga.totalCargaXOferta;
      
      this.datosGuardados.push(PlantillaCargaXOferta);
      this.dataSource.data = this.datosGuardados;
    });
    this.refrescarResumenPanel();
  }

}

