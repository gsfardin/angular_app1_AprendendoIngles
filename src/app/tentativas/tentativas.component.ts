import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Coracao } from '../shared/coracao.model'

@Component({
  selector: 'app-tentativas',
  templateUrl: './tentativas.component.html',
  styleUrls: ['./tentativas.component.css']
})
export class TentativasComponent implements OnInit, OnChanges {

  @Input() public tentativas: number;

  public coracoes: Array<Coracao> = [
    new Coracao(true),
    new Coracao(true),
    new Coracao(true)
  ]

  constructor() {
  }

  ngOnChanges(): void {
    // this.tentativas
    // this.coracoes.length
    if(this.tentativas !== this.coracoes.length) {
      let indice = this.coracoes.length - this.tentativas;

      // Altera o atributo cheio do ogjeto coração no indice definido pelas tentativas para começar pelo 0
      this.coracoes[indice - 1].cheio = false;
    }
  }

  ngOnInit(): void {
      
  }

}
