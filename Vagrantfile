# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|
  config.vm.box = "ubuntu/trusty64"
  config.vm.network "private_network", ip: "192.168.33.13"
  config.vm.hostname = "gw4e"
  config.vm.provider "virtualbox" do |vb|
    vb.name = "gw4e"
    vb.memory = "256"
  end
  config.vm.provision :shell, path: "provision/puppet.sh"
  config.vm.provision "puppet", manifest_file: "system.pp"
  config.vm.provision "puppet", manifest_file: "webserver.pp"
end
