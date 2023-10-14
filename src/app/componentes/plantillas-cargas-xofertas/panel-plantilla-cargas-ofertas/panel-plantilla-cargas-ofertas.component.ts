import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PlantillasCargasXOfertas , PlantillasCargasXOfertasComponent, PlantillasCargasXOfertasService } from '../';
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
  panelOpenState = false;
  openorclose = false;
  descripcionPanel:any[] = [];
  descripcionPanelPorComas :  string = "";
  datosGuardados: any[] = [];
  datosTemporales:any[]=[];
  dataSource = new MatTableDataSource<any>(this.datosGuardados);  
  lstPlantillasCargasXOfertas:  PlantillasCargasXOfertas[] = [];
  
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
    private plantillascargasxofertasService: PlantillasCargasXOfertasService
    
  ) { }
  
  ngOnInit() {
    this.listarPlantillasCargasXOfertas(this.idOferta);
  }

  FGAgregarCargas : FormGroup = this.formBuilder.group({  
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
      const datos = {
        tipoDeProducto:this.FGAgregarCargas.value.tipoDeProducto,
        unidadDeEmpaque:this.FGAgregarCargas.value.unidadDeEmpaque,
        altoCargaXOferta:this.FGAgregarCargas.value.altoCargaXOferta,
        anchoCargaXOferta:this.FGAgregarCargas.value.anchoCargaXOferta,
        largoCargaXOferta:this.FGAgregarCargas.value.largoCargaXOferta,
        toneladaCargaXOferta:this.FGAgregarCargas.value.toneladaCargaXOferta,
        tarifaCargaXOferta:this.FGAgregarCargas.value.tarifaCargaXOferta,
        totalCargaXOferta:this.FGAgregarCargas.value.totalCargaXOferta
        
      };
      this.datosGuardados.push(datos);
      this.dataSource.data = this.datosGuardados;
      this.FGAgregarCargas.reset();
      
      this.refrescarResumenPanel();
    }
  }

  eliminarFila(index: number) { 
    this.datosGuardados.splice(index, 1);
    this.dataSource.data = this.datosGuardados;
    this.refrescarResumenPanel();
    this.FGAgregarCargas.reset();
  }

  editarFila(index: number) {
    this.datosGuardados[index] = this.FGAgregarCargas.value;
    this.dataSource.data = this.datosGuardados;
    this.FGAgregarCargas.reset();
    this.editaroAgregar="agregar";
    this.refrescarResumenPanel();
  }

  cargarDatosParaEditar(index: number) {
    this.editaroAgregar="editar";
    this.indexEditar=index;
    let filaSeleccionada = this.datosGuardados[index];
    this.FGAgregarCargas.patchValue({
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
      const datos = {
        idCargaXOferta: carga.idCargaXOferta,
        idOferta: carga.idOferta, 
        tipoDeProducto: carga.tipoDeProducto,
        unidadDeEmpaque: carga.unidadDeEmpaque,
        altoCargaXOferta: carga.altoCargaXOferta,
        anchoCargaXOferta: carga.anchoCargaXOferta,
        largoCargaXOferta: carga.largoCargaXOferta,
        toneladaCargaXOferta: carga.toneladaCargaXOferta,
        tarifaCargaXOferta: carga.tarifaCargaXOferta,
        totalCargaXOferta: carga.totalCargaXOferta
      };
      this.datosGuardados.push(datos);
      this.dataSource.data = this.datosGuardados;
    });
    this.refrescarResumenPanel();
  }

}

