import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { ClientHeader } from "../client-header/client-header";
import { FooterGeneric } from "../footer-generic/footer-generic";

@Component({
  selector: 'app-client-layout',
  imports: [RouterOutlet, ClientHeader, FooterGeneric],
  templateUrl: './client-layout.html',
  styleUrl: './client-layout.css'
})
export class ClientLayout {

}
