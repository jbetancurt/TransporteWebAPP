import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CargasXOfertas , CargasXOfertasComponent, CargasXOfertasService } from '../';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
  panelOpenState = false;
  descripcionPanel:any[] = [];
  descripcionPanelPorComas :  string = "";
  datosGuardados: any[] = [];
  datosTemporales:any[]=[];
  dataSource = new MatTableDataSource<any>(this.datosGuardados);  
  lstCargasXOfertas:  CargasXOfertas[] = [];
  
  displayedColumns: string[] = [ 'altoCargaXOferta','anchoCargaXOferta', 'largoCargaXOferta','toneladaCargaXOferta','tarifaCargaXOferta', 'totalCargaXOferta','editar', 'borrar'];

  
  altoCargaXOferta: number=0;
  anchoCargaXOferta: number=0;
  largoCargaXOferta: number=0;
  toneladaCargaXOferta: number=0;
  tarifaCargaXOferta: number=0;
  totalCargaXOferta: number=0;


  constructor 
  (
    private formBuilder: FormBuilder,
    private cargasxofertasService: CargasXOfertasService
    
  ) { }
  
  ngOnInit() {
    this.listarCargasXOfertas();
    this.refrescarResumenPanel();
  }

  FGAgregarCargas : FormGroup = this.formBuilder.group({   
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
          "* " + x.tarifaCargaXOferta + "(" + x.totalCargaXOferta + ")").join(', ');
    }
  }

  cancelarEdicion(){
    this.FGAgregarCargas.reset();  
    this.editaroAgregar="agregar";
  }

  guardarDatos() {
    const datos = {

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

  eliminarFila(index: number) { 
    this.datosGuardados.splice(index, 1);
    this.dataSource.data = this.datosGuardados;
    this.refrescarResumenPanel();
    
  }

  editarFila(index: number) {
    this.datosGuardados[index] = this.FGAgregarCargas.value;
    this.dataSource.data = this.datosGuardados;
    this.FGAgregarCargas.reset();
    //this.descripcionPanel = this.datosGuardados.map(dato => this.encontrarNombreTipoDeVehiculo(dato.idTipoDeVehiculo));
    this.editaroAgregar="agregar";
    this.refrescarResumenPanel();

  }

  cargarDatosParaEditar(index: number) {
    this.editaroAgregar="editar";
    this.indexEditar=index;
    let filaSeleccionada = this.datosGuardados[index];
    this.FGAgregarCargas.patchValue({
      altoCargaXOferta:filaSeleccionada.altoCargaXOferta,
      anchoCargaXOferta:filaSeleccionada.anchoCargaXOferta, 
      largoCargaXOferta:filaSeleccionada.largoCargaXOferta,
      toneladaCargaXOferta:filaSeleccionada.toneladaCargaXOferta,
      tarifaCargaXOferta:filaSeleccionada.tarifaCargaXOferta,
      totalCargaXOferta:filaSeleccionada.totalCargaXOferta
    });
  }

  listarCargasXOfertas(){
    this.cargasxofertasService.ConsultarXOferta(this.idOferta.toString()).subscribe({
      next: (lstcargasxofertas: CargasXOfertas[]) => {
        this.lstCargasXOfertas = lstcargasxofertas;
        this.cargarCargasXOfertasAdatosGuardados();
        console.log(this.lstCargasXOfertas);
        console.log(this.idOferta)
      //  this.refrescarResumenPanel();
      }
    });
  }
    
  public editooagrego(editaroAgregar:string){
    this.editaroAgregar=editaroAgregar;
  }


  cargarCargasXOfertasAdatosGuardados() {
    
    this.lstCargasXOfertas.forEach(carga => {
      //console.log(vehiculo);
      const datos = {
        idCargaXOferta: carga.idCargaXOferta,
        idOferta: carga.idOferta, 
        altoCargaXOferta: carga.altoCargaXOferta,
        anchoCargaXOferta: carga.anchoCargaXOferta,
        largoCargaXOferta: carga.largoCargaXOferta,
        toneladaCargaXOferta: carga.toneladaCargaXOferta,
        tarifaCargaXOferta: carga.tarifaCargaXOferta,
        totalCargaXOferta: carga.totalCargaXOferta
       
      };
      //console.log(datos);
      this.datosGuardados.push(datos);
      this.dataSource.data = this.datosGuardados;
      //this.datosGuardados.map(dato => this.encontrarNombreTipoDeVehiculo(dato.idTipoDeVehiculo));
      
    });
  }

}

