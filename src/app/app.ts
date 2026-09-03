import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ShellComponent } from './presentation/layout/shell/shell';

@Component({
  imports: [RouterOutlet, ShellComponent],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {}
