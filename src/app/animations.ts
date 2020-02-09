import { trigger, transition, query, style, animate } from '@angular/animations';


export const fadeInOut = trigger('fadeInOut', [
    transition(':enter', [
        query('div', [
            style({opacity: 0}),
            animate('.2s ease', style({opacity: 1}))
        ])
    ]),
    transition(':leave', [
        query('div', [
            style({opacity: 1}),
            animate('.2s ease', style({opacity: 0}))
        ])
    ]),
]);

export const fade = trigger('fade', [
    transition(':enter', [
        style({opacity: 0}),
        animate('.4s ease', style({opacity: 1}))
    ]),
    transition(':leave', [
        style({opacity: 0}),
        animate('.4s ease', style({opacity: 0}))
    ]),
]);

