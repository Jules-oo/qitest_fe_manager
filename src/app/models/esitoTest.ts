//Model dell'esito della chiamata rest alla fine del test
export class EsitoTest {

    nomeUtente?: string;
    inizioTest?: string;
    fineTest?: string;
    totDomande?: number;
    totRisposte?: number;
    totGiuste?: number;
    percentualeSuccesso?: number;

    constructor(data: any) {
        if (null != data.utente) {
            this.nomeUtente = data.utente;
        }
        if (null != data.inizioTest) {
            this.inizioTest = data.inizioTest;
        }
        if (null != data.fineTest) {
            this.fineTest = data.fineTest;
        }
        if (null != data.totDomande) {
            this.totDomande = data.totDomande;
        }
        if (null != data.totGiuste) {
            this.totGiuste = data.totGiuste;
        }
        if (null != data.percentualeSuccesso) {
            this.percentualeSuccesso = data.percentualeSuccesso;
        }
    }

}