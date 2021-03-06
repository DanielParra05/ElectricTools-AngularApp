import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls : ['./form.component.css']
})
export class FormComponent implements OnInit {
  public cliente: Cliente = new Cliente();
  public titulo = 'Crear Cliente';

  constructor(private clienteService: ClienteService, private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.cargarCliente();
  }

  public cargarCliente(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params.id;
      if (id) { // Si existe el id
        this.clienteService.getCliente(id).subscribe((cliente) => this.cliente = cliente);
      }
    });
    console.log(this.cliente);
  }

  public create(): void {
    //console.log('Clicked');
    //console.log(this.cliente);
    this.clienteService.create(this.cliente).subscribe(
      cliente => {
        this.router.navigate(['/clientes']);
        swal.fire('Cliente guardado', 'El cliente ' + cliente.nombre + ' ha sido creado con exito!', 'success');
      }
    );
  }

  update(): void {
    this.clienteService.update(this.cliente).subscribe(
      json => {
        this.router.navigate(['/clientes']);
       // swal.fire('Cliente actualizado',  `${json.mensaje}: ${json.cliente.nombre}`, 'success');
       swal.fire('Cliente actualizado',  'Cliente '+this.cliente.nombre+' '+ this.cliente.apellido+' actualizado correctamente!', 'success');
      });
  }

}
