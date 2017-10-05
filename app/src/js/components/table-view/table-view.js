!(function( angular ) {
  if( !angular ) throw new ReferenceError( 'angularjs 1.5+ is required' );

  'use strict';
  angular.module( 'tableView', [] );

  angular
    .module( 'tableView')
    .component( 'tableView', {
      template: renderTableView(),
      transclude: true,
      bindings: {
        header: '@tableViewHeader',
      },
      controllerAs: '$tableView'
    });
  
  function renderTableView() {
    return (`
      <div class="row table-view">
        <div class="col">
          <table class="table table-hover">
            <thead class="thead-default">
              <th scope="row" class="text-center pointer">{{$tableView.header}}</th>
            </thead>
            <tbody ng-transclude>
              
            </tbody>
          </table>
        </div>
      </div>
    `);
  }

  angular
    .module( 'tableView' )
    .component( 'tableViewContent', {
      template: renderTableViewContent(),
      bindings: {
        list: '<contentRepeat'
      },
      require: {
        tableView: '^tableView'
      },
      controller() {
        const vm = this;
        console.log( 'tableContent', vm );
      },
      controllerAs: 'vm'
    });

  function renderTableViewContent() {
    return (`
      <tr ng-repeat="item in vm.list | orderBy: vm.oderBy : -1 track by item._id">
        <td>
          <div class="row">
            <div class="col-10">
              <p class="table-view-title mb-0">{{::item.firstName}}</p>
              <div class="table-view-body text-secondary">
                <p class="mb-0">{{::item.email}}</p>
              </div>
              <div class="table-view-footer">
                <p class="text-muted">{{::item.lastUpdate}}</p>
              </div>
            </div>
          </div>
        </td>
      </tr>
    `);
  }

  angular
    .module( 'tableView' )
    .component( 'tableViewActions', {
      template: renderTableViewActions()
    });

  function renderTableViewActions() {
    return (`
      <div class="col-2">
        <a class="btn btn-sm btn-primary mt-1" ng-href="#!/speaker/update/{{::speaker._id}}"><i class="fa fa-pencil"></i></a>
        <button type="button" class="btn btn-sm btn-danger mt-1" data-target="#confirmAction" data-toggle="modal" ng-click="vm.setCurrentSpeaker( speaker )">
          <i class="fa fa-trash-o"></i>
        </button>
      </div>
    `);
  }
})( angular );