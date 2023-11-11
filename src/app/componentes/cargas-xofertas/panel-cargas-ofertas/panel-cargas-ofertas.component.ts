import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { CargasXOfertas , CargasXOfertasComponent, CargasXOfertasService } from '../';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PlantillasCargasXOfertas} from '../../plantillas-cargas-xofertas/plantillas-cargas-xofertas.model';
import { PlantillasCargasXOfertasService } from '../../plantillas-cargas-xofertas/plantillas-cargas-xofertas.service';

@Component({
  selector: 'app-panel-cargas-ofertas',
  templateUrl: './panel-cargas-ofertas.component.html',
  styleUrls: ['./panel-cargas-ofertas.component.scss']
})
export class PanelCargasOfertasComponent implements OnInit {
  
  @Input() tituloDelPanel = "CARGA";
  @Input() editaroAgregar = "agregar";
  @Input() indexEditar = 0;
  @Input() idOferta = 0;
  @Output() datosActualizadosCargas = new EventEmitter<CargasXOfertas[]>();
  @Output() datosActualizadosParaBorrarCargas = new EventEmitter<CargasXOfertas[]>();
  @Input() DatosParaCargarDeLaPlantilla:PlantillasCargasXOfertas[] = [];
  panelOpenState = false;
  openorclose = false;
  descripcionPanel:any[] = [];
  descripcionPanelPorComas :  string = "";
  datosGuardados: CargasXOfertas[] = [];
  datosGuardadosPlantillasCargasXOfertas: PlantillasCargasXOfertas[] = [];
  datosParaBorrar:CargasXOfertas[] = [];
  datosTemporales:any[]=[];
  dataSource = new MatTableDataSource<any>(this.datosGuardados);  
  lstCargasXOfertas:  CargasXOfertas[] = [];
  
  displayedColumns: string[] = ['tipoDeProducto','unidadDeEmpaque', 'altoCargaXOferta','anchoCargaXOferta', 'largoCargaXOferta','toneladaCargaXOferta','tarifaCargaXOferta', 'totalCargaXOferta','editar', 'borrar'];

  
  tipoDeProducto: string="";
  unidadDeEmpaque: string="";
  altoCargaXOferta: number=0;
  anchoCargaXOferta: number=0;
  largoCargaXOferta: number=0;
  toneladaCargaXOferta: number=0;
  tarifaCargaXOferta: number=0;
  totalCargaXOferta: number=0;


  constructor 
  (
    private formBuilder: FormBuilder,
    private cargasxofertasService: CargasXOfertasService,
    private plantillascargasxofertasService: PlantillasCargasXOfertasService
    
  ) { }
  
  ngOnInit() {
    this.listarCargasXOfertas(this.idOferta);
    //this.refrescarResumenPanel();
  }

  FGAgregarCargas : FormGroup = this.formBuilder.group({  
    idCargaXOferta: new FormControl(0),
    tipoDeProducto: new FormControl('',Validators.required),
    unidadDeEmpaque: new FormControl('',Validators.required), 
    altoCargaXOferta: new FormControl(0),
    anchoCargaXOferta: new FormControl(0),
    largoCargaXOferta: new FormControl(0),
    toneladaCargaXOferta: new FormControl(0),
    tarifaCargaXOferta: new FormControl(0),
    totalCargaXOferta: new FormControl(0)
  });
  
