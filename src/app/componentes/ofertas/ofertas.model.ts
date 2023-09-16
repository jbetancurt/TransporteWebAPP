export class Ofertas {
    idOferta : number=0;
    idDestinoInicio : number=0;
    idDestinoFin : number=0;
    idEmpresa : number=0;
    idTipoOrientacionDeLaOferta : number=0;
    tituloOferta : string='';
    descripcionOferta : string='';
    altoOferta : number=0;
    anchoOferta : number=0;
    largoOferta : number=0;
    toneladasOferta : number=0;
    valorXToneladaOferta : number=0;
    fechaInicialOferta : Date=new Date();
    fechaFinalOferta : Date=new Date();
    horaInicialOferta : Date=new Date();
    estadoOferta : boolean=false;
}
