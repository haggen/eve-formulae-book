environment ENV.fetch('RACK_ENV') { 'development' }
threads 1, 1
bind "tcp://0.0.0.0:#{ENV.fetch('PORT') { 3000 }}"
