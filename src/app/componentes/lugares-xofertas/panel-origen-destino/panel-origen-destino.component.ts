import { AfterViewInit, Component, EventEmitter, Input, OnInit, ViewChild } from '@angular/core';
import { LugaresXOfertas , LugaresXOfertasComponent, LugaresXOfertasService } from '../';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Personas, PersonasService } from '../../personas';
import { Ciudades, CiudadesService } from '../../ciudades';
import { Empresas, EmpresasService } from '../../empresas';
import { Ofertas, OfertasService } from '../../ofertas';
import { TiposDeLugaresXOfertas, TiposDeLugaresXOfertasService } from '../../tipos-de-lugares-xofertas';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-panel-origen-destino',
  templateUrl: './panel-origen-destino.component.html',
  styleUrls: ['./panel-origen-destino.component.scss']
})



export class PanelOrigenDestinoComponent implements OnInit   {
  lstCiudades : Ciudades[]=[];
  lstPersonas : Personas[]=[];
  lstLugaresXOfertas : LugaresXOfertas[]=[];
  panelOpenState = false;
  nombres = "";
  
  @Input() editaroAgregar = "agregar";
  @Input() indexEditar = 0;
  @Input() tituloDelPanel = "Destino";
  tipoDeLugar: number=0;

  descripcionPanel:LugaresXOfertas[] = [];
  descripcionPanelPorComas :  string = "";
  
  datosGuardados: any[] = [];
  
  datosTemporales:any[]=[];
  dataSource = new MatTableDataSource<any>(this.datosGuardados);  

 

  displayedColumns: string[] = ['idCiudad', 'idPersona','nombreLugarXOferta', 'direccionLugarXOferta', 'telefonoLugarXOferta','observacionLugarXOferta','editar', 'borrar'];
  // Define los datos de la tabla
  
  // Agrega el paginador si lo deseas
  //@ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  
  idCiudad: number=0;
  idPersona: number=0; 
  //idEmpresa: number=0;
  idTipoDeLugarXOferta: number=0;
  ordenLugarXOferta: number=0;
  nombreLugarXOferta: string="";  
  observacionLugarXOferta: string="";
  telefonoLugarXOferta: string="";
  direccionLugarXOferta: string="";
  
  FGAgregarLugares : FormGroup = this.formBuilder.group({      
    idCiudad:new FormControl(0,Validators.required),
    idPersona:new FormControl(0,Validators.required),
    nombreLugarXOferta:new FormControl('',Validators.required),
    observacionLugarXOferta: new FormControl('',Validators.required),
    telefonoLugarXOferta: new FormControl('',Validators.required),
    direccionLugarXOferta: new FormControl('',Validators.required),
    idTipoDeLugarXOferta:new FormControl(0,Validators.required),
   // idEmpresa:new FormControl(0,Validators.required),
    
    //ordenLugarXOferta:new FormControl(0,Validators.required)
    
  });

  

guardarDatos() {
  const datos = {
    idCiudad:this.FGAgregarLugares.value.idCiudad,
    idPersona: this.FGAgregarLugares.value.idPersona, 
    //idEmpresa:0,
    idTipoDeLugarXOferta:this.tipoDeLugar,
    
    //ordenLugarXOferta: this.ordenLugarXOferta,
    nombreLugarXOferta: this.FGAgregarLugares.value.nombreLugarXOferta,  
    observacionLugarXOferta: this.FGAgregarLugares.value.observacionLugarXOferta,
    telefonoLugarXOferta: this.FGAgregarLugares.value.telefonoLugarXOferta,
    direccionLugarXOferta: this.FGAgregarLugares.value.direccionLugarXOferta
    
  };
  this.datosGuardados.push(datos);
  this.dataSource.data = this.datosGuardados;

  this.FGAgregarLugares.reset();
  this.descripcionPanel = this.datosGuardados.map(dato => dato.nombreLugarXOferta);
  //this.descripcionPanelPorComas = this.descripcionPanel.join(', ');
  console.log(this.datosGuardados);
}

listarOrigenes(){
  this.datosGuardados.forEach(element => {
    if(element.idTipoDeLugarXOferta==2){
      this.datosTemporales.push(element);
    }
  });
  this.dataSource.data = this.datosTemporales;
}

listarDestinos(){
  this.datosGuardados.forEach(element => {
    if(element.idTipoDeLugarXOferta==3){
      this.datosTemporales.push(element);
    }
  });
  this.dataSource.data = this.datosTemporales;
}

eliminarFila(index: number) { 
  this.datosGuardados.splice(index, 1);
  this.dataSource.data = this.datosGuardados;
  this.descripcionPanel = this.datosGuardados.map(dato => dato.nombreLugarXOferta);
  
}

editarFila(index: number) {
  this.datosGuardados[index] = this.FGAgregarLugares.value;
  this.dataSource.data = this.datosGuardados;
  this.FGAgregarLugares.reset();
  this.descripcionPanel = this.datosGuardados.map(dato => dato.nombreLugarXOferta);
  this.editaroAgregar="agregar";
}

cargarDatosParaEditar(index: number) {
  console.log(index);
  this.editaroAgregar="editar";
  this.indexEditar=index;
  let filaSeleccionada = this.datosGuardados[index];
  console.log(filaSeleccionada);
  console.log(this.datosGuardados[index]);
  console.log(index);
  this.FGAgregarLugares.patchValue({
    idCiudad: filaSeleccionada.idCiudad,
    idPersona: filaSeleccionada.idPersona,
    idTipoDeLugarXOferta: filaSeleccionada.idTipoDeLugarXOferta,
    nombreLugarXOferta: filaSeleccionada.nombreLugarXOferta,
    observacionLugarXOferta: filaSeleccionada.observacionLugarXOferta,
    telefonoLugarXOferta: filaSeleccionada.telefonoLugarXOferta,
    direccionLugarXOferta: filaSeleccionada.direccionLugarXOferta
  });
  
}


