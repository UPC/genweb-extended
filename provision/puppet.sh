#!/bin/bash

# update last version of puppet
puppet module install gajdaw-puppet
puppet apply -e "include puppet"

# la opció "templatedir" està deprecated a les versions recents del Puppet
# la comentem perquè no apareguin warnings als logs del Puppet
sudo sed -i s/^templatedir/#templatedir/g /etc/puppet/puppet.conf

puppet module install puppetlabs-stdlib
puppet module install puppetlabs-concat
puppet module install puppetlabs-apache
puppet module install nodes/php
puppet module install saz-locales