  refrescarResumenPanel(){    
   
    if (this.datosGuardados.length==0){
      this.descripcionPanelPorComas="";
    }
    else{
      this.descripcionPanelPorComas = this.datosGuardados.map(x => 
          "* " + x.unidadDeEmpaque + "(" + x.tipoDeProducto + ")").join(', ');
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['DatosParaCargarDeLaPlantilla']) {
      if (this.DatosParaCargarDeLaPlantilla.length > 0){
        this.datosGuardados = [];
        this.datosGuardadosPlantillasCargasXOfertas = [];
        this.listarPlantillasCargasXOfertas(this.DatosParaCargarDeLaPlantilla[0].idOferta);
      }
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
      let CargaXOferta = new CargasXOfertas;
     
      CargaXOferta.tipoDeProducto=this.FGAgregarCargas.value.tipoDeProducto;
      CargaXOferta.unidadDeEmpaque=this.FGAgregarCargas.value.unidadDeEmpaque;
      CargaXOferta.altoCargaXOferta=this.FGAgregarCargas.value.altoCargaXOferta;
      CargaXOferta.anchoCargaXOferta=this.FGAgregarCargas.value.anchoCargaXOferta;
      CargaXOferta.largoCargaXOferta=this.FGAgregarCargas.value.largoCargaXOferta;
      CargaXOferta.toneladaCargaXOferta=this.FGAgregarCargas.value.toneladaCargaXOferta;
      CargaXOferta.tarifaCargaXOferta=this.FGAgregarCargas.value.tarifaCargaXOferta;
      CargaXOferta.totalCargaXOferta=this.FGAgregarCargas.value.totalCargaXOferta;
      
      this.datosGuardados.push(CargaXOferta);
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
    this.datosActualizadosCargas.emit(this.datosGuardados);
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

  listarPlantillasCargasXOfertas(idOfertaPlantillaCargasXOfertas:number){
    this.plantillascargasxofertasService.ConsultarXOferta(idOfertaPlantillaCargasXOfertas.toString()).subscribe({
      next: (lstplantillascargasxofertas: PlantillasCargasXOfertas[]) => {
        this.datosGuardadosPlantillasCargasXOfertas = lstplantillascargasxofertas;
        for (let index = 0; index < this.datosGuardadosPlantillasCargasXOfertas.length; index++) {
          let CargaXOferta = new CargasXOfertas;
          CargaXOferta.tipoDeProducto=this.datosGuardadosPlantillasCargasXOfertas[index].tipoDeProducto;
          CargaXOferta.unidadDeEmpaque=this.datosGuardadosPlantillasCargasXOfertas[index].unidadDeEmpaque;
          CargaXOferta.altoCargaXOferta=this.datosGuardadosPlantillasCargasXOfertas[index].altoCargaXOferta;
          CargaXOferta.anchoCargaXOferta=this.datosGuardadosPlantillasCargasXOfertas[index].anchoCargaXOferta; 
          CargaXOferta.largoCargaXOferta=this.datosGuardadosPlantillasCargasXOfertas[index].largoCargaXOferta;
          CargaXOferta.toneladaCargaXOferta=this.datosGuardadosPlantillasCargasXOfertas[index].toneladaCargaXOferta;
          CargaXOferta.tarifaCargaXOferta=this.datosGuardadosPlantillasCargasXOfertas[index].tarifaCargaXOferta;
          CargaXOferta.totalCargaXOferta=this.datosGuardadosPlantillasCargasXOfertas[index].totalCargaXOferta;
          
          this.datosGuardados.push(CargaXOferta);
        }
        this.dataSource.data = this.datosGuardados;
        this.refrescarResumenPanel();
      }
    });
  }

  listarCargasXOfertas(idOferta:number){
    this.cargasxofertasService.ConsultarXOferta(idOferta.toString()).subscribe({
      next: (lstcargasxofertas: CargasXOfertas[]) => {
        this.lstCargasXOfertas = lstcargasxofertas;
        this.cargarCargasXOfertasAdatosGuardados();
       
      //  this.refrescarResumenPanel();
      }
    });
  }
    
  public editooagrego(editaroAgregar:string){
    this.editaroAgregar=editaroAgregar;
  }


  cargarCargasXOfertasAdatosGuardados() {
    
    this.lstCargasXOfertas.forEach(carga => {
      let CargaXOferta = new CargasXOfertas;
      
      CargaXOferta.idCargaXOferta=carga.idCargaXOferta;
      CargaXOferta.idOferta=carga.idOferta;
      CargaXOferta.tipoDeProducto=carga.tipoDeProducto;
      CargaXOferta.unidadDeEmpaque=carga.unidadDeEmpaque;
      CargaXOferta.altoCargaXOferta=carga.altoCargaXOferta;
      CargaXOferta.anchoCargaXOferta=carga.anchoCargaXOferta;
      CargaXOferta.largoCargaXOferta=carga.largoCargaXOferta;
      CargaXOferta.toneladaCargaXOferta=carga.toneladaCargaXOferta;
      CargaXOferta.tarifaCargaXOferta=carga.tarifaCargaXOferta;
      CargaXOferta.totalCargaXOferta=carga.totalCargaXOferta;
      
      this.datosGuardados.push(CargaXOferta);
      this.dataSource.data = this.datosGuardados;
      
    });
    this.refrescarResumenPanel();
  }

}

