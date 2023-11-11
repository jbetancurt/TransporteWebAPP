export class RequisitosXOfertas {
    idRequisitoXOferta : number=0;
    idOferta : number=0;
    idRequisito : number=0;
    observacion : string="";
}

export class RequisitosXOfertasAdjuntos extends RequisitosXOfertas {
    requeridoAdjunto : boolean=false;
}
