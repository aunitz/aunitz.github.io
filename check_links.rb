#!/usr/bin/env ruby
# Comprueba todos los enlaces del sitio generado en _site/
# Uso: bundle exec ruby check_links.rb [--external] [--output results.txt]
#
# Sin flags: solo enlaces internos (rápido)
# --external: también comprueba enlaces externos (lento)
# --output FILE: guarda el informe en un fichero además de mostrarlo por pantalla

require "nokogiri"
require "net/http"
require "uri"
require "set"
require "fileutils"

# ── Opciones ──────────────────────────────────────────────────────────────────
check_external = ARGV.include?("--external")
output_index   = ARGV.index("--output")
output_file    = output_index ? ARGV[output_index + 1] : nil

SITE_DIR   = File.expand_path("_site", __dir__)
BASE_URL   = "https://www.aunitz.net"
TIMEOUT    = 10  # segundos por petición externa

# ── Resultado ─────────────────────────────────────────────────────────────────
broken   = []   # { url:, source:, status:, error: }
skipped  = []   # URLs ignoradas (mailto, javascript, anchors, etc.)
checked  = Set.new

# ── Helpers ───────────────────────────────────────────────────────────────────
def html_files(site_dir)
  Dir.glob(File.join(site_dir, "**", "*.html"))
end

def extract_links(file)
  doc = Nokogiri::HTML(File.read(file, encoding: "utf-8"))
  hrefs = doc.css("a[href]").map { |a| a["href"].to_s.strip }
  srcs  = doc.css("img[src], script[src], link[href]").map { |n| (n["src"] || n["href"]).to_s.strip }
  (hrefs + srcs).uniq
end

def local_path(url, site_dir, base_url)
  path = url.sub(base_url, "")
  path = path.split("#").first  # elimina fragmento
  path = "/" if path.empty?
  # Intenta como fichero directo y como index.html de directorio
  candidates = [
    File.join(site_dir, path),
    File.join(site_dir, path, "index.html"),
    File.join(site_dir, path.chomp("/"))
  ]
  candidates.find { |c| File.exist?(c) }
end

def check_external_url(url)
  uri = URI.parse(url)
  return [:skip, "esquema no soportado"] unless uri.is_a?(URI::HTTP) || uri.is_a?(URI::HTTPS)

  redirects = 0
  loop do
    raise "demasiadas redirecciones" if redirects > 5
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = uri.scheme == "https"
    http.open_timeout = TIMEOUT
    http.read_timeout = TIMEOUT
    req = Net::HTTP::Head.new(uri.request_uri)
    req["User-Agent"] = "Mozilla/5.0 (compatible; link-checker/1.0)"
    res = http.request(req)
    code = res.code.to_i
    if [301, 302, 303, 307, 308].include?(code) && res["location"]
      uri = URI.join(uri.to_s, res["location"])
      redirects += 1
    else
      return [code, nil]
    end
  end
rescue => e
  [:error, e.message]
end

# ── Recolección de ficheros HTML ───────────────────────────────────────────────
files = html_files(SITE_DIR)
puts "Analizando #{files.size} ficheros HTML en #{SITE_DIR}…\n\n"

internal_broken = []
external_broken = []
total_links = 0

files.each do |file|
  source_path = file.sub(SITE_DIR, "").gsub("\\", "/")
  links = extract_links(file)

  links.each do |href|
    next if href.empty? || href.start_with?("mailto:", "javascript:", "tel:", "#", "data:")

    total_links += 1

    # ── Enlace interno ─────────────────────────────────────────────────────
    is_internal = href.start_with?("/") || href.start_with?(BASE_URL)
    if is_internal
      next if checked.include?(href)
      checked.add(href)

      resolved = local_path(href, SITE_DIR, BASE_URL)
      unless resolved
        internal_broken << { url: href, source: source_path }
        print "✗"
      else
        print "."
      end

    # ── Enlace externo ─────────────────────────────────────────────────────
    elsif check_external && href.start_with?("http")
      next if checked.include?(href)
      checked.add(href)

      status, err = check_external_url(href)
      if status == :skip
        skipped << href
      elsif status == :error || (status.is_a?(Integer) && status >= 400)
        label = status == :error ? "ERROR: #{err}" : "HTTP #{status}"
        external_broken << { url: href, source: source_path, status: label }
        print "✗"
      else
        print "."
      end
    end

    $stdout.flush
  end
end

puts "\n\n"

# ── Informe ────────────────────────────────────────────────────────────────────
lines = []
lines << "=" * 70
lines << "INFORME DE ENLACES — #{Time.now.strftime("%Y-%m-%d %H:%M")}"
lines << "=" * 70
lines << "Ficheros analizados : #{files.size}"
lines << "Total enlaces vistos: #{total_links}"
lines << "Únicos comprobados  : #{checked.size}"
lines << ""

if internal_broken.empty?
  lines << "ENLACES INTERNOS ROTOS: ninguno ✓"
else
  lines << "ENLACES INTERNOS ROTOS (#{internal_broken.size}):"
  internal_broken.each do |b|
    lines << "  [roto]  #{b[:url]}"
    lines << "          encontrado en: #{b[:source]}"
  end
end

lines << ""

if check_external
  if external_broken.empty?
    lines << "ENLACES EXTERNOS ROTOS: ninguno ✓"
  else
    lines << "ENLACES EXTERNOS ROTOS (#{external_broken.size}):"
    external_broken.each do |b|
      lines << "  [#{b[:status]}]  #{b[:url]}"
      lines << "          encontrado en: #{b[:source]}"
    end
  end
else
  lines << "Enlaces externos NO comprobados (usa --external para incluirlos)"
end

lines << ""
lines << "=" * 70

report = lines.join("\n")
puts report

if output_file
  File.write(output_file, report, encoding: "utf-8")
  puts "\nInforme guardado en: #{output_file}"
end
