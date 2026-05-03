# frozen_string_literal: true

Gem::Specification.new do |s|
  s.name          = 'jekyll-theme-isotc211'
  s.version       = '1.0.0'
  s.authors       = ['Ribose Inc.']
  s.email         = ['open.source@ribose.com']

  s.summary       = 'ISO/TC 211 Jekyll theme — modern design with Vite, Tailwind CSS v4, and dark mode'
  s.homepage      = 'https://github.com/ISO-TC211/jekyll-theme-isotc211/'
  s.license       = 'MIT'

  s.files         = `git ls-files -z`.split("\x0").select { |f|
    f.match(%r{^((_includes|_layouts|_frontend|assets|config)/|(_config\.yml|LICENSE|README)((\.(txt|md|markdown|adoc)|$)))}i)
  }

  s.add_runtime_dependency 'jekyll', '~> 4.3'

  s.add_development_dependency 'bundler', '~> 2.0'
  s.add_development_dependency 'rake', '~> 12.0'
end
