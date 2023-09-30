import { Component, EventEmitter, Input, OnInit, ViewChild } from '@angular/core';
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



//const ELEMENT_DATA: PeriodicElement[] = [
//  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
//];

@Component({
  selector: 'app-panel-lugares-xofertas',
  templateUrl: './panel-lugares-xofertas.component.html',
  styleUrls: ['./panel-lugares-xofertas.component.scss']
})


export class PanelLugaresXOfertasComponent implements OnInit {
  //----Panel Superior--------//
  onAdd = new EventEmitter(); 
  @Input() idLugarXOferta = 0;
  @Input() idOferta = 0;
  editar:boolean=false;
  
  checked = false;
  indeterminate = false;
  labelPosition = 'after';
  disabled = false;

  lstOfertas:Ofertas[]=[];
  lstPersonas:Personas[]=[];
  lstCiudades : Ciudades[]=[];
  lstEmpresas:Empresas[]=[];
  lstTiposDeLugaresXOfertas : TiposDeLugaresXOfertas[]=[]; 
  
  // esto es del panel inferior//

  panelOpenState = false;
  
  
  
  arraypaginator=environment.paginator;
 // lstPersonas : Personas[]=[];
 // lstCiudades : Ciudades[]=[];
 // lstEmpresas : Empresas[]=[];
//  lstOfertas : Ofertas[]=[];
 // lstTiposDeLugaresXOfertas : TiposDeLugaresXOfertas[]=[];
  lstlugaresxofertas:LugaresXOfertas[]=[];
  lstlugaresxofertasTodos:LugaresXOfertas[]=[];
  lsttciudades:Ciudades[]=[];
  lsttciudadesTodos:Ciudades[]=[];
 // dataSource!: MatTableDataSource<LugaresXOfertas>;
  dataSource!: MatTableDataSource<LugaresXOfertas>;
  collectionSize = 0;
  filtroBusqueda: string = "";
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['idEmpresa','idCiudad','idOferta', 'idPersona','idTipoDeLugarXOferta','nombreLugarXOferta','direccionLugarXOferta','telefonoLugarXOferta','editar', 'borrar'];
  public AbrirInformacion()
  {
    this.lugaresxofertasService.GetAll().subscribe({
       next : (datalugaresxofertas:LugaresXOfertas[]) => {
        this.lstlugaresxofertasTodos = datalugaresxofertas;
        this.lstlugaresxofertas = datalugaresxofertas;
        //this.dataSource = new MatTableDataSource(datalugaresxofertas);
        this.dataSource = new MatTableDataSource(datalugaresxofertas);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        }
     });
  }
  search(e: any): void {
    let value = (<HTMLTextAreaElement>e.target).value;
    
    this.lstlugaresxofertas = this.lstlugaresxofertasTodos.filter(
        (val) => (
          ((val.nombreLugarXOferta ?? "").trim() ?? "").toLowerCase().includes(value.toLowerCase().replace(/\s/g, ""))
    ));
    this.dataSource = new MatTableDataSource(this.lstlugaresxofertas);
    
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    
    this.collectionSize = this.lstlugaresxofertas.length;
    
  }


  //----------------------------------------------------//



  FGAgregarLugaresXOfertas : FormGroup = this.formBuilder.group({      
    idLugarXOferta: new FormControl('0'),
    idOferta :new FormControl(0,Validators.required),
    idPersona:new FormControl(0,Validators.required),
    idCiudad:new FormControl(0,Validators.required),
    idEmpresa:new FormControl(0,Validators.required),
    idTipoDeLugarXOferta:new FormControl(0,Validators.required),
    ordenLugarXOferta:new FormControl(0,Validators.required),
    nombreLugarXOferta:new FormControl('',Validators.required),
    observacionLugarXOferta: new FormControl('',Validators.required),
    telefonoLugarXOferta: new FormControl('',Validators.required),
    direccionLugarXOferta: new FormControl('',Validators.required),
    fechaEnElLugar : new FormControl(new Date,Validators.required),
    duracionEnLugarXOferta:new FormControl(0,Validators.required),
   
  });
    
  cargarNombresLugaresXOfertas(lugaresxofertas:LugaresXOfertas){
    this.lugaresxofertasService.Get(lugaresxofertas.idLugarXOferta.toString()).subscribe({ 
      next : (datalugaresxofertas:LugaresXOfertas) => {
        if (datalugaresxofertas.idLugarXOferta>0){
          this.FGAgregarLugaresXOfertas.patchValue({
            idLugarXOferta:lugaresxofertas.idLugarXOferta,
            idOferta:lugaresxofertas.idOferta,
            idCiudad:lugaresxofertas.idCiudad,
            idPersona:datalugaresxofertas.idPersona,
            idEmpresa:lugaresxofertas.idEmpresa,
            idTipoDeLugarXOferta:lugaresxofertas.idTipoDeLugarXOferta,
            ordenLugarXOferta:lugaresxofertas.ordenLugarXOferta,
            nombreLugarXOferta:lugaresxofertas.nombreLugarXOferta,
            observacionLugarXOferta:lugaresxofertas.observacionLugarXOferta,
            telefonoLugarXOferta:lugaresxofertas.telefonoLugarXOferta,
            direccionLugarXOferta:lugaresxofertas.direccionLugarXOferta,
            fechaEnElLugar : lugaresxofertas.fechaEnElLugar,
            duracionEnLugarXOferta:lugaresxofertas.duracionEnLugarXOferta,
          });
        }        
      }
    });
    
  }  
  
  
  
