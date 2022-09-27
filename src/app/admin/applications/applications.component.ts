import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss'],
})
export class ApplicationsComponent implements OnInit {
  public applications: any[] = [
    {
      type: 'Herramienta de gestión',
      image: 'assets/png/trello.png',
      name: 'Trello',
      description:
        'Herramienta para la gestión de trabajos, ayuda a diseñar planes y organizar flujos de trabajo. Es funcional tanto para PC como para móvil.',
      url: 'https://trello.com/es/platforms',
    },
    {
      type: 'Herramienta de marketing',
      image: 'assets/png/canva.png',
      name: 'Canva',
      description:
        'Es una herramienta que te permite ingresar de manera sencilla ilustraciones para compartir en redes sociales, funciona en dispositivos móviles y computadoras.',
      url: 'https://www.canva.com/es_419/',
    },
    {
      type: 'Herramienta de redes sociales',
      image: 'assets/png/facebook.png',
      name: 'Facebook Business',
      description:
        'Es una herramienta gratuita que ayuda a organizar y administrar las acciones de marketing de una empresa a fin de hacerlas más eficientes y rentables.',
      url: 'https://business.facebook.com/',
    },
    {
      type: 'Herramienta de ventas',
      image: 'assets/png/facebook.png',
      name: 'Facebook Ads',
      description:
        'Plataforma publicitária de facebook que ayuda a llegar a un número determinado y un tipo concreto de personas. Se lo puede utilizar desde una computadora o un teléfono móvil, paga deacuerdo a la industria u audiencia a la que se quiere llegar.',
      url: 'https://www.facebook.com/business/ads',
    },
    {
      type: 'Herramienta de recursos humanos',
      image: 'assets/png/slack.png',
      name: 'Slack',
      description:
        'Esta herramienta permite establecer chats (grupales o privados), mensajes directos y compartir archivos, videos o imágenes. Es gratis para un uso limitado, pero también tiene la opción premium.',
      url: 'https://slack.com/intl/en-in/get-started#/createnew',
    },
    {
      type: 'Herramienta para el área financiera (registro de datos)',
      image: 'assets/png/treinta.png',
      name: 'Treinta',
      description:
        'Es la primera app gratuita de Latinoamérica que permite a los negocios digitalizar sus finanzas. Administra ventas, gastos, deudas, inventario, balance y mucho más, 100% gratis.',
      url: 'https://web.treinta.co/',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
