class { 'apache':
  default_vhost => false,
  mpm_module    => 'prefork',
  purge_configs => true,
}

include 'apache::mod::php', 'apache::mod::rewrite'

apache::vhost { 'gw4e':
  servername => 'gw4e',
  port    => '443',
  ssl     => true,
  docroot => "/vagrant/www"
}

include 'php'

# Install extensions -> Configure extensions -> reload webserver
Php::Extension <| |> -> Php::Config <| |> ~> Service['httpd']

class { ['php::cli', 'php::extension::curl']:
}