  listarCiudades(){ 
    this.ciudadesService.GetAll().subscribe({
      next : (lstciudades:Ciudades[]) => { 
        this.lstCiudades=lstciudades;
      }
    });
  }

  encontrarNombreCiudad(idCiudad:number):string{
    let ciudad:string="";
    this.lstCiudades.forEach(element => {
      if(element.idCiudad==idCiudad){
        ciudad=element.nombreCiudad;
       
      }
    });
    return ciudad;
  }

  listarPersonas(){ 
    this.personasService.GetAll().subscribe({
      next : (lstpersonas:Personas[]) => { 
        this.lstPersonas=lstpersonas;
      }
    });
  }

  listarLugaresXOfertas(){
    this.lugaresxofertasService.GetAll().subscribe({
      next : (lstlugaresxofertas:LugaresXOfertas[]) => { 
        this.lstLugaresXOfertas=lstlugaresxofertas;
        this.datosGuardados = this.lstLugaresXOfertas.filter(lugar => lugar.idTipoDeLugarXOferta==this.tipoDeLugar);
        
        this.dataSource.data = this.datosGuardados;
        this.descripcionPanelPorComas = this.datosGuardados.map(x => 
            "* " + x.nombreLugarXOferta + "(" + this.encontrarNombreCiudad(x.idCiudad) + ")").join(', ');
        
      }
    });
  }



  encontrarNombrePersona(idPersona:number):string{
    let persona:string="";
    this.lstPersonas.forEach(element => {
      if(element.idPersona==idPersona){
        persona=element.nombreCompletoPersona;
      }
    });
    return persona;
  }

  public editooagrego(editaroAgregar:string){
    this.editaroAgregar=editaroAgregar;
  }

  asignarTipoDeLugar(){
    if (this.tituloDelPanel=="Origen"){
      this.tipoDeLugar= 2
    }else{
      this.tipoDeLugar= 3
    }
  }

  ngOnInit() {
    this.asignarTipoDeLugar();
    this.listarCiudades();
    this.listarPersonas();
    this.listarLugaresXOfertas();
    
    
    //this.cargarLugaresXOfertasAdatosGuardados();
    
    this.descripcionPanel = this.datosGuardados.map(dato => dato.nombreLugarXOferta);
    

  }
 
  constructor(
    private ciudadesService: CiudadesService,
    private personasService: PersonasService,
    private lugaresxofertasService: LugaresXOfertasService,
    private formBuilder: FormBuilder
    
    ) { }

    enviarDatos() : void{
      let fgLugaresXOfertas=this.FGAgregarLugares.value;
     
      
    }
  


}
