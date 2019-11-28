require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = package["name"]
  s.version      = package["version"]
  s.summary      = package["description"]
  s.description  = package["description"]
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = { package["author"]["name"] => package["author"]["email"] }
  s.platform      = :ios, '8.0'
  s.source       = { :git => package["repository"]["url"] }

  s.source_files = "ios/**/*.{h,m,swift}"

  s.dependency "React"
  s.dependency 'AMap3DMap', "~> 6.9.0"
  s.dependency 'AMapFoundation', "~> 1.5.9"
  s.dependency 'AMapSearch', "~> 6.9.0"
  s.dependency 'AMapLocation', "~> 2.6.3"

end

