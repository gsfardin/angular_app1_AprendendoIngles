import { Component, OnInit } from '@angular/core';
import { Frase } from '../shared/frase.model'
import { FRASES } from './frases-mock'

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit {

  public instrucao: string = "Traduza a frase:"
  public frases: Frase[] = FRASES
  public resposta: string = '';

  public rodada: number = 0;
  public rodadaFrase: Frase;

  public progresso: number = 0;


  constructor() {
    this.atualizaRodada();
   }

  ngOnInit(): void {
  }

  // atualizaResposta(): void --> Declarar o método sem o operador de visibilidade, assume puclic.
  public atualizaResposta(resposta: Event): void {
    // <HTMLInputElement> Declara que o atributo é um elemento HTML, permite buscar o estado do elemento no DOM.
    this.resposta = (<HTMLInputElement>resposta.target).value
    //console.log(this.resposta)
  }

  public verificarResposta(): void {
    if(this.rodadaFrase.frasePtbr == this.resposta) {
      alert('A tradução está correta')

      // Trocar pergunta da rodada
      this.rodada++;

      // Incrementa o percentual do progresso conforme o tamanho do vetor de frases
      this.progresso = this.progresso + (100 / this.frases.length);

      // Atualiza o objeto da rodada
      this.atualizaRodada();
    }
    else {
      alert('A tradução está errada')
    }
  }

  public atualizaRodada(): void {
    // Atualiza o objeto da rodada
    this.rodadaFrase = this.frases[this.rodada]

    // Limpa a resposta do usuário no textarea
    this.resposta = '';
  }
}
