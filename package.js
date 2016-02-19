Package.describe({
  name: 'ivansglazunov:templater',
  version: '0.0.2',
  summary: 'Link collection some templates.',
  git: 'https://github.com/ivansglazunov/meteor-templater.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');

  api.use('ecmascript');
  api.use('mongo');
  api.use('accounts-base');
  api.use('random');

  api.use('templating');

  api.use('stevezhu:lodash@4.3.0');
  api.use('dburles:collection-helpers@1.0.4');
  api.use('lai:collection-extensions@0.2.1');
  
  api.addFiles('templater.html', 'client');
  api.addFiles('templater.js');
});