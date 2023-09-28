import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'item',
    loadChildren: () =>
      import('./components/todo-list/todo-list.module').then(
        (m) => m.TodoListModule
      ),
  },
  {
    path: '**',
    redirectTo: '/item',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