  public asignarid(idLugarXOferta:number){
    this.idLugarXOferta=idLugarXOferta;
    this.editar=true;
  }
  
  public AbrirInformacion2()
  {
    if(this.idLugarXOferta>0)
    {
      this.lugaresxofertasService.Get(this.idLugarXOferta.toString()).subscribe({
        next : (datalugaresxofertas:LugaresXOfertas) => {
          this.cargarNombresLugaresXOfertas(datalugaresxofertas);
        }
      });
    }
  }

 // ngOnInit() {
    
//  }


  //------------Fin Codigo Panel Superior----------------//
  
  
  
    // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
     // dataSource = ELEMENT_DATA;
     
    
      ngOnInit() {
        this.AbrirInformacion();
        this.AbrirInformacion2();
        this.listarCiudades();
        this.listarPersonas();
        this.listarEmpresas();
        this.listarOfertas();
        this.listarTiposDeLugaresXOfertas();
        //-------esto es para el panel superior-------//
        this.listarPersonas();
        this.listarCiudades();
        this.listarEmpresas();
        this.listarOfertas();
        this.listarTiposDeLugaresXOfertas();
        this.AbrirInformacion();
        if (this.dataSource != null){
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
               
      }
      encontrarNombrePersona(idPersona:number):string{
        let persona:string="";
        //let ciudad : number=0;
        this.lstPersonas.forEach(element => {
          if(element.idPersona==idPersona){
            persona=element.nombreCompletoPersona;
            //ciudad=element.idCiudad;
          }
        });
        return persona;
      }

      encontrarNombreCiudad(idCiudad:number):string{
        let ciudad:string="";
        //let persona : number=0;
        this.lstCiudades.forEach(element => {
          if(element.idCiudad==idCiudad){
            ciudad=element.nombreCiudad;
            //ciudad=element.idCiudad;
          }
        });
        return ciudad;
      }

      encontrarNombreEmpresa(idEmpresa:number):string{
        let empresa:string="";
        this.lstEmpresas.forEach(element => {
          if(element.idEmpresa==idEmpresa){
            empresa=element.nombreEmpresa;
          }
        });
        return empresa;
      }

      encontrarNombreTipoDeLugarXOferta(idTipoDeLugarXOferta:number):string{
        let tipodelugarxoferta:string="";
        this.lstTiposDeLugaresXOfertas.forEach(element => {
          if(element.idTipoDeLugarXOferta==idTipoDeLugarXOferta){
            tipodelugarxoferta=element.nombreTipoDeLugarXOferta;
          }
        });
        return tipodelugarxoferta;
      }

      encontrarNombreOferta(idOferta:number):string{
        let oferta:string="";
        this.lstOfertas.forEach(element => {
          if(element.idOferta==idOferta){
            oferta=element.tituloOferta;
          }
        });
        return oferta;
      }

           
      
      listarPersonas(){ 
        this.personasService.GetAll().subscribe({
          next : (lstciudades:Personas[]) => { 
            this.lstPersonas=lstciudades;
          }
        });
      }
      
      listarCiudades(){ 
        this.ciudadesService.GetAll().subscribe({
          next : (lstciudades:Ciudades[]) => { 
            this.lstCiudades=lstciudades;
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

      listarTiposDeLugaresXOfertas(){ 
        this.tiposdelugaresxofertasService.GetAll().subscribe({
          next : (lsttiposdelugaresxofertas:TiposDeLugaresXOfertas[]) => { 
            this.lstTiposDeLugaresXOfertas=lsttiposdelugaresxofertas;
          }
        });
      }

      listarOfertas(){ 
        this.ofertasService.GetAll().subscribe({
          next : (lstofertas:Ofertas[]) => { 
            this.lstOfertas=lstofertas;
          }
        });
      }
    
      AbrirModalLugarXOferta(idLugarXOferta:number){
        const dialogRef = this.modalService.open(LugaresXOfertasComponent).updateSize('80%');
            
        dialogRef.componentInstance.idLugarXOferta=idLugarXOferta;
        dialogRef.componentInstance.asignarid(idLugarXOferta);
        dialogRef.componentInstance.onAdd.subscribe(() => {
          dialogRef.close();
        });
        dialogRef.afterClosed().subscribe(result => {
          this.AbrirInformacion();
        });
       }
    
        borrarXId(idLugarXOferta:number){
        this.lugaresxofertasService.delete(idLugarXOferta.toString()).subscribe({ 
          next:  () => {
             this.AbrirInformacion();
          }
        });
       }
      constructor(
        private lugaresxofertasService: LugaresXOfertasService,
        private personasService: PersonasService,
        private ciudadesService: CiudadesService,
        private empresasService: EmpresasService,
        private tiposdelugaresxofertasService: TiposDeLugaresXOfertasService,
        private ofertasService: OfertasService,
        private formBuilder: FormBuilder, 
        private modalService: MatDialog
        ) { }

             
    
        crearLugaresXOfertas(){
          let lugaresxofertas : LugaresXOfertas = new LugaresXOfertas;
      
          
          //agregamos los datos del formulario a la tabla personas
          lugaresxofertas.idLugarXOferta=this.FGAgregarLugaresXOfertas.value.idLugarXOferta;
          lugaresxofertas.idOferta=this.FGAgregarLugaresXOfertas.value.idOferta;
          lugaresxofertas.idCiudad=this.FGAgregarLugaresXOfertas.value.idCiudad;
          lugaresxofertas.idPersona=this.FGAgregarLugaresXOfertas.value.idPersona;
          lugaresxofertas.idEmpresa=this.FGAgregarLugaresXOfertas.value.idEmpresa;
          lugaresxofertas.idTipoDeLugarXOferta=this.FGAgregarLugaresXOfertas.value.idTipoDeLugarXOferta;
          lugaresxofertas.ordenLugarXOferta=this.FGAgregarLugaresXOfertas.value.ordenLugarXOferta;
          lugaresxofertas.nombreLugarXOferta=this.FGAgregarLugaresXOfertas.value.nombreLugarXOferta;
          lugaresxofertas.observacionLugarXOferta=this.FGAgregarLugaresXOfertas.value.observacionLugarXOferta;
          lugaresxofertas.telefonoLugarXOferta=this.FGAgregarLugaresXOfertas.value.telefonoLugarXOferta;
          lugaresxofertas.direccionLugarXOferta=this.FGAgregarLugaresXOfertas.value.direccionLugarXOferta;
          lugaresxofertas.fechaEnElLugar=this.FGAgregarLugaresXOfertas.value.fechaEnElLugar;
          lugaresxofertas.duracionEnLugarXOferta=this.FGAgregarLugaresXOfertas.value.duracionEnLugarXOferta;
          
         //suscrubimos la guardada de los datos en la tabla lugaresxofertas
          this.lugaresxofertasService.create(lugaresxofertas).subscribe(
            data => {
              this.onAdd.emit();
            }
          ); 
          
        }
        
         
        editarLugaresXOfertas(idLugarXOferta:number){
          let lugaresxofertas : LugaresXOfertas = new LugaresXOfertas;
      //agregamos los datos del formulario a la tabla lugaresxofertas
          lugaresxofertas.idLugarXOferta=idLugarXOferta;
          lugaresxofertas.idOferta=this.FGAgregarLugaresXOfertas.value.idOferta;
          lugaresxofertas.idCiudad=this.FGAgregarLugaresXOfertas.value.idCiudad;
          lugaresxofertas.idPersona=this.FGAgregarLugaresXOfertas.value.idPersona;
          lugaresxofertas.idEmpresa=this.FGAgregarLugaresXOfertas.value.idEmpresa;
          lugaresxofertas.idTipoDeLugarXOferta=this.FGAgregarLugaresXOfertas.value.idTipoDeLugarXOferta;
          lugaresxofertas.ordenLugarXOferta=this.FGAgregarLugaresXOfertas.value.ordenLugarXOferta;
          lugaresxofertas.nombreLugarXOferta=this.FGAgregarLugaresXOfertas.value.nombreLugarXOferta;
          lugaresxofertas.observacionLugarXOferta=this.FGAgregarLugaresXOfertas.value.observacionLugarXOferta;
          lugaresxofertas.telefonoLugarXOferta=this.FGAgregarLugaresXOfertas.value.telefonoLugarXOferta;
          lugaresxofertas.direccionLugarXOferta=this.FGAgregarLugaresXOfertas.value.direccionLugarXOferta;
          lugaresxofertas.fechaEnElLugar=this.FGAgregarLugaresXOfertas.value.fechaEnElLugar;
          lugaresxofertas.duracionEnLugarXOferta=this.FGAgregarLugaresXOfertas.value.duracionEnLugarXOferta;
          
          
          //suscrubimos la guardada de los datos en la tabla lugaresxofertas
          this.lugaresxofertasService.Edit(lugaresxofertas).subscribe(
            data => {
              this.onAdd.emit();
            }
          ); 
          
        }
    
        
      
        enviarDatos() : void{
          let fgLugaresXOfertas=this.FGAgregarLugaresXOfertas.value;
          this.lugaresxofertasService.Get(fgLugaresXOfertas.idLugarXOferta).subscribe({
            next : (datalugaresxofertas:LugaresXOfertas) => {
             if(datalugaresxofertas.idLugarXOferta<=0){
              
              this.crearLugaresXOfertas();
             }
             else if(datalugaresxofertas.idLugarXOferta>0){
              
              this.editarLugaresXOfertas(datalugaresxofertas.idLugarXOferta);
             }
             
            }
          }); 
      
          
        }
    }  