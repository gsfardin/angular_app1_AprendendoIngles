import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Frase } from '../shared/frase.model'
import { FRASES } from './frases-mock'

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit, OnDestroy {

  public instrucao: string = "Traduza a frase:"
  public frases: Frase[] = FRASES
  public resposta: string = '';

  public rodada: number = 0;
  public rodadaFrase: Frase;

  public progresso: number = 0;

  public tentativas: number = 3;

  @Output() public encerrarJogo: EventEmitter<string> = new EventEmitter();

  constructor() {
    this.atualizaRodada();
   }

  ngOnDestroy(): void {
    console.log('Componente painel foi destruido');
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

      // Trocar pergunta da rodada
      this.rodada++;

      // Incrementa o percentual do progresso conforme o tamanho do vetor de frases
      this.progresso = this.progresso + (100 / this.frases.length);

      // Tratamento de sucesso
      if(this.rodada == 4) {
        this.encerrarJogo.emit('vitoria');
      }

      // Atualiza o objeto da rodada
      this.atualizaRodada();
    }
    else {
      // Diminuir a quantidade de tentativas
      this.tentativas--;

      if(this.tentativas < 0) {
        this.encerrarJogo.emit('derrota');
      }
    }
  }

  public atualizaRodada(): void {
    // Atualiza o objeto da rodada
    this.rodadaFrase = this.frases[this.rodada]

    // Limpa a resposta do usuário no textarea
    this.resposta = '';
  }
}
